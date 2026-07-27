"use client";

import { useState } from "react";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from "@/content/gallery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import Shot, { openable } from "@/components/Shot";

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("전체");
  const { lightbox, open, close, navigate } = useLightbox();

  const shown = GALLERY.filter((g) => filter === "전체" || g.tag === filter);
  const openables = openable(shown);

  return (
    <section
      id="gallery"
      className="bg-night px-5 py-[118px] text-night-text dk:px-10"
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

        <div className="grid grid-cols-2 gap-4 dk:grid-cols-4">
          {shown.map((g) => {
            const idx = openables.findIndex((o) => o.src === g.src);
            const canOpen = idx !== -1;
            return (
              <figure
                key={g.src}
                onClick={canOpen ? () => open(openables, idx) : undefined}
                className={`m-0 border border-night-text/14 bg-night-panel p-2 ${canOpen ? "cursor-zoom-in" : ""}`}
              >
                <Shot
                  media={g}
                  sizes="(max-width: 900px) 45vw, 280px"
                />
              </figure>
            );
          })}
        </div>

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
