import { PROCEDURE_IMAGES } from "./images";
import { pick, type Media } from "./media";
import { SCAR_COVER_VIDEOS, type ProcedureVideo } from "./videos";

export interface Service {
  num: string;
  name: string;
  en: string;
  desc: string;
  quote: string;
  shots: Media[];
  /** 사진 스트립 맨 앞에 붙는 시술 영상. 없는 시술은 생략한다. */
  videos?: ProcedureVideo[];
}

const p = (file: string, caption: string) =>
  pick(PROCEDURE_IMAGES, file, caption);

export const SERVICES: Service[] = [
  {
    num: "01",
    name: "남/녀 헤어라인 & M자 탈모",
    en: "HAIRLINE & M-SHAPE",
    desc: "이마 라인을 새로 잡는 작업입니다. 두상 비율과 얼굴형을 먼저 재고, 실제로 자랄 수 있는 위치에만 라인을 그립니다. 남성은 각진 라인, 여성은 잔머리 흐름까지 함께 표현합니다.",
    quote: "라인은 유행이 아니라 두상에 맞춰 잡습니다.",
    shots: [
      p("procedure-hairline-16", "디자인 · 니들 작업 · 상담 과정"),
      p("procedure-hairline-13", "시술 전 · 디자인 · 시술 후"),
      p("procedure-hairline-14", "시술 전후 모음"),
      p("procedure-hairline-15", "시술 설명과 결과"),
    ],
  },
  {
    num: "02",
    name: "가르마 라인",
    en: "PART LINE",
    desc: "가르마를 탔을 때 드러나는 두피를 채웁니다. 기존 모발의 밀도와 색에 맞춰 점 간격을 조절해, 머리를 넘겨도 경계가 보이지 않게 작업합니다.",
    quote: "머리를 넘길 때 가장 먼저 보이는 곳입니다.",
    // 여성 가르마 전용 카드뉴스로 전체 교체(2026-08-01).
    // 순서는 수령 번호 기준 2→1→3→4 — 설명 카드를 앞세우라는 대표 지시(2026-08-01).
    // 전후 비교 5장(21~25) 추가(2026-08-03) — 첫 장과 마지막 장 사이에 넣으라는 대표 지시.
    shots: [
      p("procedure-part-line-18", "시술 설명과 결과"),
      p("procedure-part-line-17", "시술 전후 모음"),
      p("procedure-part-line-19", "정면 · 정수리 전후"),
      p("procedure-part-line-21", "가르마 부위 근접 전후"),
      p("procedure-part-line-22", "정수리 · 가르마 전후"),
      p("procedure-part-line-23", "정면 전후"),
      p("procedure-part-line-24", "두피 근접 전후"),
      p("procedure-part-line-25", "위에서 본 정수리 전후"),
      p("procedure-part-line-20", "시술 장면 · 니들 디테일"),
    ],
  },
  {
    num: "03",
    name: "정수리 · 사이드 · 측두부",
    en: "CROWN & SIDE",
    desc: "넓은 면적을 균일한 밀도로 채우는 작업입니다. 정수리는 가마 방향, 측두부는 두상 곡면을 따라 점의 크기와 깊이를 달리해 자연스러운 음영을 만듭니다.",
    quote: "넓은 면적일수록 밀도의 균일함이 결과를 좌우합니다.",
    shots: [
      p("procedure-full-work-07", "시술 설명과 결과"),
      p("procedure-full-work-05", "시술 전후 모음"),
      p("procedure-full-work-06", "시술 전 · 디자인 · 시술 후"),
      p("procedure-full-work-08", "옆모습 · 뒷모습 전후"),
    ],
  },
  {
    num: "04",
    name: "삭발 스타일 컨설팅",
    en: "SHAVED STYLE",
    desc: "밀어버린 두상에 모근 자국을 그려 넣어, 짧게 민 머리처럼 보이게 만드는 작업입니다. 다만 기존 모발로 커버가 가능하다면 삭발을 권하지 않습니다.",
    quote: "함부로 삭발을 권장하지 않습니다. 커버가 불가능할 때만 권장합니다.",
    shots: [
      p("procedure-shaved-smp-03", "시술 설명과 결과"),
      p("procedure-shaved-smp-01", "옆모습 · 뒷모습 전후"),
      p("procedure-shaved-smp-02", "정면 · 정수리 전후"),
      p("procedure-shaved-smp-04", "시술 전후 모음"),
    ],
  },
  {
    num: "05",
    name: "모발이식 흉터 & 수술 자국 커버",
    en: "SCAR COVER",
    desc: "모발이식 절개선, 두피 수술 자국처럼 모발이 자라지 않는 흉터 위에 점을 얹어 주변 밀도와 맞춥니다. 흉터의 폭과 색에 따라 회차를 나눠 진행합니다.",
    quote: "가릴 수 없던 흉터, 30분이면 가릴 수 있습니다.",
    // 시술 영상 2편을 스트립 맨 앞에 — 대표 지시(2026-08-04).
    videos: SCAR_COVER_VIDEOS,
    shots: [
      p("procedure-scar-cover-09", "정면 · 측면 전후"),
      p("procedure-scar-cover-10", "뒤통수 흉터 전후"),
      p("procedure-scar-cover-11", "측면 헤어라인 흉터 전후"),
      p("procedure-scar-cover-12", "시술 장면"),
    ],
  },
];
