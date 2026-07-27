import type { SiteImage } from "./images";

// 이미지의 경로·실측 크기·alt는 전부 `images.ts` 카탈로그가 단일 출처다.
// 섹션 데이터 파일은 여기 헬퍼로 카탈로그에서 꺼내 쓰고, 캡션만 얹는다.
// (크기를 손으로 옮겨 적으면 카탈로그와 어긋나 크롭·레이아웃 시프트가 생긴다.)

export interface Media extends SiteImage {
  /** 사진 아래 표시할 설명. 빈 문자열이면 캡션을 렌더하지 않는다. */
  caption: string;
}

/**
 * 카탈로그에서 파일명(확장자 제외)으로 한 장을 꺼내 캡션을 붙인다.
 * 없는 이름이면 즉시 throw — 오타가 빌드에서 걸리고, 깨진 <img>로 배포되지 않는다.
 */
export function pick(
  list: readonly SiteImage[],
  file: string,
  caption = "",
): Media {
  const found = list.find((i) => i.src.endsWith(`/${file}.webp`));
  if (!found) {
    throw new Error(`images.ts 카탈로그에 없는 이미지입니다: ${file}`);
  }
  return { ...found, caption };
}

/** 카탈로그의 group 태그로 묶음을 꺼낸다. */
export function pickGroup(
  list: readonly SiteImage[],
  groupName: string,
): readonly SiteImage[] {
  return list.filter((i) => i.group === groupName);
}

/** 전후 사진 여부 — 초상권 동의 게이트(SITE.consent.beforeAfterPhotos)의 판정 기준. */
export function isBeforeAfter(src: string): boolean {
  return src.startsWith("/images/before-after/");
}
