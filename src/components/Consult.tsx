"use client";

import { useEffect, useState } from "react";
import { SITE, telHref } from "@/config/site";
import { SERVICES } from "@/content/services";
import ScrollReveal from "@/components/ui/ScrollReveal";

// 00 소개 탭은 시술이 아니므로 희망 시술 목록에서 제외한다.
const TOPICS = [
  ...SERVICES.filter((s) => !s.intro).map((s) => s.name),
  "아카데미 문의",
  "가맹 · 창업 문의",
];

const FIELD =
  "rounded-[2px] border border-ink/24 bg-white px-3.5 py-3 text-[14.5px] text-ink outline-none focus:border-ink";
const LABEL =
  "flex flex-col gap-[7px] text-[11.5px] font-bold tracking-[0.1em] text-ink-mute";

type Status = "idle" | "sending" | "sent" | "error";

const FALLBACK = "왼쪽 전화·카카오톡으로 연락 주세요.";

// 서버가 돌려주는 실패 사유 → 사용자에게 보여줄 문장.
// 어떤 경우에도 "접수됐다"고 말하지 않는다 — 보내지지도 않았는데 성공으로 보이면
// 문의가 통째로 유실된다.
const ERRORS: Record<string, string> = {
  // 예시 번호를 적지 않는다 — 절대 규칙 2의 grep 검증(연락처 하드코딩)에 걸린다.
  phone: "휴대폰 번호 11자리를 다시 확인해주세요.",
  name: "성함을 다시 확인해주세요.",
  consent: "개인정보 수집·이용에 동의해주셔야 접수됩니다.",
  rate: `신청이 너무 잦습니다. 잠시 후 다시 시도하시거나 ${FALLBACK}`,
  unconfigured: `상담 접수가 아직 연결되지 않았습니다. ${FALLBACK}`,
};
const DEFAULT_ERROR = `접수에 실패했습니다. 잠시 후 다시 시도하시거나 ${FALLBACK}`;

function ConsultForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(DEFAULT_ERROR);
  // 접수처(SITE.forms.consultEndpoint)가 아직 비어 있는 상태.
  // 폼 모양은 그대로 보여주되 전송은 막는다.
  const ready = !!endpoint;

  // 성공 문구를 6초 보여주고 idle로 되돌린다 — 안 돌리면 두 번째 문의를 쓰는
  // 사람이 "접수되었습니다" 라벨이 붙은 버튼을 눌러야 하는 상태가 된다.
  useEffect(() => {
    if (status !== "sent") return;
    const t = window.setTimeout(() => setStatus("idle"), 6000);
    return () => clearTimeout(t);
  }, [status]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (!ready) {
      setError(ERRORS.unconfigured);
      setStatus("error");
      return;
    }
    setStatus("sending");

    // await 이후에는 e.currentTarget이 비므로 폼 참조를 미리 잡아둔다.
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const reason = await res
          .json()
          .then((b) => String(b?.error ?? ""))
          .catch(() => "");
        setError(ERRORS[reason] ?? DEFAULT_ERROR);
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setError(DEFAULT_ERROR);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3.5 border border-white/90 bg-white/62 p-8"
    >
      <label className={LABEL}>
        이름
        <input
          type="text"
          name="name"
          required
          maxLength={40}
          autoComplete="name"
          placeholder="성함"
          className={FIELD}
        />
      </label>

      <label className={LABEL}>
        연락처
        <input
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          inputMode="tel"
          // 오타 번호로 접수되면 연락이 닿지 않아 상담이 그대로 날아간다.
          // 서버에서도 같은 규칙으로 한 번 더 막는다.
          //
          // 하이픈은 반드시 이스케이프한다(`[\s\-]`). 브라우저는 pattern을 `v` 플래그로
          // 컴파일하는데, 거기선 `[-\s]`/`[\s-]` 둘 다 SyntaxError다. 그리고 pattern이
          // 깨지면 브라우저는 에러를 콘솔에만 남기고 **검증 자체를 건너뛴다** —
          // 조용히 무방비가 되므로 눈치채기 어렵다.
          pattern="01[016789][\s\-]?[0-9]{3,4}[\s\-]?[0-9]{4}"
          title="휴대폰 번호 11자리를 입력해주세요"
          placeholder="휴대폰 번호"
          className={FIELD}
        />
      </label>

      <label className={LABEL}>
        희망 시술
        <select name="topic" className={FIELD} defaultValue={TOPICS[0]}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className={LABEL}>
        문의 내용
        <textarea
          name="message"
          rows={4}
          // 서버(MAX_MESSAGE)와 같은 값. LMS 2,000바이트 한계 때문에 필요한
          // 제한인데, 여기서 막지 않으면 길게 쓴 뒤 서버에서 잘려나가는 걸
          // 고객이 모른 채 접수된다.
          maxLength={400}
          placeholder="탈모 범위, 희망 시기 등을 적어주세요"
          className={`${FIELD} resize-y`}
        />
      </label>

      {/*
        허니팟 — 사람에게는 안 보이고 봇만 채우는 미끼 필드.
        서버는 이 값이 차 있으면 발송 없이 조용히 버린다.
        display:none 대신 화면 밖으로 밀어낸다(일부 봇은 숨긴 필드를 건너뛴다).
        tabIndex/aria-hidden으로 키보드·스크린리더에는 노출되지 않게 한다.
      */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          회사명
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label className="flex items-start gap-2.5 text-[12.5px] leading-[1.6] text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-[3px]" />
        개인정보 수집 및 이용에 동의합니다. (상담 목적으로만 사용되며 상담 종료
        후 파기합니다)
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1.5 cursor-pointer rounded-[2px] border-0 bg-ink p-4 text-[15px] font-bold text-page transition-colors hover:bg-night-lift disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending"
          ? "보내는 중…"
          : status === "sent"
            ? "접수되었습니다 · 순서대로 연락드립니다"
            : "상담 신청하기"}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="m-0 text-[12.5px] leading-[1.6] text-ink-soft"
        >
          {error}
        </p>
      )}
      {/* 성공은 버튼 라벨로 보이지만 리더기에는 안 읽힌다 — 라이브 리전으로 알린다 */}
      <span role="status" className="sr-only">
        {status === "sent" ? "상담 신청이 접수되었습니다. 순서대로 연락드립니다." : ""}
      </span>
    </form>
  );
}

export default function Consult() {
  return (
    <section
      id="consult"
      className="bg-[linear-gradient(140deg,#C7CCD2_0%,#E9ECEF_22%,#F6F8FA_40%,#CFD4DA_58%,#EDEFF2_76%,#C2C7CD_100%)] px-5 pt-section pb-[120px] dk:px-10 dk:pt-section-dk dk:pb-[140px]"
    >
      <ScrollReveal className="mx-auto max-w-[1040px]">
        <div className="split grid items-start gap-14 dk:grid-cols-[5fr_7fr]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.34em] text-ink-mute">
              CONSULTATION
            </span>
            <h2 className="mt-4 mb-0 text-[clamp(30px,4.4vw,48px)] leading-[1.2] font-extrabold tracking-[-0.035em]">
              상담은 무료입니다
            </h2>
            <p className="mt-5 mb-0 text-[14.5px] leading-[1.75] text-[#3b4046]">
              두상과 탈모 범위를 보고 필요한 시술만 안내드립니다.
              <br />
              남기시면 순서대로 연락드립니다.
            </p>

            <div className="mt-8 flex flex-col gap-2.5">
              {telHref && (
                <a
                  href={telHref}
                  className="flex items-center justify-between rounded-[2px] bg-ink px-5 py-[15px] text-[14.5px] font-bold text-page transition-colors hover:bg-night-lift"
                >
                  전화 상담
                  <span className="tracking-[0.02em] tabular-nums">
                    {SITE.phone}
                  </span>
                </a>
              )}
              {SITE.links.kakao && (
                <a
                  href={SITE.links.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-[2px] border border-ink/34 px-5 py-[15px] text-[14.5px] font-bold transition-colors hover:bg-ink hover:text-page"
                >
                  카카오톡 채널
                  <span className="font-semibold">{SITE.kakaoChannelName}</span>
                </a>
              )}
              {/* 상담 유도는 회사 계정이 아니라 시술 계정(backho)으로 — 대표 요청(2026-08-03) */}
              {SITE.links.instagramWork && (
                <a
                  href={SITE.links.instagramWork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-[2px] border border-ink/34 px-5 py-[15px] text-[14.5px] font-bold transition-colors hover:bg-ink hover:text-page"
                >
                  인스타그램
                  {/* 핸들은 URL에서 파생 — 계정을 바꾸면 site.ts 한 곳만 고치면 된다 */}
                  <span className="font-semibold">
                    @
                    {new URL(SITE.links.instagramWork).pathname.replaceAll(
                      "/",
                      "",
                    )}
                  </span>
                </a>
              )}
              {SITE.links.naverBooking && (
                <a
                  href={SITE.links.naverBooking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-[2px] border border-ink/34 px-5 py-[15px] text-[14.5px] font-bold transition-colors hover:bg-ink hover:text-page"
                >
                  네이버 예약
                  <span className="font-semibold">바로가기</span>
                </a>
              )}
            </div>
          </div>

          <ConsultForm endpoint={SITE.forms.consultEndpoint} />
        </div>
      </ScrollReveal>
    </section>
  );
}
