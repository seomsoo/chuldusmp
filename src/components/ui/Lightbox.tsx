"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxState {
  images: string[];
  index: number;
}

export function useLightbox() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const open = useCallback((images: string[], index = 0) => {
    setLightbox({ images, index });
  }, []);

  const close = useCallback(() => {
    setLightbox(null);
  }, []);

  const navigate = useCallback((dir: -1 | 1) => {
    setLightbox((prev) => {
      if (!prev) return null;
      const next = (prev.index + dir + prev.images.length) % prev.images.length;
      return { ...prev, index: next };
    });
  }, []);

  return { lightbox, open, close, navigate };
}

export default function Lightbox({
  lightbox,
  onClose,
  onNavigate,
  alt = "시술 사진",
}: {
  lightbox: LightboxState | null;
  onClose: () => void;
  onNavigate: (dir: -1 | 1) => void;
  alt?: string;
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;

    onNavigate(dx < 0 ? 1 : -1);
  };

  return (
    <AnimatePresence>
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 lg:p-5"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 text-white/60 transition-colors hover:text-white"
            aria-label="닫기"
          >
            <X size={28} />
          </button>

          <div
            className="flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {lightbox.images.length > 1 && (
              <button
                onClick={() => onNavigate(-1)}
                className="hidden cursor-pointer rounded-full bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white lg:block"
                aria-label="이전"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            <motion.div
              key={lightbox.images[lightbox.index]}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[90vh] max-w-[96vw] lg:max-h-[90vh] lg:max-w-[85vw]"
            >
              <Image
                src={lightbox.images[lightbox.index]}
                alt={alt}
                width={1200}
                height={900}
                className="h-auto max-h-[90vh] w-auto rounded-sm object-contain"
                sizes="(max-width: 1024px) 96vw, 80vw"
              />
              <p className="mt-2 text-center text-xs text-text-muted lg:mt-3">
                {lightbox.index + 1} / {lightbox.images.length}
              </p>
            </motion.div>

            {lightbox.images.length > 1 && (
              <button
                onClick={() => onNavigate(1)}
                className="hidden cursor-pointer rounded-full bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white lg:block"
                aria-label="다음"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
