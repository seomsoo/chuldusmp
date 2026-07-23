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
    // TODO(본점): 로고 수령 후 src/app/에 icon.png(192x192), apple-icon.png(180x180) 추가하고 icons 배열 채우기
  };
}
