import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} | 두피문신 SMP 전문`,
    short_name: SITE.name,
    description: `두피문신(SMP) 전문 ${SITE.name}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    // 브라우저 탭·홈화면 아이콘은 src/app/icon.png(+apple-icon.png)이 규약으로 처리하지만,
    // 매니페스트는 해시 없는 고정 경로가 필요해 public/ 사본을 따로 참조한다.
    // purpose는 지정하지 않는다 — 여백이 9%뿐이라 maskable로 쓰면 마크가 잘린다.
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
