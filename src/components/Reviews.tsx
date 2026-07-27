"use client";

import { REVIEWS } from "@/content/reviews";
import { SITE } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import DragScroller from "@/components/ui/DragScroller";
import Shot from "@/components/Shot";

export default function Reviews() {
  const { lightbox, open, close, navigate } = useLightbox();

  return (
    <section id="reviews" className="bg-page-alt px-5 py-[118px] dk:px-10">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="mb-11">
          <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
            REVIEWS
          </span>
          <h2 className="mt-4 mb-0 text-[clamp(30px,4.6vw,52px)] leading-[1.22] font-extrabold tracking-[-0.03em]">
            실제 리뷰
          </h2>
          {SITE.links.naverMap && (
            <a
              href={SITE.links.naverMap}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-[2px] border border-ink/28 px-5 py-[11px] text-[12.5px] font-bold transition-colors hover:bg-ink hover:text-page"
            >
              후기 더 보기
            </a>
          )}
        </div>

        <DragScroller label="후기 캡처" className="gap-[18px]">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.src}
              onClick={() => open(REVIEWS, i)}
              className="m-0 w-[min(76vw,278px)] cursor-zoom-in"
            >
              <div className="border border-ink/20 bg-white p-2.5">
                <Shot
                  media={r}
                  sizes="(max-width: 900px) 76vw, 278px"
                  className="border border-ink/10"
                />
              </div>
              <figcaption className="mt-3 text-[13.5px] leading-[1.6] tracking-[-0.015em] text-ink">
                {r.quote}
                <span className="mt-1.5 block text-[11px] tracking-[0.02em] text-steel-500">
                  {r.who}
                </span>
              </figcaption>
            </figure>
          ))}
        </DragScroller>
      </ScrollReveal>

      <Lightbox lightbox={lightbox} onClose={close} onNavigate={navigate} />
    </section>
  );
}
