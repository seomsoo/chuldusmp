"use client";

import Image from "next/image";
import { FOUNDER, CAREERS, POSTERS } from "@/content/founder";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import Marquee from "@/components/ui/Marquee";
import Shot from "@/components/Shot";

export default function Founder() {
  const { lightbox, open, close, navigate } = useLightbox();

  return (
    <section id="about" className="bg-page">
      <div className="split grid items-stretch dk:grid-cols-2">
        {/* 대표 사진은 원본 비율 그대로 contain — 잘리지 않는다.
            비율은 카탈로그 실측값에서 뽑으므로 사진을 바꿔도 따라간다.
            모바일은 사진 비율에 딱 맞아 여백이 없고, 데스크톱에서 생기는 좌우 여백은
            본문 쪽과 같은 page 색으로 채운다. 사진의 스튜디오 배경(#EBEBEB~#F0EFF2)이
            page(#F2F3F5)와 거의 같아 경계가 드러나지 않는다 — 사진을 배경 톤이 다른
            것으로 교체하면 이 전제가 깨지므로 다시 확인할 것. */}
        <div
          style={
            {
              "--portrait-ratio": `${FOUNDER.portrait.width}/${FOUNDER.portrait.height}`,
            } as React.CSSProperties
          }
          className="relative aspect-[var(--portrait-ratio)] overflow-hidden bg-page dk:aspect-auto dk:min-h-[760px]"
        >
          <Image
            src={FOUNDER.portrait.src}
            alt={FOUNDER.portrait.alt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="object-contain object-top"
          />
        </div>

        {/* 모바일은 바로 위가 대표 사진이라 위쪽을 바짝 붙인다(pt-10) —
            104px를 그대로 두면 사진과 FOUNDER 사이가 뚝 끊긴다. */}
        <ScrollReveal className="flex flex-col justify-center px-5 pt-10 pb-section dk:px-16 dk:py-[104px]">
          <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
            FOUNDER
          </span>
          <h2 className="mt-4 mb-0 text-[clamp(32px,4.6vw,54px)] leading-[1.16] font-extrabold tracking-[-0.035em]">
            {FOUNDER.name}
          </h2>
          <p className="mt-3.5 mb-0 text-[14.5px] leading-[1.7] text-ink-soft">
            {FOUNDER.role}
            <br />
            {FOUNDER.tagline}
          </p>

          <ul className="mt-9 mb-0 flex list-none flex-col border-t border-ink/18 p-0">
            {CAREERS.map((c) => (
              <li
                key={c}
                className="border-b border-ink/12 py-3.5 text-[14px] leading-[1.6] tracking-[-0.015em] text-ink"
              >
                {c}
              </li>
            ))}
          </ul>

          <p className="mt-[26px] mb-0 text-[11px] font-semibold tracking-[0.14em] text-steel-500">
            {FOUNDER.regions}
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="bg-page px-5 pb-section dk:px-10 dk:pb-[110px]">
        <div className="mx-auto max-w-[1240px]">
          <p className="mt-0 mb-[18px] text-[10px] md:pt-6 font-bold tracking-[0.3em] text-steel-500">
            INTERNATIONAL ACTIVITY
          </p>
          {/* 리뷰 마퀴와 한 쌍 — 단 방향을 뒤집는다(reverse). 인접한 두 섹션이
              같은 방향으로 흐르면 같은 트릭의 반복으로 읽힌다. 15장 × ~276px라
              한 바퀴가 길어서 리뷰(70s)보다 느긋한 90s. */}
          <Marquee reverse durationSec={90} className="mx-[calc(50%-50vw)]">
            {POSTERS.map((p, i) => (
              <figure
                key={p.src}
                onClick={() => open(POSTERS, i)}
                className="m-0 mr-4 w-[min(70vw,260px)] shrink-0 cursor-zoom-in"
              >
                <Shot
                  media={p}
                  sizes="(max-width: 900px) 70vw, 260px"
                  className="border border-ink/16"
                />
                <figcaption className="mt-2.5 text-[11.5px] text-ink-mute">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </Marquee>
        </div>
      </ScrollReveal>

      <Lightbox lightbox={lightbox} onClose={close} onNavigate={navigate} />
    </section>
  );
}
