"use client";

import { useState } from "react";
import { SITE, telHref } from "@/config/site";
import { SERVICES } from "@/content/services";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TOPICS = [
  ...SERVICES.map((s) => s.name),
  "아카데미 문의",
  "가맹 · 창업 문의",
];

const FIELD =
  "rounded-[2px] border border-ink/24 bg-white px-3.5 py-3 text-[14.5px] text-ink outline-none focus:border-ink";
const LABEL =
  "flex flex-col gap-[7px] text-[11.5px] font-bold tracking-[0.1em] text-ink-mute";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

function ConsultForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<Status>("idle");
  // 접수처(SITE.forms.consultEndpoint)가 아직 비어 있는 상태.
  // 폼 모양은 그대로 보여주되 전송은 막는다 — 보내지지도 않는데 "접수되었습니다"가
  // 뜨면 문의가 통째로 유실된다.
  const ready = !!endpoint;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (!ready) {
      setStatus("unconfigured");
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
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
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
          placeholder="탈모 범위, 희망 시기 등을 적어주세요"
          className={`${FIELD} resize-y`}
        />
      </label>

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

      {(status === "error" || status === "unconfigured") && (
        <p
          role="alert"
          className="m-0 text-[12.5px] leading-[1.6] text-ink-soft"
        >
          {status === "unconfigured"
            ? "상담 접수가 아직 연결되지 않았습니다. 왼쪽 전화·카카오톡으로 연락 주세요."
            : "접수에 실패했습니다. 잠시 후 다시 시도하시거나 왼쪽 전화·카카오톡으로 연락 주세요."}
        </p>
      )}
    </form>
  );
}

export default function Consult() {
  return (
    <section
      id="consult"
      className="bg-[linear-gradient(140deg,#C7CCD2_0%,#E9ECEF_22%,#F6F8FA_40%,#CFD4DA_58%,#EDEFF2_76%,#C2C7CD_100%)] px-5 pt-[118px] pb-[140px] dk:px-10"
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
                  <span className="font-semibold">출두</span>
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
