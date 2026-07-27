import { CAREER_IMAGES, CEO_IMAGES } from "./images";
import { pick, type Media } from "./media";

export const FOUNDER = {
  name: "백호",
  role: "출두SMP 대표 · 강남본점 대표원장",
  tagline: "정통 SMP 1세대 테크니션",
  regions: "KOREA · CHINA · VIETNAM · INDONESIA · MALAYSIA · UNITED KINGDOM",
  portrait: pick(CEO_IMAGES, "ceo-portrait-03"),
};

export const CAREERS: string[] = [
  "IBS 국제표준 뷰티융합총연합회 강남지회장 · IBS17024 국제표준기구 총괄운영위원장",
  "K-ART 메이크업협회 SMP 부회장 · 기획위원장",
  "고려대학교 뷰티최고 전문가과정 특임강사",
  "연세대학교 K-BEAUTY 최고위과정 특임강사",
  "KART FAIR 국제대회 SMP 심사위원장 (2025, KINTEX)",
  "Global Beauty Industry Competition 공동위원장 (2024·2025, 광저우)",
  "Kingdom Beauty Crown 온라인 챔피언십 심사위원 (London 2026)",
];

export const POSTERS: Media[] = [
  pick(
    CAREER_IMAGES,
    "ceo-career-global-competition-poster-14",
    "Global Beauty Industry Competition · 광저우",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-global-competition-poster-15",
    "Global Beauty Industry Competition · 광저우",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-kart-fair-judge-06",
    "KART FAIR 국제대회 SMP 심사위원장 · KINTEX",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-korea-univ-course-07",
    "고려대학교 뷰티최고 전문가과정",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-yonsei-course-01",
    "연세대학교 K-BEAUTY 최고위과정",
  ),
];
