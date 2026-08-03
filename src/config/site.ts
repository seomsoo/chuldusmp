// 업체 정보 단일 출처 — 연락처/링크/SEO/사업자 정보는 반드시 이 파일에서만 가져온다.
// 빈 문자열("")은 "아직 미정"을 뜻하며, 소비처는 해당 태그/스크립트/버튼을 렌더하지 않는다.
export const SITE = {
  name: "출두 SMP",
  brandEn: "CHULDU",
  branch: "강남본점",
  // 실명 — 사업자 정보 표기(푸터)에만 쓴다. 법정 표기라 활동명으로 바꾸지 않는다.
  owner: "백건휘",
  // 마케팅 노출용 활동명. 본문·카드 등 사람이 읽는 자리에는 전부 이쪽을 쓴다.
  ownerDisplay: "백호",
  businessNumber: "329-78-00517",
  // 카카오톡 채널 표기명(검색 아이디는 @출두smp). 상담 섹션의 채널 행 등에서 쓴다.
  kakaoChannelName: "출두",
  // 끝에 슬래시를 붙이지 않는다 — 소비처가 `${domain}/sitemap.xml` 처럼 이어 붙인다.
  // Vercel 배포 시 www → apex 리다이렉트를 걸어 canonical과 일치시킬 것.
  domain: "https://chuldusmp.com",
  phone: "010-2272-4485",
  links: {
    kakao: "https://pf.kakao.com/_VMqqG",
    instagram: "https://www.instagram.com/chuldu_company",
    // 전후 기록이 올라오는 대표 시술 계정 — 전후 사진 워터마크에 찍힌 그 계정이다.
    // 회사 계정(instagram)과 용도가 달라 따로 둔다. 갤러리 "더 보기" 카드가 쓴다.
    instagramWork: "https://www.instagram.com/chuldu_backho",
    naverMap: "https://naver.me/xmBi8dbm",
    naverBooking: "", // 선택 — 없으면 관련 버튼 미출력
    // 공유 추적 파라미터(?si=)는 떼고 저장한다. 개별 영상이 아니라 채널 링크.
    youtube: "https://www.youtube.com/@chuldu_smp",
    kakaoMap: "", // TODO(본점): 카카오맵 길찾기 URL
  },
  address: {
    full: "서울 강남구 선릉로152길 10, 4층",
    /** 층수를 뺀 한 줄 — 층은 따로 강조해 보여주는 자리가 있다. */
    line: "서울 강남구 선릉로152길 10",
    floor: "4층",
    locality: "서울특별시",
    region: "강남구",
    street: "선릉로152길 10, 4층",
    postalCode: "", // TODO(본점)
    landmark: "압구정로데오역 4번 출구 도보 5분",
  },
  geo: { lat: 0, lng: 0 }, // TODO(본점): 지도 좌표
  // 24시간 영업. schema.org에서 "24시간"은 00:00~23:59로 표기한다
  // (opens와 closes를 같은 값으로 두면 "영업 안 함"으로 읽힌다).
  hours: { opens: "00:00", closes: "23:59", display: "24시간 영업 · 연중무휴" },
  forms: {
    // 솔라피(SMS/알림톡) 접수 엔드포인트. 실제 발송 설정은 env로 관리한다
    // (.env.example 참고) — API 키는 이 파일에 절대 넣지 않는다.
    // 여기를 ""로 되돌리면 폼은 그대로 보이되 전송만 막힌다.
    // (보내지지도 않는데 "접수되었습니다"가 뜨면 문의가 통째로 유실되기 때문이다.)
    consultEndpoint: "/api/consult",
  },
  // 본점 전용 GA4 속성 (2026-08-03 생성). 홍대점 것과 별개 — 재사용 금지.
  analytics: { ga4Id: "G-NQ23BXVRNR" },
  // 검색엔진 소유확인 메타태그 (2026-08-03 등록 — 네이버 서치어드바이저,
  // 구글 서치콘솔 URL 접두어 속성).
  verification: {
    naver: "1eb7a06f9f3780ad1b592ff1aac2c0a5532295da",
    google: "1H-jySubFXmVBFaXcQVCAUKpXPI9mK_bmKe64dwZUVU",
  },

  // 초상권 동의 게이트. false면 전후 사진을 실사진 대신 플레이스홀더로 렌더한다.
  // 2026-07-27 대표 확인: 전후 사진 게시 동의 완료.
  consent: { beforeAfterPhotos: true },
};

// tel: 링크는 숫자만 남긴다 ("010-2272-4485" → "tel:01022724485")
export const telHref = SITE.phone ? `tel:${SITE.phone.replace(/\D/g, "")}` : "";
