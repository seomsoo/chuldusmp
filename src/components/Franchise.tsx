"use client";

import { FLAGSHIP_SPECS, FRANCHISE_BROCHURE } from "@/content/franchise";
import { SITE } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import DragScroller from "@/components/ui/DragScroller";
import Shot from "@/components/Shot";

export default function Franchise() {
  const { lightbox, open, close, navigate } = useLightbox();

  return (
    <section id="franchise" className="bg-page-alt px-5 py-section dk:px-10 dk:py-section-dk">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
          FRANCHISE
        </span>
        <h2 className="mt-4 mb-0 max-w-[640px] text-[clamp(30px,4.6vw,52px)] leading-[1.2] font-extrabold tracking-[-0.03em]">
          출두와 함께할
          <br />
          파트너를 찾습니다
        </h2>
        <p className="mt-5 mb-0 max-w-[520px] text-[14.5px] leading-[1.75] text-ink-soft">
          창업을 준비하시는 분을 위한 안내입니다.
          {/* 문장 단위로 끊는다(Network·Services와 같은 규칙). 모바일은 한
              문장도 한 줄에 안 들어가므로 br을 숨긴다. */}
          <br className="hidden dk:block" /> {SITE.branch}의 시술
          기준·부자재·교육 체계를 그대로 이관합니다.
        </p>

        <div className="split mt-14 grid items-stretch gap-10 dk:grid-cols-[5fr_7fr]">
          <article className="flex flex-col justify-between gap-9 bg-night px-8 py-9 text-night-text">
            <div>
              <span className="text-[9.5px] font-bold tracking-[0.3em] text-steel-400">
                FLAGSHIP MODEL
              </span>
              <h3 className="mt-3.5 mb-0 text-[clamp(26px,3.4vw,38px)] leading-[1.2] font-extrabold tracking-[-0.035em] text-night-head">
                {SITE.branch}
              </h3>
              <p className="mt-4 mb-0 text-[14px] leading-[1.75] text-steel-300">
                {SITE.address.full}
                <br />
                모든 가맹점은 {SITE.branch}의 운영 방식을 기준으로 세팅됩니다.
              </p>
            </div>
            <dl className="m-0 flex flex-col gap-px bg-night-text/16">
              {FLAGSHIP_SPECS.map((f) => (
                <div
                  key={f.k}
                  className="flex justify-between gap-4 bg-night py-3.5"
                >
                  <dt className="text-[12.5px] text-steel-400">{f.k}</dt>
                  <dd className="m-0 text-right text-[12.5px] font-bold text-night-text">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          <div>
            <p className="mt-0 mb-3.5 text-[10px] font-bold tracking-[0.26em] text-steel-500">
              BROCHURE
            </p>
            <DragScroller label="가맹 안내 자료" className="gap-3.5">
              {FRANCHISE_BROCHURE.map((f, i) => (
                <figure
                  key={f.src}
                  onClick={() => open(FRANCHISE_BROCHURE, i)}
                  className="m-0 w-[min(70vw,246px)] cursor-zoom-in"
                >
                  <Shot
                    media={f}
                    sizes="(max-width: 900px) 70vw, 246px"
                    className="border border-ink/16"
                  />
                  <figcaption className="mt-2.5 text-[11.5px] text-ink-mute">
                    {f.caption}
                  </figcaption>
                </figure>
              ))}
            </DragScroller>
            <a
              href="#consult"
              className="mt-7 inline-block rounded-[2px] bg-ink px-[30px] py-3.5 text-[14px] font-bold text-page transition-colors hover:bg-night-lift"
            >
              가맹 · 창업 문의
            </a>
          </div>
        </div>
      </ScrollReveal>

      <Lightbox lightbox={lightbox} onClose={close} onNavigate={navigate} />
    </section>
  );
}
