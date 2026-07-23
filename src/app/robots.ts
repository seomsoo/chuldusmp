import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    ...(SITE.domain ? { sitemap: `${SITE.domain}/sitemap.xml` } : {}),
  };
}
