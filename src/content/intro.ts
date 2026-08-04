import { INTRO_IMAGES } from "./images";
import { pick, type Media } from "./media";

// 히어로 아래 인트로 스트립 — 대표 제작 카드뉴스 4장(2026-08-04 수령).
// 순서는 대표가 만든 번호 그대로: 소개 → 전후 모음 → 과정 1 → 과정 2.
const i = (file: string, caption: string) => pick(INTRO_IMAGES, file, caption);

export const INTRO_CARDS: Media[] = [
  i("intro-card-01", "브랜드 소개 — 두피문신과 스타일링"),
  i("intro-card-02", "시술 전후 모음"),
  i("intro-card-03", "시술 과정 01–03 · 상담부터 디자인까지"),
  i("intro-card-04", "시술 과정 04–05 · 작업과 스타일링"),
];
