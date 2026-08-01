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
  원장님: "branch",
  전후사진: "before-after",
  후기: "review",
};

/**
 * 카테고리별 파일명 치환 (확장자 제외, 소문자로 비교).
 * 한글 파일명이 그대로 URL이 되면 퍼센트 인코딩으로 깨져 보여서 지점 영문명으로 바꾼다.
 * 여기 없는 파일은 원래 이름을 유지한다.
 */
const RENAME = {
  branch: {
    홍대: "manager-hongdae",
    강서: "manager-gangseo",
    안양: "manager-anyang",
    광주: "manager-gwangju",
    부산: "manager-busan",
    la: "manager-la",
    // 본점 부원장 — 지점 원장이 아니라 본점 카드 안의 서브 프로필로 쓰인다.
    부원장: "deputy-gangnam",
  },
};

/**
 * 파일명 접두사별 인코딩 프로파일.
 * text: 글자가 박힌 슬라이드/스크린샷 — 압축을 세게 걸면 글자가 뭉개지므로 품질을 높인다.
 * photo: 인물/시술 사진 — 표준 압축.
 * 위에서부터 먼저 매칭되는 규칙을 쓴다.
 */
const RULES = [
  { match: /^academy-curriculum-/, quality: 90, maxDim: 1600, kind: "text" },
  { match: /^academy-week9-/, quality: 90, maxDim: 1600, kind: "text" },
  { match: /^review-naver-/, quality: 90, maxDim: 2436, kind: "text" },
  { match: /^franchise-/, quality: 90, maxDim: 1600, kind: "text" },
  { match: /^ceo-career-/, quality: 90, maxDim: 1600, kind: "text" },
  { match: /^ceo-portrait-/, quality: 82, maxDim: 2400, kind: "photo" },
  { match: /^manager-/, quality: 82, maxDim: 2000, kind: "photo" },
  { match: /^before-after-/, quality: 86, maxDim: 1600, kind: "photo" },
  { match: /^procedure-/, quality: 82, maxDim: 1600, kind: "photo" },
  { match: /^academy-recruit-/, quality: 82, maxDim: 1600, kind: "photo" },
];
const FALLBACK = { quality: 84, maxDim: 1600, kind: "photo" };

/**
 * 결과 파일명별 사전 크롭 (원본 픽셀 기준, EXIF 회전 적용 후 좌표).
 *
 * 지점 카드는 세로 4:5로 자르는데 원장 사진 구도가 제각각이라(전신 / 흉상 / 얼굴 클로즈업)
 * 그대로 넣으면 한 줄에서 얼굴 크기가 들쭉날쭉하다. 다른 사진과 눈높이를 맞춰야 하는
 * 것만 여기서 미리 잘라 둔다. 원본은 건드리지 않으므로 값만 고치면 다시 뽑힌다.
 */
const CROP = {
  // 원본 2560x3200 전신샷 → 머리 위 여백부터 상반신까지 (4:5 유지)
  "manager-hongdae": { left: 630, top: 160, width: 1520, height: 1900 },
};

/**
 * 한 원본에서 다른 폴더로 한 장 더 뽑는 경우.
 * 같은 사진이라도 쓰이는 자리에 따라 필요한 구도가 달라서, 원본을 두 번 읽어
 * 각각 다른 CROP을 먹인다. 결과 파일명 기준으로 RULES·CROP이 적용된다.
 * (지점 카드가 본점 상반신 컷을 쓰던 시절 manager-gangnam을 여기서 뽑았다 —
 *  본점이 ceo/ 전신 컷으로 바뀌면서 2026-08-01 정리.)
 */
const DERIVED = [];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const kb = (n) => `${Math.round(n / 1024)}KB`;

function ruleFor(basename) {
  return RULES.find((r) => r.match.test(basename)) ?? FALLBACK;
}

async function convert(srcPath, destPath) {
  // 규칙은 결과 파일명 기준이다 — 원본이 한글이어도 치환된 이름으로 매칭된다.
  const base = path.basename(destPath);
  const { quality, maxDim, kind } = ruleFor(base);

  const crop = CROP[path.basename(destPath, ".webp")];

  let pipeline = sharp(srcPath).rotate(); // EXIF 방향 반영 후 메타데이터는 버린다
  if (crop) pipeline = pipeline.extract(crop); // 크롭은 리사이즈 전 — 원본 해상도에서 잘라야 손실이 없다

  const buf = await pipeline
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
      // macOS는 한글 파일명을 NFD(자모 분리)로 돌려준다. NFC로 합치지 않으면
      // "홍대"가 눈에는 같아 보여도 문자열 비교에서 어긋나 치환이 안 된다.
      const stem = path
        .basename(file, path.extname(file))
        .normalize("NFC")
        .toLowerCase();
      const destPath = path.join(to, `${RENAME[outDir]?.[stem] ?? stem}.webp`);
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

  for (const { from, to } of DERIVED) {
    const src = path.join(SRC, from);
    if (!existsSync(src)) {
      console.warn(`  건너뜀 (없는 원본): ${from}`);
      continue;
    }
    const destPath = path.join(OUT, to);
    if (!FORCE && existsSync(destPath)) {
      skipped++;
      continue;
    }
    await mkdir(path.dirname(destPath), { recursive: true });
    const r = await convert(src, destPath);
    rows.push({ ...r, category: path.dirname(to) });
    console.log(
      `  ${to.padEnd(52)} ` +
        `${String(r.width).padStart(4)}x${String(r.height).padEnd(4)} ` +
        `${kb(r.before).padStart(7)} → ${kb(r.after).padStart(6)}  ` +
        `(q${r.quality}, ${r.kind}, 파생)`,
    );
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
