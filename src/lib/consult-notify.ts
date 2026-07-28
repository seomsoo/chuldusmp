// 상담 신청 알림 발송 — 솔라피(SOLAPI) SMS/LMS + 카카오 알림톡.
// 서버 전용. 클라이언트 컴포넌트에서 import 하지 않는다 (API 키가 번들에 실린다).
//
// 설계 원칙은 CLAUDE.md 규칙 3("빈 값 = 미렌더")을 발송에 그대로 적용한 것이다.
// 알림톡 관련 env가 비어 있으면 알림톡 단계를 통째로 건너뛰고 문자만 보낸다.
// → 지금은 문자만으로 운영하다가, 카카오 템플릿 승인이 나면 env 두 줄만 채우면
//   코드 수정 없이 알림톡이 켜진다.
import { SolapiMessageService } from "solapi";
import { SITE } from "@/config/site";

export type ConsultPayload = {
  name: string;
  phone: string;
  topic: string;
  message: string;
};

/** 발송 결과. 대표 알림 실패만 사용자에게 에러로 돌려준다. */
export type NotifyResult = {
  /** 대표에게 문자가 접수됐는가 — 이게 false면 문의가 유실된 것이다. */
  ownerSms: boolean;
  ownerKakao: boolean;
  customer: boolean;
};

const env = (key: string) => (process.env[key] ?? "").trim();

/** 전화번호에서 숫자만 남긴다. 솔라피는 하이픈 없는 형식을 받는다. */
export const digits = (v: string) => v.replace(/\D/g, "");

const MOBILE = /^01[016789]\d{7,8}$/;

/**
 * 국제 표기(+82 10-…)를 국내 표기(010-…)로 되돌린다.
 * 연락처를 +82로 저장해둔 사람은 자동완성이 그대로 채워 넣는데,
 * 그걸 거부하면 멀쩡한 상담이 "번호를 확인하세요"에서 막힌다.
 */
export function normalizePhone(v: string) {
  const d = digits(v);
  if (d.startsWith("82")) {
    const local = "0" + d.slice(2);
    if (MOBILE.test(local)) return local;
  }
  return d;
}

/** 국내 휴대폰 번호인지 — 오타 번호로 엉뚱한 사람에게 문자가 가는 걸 막는다. */
export function isMobile(v: string) {
  return MOBILE.test(normalizePhone(v));
}

/** 010-1234-5678 형태로 되돌린다 (대표에게 보낼 문자 가독성용). */
export function formatPhone(v: string) {
  const d = digits(v);
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return v;
}

export function getConfig() {
  const apiKey = env("SOLAPI_API_KEY");
  const apiSecret = env("SOLAPI_API_SECRET");
  // 솔라피에 사전등록된 발신번호. 미등록 번호로는 발송 자체가 거부된다.
  const sender = digits(env("SOLAPI_SENDER"));
  // 알림 받을 번호. 안 넣으면 사이트에 노출된 대표 번호로 보낸다.
  const ownerTo = digits(env("CONSULT_NOTIFY_TO") || SITE.phone);

  return {
    apiKey,
    apiSecret,
    sender,
    ownerTo,
    kakao: {
      pfId: env("SOLAPI_KAKAO_PFID"),
      ownerTemplateId: env("SOLAPI_KAKAO_TEMPLATE_OWNER"),
      customerTemplateId: env("SOLAPI_KAKAO_TEMPLATE_CUSTOMER"),
    },
    // 고객 접수확인 발송 스위치. 기본 꺼짐 — 대표 알림만 나간다.
    // 2026-07-28 대표 결정: 고객 접수확인은 보내지 않는다.
    // 켜려면 CONSULT_NOTIFY_CUSTOMER=1 (건당 비용이 대략 2배가 된다).
    notifyCustomer: env("CONSULT_NOTIFY_CUSTOMER") === "1",
    /** 문자 발송에 필요한 최소 조건이 갖춰졌는가. */
    get ready() {
      return !!(apiKey && apiSecret && sender && ownerTo);
    },
  };
}

/** 접수 시각 — 서버 타임존과 무관하게 KST로 찍는다. */
function stampKST() {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function ownerText(p: ConsultPayload) {
  return [
    `[${SITE.name} ${SITE.branch}] 상담 신청`,
    `이름: ${p.name}`,
    `연락처: ${formatPhone(p.phone)}`,
    `희망 시술: ${p.topic}`,
    p.message ? `내용: ${p.message}` : "내용: (없음)",
    `접수: ${stampKST()}`,
  ].join("\n");
}

// 90바이트를 넘기지 않도록 짧게 유지한다 (넘으면 LMS로 승격돼 단가가 2배 이상).
function customerText(p: ConsultPayload) {
  return `[${SITE.name}] ${p.name}님, 상담 신청이 접수되었습니다. 순서대로 연락드리겠습니다.`;
}

/**
 * 실제 발송 없이 폼 전체 경로를 테스트하기 위한 개발용 스위치.
 * CONSULT_DRY_RUN=1 이면 솔라피를 호출하지 않고 성공한 것처럼 반환한다.
 *
 * 프로덕션에서는 값과 무관하게 무시한다 — 실수로 켠 채 배포되면
 * "접수되었습니다"만 뜨고 문의가 통째로 유실되기 때문이다.
 */
function isDryRun() {
  return process.env.NODE_ENV !== "production" && env("CONSULT_DRY_RUN") === "1";
}

export async function sendConsultNotifications(
  p: ConsultPayload,
): Promise<NotifyResult> {
  const cfg = getConfig();

  if (isDryRun()) {
    console.warn(
      `[consult] DRY RUN — 발송하지 않음: ${p.name} / ${formatPhone(p.phone)} / ${p.topic} / ${p.message}`,
    );
    return { ownerSms: true, ownerKakao: false, customer: false };
  }

  const service = new SolapiMessageService(cfg.apiKey, cfg.apiSecret);
  const result: NotifyResult = {
    ownerSms: false,
    ownerKakao: false,
    customer: false,
  };

  // 1) 대표 문자(LMS) — 유일한 필수 경로.
  //    알림톡보다 먼저, 그리고 독립된 send() 호출로 보낸다.
  //    한 번의 호출에 묶으면 알림톡 실패가 문자까지 같이 실패로 만들 수 있다.
  await service.send({
    to: cfg.ownerTo,
    from: cfg.sender,
    subject: `${SITE.name} 상담 신청`,
    text: ownerText(p),
  });
  result.ownerSms = true;

  // 2) 대표 알림톡 — 템플릿 승인 전이면 env가 비어 있어 통째로 건너뛴다.
  //    실패해도 이미 문자로 받았으므로 로그만 남기고 삼킨다.
  if (cfg.kakao.pfId && cfg.kakao.ownerTemplateId) {
    try {
      await service.send({
        to: cfg.ownerTo,
        from: cfg.sender,
        kakaoOptions: {
          pfId: cfg.kakao.pfId,
          templateId: cfg.kakao.ownerTemplateId,
          variables: {
            "#{name}": p.name,
            "#{phone}": formatPhone(p.phone),
            "#{topic}": p.topic,
            "#{message}": p.message || "(없음)",
          },
          // 문자는 위에서 이미 보냈다. 대체발송까지 켜면 같은 내용이 두 번 온다.
          disableSms: true,
        },
      });
      result.ownerKakao = true;
    } catch (e) {
      console.error("[consult] 대표 알림톡 실패", e);
    }
  }

  // 3) 고객 접수확인 — 실패해도 신청 자체는 성공이다. 삼킨다.
  if (cfg.notifyCustomer) {
    const to = digits(p.phone);
    try {
      if (cfg.kakao.pfId && cfg.kakao.customerTemplateId) {
        await service.send({
          to,
          from: cfg.sender,
          kakaoOptions: {
            pfId: cfg.kakao.pfId,
            templateId: cfg.kakao.customerTemplateId,
            variables: { "#{name}": p.name, "#{topic}": p.topic },
            // 여기선 대체발송을 켜둔다 — 카카오 미가입 고객도 확인은 받아야 한다.
          },
        });
      } else {
        await service.send({ to, from: cfg.sender, text: customerText(p) });
      }
      result.customer = true;
    } catch (e) {
      console.error("[consult] 고객 접수확인 실패", e);
    }
  }

  return result;
}
