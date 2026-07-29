"use client";

import { ACADEMY, ACADEMY_FACTS, GRADUATES, RECRUIT } from "@/content/academy";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import DragScroller from "@/components/ui/DragScroller";
import Shot from "@/components/Shot";

export default function Academy() {
  const { lightbox, open, close, navigate } = useLightbox();

  return (
    <section id="academy" className="bg-page px-5 py-section dk:px-10 dk:py-section-dk">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="split mb-13 grid items-end gap-14 dk:grid-cols-[7fr_5fr]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
              ACADEMY
            </span>
            <h2 className="mt-4 mb-0 text-[clamp(30px,4.6vw,52px)] leading-[1.2] font-extrabold tracking-[-0.03em]">
              출두 마스터 아카데미
            </h2>
            <p className="mt-3 mb-0 text-[10.5px] font-semibold tracking-[0.26em] text-steel-500">
              SMP MASTER CLASS ACADEMY
            </p>
            <p className="mt-6 mb-0 max-w-[460px] border-l-2 border-ink pl-4 text-[17px] leading-[1.55] font-semibold tracking-[-0.025em]">
              어디서 배울지가 아닌
              <br />
              누구에게 배우느냐가 중요합니다
            </p>
          </div>
          {/* items-baseline: 숫자와 단위를 같은 기준선에 앉힌다. 이게 어긋나면
              둘이 한 덩어리로 안 읽히고 따로 노는 것처럼 보인다. */}
          <div className="flex items-baseline gap-2.5">
            <span className="text-[clamp(64px,10vw,132px)] leading-[0.9] font-extrabold tracking-[-0.06em] tabular-nums">
              {GRADUATES}
            </span>
            <span className="text-[clamp(22px,2.8vw,38px)] leading-none font-bold tracking-[-0.02em] text-ink-mute">
              명 수료
            </span>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-px border-y border-ink/16 bg-ink/16 dk:grid-cols-4">
          {ACADEMY_FACTS.map((f) => (
            <div key={f.k} className="flex flex-col gap-1.5 bg-page px-5 py-5.5">
              <span className="text-[16px] font-bold tracking-[-0.025em] break-keep">
                {f.v}
              </span>
              <span className="text-[11.5px] text-steel-600">{f.k}</span>
            </div>
          ))}
        </div>

        <DragScroller label="아카데미 커리큘럼" className="gap-4">
          {ACADEMY.map((a, i) => (
            <figure
              key={a.src}
              onClick={() => open(ACADEMY, i)}
              className="m-0 w-[min(74vw,300px)] cursor-zoom-in"
            >
              <div className="mb-2.5 flex items-baseline gap-2.5">
                <span className="font-mono text-[10px] tracking-[0.12em] text-steel-400">
                  {a.step}
                </span>
                <span className="text-[13.5px] font-bold tracking-[-0.02em]">
                  {a.title}
                </span>
              </div>
              <Shot
                media={a}
                sizes="(max-width: 900px) 74vw, 300px"
                className="border border-ink/16"
              />
            </figure>
          ))}
        </DragScroller>

        {/* 모집 안내 — 커리큘럼(300px)보다 한 단계 작게(240px) 두어 위계를 지킨다.
            커리큘럼이 "무엇을 배우나", 여기가 "어떻게 들어오나". */}
        {RECRUIT.length > 0 && (
          <div className="mt-12">
            <p className="mt-0 mb-[18px] text-[10px] font-bold tracking-[0.3em] text-steel-500">
              RECRUIT
            </p>
            <DragScroller label="아카데미 모집 안내" className="gap-4">
              {RECRUIT.map((r, i) => (
                <figure
                  key={r.src}
                  onClick={() => open(RECRUIT, i)}
                  className="m-0 w-[min(60vw,240px)] cursor-zoom-in"
                >
                  <Shot
                    media={r}
                    sizes="(max-width: 900px) 60vw, 240px"
                    className="border border-ink/16"
                  />
                </figure>
              ))}
            </DragScroller>
          </div>
        )}

        <div className="mt-11">
          <a
            href="#consult"
            className="inline-block rounded-[2px] border border-ink/32 px-[30px] py-3.5 text-[14px] font-bold transition-colors hover:bg-ink hover:text-page"
          >
            아카데미 문의
          </a>
        </div>
      </ScrollReveal>

      <Lightbox lightbox={lightbox} onClose={close} onNavigate={navigate} />
    </section>
  );
}
