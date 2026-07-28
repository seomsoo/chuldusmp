"use client";

import { useState } from "react";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from "@/content/gallery";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import DragScroller from "@/components/ui/DragScroller";
import Shot, { openable } from "@/components/Shot";

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("전체");
  const { lightbox, open, close, navigate } = useLightbox();

  const shown = GALLERY.filter((g) => filter === "전체" || g.tag === filter);
  const openables = openable(shown);

  return (
    <section
      id="gallery"
      className="bg-night px-5 py-section text-night-text dk:px-10 dk:py-section-dk"
    >
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="split mb-11 grid items-end gap-12 dk:grid-cols-2">
          <div>
            <span className="text-[10px] font-bold tracking-[0.34em] text-steel-400">
              BEFORE / AFTER
            </span>
            <h2 className="mt-4 mb-0 text-[clamp(30px,4.6vw,52px)] leading-[1.22] font-extrabold tracking-[-0.03em] text-night-head">
              시술 전후 기록
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {GALLERY_CATEGORIES.map((c) => {
              const on = filter === c;
              return (
                <button
                  key={c}
                  aria-pressed={on}
                  onClick={() => setFilter(c)}
                  className={`cursor-pointer rounded-[2px] border px-4 py-[9px] text-[12.5px] font-semibold tracking-[-0.01em] transition-colors ${
                    on
                      ? "border-page bg-page text-night"
                      : "border-night-text/28 bg-transparent text-steel-300 hover:border-night-text/50 hover:text-night-head"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* 큰 카드 가로 스트립 — 그리드(모바일 2열×7줄)의 페이지 길이를 한 줄로
            압축하고 카드를 키워 썸네일에서도 결과가 보이게 한다.
            자동 마퀴를 쓰지 않는 이유: 전후 사진은 멈춰서 들여다보는 검증
            콘텐츠고, 마퀴는 이미 후기·대외활동 두 곳에 있다 — 셋째부터는
            같은 트릭의 반복으로 읽힌다. 끝이 잘린 한 줄이 "더 있다"는 신호라
            양의 증거도 유지된다. */}
        <DragScroller label="시술 전후 사진" className="gap-4">
          {shown.map((g) => {
            const idx = openables.findIndex((o) => o.src === g.src);
            const canOpen = idx !== -1;
            return (
              <figure
                key={g.src}
                onClick={canOpen ? () => open(openables, idx) : undefined}
                className={`m-0 w-[min(72vw,320px)] border border-night-text/14 bg-night-panel p-2 ${canOpen ? "cursor-zoom-in" : ""}`}
              >
                <Shot media={g} sizes="(max-width: 900px) 72vw, 320px" />
              </figure>
            );
          })}
          {/* 꼬리 카드 — 스트립 끝에 닿은 순간이 "더 보고 싶다"는 순간이라
              여기서 시술 계정으로 보낸다. 높이는 flex stretch로 사진 카드를 따라간다. */}
          {SITE.links.instagramWork && (
            <a
              href={SITE.links.instagramWork}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[min(72vw,320px)] flex-col items-center justify-center gap-3 border border-night-text/14 bg-night-panel text-center transition-colors hover:border-night-text/30"
            >
              <span className="text-[16px] leading-[1.5] font-extrabold tracking-[-0.02em] text-night-head">
                더 많은 전후 기록은
                <br />
                인스타그램에서
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.14em] text-steel-400">
                @{new URL(SITE.links.instagramWork).pathname.replaceAll("/", "")}
                <ArrowUpRight size={13} />
              </span>
            </a>
          )}
        </DragScroller>

        <div className="mt-14 flex justify-center">
          <a
            href="#consult"
            className="inline-block rounded-[2px] bg-page px-[38px] py-4 text-[15px] font-bold text-night transition-colors hover:bg-white"
          >
            내 두피도 상담받기
          </a>
        </div>
      </ScrollReveal>

      <Lightbox lightbox={lightbox} onClose={close} onNavigate={navigate} />
    </section>
  );
}
