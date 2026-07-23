import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-bg-primary px-5 text-center">
      <p className="text-6xl font-bold text-gold" style={{ fontFamily: "var(--font-display)" }}>
        404
      </p>
      <p className="mt-4 text-lg text-text-secondary">
        페이지를 찾을 수 없습니다
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-bg-primary transition-all hover:bg-gold-hover"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
