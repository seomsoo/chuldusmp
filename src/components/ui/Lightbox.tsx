"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

interface LightboxState {
  items: LightboxImage[];
  index: number;
}

export function useLightbox() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const open = useCallback((items: LightboxImage[], index = 0) => {
    setLightbox({ items, index });
  }, []);

  const close = useCallback(() => setLightbox(null), []);

  const navigate = useCallback((dir: -1 | 1) => {
    setLightbox((prev) => {
      if (!prev) return null;
      const next = (prev.index + dir + prev.items.length) % prev.items.length;
      return { ...prev, index: next };
    });
  }, []);

  return { lightbox, open, close, navigate };
}

export default function Lightbox({
  lightbox,
  onClose,
  onNavigate,
}: {
  lightbox: LightboxState | null;
  onClose: () => void;
  onNavigate: (dir: -1 | 1) => void;
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isOpen = !!lightbox;

  // ESC/화살표 키 조작 + 뒤 배경 스크롤 잠금
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, onNavigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    onNavigate(dx < 0 ? 1 : -1);
  };

  const item = lightbox?.items[lightbox.index];
  const many = (lightbox?.items.length ?? 0) > 1;

  return (
    <AnimatePresence>
      {lightbox && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="사진 크게 보기"
          className="fixed inset-0 z-200 flex cursor-zoom-out flex-col items-center justify-center bg-night-deep/95 px-3 py-10 backdrop-blur-sm"
        >
          <button
            onClick={onClose}
            aria-label="닫기"
            className="absolute top-4 right-4 z-10 cursor-pointer p-2 text-steel-400 transition-colors hover:text-night-head"
          >
            <X size={26} />
          </button>

          <div
            className="flex max-w-full items-center gap-3"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {many && (
              <button
                onClick={() => onNavigate(-1)}
                aria-label="이전 사진"
                className="hidden cursor-pointer rounded-full border border-night-text/20 p-3 text-steel-300 transition-colors hover:bg-night-text/10 hover:text-night-head dk:block"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <motion.figure
              key={item.src}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="m-0 flex min-w-0 cursor-default flex-col items-center"
            >
              {/* 확대 크기 상한 — 190px는 위아래 패딩 + 캡션 + ESC 줄 몫이다.
                  72vh로 뒀더니 "확대해도 안 커진다"는 피드백이 왔다(4:5 사진이
                  데스크톱 화면 높이의 72%, 모바일에선 52%까지밖에 못 컸다).
                  svh: 모바일 주소창이 줄어들 때 튀지 않게. */}
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 900px) 96vw, 1000px"
                className="h-auto max-h-[calc(100svh-190px)] w-auto max-w-[min(96vw,1000px)] border border-night-text/20 object-contain"
              />
              {item.caption && (
                <figcaption className="mt-4 max-w-[620px] text-center text-[13px] leading-relaxed text-steel-300">
                  {item.caption}
                </figcaption>
              )}
              <span className="mt-3 font-mono text-[10.5px] tracking-[0.2em] text-steel-600">
                {many ? `${lightbox.index + 1} / ${lightbox.items.length} · ` : ""}
                ESC TO CLOSE
              </span>
            </motion.figure>

            {many && (
              <button
                onClick={() => onNavigate(1)}
                aria-label="다음 사진"
                className="hidden cursor-pointer rounded-full border border-night-text/20 p-3 text-steel-300 transition-colors hover:bg-night-text/10 hover:text-night-head dk:block"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
