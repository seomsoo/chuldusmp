/**
 * 사진 자산 카탈로그.
 *
 * 파일 자체는 `pnpm images`가 원본 폴더 → `public/images/<카테고리>/*.webp`로 생성한다.
 * 원본은 레포에 없으므로 여기 있는 경로가 실제 자산의 단일 목록이다.
 *
 * - `width`/`height`는 변환 후 실측값 — `next/image`에 그대로 넘기면 CLS가 안 난다.
 * - `alt`는 접근성·SEO용 대체 텍스트다. 이미지에 박힌 홍보 문구를 옮겨 적지 않는다
 *   (카피 규제 대상 표현이 alt로 새어 들어가는 걸 막기 위함).
 * - 이미지에 실제로 인쇄된 문구는 `docs/image-manifest.md`에 있다. 카피 작성 시 참고용이며
 *   번들에 싣지 않으려고 일부러 분리했다.
 *
 * 섹션 컴포넌트는 이 파일에서 필요한 배열만 import한다.
 */

export type ImageCategory =
  | "franchise"
  | "career"
  | "ceo"
  | "procedure"
  | "academy"
  | "before-after"
  | "review";

export type SiteImage = {
  /** public 기준 절대 경로 */
  src: string;
  width: number;
  height: number;
  alt: string;
  /** 같은 카드뉴스/시술 묶음. 캐러셀·필터 단위로 쓴다. */
  group?: string;
};

/** 가맹점 모집 카드뉴스 */
export const FRANCHISE_IMAGES: readonly SiteImage[] = [
  {
    src: "/images/franchise/franchise-intro-01.webp",
    width: 1080,
    height: 1350,
    alt: "검은 정장을 입은 출두 SMP 팀 단체 사진과 브랜드 소개 문구가 담긴 가맹 안내 표지",
  },
  {
    src: "/images/franchise/franchise-branches-02.webp",
    width: 1080,
    height: 1350,
    alt: "한국과 미국 지도에 출두 SMP 지점 위치가 표시된 지점 현황 안내",
  },
  {
    src: "/images/franchise/franchise-representative-03.webp",
    width: 1080,
    height: 1350,
    alt: "출두 SMP 청담본점 대표원장의 협회 직함과 강사 경력이 정리된 프로필 슬라이드",
  },
  {
    src: "/images/franchise/franchise-benefits-04.webp",
    width: 1080,
    height: 1350,
    alt: "출두 SMP 가맹점 혜택 항목이 정리된 가맹 안내 슬라이드",
  },
  {
    src: "/images/franchise/franchise-branches-05.webp",
    width: 1080,
    height: 1350,
    alt: "국내외 출두 SMP 지점 위치가 지도에 표시된 지점 현황과 파트너 모집 안내",
  },
  {
    src: "/images/franchise/franchise-directions-06.webp",
    width: 1080,
    height: 1400,
    alt: "청담 본점 위치 지도와 건물 외관, 도보·주차 안내가 담긴 찾아오시는 길",
  },
];

/** 대표 경력·수상·강연 이력 */
export const CAREER_IMAGES: readonly SiteImage[] = [
  {
    src: "/images/career/ceo-career-yonsei-course-01.webp",
    width: 1080,
    height: 1350,
    alt: "2025 연세대학교 K-BEAUTY 최고위과정 홍보 포스터",
  },
  {
    src: "/images/career/ceo-career-profile-02.webp",
    width: 1080,
    height: 1350,
    alt: "출두 SMP 청담본점 대표원장의 경력과 협회 직함이 정리된 프로필 카드",
    group: "career-profile",
  },
  {
    src: "/images/career/ceo-career-profile-03.webp",
    width: 1080,
    height: 1350,
    alt: "연세대학교 특임강사 이력이 추가된 대표원장 프로필 카드",
    group: "career-profile",
  },
  {
    src: "/images/career/ceo-career-ibs-committee-04.webp",
    width: 832,
    height: 999,
    alt: "2024 IBS International Standard Evaluation Contest 총괄 운영위원장 임명 카드",
  },
  {
    src: "/images/career/ceo-career-kart-seminar-05.webp",
    width: 1125,
    height: 1162,
    alt: "한국아트메이크업협회(KART) 주관 SMP 세미나 연사 소개 포스터",
  },
  {
    src: "/images/career/ceo-career-kart-fair-judge-06.webp",
    width: 1125,
    height: 1439,
    alt: "2025 KART FAIR 국제대회 SMP 심사위원장 소개 포스터",
  },
  {
    src: "/images/career/ceo-career-korea-univ-course-07.webp",
    width: 1125,
    height: 1205,
    alt: "고려대학교 뷰티 최고 전문가 과정 강사 소개 포스터",
  },
  {
    src: "/images/career/ceo-career-championship-judge-08.webp",
    width: 1125,
    height: 1162,
    alt: "Kingdom Beauty Crown 온라인 챔피언십 London 2026 심사위원 소개 카드",
  },
  {
    src: "/images/career/ceo-career-speaker-09.webp",
    width: 825,
    height: 1600,
    alt: "TULOP 2026 인도네시아 행사 K-ARTCORE 연사 3인 소개 카드",
  },
  {
    src: "/images/career/ceo-career-iptc-event-10.webp",
    width: 1080,
    height: 1080,
    alt: "IPTC 주관 SMP·PMU Korea Master Team 심사위원단 단체 기념사진",
  },
  {
    src: "/images/career/ceo-career-global-competition-photo-11.webp",
    width: 1080,
    height: 1080,
    alt: "2024 Global Beauty Industry Competition 시상식에서 트로피를 든 운영위원들",
    group: "global-competition-2024-photos",
  },
  {
    src: "/images/career/ceo-career-global-competition-photo-12.webp",
    width: 1080,
    height: 1080,
    alt: "2024 Global Beauty Industry Competition 현장 단체 기념사진",
    group: "global-competition-2024-photos",
  },
  {
    src: "/images/career/ceo-career-vietnam-event-13.webp",
    width: 1125,
    height: 1426,
    alt: "베트남 개최 The World of Fengshui Beauty Season 3 마스터 초청 포스터",
  },
  {
    src: "/images/career/ceo-career-global-competition-poster-14.webp",
    width: 1125,
    height: 1431,
    alt: "2024 제8회 Global Beauty Industry Competition 공동위원회 소개 포스터",
    group: "global-competition-poster",
  },
  {
    src: "/images/career/ceo-career-global-competition-poster-15.webp",
    width: 1125,
    height: 1523,
    alt: "2025 Global Beauty Industry Competition 공동위원회 소개 포스터",
    group: "global-competition-poster",
  },
];

/** 대표 스튜디오 프로필 */
export const CEO_IMAGES: readonly SiteImage[] = [
  {
    src: "/images/ceo/ceo-portrait-01.webp",
    width: 1600,
    height: 2400,
    alt: "회색 스튜디오 배경에서 검정 오버사이즈 재킷을 입고 정면을 바라보는 출두 SMP 대표원장",
  },
  {
    src: "/images/ceo/ceo-portrait-02.webp",
    width: 1600,
    height: 2400,
    alt: "회색 배경에서 검정 상의를 입고 정면을 응시하는 출두 SMP 대표원장 반신 프로필",
  },
  {
    src: "/images/ceo/ceo-portrait-03.webp",
    width: 1871,
    height: 2400,
    alt: "흰 배경에서 검정 코트를 걸치고 카메라를 응시하는 출두 SMP 대표원장 반신 프로필",
  },
];

/** 시술 안내 카드뉴스 — group이 시술 종류다 */
export const PROCEDURE_IMAGES: readonly SiteImage[] = [
  {
    src: "/images/procedure/procedure-shaved-smp-01.webp",
    width: 1080,
    height: 1350,
    alt: "삭발 두피문신 옆모습·뒷모습의 시술 전, 디자인, 시술 후 비교",
    group: "shaved-smp",
  },
  {
    src: "/images/procedure/procedure-shaved-smp-02.webp",
    width: 1080,
    height: 1350,
    alt: "삭발 두피문신 정면·정수리의 시술 전, 디자인, 시술 후 비교",
    group: "shaved-smp",
  },
  {
    src: "/images/procedure/procedure-shaved-smp-03.webp",
    width: 1080,
    height: 1350,
    alt: "삭발 두피문신 시술 설명과 시술 후 옆모습",
    group: "shaved-smp",
  },
  {
    src: "/images/procedure/procedure-shaved-smp-04.webp",
    width: 1080,
    height: 1350,
    alt: "삭발 두피문신 시술 전후 사진을 모은 표지 이미지",
    group: "shaved-smp",
  },
  {
    src: "/images/procedure/procedure-full-work-05.webp",
    width: 1080,
    height: 1350,
    alt: "전체작업 두피문신 시술 전후 사진을 모은 표지 이미지",
    group: "full-work",
  },
  {
    src: "/images/procedure/procedure-full-work-06.webp",
    width: 1080,
    height: 1350,
    alt: "전체작업 두피문신 정면·정수리의 시술 전, 디자인, 시술 후 비교",
    group: "full-work",
  },
  {
    src: "/images/procedure/procedure-full-work-07.webp",
    width: 1080,
    height: 1350,
    alt: "전체작업 두피문신 시술 설명과 시술 후 인물 사진",
    group: "full-work",
  },
  {
    src: "/images/procedure/procedure-full-work-08.webp",
    width: 1080,
    height: 1350,
    alt: "전체작업 두피문신 옆모습·뒷모습의 시술 전후 비교",
    group: "full-work",
  },
  {
    src: "/images/procedure/procedure-scar-cover-09.webp",
    width: 1080,
    height: 1080,
    alt: "흉터커버 두피문신 정면·측면의 시술 전후 비교",
    group: "scar-cover",
  },
  {
    src: "/images/procedure/procedure-scar-cover-10.webp",
    width: 1080,
    height: 1080,
    alt: "뒤통수 흉터커버 두피문신 시술 전후 비교",
    group: "scar-cover",
  },
  {
    src: "/images/procedure/procedure-scar-cover-11.webp",
    width: 1080,
    height: 1080,
    alt: "측면 헤어라인 흉터커버 두피문신 시술 전후 비교",
    group: "scar-cover",
  },
  {
    src: "/images/procedure/procedure-scar-cover-12.webp",
    width: 1080,
    height: 1080,
    alt: "두피문신 시술 장면이 담긴 출두 브랜드 마무리 슬라이드",
    group: "scar-cover",
  },
  {
    src: "/images/procedure/procedure-hairline-13.webp",
    width: 1080,
    height: 1350,
    alt: "남성 헤어라인 두피문신 정면·정수리의 시술 전, 디자인, 시술 후 비교",
    group: "hairline",
  },
  {
    src: "/images/procedure/procedure-hairline-14.webp",
    width: 1080,
    height: 1350,
    alt: "남성 헤어라인 두피문신 시술 전후 사진을 모은 표지 이미지",
    group: "hairline",
  },
  {
    src: "/images/procedure/procedure-hairline-15.webp",
    width: 1080,
    height: 1350,
    alt: "남성 헤어라인 두피문신 시술 설명과 시술 후 정면 사진",
    group: "hairline",
  },
  {
    src: "/images/procedure/procedure-hairline-16.webp",
    width: 1080,
    height: 1350,
    alt: "남성 헤어라인 두피문신의 디자인 드로잉, 니들 작업, 상담 과정 사진",
    group: "hairline",
  },
  // 여성 가르마 카드뉴스 4장 (2026-08-01 수령, 여성가르마_수정 폴더).
  // 시술 섹션 02 가르마 라인이 전후사진(crown)을 빌려 쓰던 것을 이걸로 교체했다.
  {
    src: "/images/procedure/procedure-part-line-17.webp",
    width: 1080,
    height: 1350,
    alt: "여성 가르마 두피문신 시술 전후 사진을 모은 표지 이미지",
    group: "part-line",
  },
  {
    src: "/images/procedure/procedure-part-line-18.webp",
    width: 1080,
    height: 1350,
    alt: "여성 가르마 두피문신 시술 설명과 시술 후 정수리 사진",
    group: "part-line",
  },
  {
    src: "/images/procedure/procedure-part-line-19.webp",
    width: 1080,
    height: 1350,
    alt: "여성 가르마 두피문신 정면·정수리의 시술 전후 비교",
    group: "part-line",
  },
  {
    src: "/images/procedure/procedure-part-line-20.webp",
    width: 1080,
    height: 1350,
    alt: "여성 가르마 두피문신 시술 장면과 니들 근접 사진",
    group: "part-line",
  },
];

/** 아카데미 — 커리큘럼 8장(master-class-curriculum)과 모집 카드뉴스 7장(academy-recruit) */
export const ACADEMY_IMAGES: readonly SiteImage[] = [
  {
    src: "/images/academy/academy-curriculum-01.webp",
    width: 1080,
    height: 1350,
    alt: "출두 마스터 아카데미 SMP 교육 과정 안내 표지",
    group: "master-class-curriculum",
  },
  {
    src: "/images/academy/academy-curriculum-02.webp",
    width: 1080,
    height: 1350,
    alt: "아카데미 1주차 기초이론 강의와 부자재 사용법 실습 사진",
    group: "master-class-curriculum",
  },
  {
    src: "/images/academy/academy-curriculum-03.webp",
    width: 1080,
    height: 1350,
    alt: "아카데미 2주차 민두 디자인 작업과 밀도보강 실습 사진",
    group: "master-class-curriculum",
  },
  {
    src: "/images/academy/academy-curriculum-04.webp",
    width: 1080,
    height: 1350,
    alt: "아카데미 3주차 헤어라인·구레나룻 디자인과 브랜딩 교육 사진",
    group: "master-class-curriculum",
  },
  {
    src: "/images/academy/academy-curriculum-05.webp",
    width: 1080,
    height: 1350,
    alt: "아카데미 데모실습 1 — 촬영·디자인 교육과 모델 닷팅 실습 사진",
    group: "master-class-curriculum",
  },
  {
    src: "/images/academy/academy-curriculum-06.webp",
    width: 1080,
    height: 1350,
    alt: "아카데미 데모실습 2 — 부위별 섹션과 밸런스 교육 사진",
    group: "master-class-curriculum",
  },
  {
    src: "/images/academy/academy-curriculum-07.webp",
    width: 1080,
    height: 1350,
    alt: "아카데미 데모실습 3 — 고객 응대·상담·스타일링 교육 사진",
    group: "master-class-curriculum",
  },
  {
    src: "/images/academy/academy-curriculum-08.webp",
    width: 1080,
    height: 1350,
    alt: "수료증을 든 출두 마스터 아카데미 수료생들과 수료 혜택 안내",
    group: "master-class-curriculum",
  },
  {
    src: "/images/academy/academy-recruit-09.webp",
    width: 1080,
    height: 1350,
    alt: "참관자들에게 시연하는 강사 사진이 담긴 출두 아카데미 소개 표지",
    group: "academy-recruit",
  },
  {
    src: "/images/academy/academy-recruit-10.webp",
    width: 1080,
    height: 1080,
    alt: "출두 아카데미 교육자의 협회 이력과 자격이 정리된 소개 페이지",
    group: "academy-recruit",
  },
  {
    src: "/images/academy/academy-recruit-11.webp",
    width: 1080,
    height: 1080,
    alt: "대표원장이 직접 진행하는 아카데미 실습 장면 세 컷",
    group: "academy-recruit",
  },
  {
    src: "/images/academy/academy-recruit-12.webp",
    width: 1080,
    height: 1080,
    alt: "두상 부위별 두피문신 실습 범위를 보여주는 클로즈업 사진",
    group: "academy-recruit",
  },
  {
    src: "/images/academy/academy-recruit-13.webp",
    width: 1080,
    height: 1080,
    alt: "출두 아카데미 교육 현장과 두피문신 시술 클로즈업",
    group: "academy-recruit",
  },
  {
    src: "/images/academy/academy-recruit-14.webp",
    width: 1080,
    height: 1080,
    alt: "강사가 고객에게 두피문신을 시술하는 아카데미 모집 이미지",
    group: "academy-recruit",
  },
  {
    src: "/images/academy/academy-recruit-15.webp",
    width: 1080,
    height: 1080,
    alt: "시술 장면 위에 출두 브랜드 슬로건을 얹은 아카데미 마무리 이미지",
    group: "academy-recruit",
  },
  // 9주 과정 카드뉴스 8장 (2026-08-01 수령, 9주차 폴더 번호순 16~23)
  {
    src: "/images/academy/academy-week9-16.webp",
    width: 1080,
    height: 1080,
    alt: "SMP 마스터 클래스 실습 지도 현장을 모은 9주 과정 표지 이미지",
    group: "academy-week9",
  },
  {
    src: "/images/academy/academy-week9-17.webp",
    width: 1080,
    height: 1080,
    alt: "9주 과정 커리큘럼 개요 — 1~3주차 이론·실습, 4~9주차 데모실습 안내",
    group: "academy-week9",
  },
  {
    src: "/images/academy/academy-week9-18.webp",
    width: 1080,
    height: 1080,
    alt: "출두 아카데미 커리큘럼 — 기초 교육, 데모 실습, 마케팅 교육 안내",
    group: "academy-week9",
  },
  {
    src: "/images/academy/academy-week9-19.webp",
    width: 1080,
    height: 1080,
    alt: "출두 아카데미 커리큘럼 — 밀도 보강, 헤어라인·구레나룻 집중 교육 안내",
    group: "academy-week9",
  },
  {
    src: "/images/academy/academy-week9-20.webp",
    width: 1080,
    height: 1080,
    alt: "데모 실습 교육 — 촬영, 커트, 디자인 실습 안내",
    group: "academy-week9",
  },
  {
    src: "/images/academy/academy-week9-21.webp",
    width: 1080,
    height: 1080,
    alt: "데모 실습 교육 — 데모 모델 실습, 포트폴리오, 창업 교육 안내",
    group: "academy-week9",
  },
  {
    src: "/images/academy/academy-week9-22.webp",
    width: 1080,
    height: 1080,
    alt: "출두 아카데미 수강 혜택 여섯 가지 안내",
    group: "academy-week9",
  },
  {
    src: "/images/academy/academy-week9-23.webp",
    width: 1080,
    height: 1080,
    alt: "수료증을 든 출두 아카데미 수료생 단체 사진 모음",
    group: "academy-week9",
  },
];

/**
 * 전후 사진.
 * group은 시술 부위(hairline: 헤어라인·구레나룻 / crown: 정수리·가르마)로 필터 축이 된다.
 * ⚠️ 초상권 동의 확인 전에는 페이지에 렌더하지 않는다 (CLAUDE.md 카피 작성 규칙).
 */
export const BEFORE_AFTER_IMAGES: readonly SiteImage[] = [
  {
    src: "/images/before-after/before-after-hairline-01.webp",
    width: 1080,
    height: 1350,
    alt: "남성 옆 헤어라인·구레나룻 두피문신 시술 전후 비교",
    group: "hairline",
  },
  {
    src: "/images/before-after/before-after-hairline-02.webp",
    width: 1080,
    height: 1350,
    alt: "중년 남성 관자놀이 헤어라인 두피문신 시술 전후 비교",
    group: "hairline",
  },
  {
    src: "/images/before-after/before-after-hairline-03.webp",
    width: 1080,
    height: 1350,
    alt: "남성 앞 헤어라인 정면 두피문신 시술 전후 비교",
    group: "hairline",
  },
  {
    src: "/images/before-after/before-after-crown-04.webp",
    width: 1080,
    height: 1350,
    alt: "남성 정수리 두피문신 시술 전후 비교",
    group: "crown",
  },
  {
    src: "/images/before-after/before-after-hairline-05.webp",
    width: 1080,
    height: 1350,
    alt: "남성 관자놀이 헤어라인 근접 두피문신 시술 전후 비교",
    group: "hairline",
  },
  {
    src: "/images/before-after/before-after-hairline-06.webp",
    width: 1080,
    height: 1350,
    alt: "남성 헤어라인 모서리 근접 두피문신 시술 전후 비교",
    group: "hairline",
  },
  {
    src: "/images/before-after/before-after-hairline-07.webp",
    width: 1080,
    height: 1350,
    alt: "남성 앞 헤어라인 근접 두피문신 시술 전후 비교",
    group: "hairline",
  },
  {
    src: "/images/before-after/before-after-crown-08.webp",
    width: 1080,
    height: 1350,
    alt: "여성 가르마·정수리 두피문신 시술 전후 비교",
    group: "crown",
  },
  {
    src: "/images/before-after/before-after-crown-09.webp",
    width: 1080,
    height: 1350,
    alt: "여성 앞 가르마 두피문신 시술 전후 비교",
    group: "crown",
  },
  {
    src: "/images/before-after/before-after-crown-10.webp",
    width: 1080,
    height: 1350,
    alt: "여성 가르마 옆 근접 두피문신 시술 전후 비교",
    group: "crown",
  },
  {
    src: "/images/before-after/before-after-hairline-11.webp",
    width: 1080,
    height: 1350,
    alt: "남성 관자놀이 헤어라인 두피문신 시술 전후 비교",
    group: "hairline",
  },
  {
    src: "/images/before-after/before-after-crown-12.webp",
    width: 1080,
    height: 1350,
    alt: "남성 정수리 뒤쪽 두피문신 시술 전후 비교",
    group: "crown",
  },
  {
    src: "/images/before-after/before-after-hairline-13.webp",
    width: 1080,
    height: 1350,
    alt: "남성 구레나룻·관자놀이 헤어라인 두피문신 시술 전후 비교",
    group: "hairline",
  },
  {
    src: "/images/before-after/before-after-hairline-14.webp",
    width: 1080,
    height: 1350,
    alt: "남성 이마·관자놀이 헤어라인 두피문신 시술 전후 비교",
    group: "hairline",
  },
];

/**
 * 네이버 플레이스 리뷰 캡처.
 * alt는 화면에 무엇이 보이는지만 서술한다 — 후기 본문을 alt로 옮기지 않는다.
 * 후기 문구를 페이지에 인용해야 하면 원본 캡처를 직접 확인해 옮긴다 (요약본 인용 금지).
 */
export const REVIEW_IMAGES: readonly SiteImage[] = [
  {
    src: "/images/review/review-naver-01.webp",
    width: 1125,
    height: 1406,
    alt: "네이버 플레이스 리뷰 캡처 — 남성 정수리 두피문신 시술 전후 사진과 후기",
  },
  {
    src: "/images/review/review-naver-02.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 여성 헤어라인 두피문신 시술 전후 사진과 후기",
  },
  {
    src: "/images/review/review-naver-03.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 이마 헤어라인 두피문신 시술 전후 사진과 후기",
  },
  {
    src: "/images/review/review-naver-04.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 남성 헤어라인 두피문신 시술 전후 사진과 후기",
  },
  {
    src: "/images/review/review-naver-05.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 여성 두피 커버 두피문신 시술 전후 사진과 후기",
  },
  {
    src: "/images/review/review-naver-06.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 여성 두피 컨설팅과 두피문신 시술 전후 사진, 후기",
  },
  {
    src: "/images/review/review-naver-07.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 남성 헤어라인 측면 두피문신 시술 전후 사진과 후기",
  },
  {
    src: "/images/review/review-naver-08.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 남성 헤어라인 두피문신 시술 전후 측면 사진과 후기",
  },
  {
    src: "/images/review/review-naver-09.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 남성 정수리 두피문신 시술 전후 뒷모습 사진과 후기",
  },
  {
    src: "/images/review/review-naver-10.webp",
    width: 1125,
    height: 2436,
    alt: "네이버 플레이스 리뷰 캡처 — 정수리 두피문신 시술 전후 윗머리 사진과 후기",
  },
];
