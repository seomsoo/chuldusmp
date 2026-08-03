"use client";

import { useState } from "react";
import Image from "next/image";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from "@/content/gallery";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox, { useLightbox } from "@/components/ui/Lightbox";
import DragMarquee from "@/components/ui/DragMarquee";
import VideoReel from "@/components/VideoReel";
import Shot, { openable } from "@/components/Shot";

// 전후 스트립에 인스타 카드를 끼우는 간격 — N장마다 한 장씩 지나간다.
const INSTA_CARD_EVERY = 5;

// 시술 계정 프로필 스크린샷 — 마퀴 카드와 하단 배너가 같이 쓴다.
// 캡처를 새로 받으면 파일명을 바꿔 교체할 것(dev 이미지 캐시가 같은 이름 교체를 못 본다).
const INSTA_SHOT = "/images/insta-backho-profile.jpg";
// 인스타 브랜드 그라데이션 — 이 두 곳(배지·배너 버튼) 전용. 사이트 토큰이 아니다.
const IG_GRADIENT = "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)]";

/** 전후 스트립 중간중간에 끼는 인스타 유도 카드. 사진 카드와 같은 4:5 규격. */
function InstaCard({ href, handle }: { href: string; handle: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mr-4 block w-[min(72vw,320px)] shrink-0 border border-night-text/14 bg-night-panel p-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={INSTA_SHOT}
          alt="출두 백호 인스타그램 프로필 — 시술 영상과 전후 기록"
          fill
          sizes="(max-width: 900px) 72vw, 320px"
          className="object-cover object-top"
        />
        {/* 배지는 오른쪽 위 — 왼쪽은 스크린샷의 계정명을 가린다 */}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] text-white ${IG_GRADIENT}`}
        >
          INSTAGRAM
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/65 to-transparent px-4 pt-16 pb-4">
          <p className="m-0 text-[16px] leading-[1.45] font-extrabold tracking-[-0.02em] text-night-head">
            시술 영상은
            <br />
            인스타그램에서
          </p>
          <p className="m-0 mt-2 flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.14em] text-steel-300">
            {handle}
            <ArrowUpRight size={13} />
          </p>
        </div>
      </div>
    </a>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("전체");
  const { lightbox, open, close, navigate } = useLightbox();

  const shown = GALLERY.filter(
    (g) => filter === "전체" || g.tags.includes(filter),
  );
  const openables = openable(shown);
  const igLink = SITE.links.instagramWork;
  const igHandle = igLink
    ? `@${new URL(igLink).pathname.replaceAll("/", "")}`
    : "";

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

        {/* 자동 흐름 + 드래그 스트립 (대표 요청, 2026-08-03) — 컨테이너(1240px)를
            뚫고 화면 끝까지 흘린다. 전후 사진은 멈춰서 들여다보는 검증 콘텐츠라
            드래그로 스크럽할 수 있어야 한다(놓으면 2초 뒤 재개, 호버 중 멈춤,
            카드 클릭 라이트박스 유지). N장마다 인스타 카드가 한 장씩 지나간다
            (대표 요청) — 흐름 속에서 "더 있다"는 신호를 반복 노출한다. */}
        <DragMarquee label="시술 전후 사진" className="mx-[calc(50%-50vw)]">
          {shown.flatMap((g, i) => {
            const idx = openables.findIndex((o) => o.src === g.src);
            const canOpen = idx !== -1;
            const cards = [
              <figure
                key={`${g.src}-${i}`}
                onClick={canOpen ? () => open(openables, idx) : undefined}
                className={`m-0 mr-4 w-[min(72vw,320px)] shrink-0 border border-night-text/14 bg-night-panel p-2 ${canOpen ? "cursor-zoom-in" : ""}`}
              >
                <Shot media={g} sizes="(max-width: 900px) 72vw, 320px" />
              </figure>,
            ];
            if (igLink && (i + 1) % INSTA_CARD_EVERY === 0) {
              cards.push(
                <InstaCard key={`ig-${i}`} href={igLink} handle={igHandle} />,
              );
            }
            return cards;
          })}
        </DragMarquee>

        {/* 시술 영상 릴 — 사진 스트립 바로 아래에서 무음 자동 재생으로 흐른다 */}
        <VideoReel />

        {/* 인스타 유도 배너 (대표 요청, 2026-08-03) — 스트립 직후, "더 보고
            싶다"는 순간에 시술 계정으로 보낸다. 배너 전체가 링크다. */}
        {igLink && (
          <a
            href={igLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-16 flex flex-col items-center gap-10 overflow-hidden border border-night-text/14 bg-night-panel px-6 py-12 dk:flex-row dk:gap-16 dk:px-16"
          >
            {/* 배경 글로우 — 인스타 그라데이션을 크게 흐려 깐다 */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,#ee2a7b_0%,#6228d7_60%,transparent_72%)] opacity-20 blur-3xl"
            />

            {/* 폰 목업 — 프로필 상단만 보여주고 아래로 페이드시켜 "이어진다"는 인상 */}
            <div className="relative w-[min(60vw,240px)] shrink-0 -rotate-2 transition-transform duration-500 group-hover:rotate-0">
              <div className="relative h-[330px] overflow-hidden rounded-[26px] border border-white/12 bg-night shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <Image
                  src={INSTA_SHOT}
                  alt="출두 백호 인스타그램 프로필 — 시술 영상과 전후 기록"
                  fill
                  sizes="(max-width: 900px) 60vw, 240px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-panel to-transparent" />
              </div>
            </div>

            <div className="relative text-center dk:text-left">
              <span className="font-mono text-[10px] font-bold tracking-[0.34em] text-steel-400">
                MORE ON INSTAGRAM
              </span>
              <p className="mt-4 mb-0 text-[clamp(22px,3.2vw,34px)] leading-[1.3] font-extrabold tracking-[-0.03em] text-night-head">
                시술 영상부터 비포·애프터까지,
                <br />
                인스타그램에 전부 준비되어 있습니다
              </p>
              <p className="mt-3 mb-0 text-[14px] leading-[1.7] text-steel-300">
                실시간으로 올라오는 시술 현장과 전후 기록을 지금 바로 확인하세요.
              </p>
              <span
                className={`mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-bold text-white transition-transform group-hover:scale-[1.03] ${IG_GRADIENT}`}
              >
                {igHandle} 보러 가기
                <ArrowUpRight size={15} />
              </span>
            </div>
          </a>
        )}

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
