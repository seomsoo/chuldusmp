"use client";

import { DIRECTIONS, DIRECTIONS_CARD } from "@/content/location";
import { SITE } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import Shot from "@/components/Shot";

export default function Location() {
  const { lightbox, open, close, navigate } = useLightbox();

  const routes = [
    { href: SITE.links.naverMap, label: "네이버 길찾기" },
    { href: SITE.links.kakaoMap, label: "카카오맵 길찾기" },
  ].filter((r) => r.href);

  return (
    <section id="location" className="bg-page px-5 py-section dk:px-10 dk:py-section-dk">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="split grid items-start gap-13 dk:grid-cols-[5fr_7fr]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
              DIRECTIONS
            </span>
            <h2 className="mt-4 mb-0 text-[clamp(30px,4.6vw,50px)] leading-[1.2] font-extrabold tracking-[-0.03em]">
              {SITE.branch}
              <br />
              오시는 길
            </h2>

            <p className="mt-[26px] mb-0 text-[17px] leading-[1.6] font-semibold tracking-[-0.02em]">
              {SITE.address.line}
            </p>
            <p className="mt-2 mb-0">
              <span className="inline-block rounded-[2px] bg-ink px-3.5 py-[7px] text-[18px] font-extrabold tracking-[-0.02em] text-page">
                {SITE.address.floor}
              </span>
            </p>

            <dl className="mt-9 mb-0 flex flex-col border-t border-ink/18">
              {DIRECTIONS.map((d) => (
                <div
                  key={d.k}
                  className="grid grid-cols-[76px_1fr] gap-4 border-b border-ink/12 py-4"
                >
                  <dt className="pt-[3px] text-[11px] font-bold tracking-[0.16em] text-steel-500">
                    {d.k}
                  </dt>
                  <dd className="m-0 text-[14px] leading-[1.7] text-ink">
                    {d.v}
                  </dd>
                </div>
              ))}
            </dl>

            {routes.length > 0 && (
              <div className="mt-[26px] flex flex-wrap gap-2.5">
                {routes.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[2px] border border-ink/30 px-[22px] py-3 text-[13px] font-bold transition-colors hover:bg-ink hover:text-page"
                  >
                    {r.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <figure
            onClick={() => open([DIRECTIONS_CARD], 0)}
            className="m-0 cursor-zoom-in"
          >
            <Shot
              media={DIRECTIONS_CARD}
              sizes="(max-width: 900px) 90vw, 700px"
              className="border border-ink/18"
            />
            <figcaption className="mt-2.5 text-[12px] text-ink-mute">
              {DIRECTIONS_CARD.caption}
            </figcaption>
          </figure>
        </div>
      </ScrollReveal>

      <Lightbox lightbox={lightbox} onClose={close} onNavigate={navigate} />
    </section>
  );
}
