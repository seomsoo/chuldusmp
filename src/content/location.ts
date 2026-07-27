import { FRANCHISE_IMAGES } from "./images";
import { pick, type Media } from "./media";

export const DIRECTIONS: { k: string; v: string }[] = [
  { k: "WALK", v: "압구정로데오역 4번 출구 직진 → 버거킹에서 좌회전" },
  { k: "PARK", v: "발렛 30분 5,000원 (최대 25,000원)" },
  { k: "NOTE", v: "주차 공간이 넉넉하지 않아 대중교통 이용을 권해드립니다" },
];

/** 약도 카드 — 지도·건물 외관·도보 안내가 한 장에 들어 있다. */
export const DIRECTIONS_CARD: Media = pick(
  FRANCHISE_IMAGES,
  "franchise-directions-06",
  "압구정로데오역 4번 출구에서 본점까지 · 약도와 건물 외관",
);
