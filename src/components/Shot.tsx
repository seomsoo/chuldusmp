import Image from "next/image";
import { SITE } from "@/config/site";
import { isBeforeAfter, type Media } from "@/content/media";

/**
 * 초상권 동의 게이트에 걸려 실사진을 못 쓰는 상태인지.
 * SITE.consent.beforeAfterPhotos 를 false로 되돌리면 전후 사진이 전부 플레이스홀더로 바뀐다.
 */
export function isRedacted(media: Media): boolean {
  return isBeforeAfter(media.src) && !SITE.consent.beforeAfterPhotos;
}

/** 라이트박스에 넘길 목록 — 게이트에 걸린 사진은 확대해봐야 볼 것이 없으므로 제외한다. */
export function openable(list: Media[]): Media[] {
  return list.filter((m) => !isRedacted(m));
}

function assetId(src: string): string {
  return src.split("/").pop()?.replace(/\.\w+$/, "") ?? "";
}

/**
 * 사진 한 장. 원본 비율 그대로 렌더하므로 잘리지 않는다.
 * 게이트에 걸리면 같은 비율의 스틸 플레이스홀더로 대체돼 레이아웃이 흔들리지 않는다.
 */
export default function Shot({
  media,
  sizes,
  className = "",
}: {
  media: Media;
  /** next/image sizes — 레이아웃에 맞춰 반드시 지정한다. */
  sizes: string;
  className?: string;
}) {
  if (isRedacted(media)) {
    return (
      <div
        style={{ aspectRatio: `${media.width} / ${media.height}` }}
        className={`steel-plate flex items-end border border-ink/16 p-3 ${className}`}
      >
        <span className="font-mono text-[9.5px] tracking-[0.08em] text-steel-600">
          {assetId(media.src)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      loading="lazy"
      className={`h-auto w-full ${className}`}
    />
  );
}
