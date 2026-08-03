import Image from "next/image";
import { ArrowUpRight, UserRound } from "lucide-react";
import { BRANCHES, type Branch } from "@/content/branches";
import { SITE } from "@/config/site";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * 이 섹션이 하는 일은 "전국에 지점이 있는 브랜드다"라는 신뢰의 근거지,
 * 지점을 고르게 하는 목록이 아니다. 그래서 크기를 그 순서대로 준다 —
 * 이 페이지가 파는 강남본점이 제일 크고, 나머지 지점은 얼굴이 보이는 선까지만 작게.
 * (지점 카드를 본점보다 크게 뒀더니 부산 원장이 대표보다 네 배 크게 나왔다.)
 */
export default function Network() {
  const flagship = BRANCHES.find((b) => b.flagship) ?? BRANCHES[0];
  const rest = BRANCHES.filter((b) => b !== flagship);
  // 헤딩의 지점 수는 목록에서 파생 — 지점이 추가되면 카피도 따라온다.
  const domestic = BRANCHES.filter((b) => b.tag !== "GLOBAL").length;

  return (
    <section id="network" className="bg-page-alt px-5 py-section dk:px-10 dk:py-section-dk">
      <ScrollReveal className="mx-auto max-w-[1240px]">
        <div className="split mb-12 grid gap-8 dk:grid-cols-[5fr_7fr] dk:items-end dk:gap-14">
          <div>
            <span className="text-[10px] font-bold tracking-[0.34em] text-steel-500">
              NETWORK
            </span>
            <h2 className="mt-4 mb-0 text-[clamp(30px,4.6vw,52px)] leading-[1.2] font-extrabold tracking-[-0.03em]">
              국내 {domestic}개 지점,
              <br />
              그리고 LA
            </h2>
          </div>
          <p className="m-0 max-w-[520px] text-[14.5px] leading-[1.75] text-ink-soft">
            모든 지점이 같은 기준과 같은 부자재로 작업합니다.
            {/* 문장 단위로 끊는다 — 자연 줄바꿈에 맡기면 "상담은 가까운 /
                지점에서"처럼 구 중간에서 꺾인다. 두 문장 모두 375px 한 줄에
                들어갈 만큼 짧아서 모바일에도 그대로 적용한다. */}
            <br />
            상담은 가까운 지점에서 받으실 수 있습니다.
          </p>
        </div>

        {/* 본점 — 섹션의 주인공. 가로 전체를 쓰고 대표가 전신으로 선다. */}
        <article className="relative overflow-hidden border border-ink/16 bg-night text-night-text">
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(160deg,#23272C_0%,#1A1D21_55%,#2B2F35_100%)]"
          />
          {/* 히어로와 같은 주사선. 페이지에서 다크 면은 여기와 히어로뿐이라
              같은 결을 주면 두 곳이 한 브랜드로 읽힌다. */}
          <div aria-hidden className="scanlines absolute inset-0" />
          <div className="relative flex flex-col dk:flex-row-reverse">
            {/* 사진 원본(portrait-04)이 4:5 상반신 컷이다. 컨테이너를 같은
                비율로 맞춰 크롭 없이 그대로 넣는다 — 비율이 안 맞으면 cover가
                확대·크롭하면서 화질이 물러진다(2:3 시절 실측). quality 90은
                인물 디테일용 — next.config의 qualities에 등록돼 있어야 한다. */}
            {flagship.photo && (
              <div className="relative aspect-[4/5] w-full shrink-0 border-b border-night-text/12 dk:aspect-auto dk:w-[492px] dk:border-b-0 dk:border-l">
                <Image
                  src={flagship.photo}
                  alt={`${flagship.ko} ${SITE.ownerDisplay} 대표`}
                  fill
                  quality={90}
                  sizes="(max-width: 900px) 100vw, 492px"
                  className="object-cover object-top"
                />
              </div>
            )}

            {/* min-h 615 × 사진 폭 492 = 정확히 4:5. 사진이 원본 비율 그대로
                들어가 어디도 잘리지 않는다. 이 둘은 같이 움직여야 한다 —
                왼쪽 컬럼 내용이 min-h를 넘으면 카드가 자라며 사진이 옆으로
                잘리기 시작한다. */}
            <div className="flex flex-1 flex-col justify-between gap-9 px-6 py-8 dk:min-h-[615px] dk:px-11 dk:py-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-steel-400">
                  01
                </span>
                <span className="text-[9.5px] font-bold tracking-[0.3em] text-steel-400">
                  {flagship.tag}
                </span>
              </div>

              {/* 이름 덩어리를 가운데 두어 위아래 여백을 나눈다.
                  상·하 두 덩어리만 두면 카드 한가운데가 통째로 빈다. */}
              <div>
                <h3 className="m-0 text-[clamp(34px,5.2vw,62px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-night-head">
                  {flagship.ko}
                </h3>
                {/* 영문은 히어로와 같은 디스플레이 서체 — 다크 면 두 곳(히어로·본점 카드)의
                    목소리를 맞춘다. Bebas는 대문자 전용이라 en 값이 항상 대문자여야 한다. */}
                <span className="font-display mt-4 block text-[clamp(16px,1.8vw,22px)] leading-none tracking-[0.18em] text-steel-400">
                  {flagship.en}
                </span>
                {/* 노출용 활동명을 쓴다. 실명(SITE.owner)은 푸터의 사업자 정보에만. */}
                {SITE.ownerDisplay && (
                  <span className="mt-5 block text-[15px] font-bold tracking-[-0.02em] text-night-head">
                    {SITE.ownerDisplay} 대표
                  </span>
                )}

                {/* 부원장 — 본점에만 있는 서브 프로필. 오른쪽 전신(대표)과 급을
                    나누기 위해 작은 플레이트 + 직함으로만 둔다.
                    성함 수령 시 branches.ts의 deputy.name만 채우면 된다. */}
                {flagship.deputy && (
                  <div className="mt-7 flex items-center gap-5 border-t border-night-text/12 pt-6">
                    <span className="relative block h-[120px] w-[90px] shrink-0 overflow-hidden border border-night-text/15 dk:h-[148px] dk:w-[111px]">
                      <Image
                        src={flagship.deputy.photo}
                        alt={`${flagship.ko} ${
                          flagship.deputy.name ? `${flagship.deputy.name} ` : ""
                        }부원장`}
                        fill
                        sizes="(max-width: 900px) 90px, 111px"
                        className="object-cover"
                      />
                    </span>
                    <span>
                      <span className="block text-[16px] font-bold tracking-[-0.02em] text-night-head">
                        {flagship.deputy.name
                          ? `${flagship.deputy.name} `
                          : ""}
                        부원장
                      </span>
                      <span className="font-mono mt-2 block text-[9.5px] tracking-[0.16em] text-steel-400">
                        DEPUTY DIRECTOR
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="m-0 text-[14px] leading-[1.7] text-steel-300">
                  {SITE.address.full}
                </p>
                {/* 본점만 바깥이 아니라 '오시는 길' 섹션으로 보낸다. 거기 지도·교통편이
                    다 있는데 네이버로 내보내면 페이지를 떠나게 만들 뿐이다. */}
                <a
                  href="#location"
                  className="mt-5 flex max-w-[320px] items-center justify-between gap-2 border-t border-night-text/20 pt-4 text-[13.5px] font-bold text-night-head transition-colors hover:text-steel-300"
                >
                  오시는 길
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* 나머지 지점 — 룩북식 세로 포트레이트 플레이트 그리드.
            (원형 아바타는 '팀 소개 위젯'처럼, 헤어라인 로우는 사진이 너무 작아
            얼굴이 안 보여서 폐기했다.) 플레이트 폭을 ~190px에 묶어 두는 게 핵심 —
            여기를 키우면 본점(380px 전신)이 다시 묻힌다.
            사진이 없는 지점(광주)은 스틸 플레이스홀더로 그리드 리듬을 지킨다. */}
        <div className="mt-12">
          <div className="flex items-baseline gap-4 border-b border-ink/16 pb-3.5">
            <span className="text-[10px] font-bold tracking-[0.3em] text-steel-500">
              BRANCHES
            </span>
          </div>

          <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-9 p-0 pt-8 dk:grid-cols-6 dk:gap-x-5">
            {rest.map((b, i) => (
              <li key={b.ko}>
                {/* 본점이 01이므로 지점은 02부터 잇는다 — 한 네트워크의 연번. */}
                <BranchCard branch={b} index={i + 2} />
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}

/**
 * 지점 한 장 — 세로 3:4 포트레이트 플레이트와 그 아래 타이포 스택.
 * 링크를 받은 곳은 카드 전체가 네이버 플레이스로 나가고, 아직 못 받은 곳은
 * 같은 모양의 정적 카드로 남는다(눌리지 않는 버튼을 만들지 않는다).
 */
function BranchCard({ branch: b, index }: { branch: Branch; index: number }) {
  const linked = !!b.placeUrl;

  const inner = (
    <>
      {/* 얼굴은 신뢰 요소라 모바일에서도 항상 보인다 — 호버에만 숨겨두지 않는다. */}
      <span className="steel-plate relative block aspect-[3/4] w-full overflow-hidden border border-ink/14 transition-[border-color] group-hover:border-ink/35">
        {b.photo ? (
          <Image
            src={b.photo}
            alt={`${b.ko}${b.manager ? ` ${b.manager}` : ""} 원장`}
            fill
            sizes="(max-width: 900px) 45vw, 190px"
            className="object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <UserRound
              size={26}
              strokeWidth={1.2}
              className="text-steel-400"
              aria-hidden
            />
          </span>
        )}
      </span>

      <span className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-[10px] tracking-[0.12em] tabular-nums text-steel-500">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-[16.5px] leading-none font-extrabold tracking-[-0.035em] text-ink dk:text-[17.5px]">
          {b.ko}
        </span>
        {linked && (
          <ArrowUpRight
            size={13}
            className="shrink-0 self-center text-steel-400 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          />
        )}
      </span>

      {/* 영문(모노)과 지역을 한 줄의 양 끝에 배치해 카드 안에 작은 원장(元帳)
          구조를 만든다 — 플레이트가 커져도 카드가 '프로필 위젯'으로 안 읽히는 이유. */}
      <span className="mt-2 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
        <span className="font-mono text-[9px] tracking-[0.14em] text-steel-500 dk:text-[9.5px]">
          {b.en}
        </span>
        <span className="text-[10.5px] leading-[1.4] tracking-[-0.01em] text-ink-mute">
          {b.address ?? b.note}
        </span>
      </span>

      {b.manager && (
        <span className="mt-1.5 block text-[12px] font-semibold tracking-[-0.01em] text-ink-soft">
          {b.manager} 원장
        </span>
      )}
    </>
  );

  return linked ? (
    <a
      href={b.placeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {inner}
    </a>
  ) : (
    <span className="block">{inner}</span>
  );
}
