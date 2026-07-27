/**
 * 원본 사진 → public/images/<카테고리>/*.webp 변환.
 *
 *   pnpm images            # 변환 (기존 결과물은 건너뜀)
 *   pnpm images --force    # 전부 다시 변환
 *   SRC=/다른/경로 pnpm images
 *
 * 원본은 레포에 넣지 않는다. 이 스크립트가 유일한 반입 경로다.
 */
import { mkdir, readdir, stat, copyFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = process.env.SRC ?? path.join(process.env.HOME, "Downloads/출두");
const OUT = path.join(process.cwd(), "public/images");
const VIDEO_OUT = path.join(process.cwd(), "public/videos");
const FORCE = process.argv.includes("--force");

/** 원본 폴더명 → public/images 하위 폴더명 */
const CATEGORIES = {
  가맹점: "franchise",
  "대표 경력사항": "career",
  대표사진: "ceo",
  시술안내: "procedure",
  아카데미: "academy",
  전후사진: "before-after",
  후기: "review",
};

/**
 * 파일명 접두사별 인코딩 프로파일.
 * text: 글자가 박힌 슬라이드/스크린샷 — 압축을 세게 걸면 글자가 뭉개지므로 품질을 높인다.
 * photo: 인물/시술 사진 — 표준 압축.
 * 위에서부터 먼저 매칭되는 규칙을 쓴다.
 */
const RULES = [
  { match: /^academy-curriculum-/, quality: 90, maxDim: 1600, kind: "text" },
  { match: /^review-naver-/, quality: 90, maxDim: 2436, kind: "text" },
  { match: /^franchise-/, quality: 90, maxDim: 1600, kind: "text" },
  { match: /^ceo-career-/, quality: 90, maxDim: 1600, kind: "text" },
  { match: /^ceo-portrait-/, quality: 82, maxDim: 2400, kind: "photo" },
  { match: /^before-after-/, quality: 86, maxDim: 1600, kind: "photo" },
  { match: /^procedure-/, quality: 82, maxDim: 1600, kind: "photo" },
  { match: /^academy-recruit-/, quality: 82, maxDim: 1600, kind: "photo" },
];
const FALLBACK = { quality: 84, maxDim: 1600, kind: "photo" };

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const kb = (n) => `${Math.round(n / 1024)}KB`;

function ruleFor(basename) {
  return RULES.find((r) => r.match.test(basename)) ?? FALLBACK;
}

async function convert(srcPath, destPath) {
  const base = path.basename(srcPath);
  const { quality, maxDim, kind } = ruleFor(base);

  const buf = await sharp(srcPath)
    .rotate() // EXIF 방향 반영 후 메타데이터는 버린다
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toBuffer();

  await writeFile(destPath, buf);

  const { width, height } = await sharp(buf).metadata();
  const before = (await stat(srcPath)).size;
  return { base, kind, quality, width, height, before, after: buf.length };
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`원본 폴더를 찾을 수 없다: ${SRC}`);
    process.exit(1);
  }

  const rows = [];
  let skipped = 0;

  for (const [srcDir, outDir] of Object.entries(CATEGORIES)) {
    const from = path.join(SRC, srcDir);
    if (!existsSync(from)) {
      console.warn(`  건너뜀 (없는 폴더): ${srcDir}`);
      continue;
    }
    const to = path.join(OUT, outDir);
    await mkdir(to, { recursive: true });

    const files = (await readdir(from))
      .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
      .sort();

    for (const file of files) {
      const destPath = path.join(to, `${path.basename(file, path.extname(file))}.webp`);
      if (!FORCE && existsSync(destPath)) {
        skipped++;
        continue;
      }
      const r = await convert(path.join(from, file), destPath);
      rows.push({ ...r, category: outDir });
      console.log(
        `  ${outDir}/${path.basename(destPath).padEnd(44)} ` +
          `${String(r.width).padStart(4)}x${String(r.height).padEnd(4)} ` +
          `${kb(r.before).padStart(7)} → ${kb(r.after).padStart(6)}  ` +
          `(q${r.quality}, ${r.kind})`,
      );
    }
  }

  // 영상은 무손실 복사만 한다. 재인코딩이 필요하면 ffmpeg를 별도로 쓴다.
  const videos = [
    ["브랜드영상.mp4", "brand.mp4"],
    ["시술안내/KakaoTalk_20260722_130835290.mp4", "procedure.mp4"],
  ];
  await mkdir(VIDEO_OUT, { recursive: true });
  for (const [rel, name] of videos) {
    const from = path.join(SRC, rel);
    if (!existsSync(from)) continue;
    const dest = path.join(VIDEO_OUT, name);
    if (!FORCE && existsSync(dest)) continue;
    await copyFile(from, dest);
    console.log(`  videos/${name.padEnd(48)} ${kb((await stat(dest)).size).padStart(7)} (복사)`);
  }

  const before = rows.reduce((s, r) => s + r.before, 0);
  const after = rows.reduce((s, r) => s + r.after, 0);
  console.log(
    `\n${rows.length}장 변환${skipped ? ` / ${skipped}장 건너뜀(--force로 재변환)` : ""}` +
      (rows.length
        ? `  ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(1)}MB ` +
          `(${Math.round((1 - after / before) * 100)}% 절감)`
        : ""),
  );
}

main();
