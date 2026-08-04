"use client";

import { useState } from "react";
import {
  ACADEMY,
  ACADEMY_FACTS,
  GRADUATES,
  RECRUIT,
  WEEK9,
} from "@/content/academy";
import { ACADEMY_VIDEO } from "@/content/videos";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import VideoLightbox from "@/components/ui/VideoLightbox";
import DragScroller from "@/components/ui/DragScroller";
import Shot from "@/components/Shot";
import VideoCard from "@/components/VideoCard";

export default function Academy() {
  const { lightbox, open, close, navigate } = useLightbox();
  const [videoOpen, setVideoOpen] = useState<number | null>(null);

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

        {/* 커리큘럼 요약 영상 — 카드뉴스(상세)보다 먼저 나오는 80초 인트로
            (2026-08-04). 스트립 카드가 아니라 단독 플레이어인 이유: 6주 과정의
            한 항목이 아니라 아카데미 전체의 요약이라 스트립에 끼우면 위계가
            꼬인다. 밝은 배경에 세로 영상만 두면 옆이 비어 보여서, 히어로·본점
            카드와 같은 다크 면으로 감싼다 — 여백이 무드로 읽힌다.
            무음 미리보기로 돌다가 누르면 소리 켜고 확대 재생. */}
        <article className="relative mb-14 overflow-hidden border border-ink/16 bg-night text-night-text">
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(160deg,#23272C_0%,#1A1D21_55%,#2B2F35_100%)]"
          />
          <div aria-hidden className="scanlines absolute inset-0" />
          {/* 워터마크 — 오른쪽 빈 면을 채우는 디스플레이 타이포. 장식이므로
              스크린리더에서 숨긴다. */}
          <span
            aria-hidden
            className="font-display pointer-events-none absolute right-2 -bottom-7 hidden text-[clamp(90px,12vw,168px)] leading-none tracking-[0.06em] text-night-text/7 dk:block"
          >
            MASTER CLASS
          </span>
          <div className="relative flex flex-col gap-8 px-5 py-7 dk:flex-row dk:items-center dk:gap-14 dk:px-12 dk:py-10">
            {/* 모바일은 패널 안에서 가운데 정렬(인스타 배너와 같은 문법) —
                74vw 카드가 좌측에 붙으면 오른쪽만 뜨면서 흘린 것처럼 보인다. */}
            <VideoCard
              video={ACADEMY_VIDEO}
              suspended={videoOpen !== null}
              onOpen={() => setVideoOpen(0)}
              className="mx-auto w-[min(74vw,280px)] border-night-text/14 bg-night-panel dk:mx-0"
            />
            <div className="text-center dk:text-left">
              <span className="text-[10px] font-bold tracking-[0.34em] text-steel-400">
                ACADEMY FILM
              </span>
              <p className="mt-4 mb-0 text-[clamp(20px,2.6vw,30px)] leading-[1.35] font-extrabold tracking-[-0.03em] text-night-head">
                1:1 창업 교육 과정,
                <br />
                80초로 먼저 보세요
              </p>
              <p className="mt-3 mb-0 max-w-[440px] text-[14.5px] leading-[1.75] text-steel-300">
                실제 수업 현장과 주차별 커리큘럼을 담은 요약 영상입니다.
                <br />
                누르면 소리와 함께 크게 볼 수 있습니다.
              </p>
            </div>
          </div>
        </article>

        {/* 과정이 6주·9주 둘이라 스트립도 둘로 나눈다 — 같은 카드 폭(300px)으로
            동급 위계, 라벨(CURRICULUM · N주 과정)로만 구분한다. */}
        <div className="mb-[18px] flex items-baseline gap-3">
          <span className="text-[10px] font-bold tracking-[0.3em] text-steel-500">
            CURRICULUM
          </span>
          <span className="text-[13.5px] font-extrabold tracking-[-0.02em]">
            6주 과정
          </span>
        </div>
        <DragScroller label="아카데미 6주 과정 커리큘럼" className="gap-4">
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

        {WEEK9.length > 0 && (
          <div className="mt-12">
            <div className="mb-[18px] flex items-baseline gap-3">
              <span className="text-[10px] font-bold tracking-[0.3em] text-steel-500">
                CURRICULUM
              </span>
              <span className="text-[13.5px] font-extrabold tracking-[-0.02em]">
                9주 과정
              </span>
            </div>
            <DragScroller label="아카데미 9주 과정 커리큘럼" className="gap-4">
              {WEEK9.map((w, i) => (
                <figure
                  key={w.src}
                  onClick={() => open(WEEK9, i)}
                  className="m-0 w-[min(74vw,300px)] cursor-zoom-in"
                >
                  <Shot
                    media={w}
                    sizes="(max-width: 900px) 74vw, 300px"
                    className="border border-ink/16"
                  />
                </figure>
              ))}
            </DragScroller>
          </div>
        )}

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
                  className="m-0 cursor-zoom-in"
                >
                  {/* 모집 카드는 4:5와 1:1이 섞여 있다 — 폭을 고정하면 아랫단이
                      들쭉날쭉해서, 포스터 레일처럼 높이를 고정하고 폭이 비율을
                      따라오게 한다(크롭 없음). 높이 280은 커리큘럼(300px 폭,
                      375px 높이)보다 한 단계 작게 — 위계 유지. */}
                  <div
                    style={{ aspectRatio: `${r.width} / ${r.height}` }}
                    className="h-[min(75vw,280px)]"
                  >
                    <Shot
                      media={r}
                      sizes="(max-width: 900px) 75vw, 280px"
                      className="border border-ink/16"
                    />
                  </div>
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
      <VideoLightbox
        videos={[ACADEMY_VIDEO]}
        index={videoOpen}
        onClose={() => setVideoOpen(null)}
        onNavigate={() => {}}
      />
    </section>
  );
}
