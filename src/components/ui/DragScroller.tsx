"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * 가로 스크롤 스트립.
 *
 * 마우스만 있는 환경에서 가로 스크롤은 shift+휠을 알아야 해서 사실상 조작이 막힌다.
 * 그래서 세 경로를 함께 연다 — 잡아끌기(마우스), 좌우 버튼, 네이티브 스크롤.
 *
 * 드래그가 매끄럽게 느껴지려면 세 가지가 필요했다:
 *  1. 드래그 중 scroll-snap 끄기. 켜져 있으면 브라우저가 매 프레임 스냅 지점으로
 *     되돌리려 해서 손에 걸리는 느낌이 난다.
 *  2. 놓은 뒤 관성. 없으면 손을 떼는 순간 뚝 멈춰서 뻣뻣하게 느껴진다.
 *  3. scrollLeft 쓰기를 rAF로 모으고, 제스처 중에는 리렌더를 만들지 않기.
 *
 * 그 밖에:
 *  - 터치는 드래그를 가로채지 않는다. 네이티브 스크롤이 관성·바운스까지 있어 더 낫다.
 *  - 휠은 건드리지 않는다. 세로 휠을 가로로 바꾸면 스트립 위에서 페이지가 안 내려가
 *    갇힌 느낌을 준다.
 *  - 드래그로 끝난 포인터의 click은 삼킨다. 안 그러면 끌 때마다 라이트박스가 열린다.
 */
export default function DragScroller({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  /** 스크린리더가 읽을 영역 이름 */
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startLeft: 0,
    targetLeft: 0,
    lastX: 0,
    lastT: 0,
    vx: 0, // px/ms, 포인터 이동 방향
  });
  const raf = useRef(0);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflow(max > 1);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  // 사진이 늦게 로드되면서 스트립 폭이 바뀌므로 자식까지 관찰한다.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [sync]);

  const stopMomentum = () => cancelAnimationFrame(raf.current);

  const setSnap = (on: boolean) => {
    const el = ref.current;
    if (el) el.style.scrollSnapType = on ? "" : "none";
  };

  const page = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    stopMomentum();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    stopMomentum();
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      targetLeft: el.scrollLeft,
      lastX: e.clientX,
      lastT: e.timeStamp,
      vx: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = ref.current;
    if (!d.active || !el) return;

    const dx = e.clientX - d.startX;
    // 5px 넘게 움직여야 드래그로 인정 — 클릭이 미세하게 흔들려도 라이트박스는 열려야 한다.
    if (!d.moved) {
      if (Math.abs(dx) <= 5) return;
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      setSnap(false); // 스냅이 켜져 있으면 매 프레임 되돌려서 끌리는 느낌이 난다
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    }

    // 속도는 최근 이동분으로만 계산한다(놓는 순간의 손 속도에 가깝게).
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) {
      // 프레임 간격이 아주 짧게 잡히면 순간속도가 폭주하므로 상한을 둔다(px/ms).
      const inst = Math.max(-3, Math.min(3, (e.clientX - d.lastX) / dt));
      d.vx = d.vx * 0.7 + inst * 0.3; // 튀는 값 완화
      d.lastX = e.clientX;
      d.lastT = e.timeStamp;
    }

    d.targetLeft = d.startLeft - dx;
    if (!raf.current) {
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        el.scrollLeft = drag.current.targetLeft;
      });
    }
  };

  const startMomentum = (v0: number) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || Math.abs(v0) < 0.05) {
      setSnap(true);
      return;
    }
    let v = -v0; // 스크롤은 포인터와 반대 방향
    let last = performance.now();
    const max = el.scrollWidth - el.clientWidth;

    const step = (now: number) => {
      const dt = Math.min(now - last, 32); // 탭 전환 등으로 dt가 튀는 것 방지
      last = now;
      el.scrollLeft += v * dt;
      // 마찰(dt 보정 지수 감쇠). 0.995면 빠르게 튕겨도 0.9초 안에 멈춘다 —
      // 더 낮추면 손을 뗀 뒤 한참 미끄러져서 통제를 뺏긴 느낌이 난다.
      v *= Math.pow(0.995, dt);

      const stuck = el.scrollLeft <= 0 || el.scrollLeft >= max;
      if (Math.abs(v) > 0.03 && !stuck) {
        raf.current = requestAnimationFrame(step);
      } else {
        raf.current = 0;
        setSnap(true);
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = ref.current;
    if (!d.active) return;
    d.active = false;

    if (d.moved && el) {
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
      el.style.userSelect = "";
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      el.scrollLeft = d.targetLeft;
      startMomentum(d.vx);
    }
    // d.moved는 뒤따라오는 click을 막은 뒤 해제한다(아래 onClickCapture).
    // 포인터를 밖에서 떼 click이 안 오는 경우는 다음 pointerdown이 초기화한다.
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (!drag.current.moved) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current.moved = false;
  };

  const arrow =
    "absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ink/16 bg-page/92 text-ink shadow-[0_2px_10px_rgba(28,31,35,.10)] backdrop-blur transition hover:bg-page disabled:pointer-events-none disabled:opacity-0 dk:flex";

  return (
    <div className="relative">
      <div
        ref={ref}
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={sync}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onWheel={stopMomentum}
        // 사진 위에서 끌면 브라우저 기본 이미지 드래그가 먼저 잡아채므로 막는다.
        onDragStart={(e) => e.preventDefault()}
        className={`hs cursor-grab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/40 ${className}`}
      >
        {children}
      </div>

      {overflow && (
        <>
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label={`${label} 이전으로`}
            className={`${arrow} left-1`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label={`${label} 다음으로`}
            className={`${arrow} right-1`}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}
