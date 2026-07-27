import { SITE } from "@/config/site";

// 소셜 글리프는 lucide를 쓰지 않는다 — Instagram·Youtube가 deprecated이고(향후 제거 예정)
// 카카오·네이버는 애초에 없어서 네 개의 결이 맞지 않는다. 같은 24 그리드에 직접 그려 둔다.
// 색은 전부 currentColor라 링크의 hover 색을 그대로 따라간다.
type GlyphProps = { className?: string };

function InstagramGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect
        x="2.6"
        y="2.6"
        width="18.8"
        height="18.8"
        rx="5.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" />
    </svg>
  );
}

function KakaoGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M12 3.3c-5.1 0-9.2 3.2-9.2 7.1 0 2.5 1.7 4.7 4.3 5.9l-1 3.5c-.1.4.3.7.6.5l4.2-2.7c.4 0 .7.1 1.1.1 5.1 0 9.2-3.2 9.2-7.2S17.1 3.3 12 3.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NaverGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect
        x="2.6"
        y="2.6"
        width="18.8"
        height="18.8"
        rx="4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.3 16.2V7.8h2.9l2.3 4.1V7.8h2.2v8.4h-2.9l-2.3-4.1v4.1z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect
        x="2.2"
        y="5.2"
        width="19.6"
        height="13.6"
        rx="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M10.3 8.9v6.2l5.2-3.1z" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  // 아이콘만 남으면 무엇인지 알 수 없다 — aria-label/title로 이름을 반드시 남긴다.
  const socials = [
    { href: SITE.links.instagram, label: "인스타그램", Glyph: InstagramGlyph },
    { href: SITE.links.kakao, label: "카카오톡 채널", Glyph: KakaoGlyph },
    { href: SITE.links.naverMap, label: "네이버 플레이스", Glyph: NaverGlyph },
    { href: SITE.links.youtube, label: "유튜브", Glyph: YoutubeGlyph },
  ].filter((s) => s.href);

  return (
    <footer className="bg-night px-5 pt-[66px] pb-[110px] text-steel-400 dk:px-10">
      <div className="split mx-auto grid max-w-[1240px] gap-10 dk:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-baseline gap-2.5 text-[18px] font-extrabold tracking-[-0.03em] text-night-head">
            출두 SMP
            <span className="text-[9.5px] font-semibold tracking-[0.34em] text-steel-500">
              {SITE.brandEn}
            </span>
          </div>
          <p className="mt-[18px] mb-0 text-[12.5px] leading-[1.85]">
            {SITE.address.full} ({SITE.branch})
            {SITE.owner && (
              <>
                <br />
                대표 {SITE.owner}
                {SITE.businessNumber &&
                  ` · 사업자등록번호 ${SITE.businessNumber}`}
              </>
            )}
            {SITE.phone && (
              <>
                <br />
                대표번호 {SITE.phone}
              </>
            )}
            {SITE.hours.display && (
              <>
                <br />
                <span className="text-night-head">{SITE.hours.display}</span>
              </>
            )}
          </p>
        </div>

        {/* 아이콘 자체는 22px지만 링크에 패딩을 줘 모바일 탭 영역을 44px로 확보한다. */}
        {socials.length > 0 && (
          <div className="-m-2.5 flex items-start">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="p-2.5 text-steel-400 transition-colors hover:text-night-head"
              >
                <s.Glyph className="h-[22px] w-[22px]" />
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
