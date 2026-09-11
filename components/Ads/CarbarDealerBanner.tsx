/**
 * 카바딜러 신차 견적 비교 — 텐핑(Tenping) 제휴 배너.
 *
 * - 성과(상담 신청 접수)는 텐핑 추적 URL(iryan.kr)을 통해서만 잡힌다.
 *   자체 폼으로 연락처를 받으면 캠페인 규정 위반이라 링크 아웃만 한다.
 * - 제휴 링크라 rel="sponsored" 를 붙인다 (AdSense·검색엔진 가이드).
 * - 이미지는 https 로 불러야 혼합 콘텐츠 차단을 피한다. 원본 크리에이티브 1200×628.
 */

const TENPING_URL = 'https://iryan.kr/t8g3o44w51'
const CREATIVE_URL =
  'https://img.tenping.kr/Content/Upload/Images/2025070911110001_Dis_20260907212640.png'

export default function CarbarDealerBanner({ className = '' }: { className?: string }) {
  return (
    <aside aria-label="카바딜러 신차 견적 비교 광고" className={`flex w-full justify-center ${className}`}>
      <div className="w-full max-w-[800px] rounded-xl border bg-white p-4" style={{ borderColor: '#dae2e3' }}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wide text-gray-400">카바딜러 · 신차 견적 비교</span>
          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-gray-400">AD</span>
        </div>

        <a href={TENPING_URL} target="_blank" rel="noopener noreferrer sponsored" className="block overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CREATIVE_URL}
            alt="신차 살 때, 딜러부터 비교하세요 — 카바딜러"
            width={1200}
            height={628}
            className="block h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </a>

        <p className="mt-3 line-clamp-2 text-[15px] leading-snug text-gray-700">
          신차 견적 비교, 카바딜러에서 내 조건에 맞는 딜러를 찾아보세요
        </p>

        <a
          href={TENPING_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 flex items-center justify-between rounded-lg px-5 py-4 no-underline transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#dcf3ff', color: '#234f83' }}
        >
          <span className="text-lg font-medium">상담 신청하기</span>
          <span className="text-2xl leading-none" aria-hidden="true">
            »
          </span>
        </a>
      </div>
    </aside>
  )
}
