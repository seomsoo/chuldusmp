import { BEFORE_AFTER_IMAGES } from "./images";
import type { Media } from "./media";

// 전후 사진은 초상권 동의 게이트(SITE.consent.beforeAfterPhotos)를 통과해야 실사진으로 렌더된다.
//
// 필터는 카탈로그의 group 태그(hairline / crown)를 그대로 쓴다. 사진을 더 넣어도
// images.ts에 group만 달아두면 목록이 자동으로 따라온다.
//
// 디자인 v5에는 "여성" 필터가 하나 더 있었지만 성별 태그가 카탈로그에 없어 넣지 않았다.
// (여성 케이스는 현재 crown 그룹 안에 섞여 있다 — 대표 확인 후 태그를 추가하면 필터도 늘릴 수 있다.)
const GROUP_LABEL = {
  hairline: "헤어라인",
  crown: "정수리·가르마",
} as const;

export const GALLERY_CATEGORIES = [
  "전체",
  ...Object.values(GROUP_LABEL),
] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem extends Media {
  tag: (typeof GROUP_LABEL)[keyof typeof GROUP_LABEL];
}

export const GALLERY: GalleryItem[] = BEFORE_AFTER_IMAGES.flatMap((img) => {
  const label = GROUP_LABEL[img.group as keyof typeof GROUP_LABEL];
  if (!label) return [];
  return [{ ...img, caption: `${label} · 시술 전후 기록`, tag: label }];
});
