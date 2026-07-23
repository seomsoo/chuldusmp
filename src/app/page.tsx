// 섹션 조립 파일 — 섹션 컴포넌트를 위→아래 순서대로 한 줄씩 추가한다.
// 예: <Nav /> → <Hero /> → ... → <Footer /> → <MobileCTA />
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
      <h1
        className="text-6xl tracking-widest text-gold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        CHULDU SMP
      </h1>
      <p className="text-text-secondary">본점 랜딩페이지 — 섹션 준비 중</p>
    </main>
  );
}
