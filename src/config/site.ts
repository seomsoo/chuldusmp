// 업체 정보 단일 출처 — 연락처/링크/SEO/사업자 정보는 반드시 이 파일에서만 가져온다.
// 빈 문자열("")은 "아직 미정"을 뜻하며, 소비처는 해당 태그/스크립트/버튼을 렌더하지 않는다.
export const SITE = {
  name: "출두 SMP",
  brandEn: "CHULDU",
  branch: "강남본점",
  owner: "백건휘",
  businessNumber: "329-78-00517",
  // 끝에 슬래시를 붙이지 않는다 — 소비처가 `${domain}/sitemap.xml` 처럼 이어 붙인다.
  // Vercel 배포 시 www → apex 리다이렉트를 걸어 canonical과 일치시킬 것.
  domain: "https://chuldusmp.com",
  phone: "010-2272-4485",
  links: {
    kakao: "https://pf.kakao.com/_VMqqG",
    instagram: "https://www.instagram.com/chuldu_company",
    naverMap: "https://naver.me/xmBi8dbm",
    naverBooking: "", // 선택 — 없으면 관련 버튼 미출력
    // 공유 추적 파라미터(?si=)는 떼고 저장한다.
    youtube: "https://youtu.be/39a_gcNLCCM",
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
    // TODO(본점): 솔라피(SMS/알림톡) 연동 후 접수 엔드포인트 지정. 예: "/api/consult"
    // 비어 있어도 상담 폼 UI는 그대로 렌더되지만, 전송은 막고 안내 문구를 띄운다.
    // (보내지지도 않는데 "접수되었습니다"가 뜨면 문의가 통째로 유실되기 때문이다.)
    consultEndpoint: "",
  },
  analytics: { ga4Id: "" }, // TODO(본점): 새 GA4 속성 생성 후 입력 (예: "G-XXXXXXXXXX")
  verification: { naver: "", google: "" }, // 배포 후 사이트 인증 코드 입력

  // 초상권 동의 게이트. false면 전후 사진을 실사진 대신 플레이스홀더로 렌더한다.
  // 2026-07-27 대표 확인: 전후 사진 게시 동의 완료.
  consent: { beforeAfterPhotos: true },
};

// tel: 링크는 숫자만 남긴다 ("010-2272-4485" → "tel:01022724485")
export const telHref = SITE.phone ? `tel:${SITE.phone.replace(/\D/g, "")}` : "";
