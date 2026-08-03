import {
  BEFORE_AFTER_IMAGES,
  PROCEDURE_IMAGES,
  type SiteImage,
} from "./images";
import { pick, type Media } from "./media";

// 전후 사진은 초상권 동의 게이트(SITE.consent.beforeAfterPhotos)를 통과해야 실사진으로 렌더된다.
//
// 필터 축은 둘이다:
// - 부위: 카탈로그의 group 태그(hairline / crown / part-line)를 라벨로 옮긴다.
// - 성별: 카탈로그의 gender 태그 — "여성" 필터(대표 요청, 2026-08-03)가 읽는다.
// 사진을 더 넣어도 images.ts에 group(+여성이면 gender)만 달아두면 목록이 자동으로 따라온다.
const GROUP_LABEL: Record<string, "헤어라인" | "정수리·가르마"> = {
  hairline: "헤어라인",
  crown: "정수리·가르마",
  "part-line": "정수리·가르마",
};

export const GALLERY_CATEGORIES = [
  "전체",
  "헤어라인",
  "정수리·가르마",
  "여성",
] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem extends Media {
  /** "전체"를 제외한, 이 사진이 걸리는 필터 목록. */
  tags: GalleryCategory[];
}

// 여성 가르마 전후 비교 5장(2026-08-03 수령) — 시술 섹션(02 가르마 라인)과 파일을 공유한다.
// 같은 묶음의 표지·설명·시술 장면 카드(17·18·20)는 전후 "기록"이 아니라서 넣지 않는다.
const FEMALE_PART_LINE: readonly SiteImage[] = [21, 22, 23, 24, 25].map((n) =>
  pick(PROCEDURE_IMAGES, `procedure-part-line-${n}`),
);

export const GALLERY: GalleryItem[] = [
  ...BEFORE_AFTER_IMAGES,
  ...FEMALE_PART_LINE,
].flatMap((img) => {
  const label = GROUP_LABEL[img.group ?? ""];
  if (!label) return [];
  const tags: GalleryCategory[] = [label];
  if (img.gender === "female") tags.push("여성");
  return [{ ...img, caption: `${label} · 시술 전후 기록`, tags }];
});
