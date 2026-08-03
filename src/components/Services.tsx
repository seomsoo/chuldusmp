"use client";

import { Fragment, useState } from "react";
import { SERVICES } from "@/content/services";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import VideoLightbox from "@/components/ui/VideoLightbox";
import DragScroller from "@/components/ui/DragScroller";
import Shot, { openable } from "@/components/Shot";
import VideoCard from "@/components/VideoCard";

export default function Services() {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState<number | null>(null);
  const { lightbox, open, close, navigate } = useLightbox();
  const svc = SERVICES[active];
  const shots = openable(svc.shots);
  const videos = svc.videos ?? [];

  return (
    <section id="services" className="bg-page px-5 py-section dk:px-10 dk:py-section-dk">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="split mb-14 grid items-end gap-14 dk:grid-cols-[5fr_7fr]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
              PROCEDURE
            </span>
            <h2 className="mt-4 mb-0 text-[clamp(30px,4.6vw,52px)] leading-[1.22] font-extrabold tracking-[-0.03em]">
              두피에 심는 것이 아니라
              <br />
              모근을 그려 넣습니다
            </h2>
          </div>
          <p className="m-0 max-w-[520px] text-[15px] leading-[1.75] text-ink-soft">
            모근 하나 크기의 점을 두피 진피층에 하나씩 새깁니다.
            <br />
            탈모 범위와 두상, 기존 모발의 밀도에 따라 다섯 가지로 나누어
            작업합니다.
          </p>
        </div>

        <div className="split grid border-t border-ink/20 dk:grid-cols-[4fr_8fr]">
          <div
            role="tablist"
            aria-label="시술 종류"
            className="flex flex-col dk:border-r dk:border-ink/14"
          >
            {SERVICES.map((s, i) => (
              <button
                key={s.num}
                role="tab"
                aria-selected={i === active}
                aria-controls="service-detail"
                onClick={() => setActive(i)}
                className={`flex cursor-pointer items-start gap-4 border-0 border-b border-ink/14 py-[22px] pr-6 text-left transition-colors dk:pr-6 dk:pl-0 ${
                  i === active ? "bg-ink/6" : "bg-transparent hover:bg-ink/3"
                }`}
              >
                <span className="pt-[5px] font-mono text-[10.5px] tracking-[0.12em] text-steel-400">
                  {s.num}
                </span>
                <span className="flex flex-col gap-[5px]">
                  <span className="text-[17px] leading-[1.35] font-bold tracking-[-0.025em]">
                    {s.name}
                  </span>
                  <span className="text-[9.5px] font-semibold tracking-[0.22em] text-steel-400">
                    {s.en}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div id="service-detail" className="pt-8 dk:pl-10">
            <p className="mt-0 mb-1.5 font-mono text-[10px] tracking-[0.18em] text-steel-400">
              {svc.num} / {String(SERVICES.length).padStart(2, "0")}
            </p>
            <h3 className="m-0 text-[clamp(24px,3.2vw,34px)] leading-[1.3] font-extrabold tracking-[-0.03em]">
              {svc.name}
            </h3>
            <p className="mt-[18px] mb-0 max-w-[640px] text-[15px] leading-[1.75] text-ink-soft">
              {/* 데스크톱은 문장 단위로 줄을 끊는다 — 흘려 쓰면 "라인을 /
                  그립니다"처럼 구 중간에서 꺾인다. 모바일은 문장 하나도 한 줄에
                  안 들어가므로 br을 숨기고 자연 줄바꿈에 맡긴다. */}
              {svc.desc.split(/(?<=다\.)\s+/).map((sentence, i) => (
                <Fragment key={sentence}>
                  {i > 0 && (
                    <>
                      <br className="hidden dk:block" />{" "}
                    </>
                  )}
                  {sentence}
                </Fragment>
              ))}
            </p>
            <p className="mt-[22px] mb-0 max-w-[600px] border-l-2 border-ink pl-4 text-[16px] leading-[1.6] font-semibold tracking-[-0.02em]">
              {svc.quote}
            </p>

            <DragScroller label="시술 사진" className="mt-8 gap-3.5">
              {/* 시술 영상 — 스트립 맨 앞(대표 지시, 2026-08-04). 무음으로
                  흐르고, 누르면 소리 켜고 확대 재생. 폭은 사진 카드(4:5)와
                  높이가 같아지는 9:16 환산치(340×5/4×9/16≈239px)로 잡아
                  스트립 높이를 흔들지 않는다. */}
              {videos.map((v, i) => (
                <figure key={v.src} className="m-0 w-[min(55vw,239px)]">
                  <VideoCard
                    video={v}
                    suspended={videoOpen !== null}
                    onOpen={() => setVideoOpen(i)}
                    className="w-full border-ink/16 bg-ink/5"
                  />
                  <figcaption className="mt-2.5 text-[11.5px] tracking-[-0.01em] text-steel-600">
                    {v.label}
                  </figcaption>
                </figure>
              ))}
              {svc.shots.map((im) => {
                const idx = shots.findIndex((s) => s.src === im.src);
                const canOpen = idx !== -1;
                return (
                  <figure
                    key={im.src}
                    onClick={canOpen ? () => open(shots, idx) : undefined}
                    className={`m-0 w-[min(78vw,340px)] ${canOpen ? "cursor-zoom-in" : ""}`}
                  >
                    <Shot
                      media={im}
                      sizes="(max-width: 900px) 78vw, 340px"
                      className="border border-ink/16"
                    />
                    <figcaption className="mt-2.5 text-[11.5px] tracking-[-0.01em] text-steel-600">
                      {im.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </DragScroller>
          </div>
        </div>
      </ScrollReveal>

      <Lightbox lightbox={lightbox} onClose={close} onNavigate={navigate} />
      <VideoLightbox
        videos={videos}
        index={videoOpen}
        onClose={() => setVideoOpen(null)}
        onNavigate={(dir) =>
          setVideoOpen((prev) =>
            prev === null || videos.length === 0
              ? null
              : (prev + dir + videos.length) % videos.length,
          )
        }
      />
    </section>
  );
}
