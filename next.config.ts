import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 16.0부터 기본이 [75]뿐이다 — 90은 지점 섹션 대표 프로필(인물 디테일)용.
    qualities: [75, 90],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
