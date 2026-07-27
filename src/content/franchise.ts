import { FRANCHISE_IMAGES } from "./images";
import { pick, type Media } from "./media";

export const FLAGSHIP_SPECS: { k: string; v: string }[] = [
  { k: "운영 기준", v: "강남본점 동일 프로토콜" },
  { k: "부자재", v: "본점 공급 · 단가 동일" },
  { k: "교육", v: "마스터 아카데미 6주 과정" },
];

// 캡션은 각 브로슈어 페이지의 실제 내용을 확인해 붙였다.
// (디자인 v5의 franchise-brochure-0N 캡션은 실제 파일 내용과 어긋나 있었다.)
export const FRANCHISE_BROCHURE: Media[] = [
  pick(FRANCHISE_IMAGES, "franchise-intro-01", "브랜드 소개"),
  pick(FRANCHISE_IMAGES, "franchise-branches-02", "지점 현황"),
  pick(FRANCHISE_IMAGES, "franchise-representative-03", "대표 원장 이력"),
  pick(FRANCHISE_IMAGES, "franchise-benefits-04", "가맹점 혜택"),
  pick(FRANCHISE_IMAGES, "franchise-branches-05", "가맹 원장 모집"),
  pick(FRANCHISE_IMAGES, "franchise-directions-06", "본점 위치 안내"),
];
