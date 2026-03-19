import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '자동차 취등록세 계산기 FAQ | 자주 묻는 질문',
  description: '자동차 취등록세 계산기 사용법, 세율 기준, 신차·중고차 취득세 계산 방법 등 자주 묻는 질문을 모았습니다. 2026년 최신 기준.',
  alternates: { canonical: '/faq' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '어떤 가격을 입력해야 하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '부가세·옵션 포함, 탁송료를 제외한 실구매가를 입력하세요. 계약서상 "공급가액 + 부가세 + 옵션" 합산 금액이 기준입니다.' },
    },
    {
      '@type': 'Question',
      name: '하이브리드 취득세 감면 아직도 되나요?',
      acceptedAnswer: { '@type': 'Answer', text: '아닙니다. 하이브리드 취득세 감면(40만원)은 2024년 12월 31일부로 완전 폐지되었습니다. 2026년 현재 하이브리드는 일반 승용차와 동일하게 7% 세율이 적용됩니다.' },
    },
    {
      '@type': 'Question',
      name: '취득세를 카드로 납부할 수 있나요?',
      acceptedAnswer: { '@type': 'Answer', text: '위택스(wetax.go.kr) 또는 관할 시·군·구청을 통해 신용카드 납부가 가능합니다. 일부 카드사는 무이자 할부도 지원합니다. 단, 카드 수수료가 별도로 부과될 수 있습니다.' },
    },
    {
      '@type': 'Question',
      name: '자녀가 2명인데 다자녀 감면 받을 수 있나요?',
      acceptedAnswer: { '@type': 'Answer', text: '18세 미만 자녀 2명이면 취득세의 50% 감면, 최대 70만원 한도가 적용됩니다. 자녀 3명 이상은 최대 140만원 감면됩니다. 입양 자녀와 배우자의 자녀도 동거 시 포함됩니다.' },
    },
    {
      '@type': 'Question',
      name: '취득세 납부 기한은 언제까지인가요?',
      acceptedAnswer: { '@type': 'Answer', text: '차량 취득일(등록일)로부터 60일 이내에 납부해야 합니다. 기한 초과 시 20% 가산세와 일 단위 이자가 부과됩니다.' },
    },
    {
      '@type': 'Question',
      name: '취득세 중복 감면이 가능한가요?',
      acceptedAnswer: { '@type': 'Answer', text: '원칙적으로 불가합니다. 전기차·다자녀·장애인·국가유공자 감면 중 가장 유리한 한 가지만 적용됩니다.' },
    },
    {
      '@type': 'Question',
      name: '법인 명의 차량 취득세는 어떻게 되나요?',
      acceptedAnswer: { '@type': 'Answer', text: '법인 차량도 개인과 동일한 세율이 적용됩니다. 단, 다자녀·장애인 등 개인 대상 감면은 법인에게는 적용되지 않습니다. 영업용 등록 시에는 차종 무관 4% 세율이 적용됩니다.' },
    },
    {
      '@type': 'Question',
      name: '타 지역에 차량을 등록하면 취득세가 달라지나요?',
      acceptedAnswer: { '@type': 'Answer', text: '취득세율은 전국 동일합니다. 다만 지역개발공채 매입 비율(공채율)은 지역마다 다릅니다. 서울 12%, 경기 10~12% 등 지역별로 공채깡 비용이 달라집니다.' },
    },
  ],
}

const FAQ_ITEMS = [
  {
    category: '계산기 사용법',
    items: [
      {
        q: '어떤 가격을 입력해야 하나요?',
        a: '부가세·옵션 포함, 탁송료를 제외한 실구매가를 입력하세요. 계약서상 "공급가액 + 부가세 + 옵션" 합산 금액이 기준입니다. 탁송료(보통 10~30만원)는 취득세 과세표준에 포함되지 않습니다.',
      },
      {
        q: '계산 결과에 공채비용이 포함되나요?',
        a: '네. 지역을 선택하면 지역개발공채 매입 비용과 즉시 매도(공채깡) 시 발생하는 할인 비용까지 자동으로 계산됩니다. 공채깡 비용은 실제 지출 부담액이므로 총비용에 포함해 표시됩니다.',
      },
      {
        q: '중고차 계산기에서 시가표준액이 뭔가요?',
        a: '중고차 취득세 과세 기준가격입니다. 신차 기준가격 × 잔가율(연식별 감가율)로 계산됩니다. 실거래가와 시가표준액 중 높은 쪽이 과세표준이 됩니다. 계산기에 연식을 입력하면 자동으로 적용됩니다.',
      },
      {
        q: '감면 옵션은 어떻게 적용되나요?',
        a: '계산기 내 감면 선택란에서 전기차·다자녀·장애인 등을 선택하면 자동 적용됩니다. 감면은 중복 적용이 불가하며, 가장 유리한 항목 하나만 반영됩니다.',
      },
    ],
  },
  {
    category: '취득세 세율 기준',
    items: [
      {
        q: '자동차 취득세율은 차종마다 다른가요?',
        a: '다릅니다. 비영업용 승용차 7%, 경차(1,000cc 이하) 4%, 화물차·11인승 이상 승합차 5%, 영업용(사업용) 4%가 적용됩니다. 지방세법 제7조 기준.',
      },
      {
        q: '하이브리드 취득세 감면 아직도 되나요?',
        a: '아닙니다. 하이브리드 취득세 감면(40만원)은 2024년 12월 31일부로 완전 폐지되었습니다. 2026년 1월 1일 이후 등록 차량은 일반 승용차와 동일하게 7% 전액이 적용됩니다. 계약일이 2024년이어도 등록일 기준으로 판단하므로 주의가 필요합니다.',
      },
      {
        q: '취득세는 실거래가 기준인가요, 신차 출고가 기준인가요?',
        a: '신차는 취득 당시 실구매가(부가세·옵션 포함, 탁송료 제외)가 과세표준입니다. 중고차는 실거래가와 시가표준액(신차 기준가격 × 잔가율) 중 높은 금액이 기준입니다. 다운계약서를 쓰더라도 시가표준액보다 낮게 신고하면 추후 추징됩니다.',
      },
      {
        q: '취득세 중복 감면이 가능한가요?',
        a: '원칙적으로 불가합니다. 전기차·다자녀·장애인·국가유공자 감면 중 가장 유리한 한 가지만 적용됩니다. 경차의 경우 4% 세율은 차종 자체의 기본 세율이며, 경차 추가 감면(75만원 한도)과 다자녀 감면은 중복 불가합니다.',
      },
      {
        q: '취득세 납부 기한은 언제까지인가요?',
        a: '차량 취득일(등록일)로부터 60일 이내에 납부해야 합니다. 기한 초과 시 20% 가산세와 일 단위 이자가 부과됩니다. 신차 딜러 구매 시 대부분 대행 처리하지만, 개인 간 중고차 거래는 본인이 직접 신고해야 합니다.',
      },
    ],
  },
  {
    category: '감면·특수 케이스',
    items: [
      {
        q: '전기차 취득세 감면은 2026년에도 유지되나요?',
        a: '네. 순수 전기차(BEV)는 2026년에도 최대 140만원 감면이 유지됩니다. 플러그인 하이브리드(PHEV)는 전기차 감면 대상이 아니며 일반 하이브리드와 동일하게 7% 전액 적용됩니다.',
      },
      {
        q: '경차 감면은 얼마나 되나요?',
        a: '비영업용 경차(배기량 1,000cc 이하)는 4% 세율이 적용되고 취득세액 중 최대 75만원을 추가 감면합니다. 예를 들어 취득세가 80만원이면 75만원 감면 후 5만원만 납부합니다.',
      },
      {
        q: '자녀가 2명인데 다자녀 감면 받을 수 있나요?',
        a: '18세 미만 자녀 2명이면 취득세의 50% 감면, 최대 70만원 한도가 적용됩니다. 자녀 3명 이상은 최대 140만원(전액 면제 수준) 감면됩니다. 입양 자녀와 배우자의 자녀도 동거 시 포함됩니다.',
      },
      {
        q: '취득세를 카드로 납부할 수 있나요?',
        a: '위택스(wetax.go.kr) 또는 관할 시·군·구청에서 신용카드 납부가 가능합니다. 일부 카드사는 무이자 할부도 지원합니다. 단, 카드 수수료가 별도로 부과될 수 있으니 확인 후 납부하세요.',
      },
      {
        q: '법인 명의 차량 취득세는 어떻게 되나요?',
        a: '법인 차량도 개인과 동일한 세율이 적용됩니다. 단, 다자녀·장애인 등 개인 대상 감면은 법인에게는 적용되지 않습니다. 영업용 등록 시에는 차종 무관 4% 세율이 적용됩니다.',
      },
      {
        q: '타 지역에 차량을 등록하면 공채 비용이 달라지나요?',
        a: '취득세율은 전국 동일합니다. 다만 지역개발공채 매입 비율(공채율)은 지역마다 다릅니다. 서울 12%, 경기 10~12% 등 지역별로 공채깡 비용이 달라지므로 계산기에서 등록 지역을 정확히 선택하세요.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-2xl mx-auto">
        <div className="mt-4 mb-2">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">FAQ</p>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">취등록세 계산기<br />자주 묻는 질문</h1>
          <p className="text-gray-400 text-sm mt-2">계산기 사용법부터 세율 기준·감면까지 핵심만 정리했습니다</p>
        </div>
        <p className="text-xs text-gray-400 mb-8">2026년 3월 기준 · 지방세법 제7조 · 행정안전부 고시</p>

        <div className="space-y-10">
          {FAQ_ITEMS.map((section) => (
            <section key={section.category}>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 px-1">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <details key={i} className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <summary className="flex items-start justify-between gap-3 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                      <span className="text-sm font-semibold text-gray-800 leading-relaxed">Q. {item.q}</span>
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs group-open:bg-blue-600 group-open:text-white transition-all mt-0.5">
                        <svg className="w-3 h-3 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-4 pt-1 border-t border-gray-50">
                      <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Subpage links */}
        <div className="mt-10 space-y-3">
          <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-green-800">감면 혜택 더 자세히 보기</p>
              <p className="text-xs text-green-600">다자녀·장애인·국가유공자·추징 주의사항 상세 가이드</p>
            </div>
            <Link href="/discount-guide" className="flex-shrink-0 text-sm font-bold text-green-700 bg-white border border-green-300 px-4 py-2 rounded-xl hover:bg-green-100 transition-colors">
              가이드 보기 →
            </Link>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-blue-800">하이브리드·전기차 취득세 완벽 정리</p>
              <p className="text-xs text-blue-600">2026년 변경 사항 팩트체크 + 절세 방법</p>
            </div>
            <Link href="/eco-car" className="flex-shrink-0 text-sm font-bold text-blue-700 bg-white border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
              상세 보기 →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 p-5 bg-gray-50 rounded-2xl">
          <p className="text-sm font-bold text-gray-800 mb-1">직접 계산해보고 싶다면?</p>
          <p className="text-xs text-gray-500 mb-3">차량 가격을 입력하면 취득세·공채비용을 즉시 계산해드립니다.</p>
          <div className="flex gap-2">
            <Link href="/" className="flex-1 text-center py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
              취등록세 계산기
            </Link>
            <Link href="/used-car" className="flex-1 text-center py-2.5 bg-white text-blue-600 text-sm font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">
              중고차 계산기
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>본 FAQ는 2026년 3월 기준이며 법령 변경 시 내용이 달라질 수 있습니다.</p>
        </div>
      </div>
    </main>
  )
}
