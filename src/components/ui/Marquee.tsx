"use client";

import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  /** 호버(데스크톱)·터치 누름(모바일) 동안 흐름을 멈춘다 — 움직이는 카드를 누를 수 있게. */
  pauseOnHover?: boolean;
  /** 한 바퀴 도는 시간(초). 미지정이면 토큰 기본값(40s). 콘텐츠가 길수록 크게 줄 것. */
  durationSec?: number;
}

export default function Marquee({
  children,
  reverse = false,
  className,
  pauseOnHover = true,
  durationSec,
}: MarqueeProps) {
  return (
    <div className={`marquee group overflow-hidden ${className ?? ""}`}>
      <div
        style={
          durationSec ? { animationDuration: `${durationSec}s` } : undefined
        }
        className={`flex w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } ${
          pauseOnHover
            ? "group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]"
            : ""
        }`}
      >
        <div className="flex">{children}</div>
        {/* 이음새용 복제 절반 — 시각 전용이라 리더기에서 숨긴다. reduced-motion에서는
            globals.css가 이 절반을 치우고 컨테이너를 가로 스크롤로 되돌린다. */}
        <div className="flex" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
