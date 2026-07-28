"use client";

import { REVIEWS, TESTIMONIALS } from "@/content/reviews";
import { SITE } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import Marquee from "@/components/ui/Marquee";
import Shot from "@/components/Shot";

/**
 * 후기를 두 목소리로 나눠 보여준다 — 타이포(대형 인용 + 코러스 그리드)가 감정을
 * 전달하고, 네이버 캡처 스트립이 그 말의 출처를 증명한다. 캡처만 깔던 이전
 * 구성은 스마트폰 UI 노이즈가 섹션 전체를 지배해서 읽히기 전에 소음이 됐다.
 */
export default function Reviews() {
  const { lightbox, open, close, navigate } = useLightbox();
  // 첫 항목이 대형 인용, 나머지가 코러스 — 순서 규칙은 content 쪽 주석 참고.
  const [hero, ...chorus] = TESTIMONIALS;

  return (
    <section id="reviews" className="bg-page-alt px-5 py-section dk:px-10 dk:py-section-dk">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="mb-12">
          <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
            REVIEWS
          </span>
          <h2 className="mt-4 mb-0 text-[clamp(30px,4.6vw,52px)] leading-[1.22] font-extrabold tracking-[-0.03em]">
            실제 리뷰
          </h2>
        </div>

        {/* 대형 인용 — 이 섹션의 주인공. 여기 하나만 크고 나머지는 전부 조용하다. */}
        {hero && (
          <figure className="m-0 border-t border-ink/16 pt-8 dk:pt-10">
            <blockquote className="m-0 max-w-[980px] text-[clamp(21px,3.2vw,34px)] leading-[1.45] font-extrabold tracking-[-0.035em]">
              “{hero.quote}”
            </blockquote>
            <figcaption className="mt-5 font-mono text-[10px] tracking-[0.16em] text-steel-500">
              {hero.who} · NAVER PLACE
            </figcaption>
          </figure>
        )}

        {/* 코러스 — 짧은 발췌들. 개별 카드가 아니라 헤어라인 리스트로 묶어
            '많은 사람이 같은 말을 한다'는 합창으로 읽히게 한다. */}
        {chorus.length > 0 && (
          <ul className="m-0 mt-11 grid list-none grid-cols-1 gap-x-8 gap-y-7 p-0 dk:grid-cols-3">
            {chorus.map((t) => (
              <li key={t.quote} className="border-t border-ink/12 pt-4">
                <p className="m-0 text-[14.5px] leading-[1.65] font-semibold tracking-[-0.02em] text-ink">
                  “{t.quote}”
                </p>
                <span className="mt-2.5 block font-mono text-[9.5px] tracking-[0.14em] text-steel-500">
                  {t.who}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* 캡처 스트립 — 위 문장들의 출처. 캡션의 인용문은 텍스트 블록과
            중복이라 뺐고, 시술 부위만 남긴다. */}
        <div className="mt-16">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-ink/16 pb-3.5">
            <span className="text-[10px] font-bold tracking-[0.3em] text-steel-500">
              NAVER PLACE
            </span>
            <span className="text-[12px] tracking-[-0.01em] text-ink-mute">
              방문자 리뷰 캡처
            </span>
            {SITE.links.naverMap && (
              <a
                href={SITE.links.naverMap}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[12px] font-bold tracking-[-0.01em] text-ink transition-colors hover:text-steel-500"
              >
                후기 더 보기 ↗
              </a>
            )}
          </div>

          {/* 무한 자동 흐름 — 10장이 끝없이 도는 벽이라 실제 장수보다 많아 보인다.
              컨테이너(1240px)를 뚫고 화면 끝까지 흘려서 "화면 밖에도 이어진다"는
              인상을 준다. 호버·터치 중에는 멈추므로 라이트박스 클릭이 살아 있다. */}
          <Marquee durationSec={70} className="mx-[calc(50%-50vw)] mt-7">
            {REVIEWS.map((r, i) => (
              <figure
                key={r.src}
                onClick={() => open(REVIEWS, i)}
                className="m-0 mr-[18px] w-[min(66vw,238px)] shrink-0 cursor-zoom-in"
              >
                <div className="border border-ink/20 bg-white p-2">
                  <Shot
                    media={r}
                    sizes="(max-width: 900px) 66vw, 238px"
                    className="border border-ink/10"
                  />
                </div>
                <figcaption className="mt-2.5 font-mono text-[9.5px] tracking-[0.14em] text-steel-500">
                  {r.who}
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
