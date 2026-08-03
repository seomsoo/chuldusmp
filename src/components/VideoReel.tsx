"use client";

import { useState } from "react";
import { PROCEDURE_VIDEOS } from "@/content/videos";
import DragMarquee from "@/components/ui/DragMarquee";
import VideoLightbox from "@/components/ui/VideoLightbox";
import VideoCard from "@/components/VideoCard";

/**
 * 시술 영상 릴 — 전후 사진 스트립 바로 아래, 같은 리듬으로 흐르는
 * 영상 전용 레일(대표 요청, 2026-08-03). 영상은 시청 콘텐츠라 사진보다
 * 흐름을 늦춘다. 카드를 누르면 확대 뷰에서 소리 켜고 전체 재생.
 */
export default function VideoReel() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (PROCEDURE_VIDEOS.length === 0) return null;

  return (
    <>
      {/* 별도 헤더 없이 사진 스트립 아래 바로 잇는다 — 라벨·안내 문구는
          과하다고 빠졌다(대표 확인, 2026-08-04). 간격은 FOUNDER의
          포스터→영상 줄과 같은 40px — 24px는 사진 줄에 붙어 보였다. */}
      <DragMarquee
        label="시술 영상"
        speed={30}
        className="mx-[calc(50%-50vw)] mt-10"
      >
        {PROCEDURE_VIDEOS.map((v, i) => (
          <VideoCard
            key={v.src}
            video={v}
            suspended={openIndex !== null}
            onOpen={() => setOpenIndex(i)}
            className="mr-4 w-[min(58vw,250px)] border-night-text/14 bg-night-panel"
          />
        ))}
      </DragMarquee>
      <VideoLightbox
        videos={PROCEDURE_VIDEOS}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(dir) =>
          setOpenIndex((prev) =>
            prev === null
              ? null
              : (prev + dir + PROCEDURE_VIDEOS.length) %
                PROCEDURE_VIDEOS.length,
          )
        }
      />
    </>
  );
}
