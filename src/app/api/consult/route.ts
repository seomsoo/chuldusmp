import type { NextRequest } from "next/server";
import {
  formatPhone,
  getConfig,
  isMobile,
  normalizePhone,
  sendConsultNotifications,
} from "@/lib/consult-notify";

// 솔라피 SDK는 Node 런타임이 필요하다 (Edge 불가).
export const runtime = "nodejs";

const LIMIT = 3; // 같은 IP(또는 같은 번호)에서 허용할 신청 수
const WINDOW_MS = 10 * 60 * 1000; // 10분
const DAY_MS = 24 * 60 * 60 * 1000;
// 하루 총 발송 상한. IP를 바꿔가며 들어오는 공격의 손실 상한선이다.
// 상담 폼 특성상 하루 100건을 넘길 일이 없으므로, 넘으면 정상 상황이 아니다.
const MAX_PER_DAY = 100;

// 본문 길이 상한. LMS는 2,000바이트가 한계이고 한글은 글자당 2바이트다.
// 넉넉히 잡으면 정상 고객의 긴 문의가 발송 실패로 유실되므로 여유를 둔다.
const MAX_MESSAGE = 400;
const MAX_TOPIC = 40;
const MAX_NAME = 40;

// 남용 차단용 인메모리 카운터.
// 서버리스에서는 인스턴스마다 따로 세어지므로 완벽한 방어는 아니다
// (인스턴스가 N개면 실질 한도도 N배가 된다).
// 목적은 "발송 비용이 무한정 새는 것"을 막는 데까지다.
const hits = new Map<string, number[]>();
let dayStart = Date.now();
let daySent = 0;

function recentHits(key: string, now: number) {
  return (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
}

/**
 * 한도를 검사하고 같은 시점에 자리를 잡아둔다(예약).
 *
 * 검사와 기록이 분리돼 있으면 동시 요청이 전부 검사를 통과한 뒤 한꺼번에
 * 발송된다 — 요청 10개를 동시에 쏘면 한도가 3이어도 10건이 나간다.
 * 그래서 발송 전에 먼저 자리를 잡고, 발송이 실패하면 release()로 되돌린다.
 * (실패까지 한도에 포함하면 솔라피 장애 중 재시도하던 정상 고객이 잠긴다.)
 *
 * @returns 통과하면 되돌리기 함수, 한도 초과면 null
 */
function reserve(keys: string[]): (() => void) | null {
  const now = Date.now();
  if (now - dayStart >= DAY_MS) {
    dayStart = now;
    daySent = 0;
  }
  if (daySent >= MAX_PER_DAY) {
    console.error(`[consult] 일일 발송 상한(${MAX_PER_DAY}) 도달 — 발송 중단`);
    return null;
  }
  if (keys.some((k) => recentHits(k, now).length >= LIMIT)) return null;

  for (const k of keys) hits.set(k, [...recentHits(k, now), now]);
  daySent++;

  // 오래된 키는 흘려보낸다 (인스턴스가 오래 살아있을 때 Map이 무한히 자라는 걸 방지).
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return () => {
    for (const k of keys) {
      const v = hits.get(k);
      const i = v?.indexOf(now) ?? -1;
      if (v && i >= 0) v.splice(i, 1); // 같은 ms에 여러 건이어도 딱 한 건만 되돌린다
    }
    daySent--;
  };
}

/**
 * 접속자 IP.
 *
 * x-forwarded-for의 **첫 항목은 클라이언트가 위조할 수 있다** — 요청마다 다른
 * 값을 넣으면 IP 기반 제한이 통째로 무력화된다. 그래서 플랫폼이 직접 세팅하는
 * 헤더를 먼저 신뢰하고, x-forwarded-for를 쓸 때는 마지막 항목(가장 가까운
 * 프록시가 붙인 실제 접속 IP)을 쓴다.
 */
function clientIp(req: NextRequest) {
  const h = req.headers;
  const vercel = h.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",").pop()!.trim();
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",").pop()!.trim();
  return "unknown";
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/**
 * 한 줄짜리 필드용 — 개행과 제어문자를 공백으로 접는다.
 *
 * 이걸 안 하면 이름에 개행을 넣어 문자 본문을 위조할 수 있다.
 * 예: 이름 칸에 개행과 함께 "연락처: <다른 번호>"를 넣으면, 대표가 받는 문자에
 * "연락처:" 줄이 두 개 생기고 위조된 쪽이 먼저 온다.
 * (예시에 실제 번호 형태를 적지 않는다 — 절대 규칙 2의 grep 검증에 걸린다.)
 * 문의 내용(message)은 여러 줄이 정상이므로 여기에 통과시키지 않는다.
 */
const line = (v: unknown) =>
  str(v)
    .replace(/[\r\n\t\x00-\x1f\x7f]+/g, " ")
    // 방향 제어·보이지 않는 문자. 화면상 글자 순서를 뒤집어 번호를 다르게
    // 보이게 만들 수 있어서 개행과 같은 이유로 걷어낸다.
    .replace(/[\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

/**
 * 길이 제한. 코드 포인트 단위로 자른다.
 * `"…".slice(n)`은 이모지(서로게이트 페어) 한가운데를 잘라 깨진 문자를 만든다.
 */
const cut = (s: string, n: number) =>
  s.length <= n ? s : [...s].slice(0, n).join("");

export async function POST(req: NextRequest) {
  const cfg = getConfig();
  if (!cfg.ready) {
    // 솔라피 env가 아직 안 채워진 상태. 폼에 "연결 안 됨" 안내를 띄우게 한다.
    // 여기서 성공을 반환하면 문의가 통째로 유실된다.
    return Response.json({ error: "unconfigured" }, { status: 503 });
  }

  // req.json()은 "null"·"[1,2]"·"\"a\"" 같은 유효한 JSON도 그대로 통과시킨다.
  // 객체가 아니면 아래에서 프로퍼티 접근이 터지므로(특히 null) 여기서 걸러낸다.
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return Response.json({ error: "invalid" }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // 허니팟 — 사람 눈에 안 보이는 필드. 채워져 있으면 봇이다.
  // 재시도를 유도하지 않도록 성공한 척하고 조용히 버린다.
  //
  // 다만 비밀번호 관리자나 브라우저 자동완성이 이 칸을 채워버리면
  // 멀쩡한 상담이 아무 흔적 없이 사라진다. 그 경우를 나중에 알아챌 수 있도록
  // 반드시 로그를 남긴다 — 이 로그가 자주 보이면 허니팟을 손봐야 한다는 신호다.
  if (str(body.company)) {
    console.warn(
      `[consult] 허니팟 차단 — ${line(body.name)} / ${str(body.phone)} / company=${str(body.company)}`,
    );
    return Response.json({ ok: true });
  }

  // 이름·시술은 문자 본문에서 한 줄을 차지하므로 개행을 접는다(본문 위조 방지).
  const name = cut(line(body.name), MAX_NAME);
  const phone = str(body.phone);
  // topic은 select에서 오지만 조작된 요청은 무엇이든 넣을 수 있다.
  const topic = cut(line(body.topic), MAX_TOPIC);
  // 문의 내용은 여러 줄이 정상이라 개행을 살린다.
  const message = cut(str(body.message), MAX_MESSAGE);

  if (!name || name.length > MAX_NAME) {
    return Response.json({ error: "name" }, { status: 400 });
  }
  if (!isMobile(phone)) {
    return Response.json({ error: "phone" }, { status: 400 });
  }
  if (body.consent !== true && body.consent !== "on") {
    return Response.json({ error: "consent" }, { status: 400 });
  }

  // IP와 전화번호 양쪽으로 건다. IP만 보면 회선을 바꿔가며,
  // 번호만 보면 번호를 바꿔가며 우회할 수 있다.
  const tel = normalizePhone(phone);
  const release = reserve([`ip:${clientIp(req)}`, `tel:${tel}`]);
  if (!release) {
    return Response.json({ error: "rate" }, { status: 429 });
  }

  try {
    const result = await sendConsultNotifications({
      name,
      phone: tel,
      topic: topic || "미선택",
      message,
    });
    return Response.json({ ok: true, ...result });
  } catch (e) {
    release();
    // 대표 문자 발송이 실패한 경우 — 문의가 어디에도 남지 않았다.
    // 이 로그가 유일한 흔적이므로 신청 내용을 한 줄에 다 박아둔다
    // (구조화 객체로 넘기면 로그 뷰어에 따라 통째로 생략될 수 있다).
    console.error(
      `[consult] 발송 실패 — ${name} / ${formatPhone(tel)} / ${topic} / ${message}`,
      e,
    );
    return Response.json({ error: "send" }, { status: 502 });
  }
}
