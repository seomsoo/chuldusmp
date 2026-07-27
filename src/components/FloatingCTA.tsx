import { SITE, telHref } from "@/config/site";

/**
 * 데스크톱은 우하단 스택, 모바일은 하단 고정 바.
 * 상담 유입의 대부분이 모바일이라 모바일 바는 항상 화면에 남는다.
 */
export default function FloatingCTA() {
  const hasKakao = !!SITE.links.kakao;

  return (
    <>
      <div className="fixed right-7 bottom-7 z-110 hidden flex-col items-end gap-2 dk:flex">
        {telHref && (
          <a
            href={telHref}
            className="rounded-[2px] border border-ink/20 bg-page/94 px-[18px] py-3 text-[13px] font-bold backdrop-blur-md transition-colors hover:bg-page"
          >
            전화
          </a>
        )}
        {hasKakao && (
          <a
            href={SITE.links.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2px] border border-ink/20 bg-page/94 px-[18px] py-3 text-[13px] font-bold backdrop-blur-md transition-colors hover:bg-page"
          >
            카카오톡
          </a>
        )}
        <a
          href="#consult"
          className="rounded-[2px] bg-ink px-[22px] py-3.5 text-[13.5px] font-bold text-page transition-colors hover:bg-night-lift"
        >
          상담 신청
        </a>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-110 grid border-t border-ink/18 bg-[#f0f2f4]/96 backdrop-blur-md dk:hidden"
        style={{
          gridTemplateColumns: telHref
            ? hasKakao
              ? "1fr 1fr 1.4fr"
              : "1fr 1.4fr"
            : "1fr",
        }}
      >
        {telHref && (
          <a
            href={telHref}
            className="py-[17px] text-center text-[13.5px] font-bold"
          >
            전화
          </a>
        )}
        {hasKakao && (
          <a
            href={SITE.links.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="border-l border-ink/14 py-[17px] text-center text-[13.5px] font-bold"
          >
            카카오톡
          </a>
        )}
        <a
          href="#consult"
          className="bg-ink py-[17px] text-center text-[13.5px] font-bold text-page"
        >
          상담 신청
        </a>
      </div>
    </>
  );
}
