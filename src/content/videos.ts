// 시술 영상 릴 (2026-08-03 수령, 추가/영상 폴더).
// 원본(HEVC 1440×2560, 편당 50~80MB)은 레포 밖에 있고, 여기 목록은
// ffmpeg로 변환한 웹용 사본(H.264 720×1280, faststart)이다.
// 소리 트랙은 남겨 둔다 — 레일에서는 muted, 확대 뷰에서는 소리 재생.
export interface ProcedureVideo {
  /** public 기준 절대 경로 */
  src: string;
  /** 첫 장면 표지(jpg) — 로딩 전 즉시 페인트용 */
  poster: string;
  /** 변환 후 실측 해상도 */
  width: number;
  height: number;
  /** 접근성 라벨 겸 확대 뷰 캡션 */
  label: string;
}

// 대외활동 영상 14편 (2026-08-04 배선) — FOUNDER 포스터 줄 아래 영상 한 줄.
// 카드가 작아 여러 개가 동시에 재생되므로 웹 사본을 540×960으로 낮췄다
// (릴 720p 규격과 다름 — 카드 크기에선 차이가 없고 디코딩 부담이 절반이다).
const career = (n: number, w: number, h: number, label: string): ProcedureVideo => ({
  src: `/videos/career-${String(n).padStart(2, "0")}.mp4`,
  poster: `/videos/career-${String(n).padStart(2, "0")}.jpg`,
  width: w,
  height: h,
  label,
});

export const CAREER_VIDEOS: ProcedureVideo[] = [
  career(9, 540, 960, "한국 뷰티 대회 심사위원장"),
  career(2, 540, 960, "해외 초청 행사장"),
  career(5, 540, 960, "중국 박람회 부스 시연"),
  career(13, 540, 960, "해외 행사 입장 환영"),
  career(3, 540, 960, "라이브 시연 참관 현장"),
  career(12, 360, 640, "KART 어워드 무대"),
  career(1, 540, 960, "국내 세미나 현장"),
  career(10, 540, 960, "캄보디아 출장 이야기"),
  career(8, 540, 960, "국제 행사 라이브 시연"),
  career(6, 540, 960, "중국 박람회 라이브 시연"),
  career(14, 540, 960, "해외 출장 기록"),
  career(4, 540, 960, "해외 박람회 현장"),
  career(7, 540, 960, "국제 무대 시연"),
  career(11, 540, 960, "해외 아카데미 특강"),
];

// 아카데미 커리큘럼 요약 영상 (2026-08-04 배선) — 아카데미 섹션에서
// 커리큘럼 카드뉴스보다 먼저 나오는 80초 인트로. 내레이션이 있어
// 확대 뷰(소리 재생)가 본편이고, 인라인 재생은 미리보기다.
export const ACADEMY_VIDEO: ProcedureVideo = {
  src: "/videos/academy-curriculum.mp4",
  poster: "/videos/academy-curriculum.jpg",
  width: 720,
  height: 1280,
  label: "출두 아카데미 1:1 창업 교육 커리큘럼 요약 영상",
};

// 흉터커버 영상 2편 (2026-08-04 배선) — 시술 섹션 05 흉터커버 카드의
// 사진 스트립 맨 앞에 들어간다(대표 지시). 릴과 같은 변환 규격.
export const SCAR_COVER_VIDEOS: ProcedureVideo[] = [
  {
    src: "/videos/procedure-scar-cover-01.mp4",
    poster: "/videos/procedure-scar-cover-01.jpg",
    width: 720,
    height: 1280,
    label: "비절개 모발이식 흉터 커버 전후 기록",
  },
  {
    src: "/videos/procedure-scar-cover-02.mp4",
    poster: "/videos/procedure-scar-cover-02.jpg",
    width: 720,
    height: 1280,
    label: "비절개 모발이식 흉터 커버 시술 현장",
  },
];

export const PROCEDURE_VIDEOS: ProcedureVideo[] = [
  {
    src: "/videos/procedure-reel-01.mp4",
    poster: "/videos/procedure-reel-01.jpg",
    width: 720,
    height: 1280,
    label: "중년 남성 정수리 시술 기록",
  },
  {
    src: "/videos/procedure-reel-02.mp4",
    poster: "/videos/procedure-reel-02.jpg",
    width: 720,
    height: 1280,
    label: "남성 헤어라인 니들 작업",
  },
  {
    src: "/videos/procedure-reel-03.mp4",
    poster: "/videos/procedure-reel-03.jpg",
    width: 720,
    height: 1280,
    label: "중년 남성 헤어라인 스타일링 전후",
  },
  {
    src: "/videos/procedure-reel-04.mp4",
    poster: "/videos/procedure-reel-04.jpg",
    width: 720,
    height: 1280,
    label: "여성 가르마 시술 현장",
  },
  {
    src: "/videos/procedure-reel-05.mp4",
    poster: "/videos/procedure-reel-05.jpg",
    width: 720,
    height: 1280,
    label: "여성 헤어라인 교정 전후",
  },
  {
    src: "/videos/procedure-reel-06.mp4",
    poster: "/videos/procedure-reel-06.jpg",
    width: 720,
    height: 1280,
    label: "남성 헤어라인 니들 디테일",
  },
  {
    src: "/videos/procedure-reel-07.mp4",
    poster: "/videos/procedure-reel-07.jpg",
    width: 720,
    height: 1280,
    label: "삭발 SMP 헤어라인 디자인",
  },
];
