import { BRANCHES, MAP_DOTS } from "@/content/branches";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Network() {
  return (
    <section id="network" className="bg-page-alt px-5 py-[118px] dk:px-10">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="split mb-14 grid items-start gap-14 dk:grid-cols-[5fr_7fr]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
              NETWORK
            </span>
            <h2 className="mt-4 mb-0 text-[clamp(30px,4.6vw,52px)] leading-[1.2] font-extrabold tracking-[-0.03em]">
              국내 6개 지점,
              <br />
              그리고 LA
            </h2>
            <p className="mt-5 mb-0 max-w-[400px] text-[14.5px] leading-[1.75] text-ink-soft">
              모든 지점이 같은 기준과 같은 부자재로 작업합니다. 상담은 가까운
              지점에서 받으실 수 있습니다.
            </p>
          </div>

          <div
            aria-hidden
            className="relative aspect-video overflow-hidden border border-ink/16 bg-[linear-gradient(160deg,#F4F6F8_0%,#E2E5E9_100%)]"
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(28,31,35,.05)_0_1px,transparent_1px_44px),repeating-linear-gradient(0deg,rgba(28,31,35,.05)_0_1px,transparent_1px_44px)]" />
            <span className="absolute top-[12%] left-[9%] text-[9px] font-bold tracking-[0.24em] text-steel-400">
              LA
            </span>
            <span className="absolute top-[20%] left-[9%] h-[7px] w-[7px] rounded-full bg-ink" />
            <span className="absolute top-[22%] left-[14%] h-px w-[52%] bg-[linear-gradient(90deg,rgba(28,31,35,.45),rgba(28,31,35,.08))]" />
            <span className="absolute top-[26%] right-[12%] text-[9px] font-bold tracking-[0.24em] text-steel-400">
              KOREA
            </span>
            {MAP_DOTS.map((d) => (
              <span
                key={d.label}
                style={{ left: d.x, top: d.y }}
                className="absolute flex items-center gap-[7px]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                <span className="text-[10.5px] font-semibold tracking-[-0.01em] text-ink">
                  {d.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* 격자선은 셀 테두리로 그린다. gap 배경으로 그리면 7개 카드가 3열에 떨어지지 않아
            마지막 줄의 빈 칸이 회색 덩어리로 남는다. */}
        <div className="grid border-t border-l border-ink/16 dk:grid-cols-3">
          {BRANCHES.map((b) => (
            <article
              key={b.ko}
              className={`flex flex-col border-r border-b border-ink/16 ${b.flagship ? "bg-night text-night-text" : "bg-panel text-ink"}`}
            >
              <div
                className={`flex aspect-3/4 items-end p-6 ${
                  b.flagship
                    ? "bg-[linear-gradient(160deg,#23272C_0%,#1A1D21_55%,#2B2F35_100%)]"
                    : b.tag === "GLOBAL"
                      ? "bg-[linear-gradient(160deg,#CFD4DA_0%,#E9ECEF_48%,#C7CCD2_100%)]"
                      : "bg-[linear-gradient(160deg,#E6E9EC_0%,#D4D9DE_100%)]"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[9.5px] font-bold tracking-[0.3em] opacity-60">
                    {b.en}
                  </span>
                  <span className="text-[clamp(22px,2.6vw,30px)] leading-[1.15] font-extrabold tracking-[-0.035em]">
                    {b.ko}
                  </span>
                </div>
              </div>
              <div
                className={`flex items-baseline justify-between gap-3 border-t px-6 pt-4.5 pb-5.5 ${
                  b.flagship ? "border-night-text/14" : "border-ink/14"
                }`}
              >
                <span className="text-[12.5px] tracking-[-0.01em] opacity-80">
                  {b.note}
                </span>
                <span className="text-[9.5px] font-bold tracking-[0.2em] opacity-55">
                  {b.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
