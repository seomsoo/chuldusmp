"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/config/site";

const ANCHORS = [
  { href: "#services", label: "시술" },
  { href: "#gallery", label: "전후" },
  { href: "#reviews", label: "후기" },
  { href: "#about", label: "대표" },
  { href: "#network", label: "지점" },
  { href: "#academy", label: "아카데미" },
  { href: "#franchise", label: "가맹" },
  { href: "#location", label: "오시는 길" },
];

/** 이만큼 내려오기 전에는 숨기지 않는다 — 히어로 최상단에서 깜빡이는 것을 막는다. */
const HIDE_AFTER = 120;
/** 이보다 작은 움직임은 무시 — 관성 스크롤의 미세한 떨림으로 내비가 껌뻑이지 않게. */
const DELTA = 8;

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 앵커를 눌러 부드럽게 이동하는 동안에는 숨기지 않는다.
  // 스무스 스크롤 시간은 브라우저·거리마다 달라서 고정 시간으로 풀면 도중에 사라진다.
  // 대신 스크롤이 멎고 나서 풀어 준다.
  const hold = useRef(false);
  const holdTimer = useRef(0);

  const armRelease = useCallback(() => {
    clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => {
      hold.current = false;
    }, 160);
  }, []);

  const holdVisible = useCallback(() => {
    hold.current = true;
    setHidden(false);
    armRelease();
  }, [armRelease]);

  useEffect(() => {
    let last = Math.max(0, window.scrollY);
    let ticking = false;

    const read = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY); // 상단 바운스의 음수 값 방어
      setScrolled(y > 8);

      const dy = y - last;
      if (Math.abs(dy) < DELTA) return;
      last = y;

      if (hold.current) {
        armRelease();
        return;
      }
      setHidden(dy > 0 && y > HIDE_AFTER);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read(); // 새로고침으로 페이지 중간에서 시작하는 경우
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(holdTimer.current);
    };
  }, [armRelease]);

  return (
    <nav
      className={`nav-bar fixed inset-x-0 top-0 z-120 flex h-[58px] items-center justify-between border-b px-5 backdrop-blur-2xl backdrop-saturate-150 transition-[translate,background-color,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] dk:px-6 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        // 최상단에서는 어두운 히어로와의 명암만으로 경계가 서므로 선을 그리지 않는다.
        // 밝은 섹션으로 넘어가면 헤어라인 + 옅은 그림자로 바닥을 잡아 준다.
        scrolled
          ? "border-ink/10 shadow-[0_1px_24px_rgba(28,31,35,.07)]"
          : "border-transparent"
      } bg-[#f0f2f4]/90 supports-[backdrop-filter]:bg-[#f0f2f4]/72`}
    >
      <a
        href="#hero"
        onClick={holdVisible}
        className="flex items-baseline gap-2.5 text-[17px] font-extrabold tracking-[-0.03em] text-ink"
      >
        출두
        <span className="text-[9.5px] font-semibold tracking-[0.34em] text-steel-500">
          {SITE.brandEn}
        </span>
      </a>

      <div className="flex items-center gap-6 text-[13px] tracking-[-0.01em]">
        {ANCHORS.map((a) => (
          <a
            key={a.href}
            href={a.href}
            onClick={holdVisible}
            className="hidden text-ink-soft transition-colors hover:text-ink dk:inline"
          >
            {a.label}
          </a>
        ))}
        <a
          href="#consult"
          onClick={holdVisible}
          className="inline-block rounded-[2px] bg-ink px-[18px] py-[9px] text-[12.5px] font-bold text-page transition-colors hover:bg-night-lift"
        >
          무료 상담 예약
        </a>
      </div>
    </nav>
  );
}
