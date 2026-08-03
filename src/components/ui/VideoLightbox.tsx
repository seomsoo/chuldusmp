"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxVideo {
  src: string;
  poster: string;
  label: string;
}

/**
 * 영상 확대 뷰 — 이미지 Lightbox와 같은 문법(백드롭 클릭·ESC 닫기, 화살표
 * 이동, 배경 스크롤 잠금)을 따르되 한 편씩 소리 켜고 재생한다.
 * 레일에서는 무음 미리보기, 여기서는 사용자가 직접 열었으니 소리 허용.
 */
export default function VideoLightbox({
  videos,
  index,
  onClose,
  onNavigate,
}: {
  videos: LightboxVideo[];
  /** null이면 닫힘 */
  index: number | null;
  onClose: () => void;
  onNavigate: (dir: -1 | 1) => void;
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isOpen = index !== null;

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

  const video = index !== null ? videos[index] : null;
  const many = videos.length > 1;

  return (
    <AnimatePresence>
      {video && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="시술 영상 크게 보기"
          className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-night-deep/95 px-3 py-8 backdrop-blur-sm"
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
                aria-label="이전 영상"
                className="hidden cursor-pointer rounded-full border border-night-text/20 p-3 text-steel-300 transition-colors hover:bg-night-text/10 hover:text-night-head dk:block"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <motion.figure
              key={video.src}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="m-0 flex min-w-0 flex-col items-center"
            >
              {/* 9:16 세로 영상 — 높이 기준으로 맞추고 폭은 따라온다.
                  key로 src를 걸어 이동할 때마다 엘리먼트를 새로 만든다
                  (같은 <video>의 src 교체는 이전 재생 상태가 끌려온다). */}
              <video
                src={video.src}
                poster={video.poster}
                controls
                autoPlay
                playsInline
                aria-label={video.label}
                className="max-h-[calc(100svh-150px)] w-auto max-w-[96vw] border border-night-text/20 bg-black"
              />
              <span className="mt-3 font-mono text-[10.5px] tracking-[0.2em] text-steel-600">
                ESC TO CLOSE
              </span>
            </motion.figure>

            {many && (
              <button
                onClick={() => onNavigate(1)}
                aria-label="다음 영상"
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
