// 지점 현황. 디자인 v5 기준 목록이다.
//
// ⚠️ 참고: 가맹 브로슈어(franchise-branches-02 / -05)에는 지점 목록이 서로 다르게
// 적혀 있다(-02: 청담·인천·홍대·부산·광주·일산·안양+LA / -05: 청담·인천·명동·홍대·분당·
// 수원·안산·대구·부산·광주+LA). 대표 확인 후 이 파일 한 곳만 고치면 지도·카드가 함께 바뀐다.
export interface Branch {
  ko: string;
  en: string;
  note: string;
  tag: string;
  flagship?: boolean;
}

export const BRANCHES: Branch[] = [
  { ko: "강남본점", en: "GANGNAM · FLAGSHIP", note: "선릉로152길 10, 4층", tag: "HEAD", flagship: true },
  { ko: "홍대", en: "HONGDAE", note: "서울", tag: "BRANCH" },
  { ko: "강서", en: "GANGSEO", note: "서울", tag: "BRANCH" },
  { ko: "안양", en: "ANYANG", note: "경기", tag: "BRANCH" },
  { ko: "광주", en: "GWANGJU", note: "전남", tag: "BRANCH" },
  { ko: "부산", en: "BUSAN", note: "경남", tag: "BRANCH" },
  { ko: "LA", en: "LOS ANGELES", note: "United States", tag: "GLOBAL" },
];

/** 약식 지도 위 점 위치 (컨테이너 기준 %) */
export const MAP_DOTS: { x: string; y: string; label: string }[] = [
  { x: "68%", y: "38%", label: "강남본점" },
  { x: "62%", y: "52%", label: "홍대" },
  { x: "58%", y: "64%", label: "강서" },
  { x: "72%", y: "62%", label: "안양" },
  { x: "61%", y: "78%", label: "광주" },
  { x: "78%", y: "80%", label: "부산" },
];
