"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

// 탭과 드래그를 가르는 이동량(px). 이 안쪽이면 클릭으로 흘려보낸다.
const DRAG_THRESHOLD = 6;

interface DragMarqueeProps {
  children: ReactNode;
  /** 자동 흐름 속도(px/s). prefers-reduced-motion에서는 0으로 취급한다. */
  speed?: number;
  /** 드래그·터치를 놓은 뒤 자동 흐름을 재개하기까지 대기(ms). */
  resumeDelayMs?: number;
  className?: string;
  /** 리더기용 영역 이름 */
  label?: string;
}

/**
 * 드래그로 스크럽할 수 있는 무한 자동 흐름 스트립.
 *
 * CSS 애니메이션 기반 Marquee와 달리 위치를 rAF로 직접 굴린다 —
 * 자동으로 흐르다가 드래그하면 그 자리에서 손을 따라오고, 놓으면 관성으로
 * 미끄러진 뒤 resumeDelayMs 후 다시 흐른다. 데스크톱은 호버 중에도 멈춘다.
 *
 * children 묶음을 뷰포트를 덮을 만큼 복제해 이음새 없이 감는다(복제분은
 * aria-hidden). 묶음 폭이 뷰포트보다 좁아도 복제 수가 늘어나 빈 구간이 없다.
 */
export default function DragMarquee({
  children,
  speed = 42,
  resumeDelayMs = 2000,
  className,
  label,
}: DragMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  // 프레임마다 바뀌는 값은 전부 ref — 리렌더 없이 rAF 루프에서만 다룬다.
  const offset = useRef(0); // 현재 위치. [0, 묶음 폭)으로 감는다
  const momentum = useRef(0); // 놓은 직후의 관성 속도(px/s)
  const vel = useRef(0); // 드래그 중 손가락 속도 추정치(EMA)
  const autoFactor = useRef(0); // 자동 흐름 페이드인 계수(0~1)
  const dragging = useRef(false);
  const captured = useRef(false);
  const hovering = useRef(false);
  const resumeAt = useRef(0);
  const moved = useRef(0);
  const lastX = useRef(0);
  const lastMoveTime = useRef(0);

  // 묶음 폭이 뷰포트보다 좁으면 복제 수를 늘려 감김 구간의 빈 화면을 막는다.
  useEffect(() => {
    const copy = copyRef.current;
    const container = containerRef.current;
    if (!copy || !container) return;
    const update = () => {
      const w = copy.offsetWidth;
      const vw = container.clientWidth;
      if (w > 0 && vw > 0) setCopies(Math.max(2, Math.ceil(vw / w) + 1));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(copy);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!track || !copy) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // 탭 전환 등으로 프레임이 크게 벌어져도 내용물이 점프하지 않게 dt를 자른다
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const w = copy.offsetWidth;
      if (w > 0) {
        if (!dragging.current) {
          const wantAuto =
            !hovering.current && now >= resumeAt.current && !reduced.matches;
          // 재개할 때 갑자기 출발하지 않도록 속도를 짧게 페이드인한다
          autoFactor.current +=
            ((wantAuto ? 1 : 0) - autoFactor.current) * Math.min(1, dt * 5);
          offset.current += (speed * autoFactor.current + momentum.current) * dt;
          momentum.current *= Math.exp(-dt / 0.325); // iOS 감속 곡선에 맞춘 시정수
          if (Math.abs(momentum.current) < 2) momentum.current = 0;
        }
        offset.current = ((offset.current % w) + w) % w;
        track.style.transform = `translate3d(${-offset.current}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    captured.current = false;
    momentum.current = Math.max(-2500, Math.min(2500, vel.current));
    vel.current = 0;
    autoFactor.current = 0;
    resumeAt.current = performance.now() + resumeDelayMs;
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging.current = true;
    captured.current = false;
    moved.current = 0;
    momentum.current = 0;
    vel.current = 0;
    lastX.current = e.clientX;
    lastMoveTime.current = performance.now();
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dtSec = Math.max(now - lastMoveTime.current, 1) / 1000;
    lastX.current = e.clientX;
    lastMoveTime.current = now;
    moved.current += Math.abs(dx);
    // 데드존 안쪽은 스크럽하지 않는다 — 탭할 때 미세하게 떨려도 클릭이 살아야 한다.
    // 캡처를 데드존 통과 후에만 잡는 이유: pointerdown에서 바로 잡으면 클릭
    // 이벤트가 컨테이너로 합성돼 카드 클릭(라이트박스·링크)이 전부 죽는다.
    if (moved.current <= DRAG_THRESHOLD) return;
    if (!captured.current) {
      e.currentTarget.setPointerCapture(e.pointerId);
      captured.current = true;
    }
    offset.current -= dx; // 감기는 rAF 쪽 modulo가 처리한다
    vel.current = 0.8 * vel.current + 0.2 * (-dx / dtSec);
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={label}
      className={`cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing ${className ?? ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hovering.current = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") hovering.current = false;
      }}
      onClickCapture={(e) => {
        // 드래그 끝에 발생하는 클릭은 카드로 보내지 않는다
        if (moved.current > DRAG_THRESHOLD) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }, (_, c) => (
          <div
            key={c}
            ref={c === 0 ? copyRef : undefined}
            className="flex shrink-0"
            aria-hidden={c > 0 || undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
