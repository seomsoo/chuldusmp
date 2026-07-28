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

// career 폴더 15장 전부. 프로필 카드 2장(profile-02·03)은 이미지 안에
// 구 명칭 "청담본점"이 인쇄되어 있다 — 2026-07-28 사용자 결정으로 포함.
// 본점 명칭 문제가 제기되면 이 두 장부터 확인할 것.
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
    "ceo-career-global-competition-photo-11",
    "Global Beauty Industry Competition 시상식 · 광저우",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-global-competition-photo-12",
    "Global Beauty Industry Competition 현장 · 광저우",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-kart-fair-judge-06",
    "KART FAIR 국제대회 SMP 심사위원장 · KINTEX",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-kart-seminar-05",
    "KART 주관 SMP 세미나 연사",
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
  pick(
    CAREER_IMAGES,
    "ceo-career-ibs-committee-04",
    "IBS 국제표준 평가대회 총괄 운영위원장",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-championship-judge-08",
    "Kingdom Beauty Crown 챔피언십 심사위원 · London 2026",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-speaker-09",
    "TULOP 인도네시아 K-ARTCORE 연사 · 2026",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-iptc-event-10",
    "IPTC Korea Master Team 심사위원단",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-vietnam-event-13",
    "The World of Fengshui Beauty 마스터 초청 · 베트남",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-profile-02",
    "대표원장 프로필 · 경력과 협회 직함",
  ),
  pick(
    CAREER_IMAGES,
    "ceo-career-profile-03",
    "대표원장 프로필 · 대학 강사 이력",
  ),
];
