import { Headset, MessageCircle, Phone, SquarePlay } from "lucide-react";
import { SITE, telHref } from "@/config/site";

/**
 * 우측 세로 퀵메뉴 — 화면 세로 중앙에 붙는 서클 스택.
 * 전부 브랜드 모노톤(나이트)으로 통일한다 — 카카오 옐로우·유튜브 레드 같은
 * 서드파티 컬러를 들이면 페이지 위계가 남의 브랜드로 넘어가고 고급감이 죽는다
 * (실제로 컬러판을 써봤다가 되돌렸다). 채널 구분은 아이콘+라벨이 하고,
 * 색의 강조는 목표 하나(상담 신청, 화이트 반전)에만 준다.
 */
export default function FloatingCTA() {
  const circle =
    "flex size-[50px] flex-col items-center justify-center gap-[3px] rounded-full shadow-[0_8px_24px_rgba(0,0,0,.24)] transition-transform hover:scale-[1.07] dk:size-[56px]";
  const channel = `${circle} border border-white/16 bg-night/95 text-night-head backdrop-blur-sm`;
  const label = "text-[9px] leading-none font-bold dk:text-[9.5px]";

  return (
    <div className="fixed top-1/2 right-2.5 z-110 flex -translate-y-1/2 flex-col gap-2.5 dk:right-5">
      {/* 유일한 반전 — 밝은 면에서도 어두운 면에서도 스택에서 이것만 튄다 */}
      <a
        href="#consult"
        className={`${circle} border border-ink/15 bg-page text-ink`}
      >
        <Headset size={18} strokeWidth={1.8} />
        <span className={label}>상담</span>
      </a>

      {telHref && (
        <a href={telHref} aria-label="전화 상담" className={channel}>
          <Phone size={18} strokeWidth={1.8} />
          <span className={label}>전화</span>
        </a>
      )}

      {SITE.links.kakao && (
        <a
          href={SITE.links.kakao}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오톡 채널 상담"
          className={channel}
        >
          {/* 스트로크를 끄고 채워서 카카오 말풍선의 솔리드 형태에 붙인다 */}
          <MessageCircle size={18} className="fill-current stroke-none" />
          <span className={label}>카톡</span>
        </a>
      )}

      {SITE.links.instagram && (
        <a
          href={SITE.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="인스타그램"
          className={channel}
        >
          {/* lucide의 Instagram 브랜드 아이콘은 deprecated — 같은 글리프를
              인라인 SVG로 그린다(스트로크 규격은 다른 아이콘과 동일하게 맞춘다) */}
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span className={label}>인스타</span>
        </a>
      )}

      {SITE.links.youtube && (
        <a
          href={SITE.links.youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="유튜브 채널"
          className={channel}
        >
          {/* lucide의 Youtube 브랜드 아이콘은 deprecated — 재생 버튼 모양으로 대체 */}
          <SquarePlay size={18} strokeWidth={1.8} />
          <span className={label}>유튜브</span>
        </a>
      )}
    </div>
  );
}
