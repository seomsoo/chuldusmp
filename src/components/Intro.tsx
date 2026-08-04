"use client";

import { INTRO_CARDS } from "@/content/intro";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import DragScroller from "@/components/ui/DragScroller";
import Shot from "@/components/Shot";

/**
 * 인트로 카드 스트립 — 히어로 바로 아래, 대표 제작 카드뉴스 4장
 * (소개 → 전후 모음 → 과정 5단계). 아카데미 커리큘럼·가맹 브로슈어와
 * 같은 소비 문법(스트립 + 탭 확대)이다. 카드 속 본문은 스트립 크기에선
 * 안 읽히므로 확대가 전제 — 카드가 다크 디자인이라 밝은 면 위에서 잘 뜬다.
 */
export default function Intro() {
  const { lightbox, open, close, navigate } = useLightbox();

  return (
    <section id="intro" className="bg-page-alt px-5 py-section dk:px-10 dk:py-section-dk">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="mb-6">
          <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
            INTRO
          </span>
          <h2 className="mt-3.5 mb-0 text-[clamp(24px,3.4vw,38px)] leading-[1.25] font-extrabold tracking-[-0.03em]">
            출두 SMP 한눈에 보기
          </h2>
        </div>

        <DragScroller label="브랜드 소개 카드" className="gap-4">
          {INTRO_CARDS.map((c, idx) => (
            <figure
              key={c.src}
              onClick={() => open(INTRO_CARDS, idx)}
              className="m-0 w-[min(74vw,300px)] cursor-zoom-in"
            >
              <Shot
                media={c}
                sizes="(max-width: 900px) 74vw, 300px"
                className="border border-ink/16"
              />
              <figcaption className="mt-2.5 text-[11.5px] tracking-[-0.01em] text-steel-600">
                {c.caption}
              </figcaption>
            </figure>
          ))}
        </DragScroller>
      </ScrollReveal>

      <Lightbox lightbox={lightbox} onClose={close} onNavigate={navigate} />
    </section>
  );
}
