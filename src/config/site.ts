// 업체 정보 단일 출처 — 연락처/링크/SEO/사업자 정보는 반드시 이 파일에서만 가져온다.
// 빈 문자열("")은 "아직 미정"을 뜻하며, 소비처는 해당 태그/스크립트/버튼을 렌더하지 않는다.
export const SITE = {
  name: "출두 SMP", // TODO(본점): 정식 상호 확정 시 교체
  brandEn: "CHULDU",
  owner: "", // TODO(본점): 대표자명
  businessNumber: "", // TODO(본점): 사업자등록번호
  domain: "", // TODO(본점): 예 "https://example.com" — 배포 전 필수
  phone: "", // TODO(본점)
  links: {
    kakao: "", // TODO(본점): 카카오톡 채널 URL
    instagram: "", // TODO(본점)
    naverMap: "", // TODO(본점): 네이버지도 place URL
    naverBooking: "", // 선택 — 없으면 관련 버튼 미출력
  },
  address: {
    full: "", // TODO(본점): 전체 주소 한 줄
    locality: "", // 시 (예: 서울특별시)
    region: "", // 구
    street: "", // 도로명 + 상세
    postalCode: "",
    landmark: "", // 예: "OO역 O번 출구 도보 O분"
  },
  geo: { lat: 0, lng: 0 }, // TODO(본점): 지도 좌표
  hours: { opens: "", closes: "", display: "" }, // TODO(본점): 영업시간
  analytics: { ga4Id: "" }, // TODO(본점): 새 GA4 속성 생성 후 입력 (예: "G-XXXXXXXXXX")
  verification: { naver: "", google: "" }, // 배포 후 사이트 인증 코드 입력
};

export const telHref = SITE.phone ? `tel:${SITE.phone}` : "";
