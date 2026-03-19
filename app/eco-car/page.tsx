'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = [
  { id: 'hybrid', label: '🔍 하이브리드 팩트체크' },
  { id: 'electric', label: '⚡ 전기차 혜택' },
  { id: 'alternative', label: '💡 절세 방법' },
]

export default function EcoCarPage() {
  const [activeTab, setActiveTab] = useState('hybrid')

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 mb-5">
        <Link href="/" className="hover:text-gray-600">홈</Link>
        <span className="mx-2">/</span>
        <span>친환경차 취득세 가이드</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
          2026년 최신 기준
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
          🌿 친환경차 취득세 완벽 가이드
        </h1>
        <p className="text-gray-500 text-sm">
          하이브리드·전기차 취득세, 2026년에 달라진 것은? 혼란스러운 정책 변화를 팩트로 정리합니다.
        </p>
      </div>

      {/* Alert Banner */}
      <div className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex gap-3 items-start">
        <span className="text-xl flex-shrink-0">🚨</span>
        <div>
          <p className="font-bold text-red-700 text-sm mb-1">하이브리드 취득세 감면 — 2024년 12월 31일 완전 종료</p>
          <p className="text-red-600 text-sm">2025년 1월 1일 이후 하이브리드 구매 시 일반 승용차와 동일한 <strong>7% 취득세</strong> 전액 적용. 감면 0원.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeTab === tab.id
                ? 'bg-green-600 text-white border-green-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: 하이브리드 팩트체크 ── */}
      {activeTab === 'hybrid' && (
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-5">하이브리드 취득세, 지금도 감면되나요?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-xs text-gray-500 mb-1 font-medium">2024년 이전</p>
                <p className="text-3xl font-black text-green-600 mb-1">−40만</p>
                <p className="text-xs text-gray-400">취득세 감면</p>
              </div>
              <div className="hidden md:flex items-center justify-center text-2xl text-gray-300 font-black">→</div>
              <div className="bg-red-50 rounded-xl p-4 text-center border-2 border-red-300">
                <p className="text-xs text-red-500 mb-1 font-bold">2025년~ 지금</p>
                <p className="text-3xl font-black text-red-600 mb-1">감면 0원</p>
                <p className="text-xs text-red-400">7% 전액 납부</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-bold text-gray-700 border-b border-gray-200">구분</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-gray-500 border-b border-gray-200">~2024년 12월</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-red-600 border-b border-gray-200">2025년 1월~ (현재)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">하이브리드</td>
                    <td className="px-4 py-3 text-center text-sm text-green-600 font-bold">7% → 최대 40만원 감면</td>
                    <td className="px-4 py-3 text-center text-sm text-red-600 font-bold">7% (감면 없음) ❌</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">순수 전기차</td>
                    <td className="px-4 py-3 text-center text-sm text-green-600 font-bold">최대 140만원 감면</td>
                    <td className="px-4 py-3 text-center text-sm text-green-600 font-bold">최대 140만원 감면 ✅</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-600">일반 승용차</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">7%</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4">💸 실제로 얼마나 차이 나나요?</h3>
            <p className="text-sm text-gray-500 mb-4">예시: 쏘나타 하이브리드 3,500만원 구매 시</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <p className="text-xs font-bold text-green-600 mb-2">✅ 2024년 이전 구매</p>
                <p className="text-4xl font-black text-green-700 mb-1">205만원</p>
                <p className="text-sm text-green-600">취득세 245만원 − 감면 40만원</p>
              </div>
              <div className="bg-red-50 rounded-xl p-5 border-2 border-red-300">
                <p className="text-xs font-bold text-red-500 mb-2">❌ 2025년~ 현재 구매</p>
                <p className="text-4xl font-black text-red-600 mb-1">245만원</p>
                <p className="text-sm text-red-500">7% 전액 · 40만원 더 납부</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-3">왜 폐지됐나요?</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">정부 친환경차 정책이 <strong>하이브리드 → 순수 전기차 중심</strong>으로 전환</p>
              </li>
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">하이브리드는 내연기관 병용으로 <strong>과도기 기술</strong>로 판단, 혜택 종료</p>
              </li>
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                <p className="text-sm text-gray-700">2024년 말 일몰 조항 도래 후 <strong>연장 없이 자동 폐지</strong></p>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="font-bold text-amber-800 text-sm mb-2">Q. 2024년 12월에 계약하고 2025년에 출고했어요. 감면 받을 수 있나요?</p>
            <p className="text-amber-700 text-sm leading-relaxed">A. 취득세는 <strong>등록일(취득일) 기준</strong>으로 판단합니다. 계약일이 2024년이어도 <strong>차량 등록이 2025년 1월 이후라면 감면 불가</strong>입니다.</p>
          </div>
        </div>
      )}

      {/* ── TAB: 전기차 혜택 ── */}
      {activeTab === 'electric' && (
        <div className="space-y-5">
          <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-5">⚡ 전기차 취득세 감면 — 2026년도 유지</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <p className="text-xs font-bold text-green-600 mb-1">최대 감면 한도</p>
                <p className="text-3xl font-black text-green-700">140만원</p>
                <p className="text-xs text-gray-500 mt-1">취득세에서 직접 차감</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                <p className="text-xs font-bold text-blue-600 mb-1">기본 취득세율</p>
                <p className="text-3xl font-black text-blue-700">7%</p>
                <p className="text-xs text-gray-500 mt-1">감면 후 실납부 감소</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                <p className="text-xs font-bold text-purple-600 mb-1">full 감면 기준가</p>
                <p className="text-3xl font-black text-purple-700">2,000만↑</p>
                <p className="text-xs text-gray-500 mt-1">이상이면 140만원 전액</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-bold text-gray-700 border-b border-gray-200">차량 가격</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-gray-700 border-b border-gray-200">취득세 (7%)</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-green-600 border-b border-gray-200">감면액</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-green-700 border-b border-gray-200">실납부</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { price: '3,000만원', tax: '210만원', discount: '140만원', pay: '70만원' },
                    { price: '4,500만원', tax: '315만원', discount: '140만원', pay: '175만원' },
                    { price: '6,000만원', tax: '420만원', discount: '140만원', pay: '280만원' },
                    { price: '8,500만원', tax: '595만원', discount: '140만원', pay: '455만원' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800 border-b border-gray-100">{row.price}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600 border-b border-gray-100">{row.tax}</td>
                      <td className="px-4 py-3 text-center text-sm text-green-600 font-bold border-b border-gray-100">−{row.discount}</td>
                      <td className="px-4 py-3 text-center text-sm text-green-700 font-black border-b border-gray-100">{row.pay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white shadow-md">
            <h3 className="font-black text-lg mb-2">💰 보조금도 꼭 챙기세요!</h3>
            <p className="text-blue-100 text-sm mb-4">전기차 국고 보조금 + 지자체 보조금은 차종·지역마다 최대 수백만원 차이납니다.</p>
            <div className="flex flex-wrap gap-2">
              <a href="https://www.ev.or.kr" target="_blank" rel="noopener noreferrer"
                className="bg-white text-blue-700 font-bold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                무공해차 통합누리집 →
              </a>
              <a href="https://www.cleancar.or.kr" target="_blank" rel="noopener noreferrer"
                className="bg-white/20 text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-colors border border-white/40">
                클린카 보조금 조회 →
              </a>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4">전기차 취득세 감면 주의사항</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-4 bg-green-50 rounded-xl border border-green-200">
                <span className="text-base flex-shrink-0">✅</span>
                <p className="text-sm text-gray-700">승용·승합·화물차 <strong>차종 무관</strong> 적용</p>
              </div>
              <div className="flex gap-3 items-start p-4 bg-green-50 rounded-xl border border-green-200">
                <span className="text-base flex-shrink-0">✅</span>
                <p className="text-sm text-gray-700">차량 <strong>1대에 한해</strong> 적용</p>
              </div>
              <div className="flex gap-3 items-start p-4 bg-red-50 rounded-xl border border-red-200">
                <span className="text-base flex-shrink-0">❌</span>
                <p className="text-sm text-gray-700"><strong>플러그인 하이브리드(PHEV) 불가</strong> — 전기차 감면 적용 안 됨. 일반 하이브리드와 동일하게 7% 전액</p>
              </div>
              <div className="flex gap-3 items-start p-4 bg-red-50 rounded-xl border border-red-200">
                <span className="text-base flex-shrink-0">❌</span>
                <p className="text-sm text-gray-700"><strong>타 감면과 중복 불가</strong> — 다자녀·장애인 감면 중 유리한 쪽 1가지만 선택</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: 절세 방법 ── */}
      {activeTab === 'alternative' && (
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-1">하이브리드 구매할 건데, 절세할 방법 없나요?</h2>
            <p className="text-gray-500 text-sm mb-6">하이브리드 자체 감면은 없지만, 본인 조건에 따라 다른 방법으로 절세가 가능합니다.</p>

            <div className="space-y-4">
              <div className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-lg">방법 1</span>
                  <h3 className="font-bold text-blue-900 text-sm">다자녀 감면 — 최대 140만원</h3>
                </div>
                <p className="text-sm text-blue-800 mb-3">18세 미만 자녀 2명 이상이면 차종 무관하게 감면 적용됩니다.</p>
                <div className="bg-white rounded-lg p-3 grid grid-cols-2 gap-2">
                  <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium">자녀 2명</p>
                    <p className="text-xl font-black text-blue-700">50% 감면</p>
                    <p className="text-xs text-gray-500">최대 70만원</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium">자녀 3명+</p>
                    <p className="text-xl font-black text-blue-700">전액 면제</p>
                    <p className="text-xs text-gray-500">최대 140만원</p>
                  </div>
                </div>
              </div>

              <div className="border border-purple-200 rounded-xl p-5 bg-purple-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-lg">방법 2</span>
                  <h3 className="font-bold text-purple-900 text-sm">장애인·국가유공자 감면</h3>
                </div>
                <p className="text-sm text-purple-800 mb-2">심한 장애인(구 1~3급) 또는 상이 국가유공자는 <strong>취득세 전액 면제</strong>.</p>
                <p className="text-xs text-purple-600 bg-purple-100 inline-block px-2 py-1 rounded-lg">※ 배기량 2,000cc 이하 승용차 · 1대 한정</p>
              </div>

              <div className="border border-green-200 rounded-xl p-5 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-lg">방법 3</span>
                  <h3 className="font-bold text-green-900 text-sm">전기차로 전환</h3>
                </div>
                <p className="text-sm text-green-800 mb-3">하이브리드 대신 순수 전기차(BEV)를 선택하면 취득세 감면 + 국고보조금까지.</p>
                <div className="bg-white rounded-lg p-3 text-sm text-gray-700">
                  <p className="mb-1 text-xs text-gray-500">예) 5,000만원 전기차 기준</p>
                  <p>취득세 350만원 − 140만원 감면 = <strong className="text-green-700">210만원</strong></p>
                  <p className="text-green-600 text-xs mt-1">+ 국고보조금 최대 650만원 별도</p>
                </div>
              </div>

              <div className="border border-orange-200 rounded-xl p-5 bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">방법 4</span>
                  <h3 className="font-bold text-orange-900 text-sm">경차 선택 — 세율 4%</h3>
                </div>
                <p className="text-sm text-orange-800">배기량 1,000cc 이하 경차는 세율 자체가 <strong>4%</strong>로 낮고, 추가로 75만원 한도 감면까지 적용됩니다.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4">차종별 취득세 한눈에 비교 (2026 기준)</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-bold text-gray-700 border-b border-gray-200">차종</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-gray-700 border-b border-gray-200">세율</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-gray-700 border-b border-gray-200">감면</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: '일반 승용차', rate: '7%', discount: '없음', highlight: false, positive: false },
                    { type: '하이브리드 (HEV/PHEV)', rate: '7%', discount: '❌ 없음 (2025~ 폐지)', highlight: true, positive: false },
                    { type: '순수 전기차 (BEV)', rate: '7%', discount: '✅ 최대 140만원 차감', highlight: false, positive: true },
                    { type: '경차 (1,000cc 이하)', rate: '4%', discount: '✅ 최대 75만원 추가', highlight: false, positive: true },
                    { type: '화물·11인승 이상', rate: '5%', discount: '없음', highlight: false, positive: false },
                    { type: '영업용 차량', rate: '4%', discount: '없음', highlight: false, positive: false },
                  ].map((row, i) => (
                    <tr key={i} className={row.highlight ? 'bg-red-50' : i % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className={`px-4 py-3 text-sm font-semibold border-b border-gray-100 ${row.highlight ? 'text-red-700' : 'text-gray-800'}`}>{row.type}</td>
                      <td className={`px-4 py-3 text-center text-sm font-bold border-b border-gray-100 ${row.highlight ? 'text-red-600' : 'text-gray-700'}`}>{row.rate}</td>
                      <td className={`px-4 py-3 text-center text-sm border-b border-gray-100 ${row.highlight ? 'text-red-500 font-semibold' : row.positive ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>{row.discount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 p-5 bg-gray-50 rounded-2xl text-center border border-gray-200">
        <p className="text-gray-600 text-sm mb-3">내 차의 실제 취득세를 계산해보세요.</p>
        <div className="flex gap-2 justify-center flex-wrap">
          <Link href="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
            신차 취득세 계산하기 →
          </Link>
          <Link href="/used-car" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
            중고차 취득세 계산하기 →
          </Link>
        </div>
      </div>
    </main>
  )
}
