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
  /** 원장 성함. 사진과 짝이 되는 신뢰 요소다. 미정이면 비워 둔다. */
  manager?: string;
  /**
   * 프로필 사진, public 기준 경로.
   * - 본점(flagship): 세로 2:3 그대로 크롭 없이 들어간다 — 전신이 나온 롱샷을 쓸 것.
   *   상반신 컷을 넣으면 카드에서 얼굴만 크게 잘려 보인다.
   * - 지점: 3:4 썸네일로 잘려 들어간다 (얼굴이 위쪽 1/3에 오게 찍힌 사진).
   *   사진이 없는 지점은 같은 자리에 스틸 플레이스홀더가 들어간다.
   */
  photo?: string;
  /**
   * 지점 도로명 주소 한 줄. 채우면 카드에서 note(지역) 대신 이게 나온다.
   * 본점 주소는 여기가 아니라 SITE.address에서 온다(업체 정보 단일 출처).
   */
  address?: string;
  /**
   * 지점 네이버 플레이스 링크. 채운 지점만 카드 아래에 '길찾기'가 생긴다.
   * 리뷰·영업시간·예약이 한 곳에 있어서 지도 링크보다 이쪽이 낫다.
   * naver.me 단축 링크도 그대로 넣으면 된다.
   */
  placeUrl?: string;
  /**
   * 부원장 프로필 — 본점(flagship) 카드 안의 서브 프로필로만 렌더된다.
   * 지점 카드는 이 필드를 읽지 않는다. name이 비면 직함만 나온다.
   */
  deputy?: { name?: string; photo: string };
}

// TODO(본점): 원장 성함 6곳 + 부원장 성함 미수령 — 채우면 "OOO 원장/부원장"이 붙는다.
// TODO(본점): LA 네이버 플레이스 링크 미수령.
export const BRANCHES: Branch[] = [
  // 본점 사진은 대표 지정 컷(2026-08-03 수령, portrait-04 셔츠+넥타이, 4:5)을 쓴다.
  // Network의 사진 컨테이너가 이 비율(4:5)에 맞춰져 있다 — 비율이 다른 사진으로
  // 갈아끼우면 크롭·화질 저하가 생기니 컨테이너도 같이 손볼 것.
  {
    ko: "강남본점",
    en: "GANGNAM · FLAGSHIP",
    note: "선릉로152길 10, 4층",
    tag: "HEAD",
    flagship: true,
    photo: "/images/ceo/ceo-portrait-04.webp",
    deputy: { photo: "/images/branch/deputy-gangnam.webp" },
  },
  // 지점 순서는 LA → 광주 → 홍대 → 안양 → 강서 → 부산 — 대표 지정(2026-08-03).
  {
    ko: "LA",
    en: "LOS ANGELES",
    note: "United States",
    tag: "GLOBAL",
    photo: "/images/branch/manager-la.webp",
  },
  {
    ko: "광주",
    en: "GWANGJU",
    note: "전남",
    tag: "BRANCH",
    photo: "/images/branch/manager-gwangju.webp",
    placeUrl: "https://naver.me/5hunmeqD",
  },
  {
    ko: "홍대",
    en: "HONGDAE",
    note: "서울",
    tag: "BRANCH",
    photo: "/images/branch/manager-hongdae.webp",
    placeUrl: "https://naver.me/GyYWlQmV",
  },
  {
    ko: "안양",
    en: "ANYANG",
    note: "경기",
    tag: "BRANCH",
    photo: "/images/branch/manager-anyang.webp",
    placeUrl: "https://naver.me/FFaLIldY",
  },
  {
    ko: "강서",
    en: "GANGSEO",
    note: "서울",
    tag: "BRANCH",
    photo: "/images/branch/manager-gangseo.webp",
    placeUrl: "https://naver.me/5apMQZwM",
  },
  {
    ko: "부산",
    en: "BUSAN",
    note: "경남",
    tag: "BRANCH",
    photo: "/images/branch/manager-busan.webp",
    placeUrl: "https://naver.me/GYGyQiVc",
  },
];
