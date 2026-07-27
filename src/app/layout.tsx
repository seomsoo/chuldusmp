import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/config/site";
import "./globals.css";

// 영문 디스플레이용. 대문자 전용 콘덴스드 서체라 브랜드 표기에만 쓴다(본문 금지).
// 구글 폰트에 400 웨이트 하나뿐이라 굵기는 조절할 수 없다 — 무게감은 크기로 준다.
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue",
});

const TITLE = `${SITE.name} ${SITE.branch} | 두피문신 SMP 전문`;
const DESCRIPTION =
  "모근 하나 크기의 점을 두피에 하나씩 새기는 두피문신(SMP). 헤어라인·가르마·정수리·삭발 스타일·흉터 커버까지 두상에 맞춰 작업합니다. 상담은 무료입니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  ...(SITE.domain
    ? {
        metadataBase: new URL(SITE.domain),
        alternates: { canonical: SITE.domain },
        openGraph: {
          title: TITLE,
          description: DESCRIPTION,
          type: "website",
          url: SITE.domain,
          locale: "ko_KR",
          siteName: SITE.name,
          images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
        },
      }
    : {}),
  verification: {
    ...(SITE.verification.google ? { google: SITE.verification.google } : {}),
    ...(SITE.verification.naver
      ? { other: { "naver-site-verification": SITE.verification.naver } }
      : {}),
  },
};

// 도메인·전화가 채워지기 전(스켈레톤 상태)에는 구조화 데이터를 렌더하지 않는다.
const businessJsonLd =
  SITE.domain && SITE.phone
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE.domain}/#business`,
        name: `${SITE.name} ${SITE.branch}`,
        image: `${SITE.domain}/og-image.jpg`,
        url: SITE.domain,
        telephone: SITE.phone,
        priceRange: "₩₩",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          // 우편번호는 아직 미정 — 빈 문자열을 내보내면 구조화 데이터가 지저분해진다.
          ...(SITE.address.postalCode
            ? { postalCode: SITE.address.postalCode }
            : {}),
          addressCountry: "KR",
        },
        ...(SITE.geo.lat && SITE.geo.lng
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: SITE.geo.lat,
                longitude: SITE.geo.lng,
              },
            }
          : {}),
        ...(SITE.hours.opens
          ? {
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: SITE.hours.opens,
                closes: SITE.hours.closes,
              },
            }
          : {}),
        sameAs: [
          SITE.links.instagram,
          SITE.links.kakao,
          SITE.links.naverMap,
          SITE.links.youtube,
        ].filter(Boolean),
        ...(SITE.links.naverMap ? { hasMap: SITE.links.naverMap } : {}),
      }
    : null;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={bebasNeue.variable}>
      <head>
        {/* 구조화 데이터는 실행 코드가 아니라 데이터다. next/script를 쓰면 정적 HTML에
            ld+json 태그로 박히지 않고 스크립트 로더 큐에 실려 나가므로, Next 공식 권장대로
            네이티브 <script>로 렌더한다. `<`는 XSS 방지용으로 이스케이프한다. */}
        {businessJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c"),
            }}
          />
        ) : null}
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-hidden">
        {children}
        {SITE.analytics.ga4Id ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.analytics.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.analytics.ga4Id}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
