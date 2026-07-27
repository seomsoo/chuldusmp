import HeroVideo from "@/components/HeroVideo";

const BADGES = [
  { value: "10,000건", label: "누적 시술" },
  { value: "450명", label: "아카데미 수료" },
  { value: "7개", label: "국내외 지점" },
  { value: "LA", label: "글로벌 진출" },
];

export default function Hero() {
  // pb-[62px]는 모바일 하단 고정 CTA 바가 숫자 배지를 가리지 않게 비워두는 자리다.
  return (
    <header
      id="hero"
      className="relative flex min-h-svh flex-col overflow-hidden bg-night px-5 pt-[58px] pb-[62px] dk:px-6 dk:pb-0"
    >
      {/* blur-[3px]: 영상이 보여야 하므로 아주 살짝만. 디테일의 날만 죽인다.
            글자 가독성은 아래 radial 스크림과 헤드라인 drop-shadow가 책임진다.
          scale-[1.4]: brand.mp4에 위아래 89px씩 검은 레터박스가 구워져 있어 잘라내야 하고
            (1.35배면 충분), 블러가 가장자리를 먹으므로 여유분을 조금 더 준다. */}
      <HeroVideo
        src="/videos/brand.mp4"
        poster="/images/ceo/ceo-portrait-01.webp"
        className="absolute inset-0 h-full w-full scale-[1.4] object-cover opacity-90 blur-[3px]"
      />
      {/* 화면 전체를 어둡게 덮는 대신, 글자가 앉는 가운데에만 어둠을 고이게 한다.
          가장자리는 그대로라 영상이 살아 있고, 글자 뒤에서만 대비가 확보된다. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_46%_at_50%_44%,rgba(15,17,20,.80)_0%,rgba(15,17,20,.52)_52%,transparent_100%)]" />
      {/* 영상 밝기가 구간마다 크게 출렁여서(어두운 컷 ~3, 밝은 컷 ~96) 위아래로 살짝 눌러준다. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,25,28,.46)_0%,rgba(23,25,28,.16)_34%,rgba(23,25,28,.22)_62%,rgba(17,19,22,.84)_100%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(184,190,198,.03)_0_1px,transparent_1px_17px)]" />

      {/* flex-1 + justify-center: 상단 내비와 하단 숫자 배지 사이 공간의 정가운데에 글자를 둔다 */}
      <div className="hero-in relative mx-auto flex w-full max-w-[1180px] flex-1 flex-col items-center justify-center text-center">
        {/* Bebas Neue(콘덴스드 대문자 전용). 웨이트가 400 하나뿐이라 굵기 대신
            크기로 무게를 준다 — 콘덴스드라 같은 px에서도 캡 높이가 훨씬 크다.
            자간은 0.42em → 0.16em으로 좁혔다. 디스플레이 서체를 넓게 벌리면
            글자가 흩어져 오히려 힘이 빠진다.
            -mr: 마지막 글자 뒤 자간까지 폭에 포함돼 왼쪽으로 치우쳐 보이는 걸 보정. */}
        <span className="font-display mb-4 -mr-[0.16em] text-[clamp(30px,5.6vw,90px)] leading-none tracking-[0.16em] text-night-head/90">
          CHULDU SMP
        </span>

        <h1 className="chrome-text m-0 text-[clamp(32px,6.2vw,72px)] leading-[1.22] font-extrabold tracking-[-0.035em]">
          두피문신으로
          <br />
          당신의 인생을 바꿔드립니다
        </h1>
      </div>

      <div className="relative mx-auto -mb-px w-full max-w-[1180px]">
        <div className="grid grid-cols-2 border-t border-white/90 bg-[linear-gradient(90deg,#C7CCD2_0%,#DFE3E8_14%,#F4F6F8_30%,#CFD4DA_48%,#E8EBEE_64%,#C2C7CD_82%,#DDE1E5_100%)] shadow-[0_-22px_56px_rgba(0,0,0,.42)] dk:grid-cols-4">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-[7px] border-l border-ink/12 px-2.5 pt-6 pb-6"
            >
              <span className="text-[clamp(24px,3.4vw,36px)] leading-none font-extrabold tracking-[-0.045em] tabular-nums text-ink">
                {b.value}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.16em] text-ink-mute">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
