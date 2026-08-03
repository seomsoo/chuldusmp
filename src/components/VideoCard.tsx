"use client";

import { useEffect, useRef, useState } from "react";
import type { ProcedureVideo } from "@/content/videos";

/**
 * 시술 영상 카드 한 장 — 스트립 위에서 무음 루프로 자동 재생된다.
 * 영상 릴(VideoReel)과 시술 카드 스트립(Services)이 함께 쓴다 —
 * 폭·여백·테두리색은 놓이는 스트립이 className으로 정한다.
 *
 * 재생은 "화면에 보이는 동안"만: 카드가 뷰포트에서 나가면 멈춘다.
 * 스트립에 여러 장이 있어도 실제로 디코딩되는 건 화면에 떠 있는 몇 개뿐이라
 * 저사양 모바일에서도 발열·버벅임이 없다. (대표 방식 합의, 2026-08-03)
 */
export default function VideoCard({
  video,
  suspended,
  onOpen,
  className = "",
}: {
  video: ProcedureVideo;
  /** 확대 뷰가 열려 있는 동안 스트립 재생을 쉬게 한다 */
  suspended: boolean;
  onOpen: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (visible && !suspended && !reduced) {
      // 자동재생이 막힌 환경(저전력 모드 등)에서는 포스터가 그대로 남는다
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [visible, suspended]);

  return (
    <button
      onClick={onOpen}
      aria-label={`${video.label} 소리 켜고 크게 보기`}
      className={`block shrink-0 cursor-pointer overflow-hidden border p-0 text-left ${className}`}
    >
      {/* preload="none": metadata로 두면 크롬이 화면 밖 카드까지 수십 MB를
          앞당겨 버퍼링한다(실측: 첫 로드 47MB). 포스터가 첫 화면을 책임지고,
          영상 데이터는 보여서 play()될 때 그때 받는다. */}
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        className="aspect-[9/16] w-full object-cover"
      />
    </button>
  );
}
