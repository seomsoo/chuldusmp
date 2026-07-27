"use client";

import { useEffect, useRef } from "react";

/**
 * 히어로 배경 영상.
 *
 * 소리 없이 반복 재생하는 장식용 배경이라 접근성 트리에서 숨긴다.
 * 동작 최소화(prefers-reduced-motion)를 켠 사용자에게는 재생을 멈추고
 * poster 한 장만 남긴다 — CSS로는 자동재생을 막을 수 없어 여기서 처리한다.
 */
export default function HeroVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (motion.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        // 자동재생이 정책으로 막히면 poster가 그대로 남는다 — 실패를 삼킨다.
        void video.play().catch(() => {});
      }
    };

    apply();
    motion.addEventListener("change", apply);
    return () => motion.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className={className}
    />
  );
}
