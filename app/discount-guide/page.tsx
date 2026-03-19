'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = [
  { id: 'child', label: '👶 다자녀 감면' },
  { id: 'disabled', label: '♿ 장애인 감면' },
  { id: 'veteran', label: '🎖️ 국가유공자' },
  { id: 'warning', label: '🚨 추징 주의사항' },
]

const content: Record<string, { title: string; body: string }[]> = {
  child: [
    {
      title: '① 감면 대상 — 누가 받을 수 있나?',
      body: `18세 미만 자녀 2명 이상을 양육하는 가구가 대상입니다.
• 자녀 2명: 취득세의 50% 감면 (최대 70만원)
• 자녀 3명 이상: 취득세 전액 면제 (최대 140만원)

입양 자녀도 포함되며, 배우자의 자녀(전혼 포함)도 동거 시 인정됩니다.
2024년 세법 개정으로 2자녀 감면이 신설되었습니다.`,
    },
    {
      title: '② 대상 차량 — 어떤 차에 적용?',
      body: `승용차, 승합차(7인승 이하), 화물차 모두 가능합니다.
• 차량 1대에 한해 적용 (2대부터는 감면 없음)
• 취득가액 기준 한도: 140만원 (3자녀+), 70만원 (2자녀)
• 영업용 차량 제외

배기량·가격 제한 없이 적용되지만, 실제 감면액이 한도를 넘을 수 없습니다.`,
    },
    {
      title: '③ 신청 방법 — 어디서 어떻게?',
      body: `취득일로부터 60일 이내에 관할 시·군·구청 세무과에 신청합니다.
필요 서류:
• 가족관계증명서 (상세)
• 자동차 매매계약서 또는 취득 증빙서류
• 신분증

온라인 신청은 일부 지자체에서 위택스(Wetax)를 통해 가능합니다.
사전에 해당 지자체 세무과에 문의하는 것을 권장합니다.`,
    },
    {
      title: '④ 감면 후 주의사항 — 이것만은 꼭!',
      body: `감면 후 아래 행위 시 추징됩니다:
• 취득일로부터 1년 내 매도·이전
• 사업용(영업용)으로 전환
• 자녀가 모두 성인이 되어 요건 미충족 시

추징 시 감면받은 취득세 전액 + 가산세(미납 기간 × 일 0.022%) 부과됩니다.
감면 후 차량 처분 전 반드시 세무과에 문의하세요.`,
    },
  ],
  disabled: [
    {
      title: '① 감면 대상 — 어떤 장애 등급?',
      body: `장애인복지법에 따른 장애인으로 등록된 분이 대상입니다.
• 장애 1~3급 (구 기준): 취득세 전액 면제
• 장애 4~6급: 감면 혜택 없음

2019년 장애등급 폐지 후 현재는 '장애정도'로 구분됩니다:
• 심한 장애인 (기존 1~3급 해당) → 전액 면제
• 심하지 않은 장애인 (기존 4~6급) → 해당 없음`,
    },
    {
      title: '② 대상 차량 — 조건이 있나?',
      body: `승용차, 승합차(10인승 이하), 화물차(1톤 이하) 중 1대에 한합니다.
• 차량 1대 한정 (동일 세대 내 타 감면 차량 있으면 중복 불가)
• 배기량 2,000cc 이하 (승용차 기준)
• 가격 한도는 별도 없음 (단, 취득세 전액 면제 방식)

단, 장애인 본인 또는 주민등록상 동거 가족 명의로만 등록 가능합니다.`,
    },
    {
      title: '③ 신청 방법',
      body: `취득일로부터 60일 이내에 관할 시·군·구청 세무과에 신청합니다.
필요 서류:
• 장애인 복지카드 또는 장애인 증명서
• 자동차 매매계약서
• 주민등록등본 (동거 가족 명의 시)
• 신분증

위택스(wetax.go.kr)에서도 온라인 신청이 가능한 지자체가 있습니다.`,
    },
    {
      title: '④ 추징 조건 — 언제 토해내야 하나?',
      body: `아래 경우 감면받은 취득세가 추징됩니다:
• 취득일로부터 1년 내 타인에게 매도 또는 이전
• 장애 정도가 '심하지 않음'으로 변경된 경우
• 사망 후 상속인이 요건 미충족

단, 장애인 본인이 사망한 경우 사망 이전까지는 추징 없음.
상속 차량은 별도 취득세 과세 대상이므로 세무과 확인 필수.`,
    },
  ],
  veteran: [
    {
      title: '① 감면 대상 — 어떤 유공자?',
      body: `국가유공자 등 예우 및 지원에 관한 법률에 따른 국가유공자가 대상입니다.
• 전상군경, 공상군경, 4·19혁명부상자, 공상공무원, 특별공로상이자
• 상이등급 1~7급 판정자

※ 독립유공자 유족, 보훈보상대상자는 별도 확인이 필요합니다.
지자체마다 세부 기준이 다를 수 있으니 반드시 해당 시·군·구청 문의 바랍니다.`,
    },
    {
      title: '② 감면 범위',
      body: `취득세 전액 면제 (1대 한정)
• 승용차: 배기량 2,000cc 이하
• 승합차: 7인승 이하
• 화물차: 1톤 이하

단, 국가유공자 본인 또는 주민등록상 동거 직계가족 명의 차량에 한합니다.
타 감면(다자녀, 장애인 등)과 중복 적용은 불가합니다.`,
    },
    {
      title: '③ 신청 방법',
      body: `취득일로부터 60일 이내에 관할 시·군·구청 세무과 또는 위택스 신청.
필요 서류:
• 국가유공자증 (보훈처 발급)
• 자동차 매매계약서
• 주민등록등본
• 신분증

보훈처 지방청에서 확인서를 먼저 발급받은 후 세무과에 제출하는 절차가 필요할 수 있습니다.`,
    },
    {
      title: '④ 주의사항 및 추징',
      body: `감면 후 아래 경우 추징됩니다:
• 취득일로부터 1년 내 타인에게 양도
• 사업용으로 전환
• 국가유공자 본인 사망 후 상속 차량 (별도 취득세 발생)

감면 혜택은 생존 기간 동안, 요건 유지 시에만 유효합니다.
자녀 명의로 감면받은 경우, 분가 또는 세대 분리 시 추징 가능성 있으니 세무과 사전 확인 필수.`,
    },
  ],
  warning: [
    {
      title: '🚨 추징이란? 기본 개념',
      body: `취득세 감면을 받은 후 특정 요건을 위반하면, 감면받은 세액을 다시 납부해야 합니다. 이를 '추징'이라고 합니다.

추징 시 납부 금액:
• 원래 내야 했던 취득세 전액
• 가산세: 미납 기간 × 하루 0.022% (연 8.03% 수준)

즉, 감면 당시 아낀 세금 + 이자까지 한꺼번에 납부해야 합니다.`,
    },
    {
      title: '🚨 추징 주요 사유 TOP 4',
      body: `① 1년 내 매도 / 양도
감면 차량을 취득일로부터 1년 이내에 타인에게 팔거나 명의이전 시 전액 추징.

② 사업용(영업용) 전환
자가용으로 감면받은 차를 택시·배달·렌트카 등으로 전환 시 추징.

③ 감면 요건 소멸
자녀 수 감소, 장애 등급 변경, 국가유공자 취소 등으로 요건 미충족 시.

④ 허위 서류 제출
사실과 다른 서류를 제출하여 감면받은 경우 → 가산세 + 형사 처벌 가능.`,
    },
    {
      title: '🚨 감면 중복 적용 금지',
      body: `동일 차량에 여러 감면을 중복 적용하는 것은 불가합니다.
• 다자녀 + 장애인 → 중복 불가, 유리한 쪽 하나만 선택
• 전기차 + 다자녀 → 중복 불가
• 경차 세율 감면 + 다자녀 → 중복 불가

단, 취득세 감면 ≠ 개별소비세/부가세 감면이므로
전기차 구매 시 환경부 보조금 + 취득세 감면은 별개입니다.`,
    },
    {
      title: '🚨 추징 예방 체크리스트',
      body: `감면 차량 보유 중 반드시 확인할 사항:

□ 취득일로부터 1년이 지났는가?
□ 차량을 사업용으로 쓸 계획이 있는가?
□ 감면 요건(자녀 수, 장애 등급 등)이 변경되었는가?
□ 동거 가족 세대 분리 예정인가?

위 항목 중 하나라도 해당된다면, 반드시 관할 시·군·구청 세무과에 사전 문의하세요.
자진 신고 시 가산세를 줄일 수 있습니다.`,
    },
  ],
}

export default function DiscountGuidePage() {
  const [activeTab, setActiveTab] = useState('child')
  const [openSection, setOpenSection] = useState<number | null>(0)

  const currentContent = content[activeTab]

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm text-gray-400 mb-2">
          <Link href="/" className="hover:text-gray-600">홈</Link>
          <span className="mx-2">/</span>
          <span>취득세 감면 혜택 완벽 가이드</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          취득세 감면 혜택 완벽 가이드
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          다자녀·장애인·국가유공자 등 취득세 감면 조건, 신청 방법, 추징 주의사항을 한눈에 확인하세요.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setOpenSection(0) }}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeTab === tab.id
                ? tab.id === 'warning'
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion Content */}
      <div className="space-y-3">
        {currentContent.map((section, idx) => {
          const isOpen = openSection === idx
          const isWarning = activeTab === 'warning'
          return (
            <div
              key={idx}
              className={`border rounded-xl overflow-hidden transition-all ${
                isOpen
                  ? isWarning
                    ? 'border-red-300 shadow-sm'
                    : 'border-blue-300 shadow-sm'
                  : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpenSection(isOpen ? null : idx)}
                className={`w-full text-left px-5 py-4 flex items-center justify-between gap-3 ${
                  isOpen
                    ? isWarning
                      ? 'bg-red-50'
                      : 'bg-blue-50'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className="font-semibold text-gray-800 text-sm md:text-base">
                  {section.title}
                </span>
                <span className={`text-lg flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </button>
              {isOpen && (
                <div className="px-5 py-4 bg-white">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                    {section.body}
                  </pre>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="mt-10 p-6 bg-gray-50 rounded-2xl text-center">
        <p className="text-gray-600 mb-4 text-sm">감면 조건을 확인했다면, 실제 세금을 계산해보세요.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            신차 취득세 계산하기 →
          </Link>
          <Link
            href="/used-car"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-orange-600 transition-colors"
          >
            중고차 취득세 계산하기 →
          </Link>
        </div>
      </div>
    </main>
  )
}
