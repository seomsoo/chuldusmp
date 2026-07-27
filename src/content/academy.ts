import { ACADEMY_IMAGES } from "./images";
import { pick, type Media } from "./media";

// 수업 조건은 academy-curriculum-01 카드에 적힌 내용과 일치시킨 값이다.
export const ACADEMY_FACTS: { v: string; k: string }[] = [
  { v: "1일 4시간 · 총 6주", k: "수업 일정" },
  { v: "최대 2명", k: "소수정예 정원" },
  { v: "올인원 부자재 전량 포함", k: "교육 비용" },
  { v: "월 2기수", k: "개강 주기" },
];

export interface AcademyCard extends Media {
  step: string;
  title: string;
}

const STEPS: [string, string][] = [
  ["00", "과정 개요"],
  ["01", "1주차 · 이론과 기기"],
  ["02", "2주차 · 라인 디자인"],
  ["03", "3주차 · 밀도와 음영"],
  ["04", "데모 실습 1"],
  ["05", "데모 실습 2"],
  ["06", "데모 실습 3"],
  ["07", "수료"],
];

export const ACADEMY: AcademyCard[] = STEPS.map(([step, title], i) => ({
  ...pick(
    ACADEMY_IMAGES,
    `academy-curriculum-${String(i + 1).padStart(2, "0")}`,
    title,
  ),
  step,
  title,
}));
