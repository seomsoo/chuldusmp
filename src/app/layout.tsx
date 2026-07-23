import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/config/site";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

// TODO(본점): 브리프 확정 후 title/description/keywords/OG 카피 전면 교체
export const metadata: Metadata = {
  title: `${SITE.name} | 두피문신 SMP 전문`,
  description: `두피문신(SMP) 전문 ${SITE.name}.`,
  robots: { index: true, follow: true },
  ...(SITE.domain
    ? {
        metadataBase: new URL(SITE.domain),
        alternates: { canonical: SITE.domain },
        openGraph: {
          title: `${SITE.name} | 두피문신 SMP 전문`,
          description: `두피문신(SMP) 전문 ${SITE.name}.`,
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
        name: SITE.name,
        image: `${SITE.domain}/og-image.jpg`,
        url: SITE.domain,
        telephone: SITE.phone,
        priceRange: "₩₩",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: "KR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.lat,
          longitude: SITE.geo.lng,
        },
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
    <html lang="ko" className={`${bebasNeue.variable} antialiased`}>
      <head>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {businessJsonLd ? (
          <Script
            id="business-structured-data"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
          />
        ) : null}
      </head>
      <body className="min-h-dvh flex flex-col overflow-x-hidden">
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
