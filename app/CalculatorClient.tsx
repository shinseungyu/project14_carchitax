'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Check } from 'lucide-react'
import TopAd from '@/components/Ads/TopAd'
import InFeedAd from '@/components/Ads/InFeedAd'
import RegionSelector from '@/components/RegionSelector'
import { REGIONS, RegionValue } from '@/data/regions'

type Purpose = 'private' | 'commercial'
type CarBodyType = 'small' | 'sedan' | 'van' | 'large_van' | 'cargo' | 'motorcycle'
type EcoType = 'none' | 'electric'
type ChildDiscount = 'none' | 'two' | 'three_plus'

const CAR_TYPES: { value: CarBodyType; label: string; rate: string }[] = [
  { value: 'small',      label: '경차',        rate: '4%' },
  { value: 'sedan',      label: '승용차',      rate: '7%' },
  { value: 'van',        label: '승합 7~10인', rate: '5%' },
  { value: 'large_van',  label: '승합 11인+',  rate: '5%' },
  { value: 'cargo',      label: '화물차',      rate: '5%' },
  { value: 'motorcycle', label: '이륜차',      rate: '2%' },
]

function getTaxRate(purpose: Purpose, carType: CarBodyType, displacement: number): number {
  if (purpose === 'commercial') return 0.04
  if (carType === 'motorcycle') return displacement > 0 && displacement <= 125 ? 0 : 0.02
  if (carType === 'small') return 0.04
  if (carType === 'sedan') return 0.07
  return 0.05
}

function calcTax({ price, purpose, carType, displacement, region, ecoType, childDiscount, welfareTypes }: {
  price: number; purpose: Purpose; carType: CarBodyType; displacement: number
  region: RegionValue; ecoType: EcoType; childDiscount: ChildDiscount; welfareTypes: string[]
}) {
  const regionInfo = REGIONS.find(r => r.value === region)!
  const taxRate = getTaxRate(purpose, carType, displacement)
  const acquisitionTax = Math.floor(price * taxRate)

  const smallCarDiscount = (purpose === 'private' && carType === 'small') ? Math.min(acquisitionTax, 750_000) : 0
  const ecoDiscount = ecoType === 'electric' ? Math.min(acquisitionTax, 1_400_000) : 0

  let multiChildDiscount = 0
  const isLargeVehicle = carType === 'van' || carType === 'large_van'
  if (childDiscount === 'two') {
    multiChildDiscount = Math.min(Math.floor(acquisitionTax * 0.5), 700_000)
  } else if (childDiscount === 'three_plus') {
    multiChildDiscount = isLargeVehicle
      ? (acquisitionTax <= 2_000_000 ? acquisitionTax : acquisitionTax - Math.floor((acquisitionTax - 2_000_000) * 0.15))
      : Math.min(acquisitionTax, 1_400_000)
  }

  const welfareQualifies = welfareTypes.length > 0 && purpose !== 'commercial' && carType !== 'motorcycle'
    && (carType === 'cargo' || carType === 'van' || carType === 'large_van' || (displacement > 0 && displacement <= 2000))
  const welfareDiscount = welfareQualifies ? acquisitionTax : 0

  const totalDiscount = welfareQualifies
    ? acquisitionTax
    : Math.min(acquisitionTax, smallCarDiscount + ecoDiscount + multiChildDiscount)
  const finalTax = Math.max(0, acquisitionTax - totalDiscount)

  const bondAmount = carType === 'motorcycle' ? 0 : Math.floor(price * regionInfo.bondRate)
  const bondDiscount = carType === 'motorcycle' ? 0 : Math.floor(bondAmount * regionInfo.discountRate)
  const otherFees = 120_000

  return {
    acquisitionTax, taxRate, totalDiscount, finalTax,
    bondAmount, bondDiscount, otherFees,
    totalCost: finalTax + bondDiscount + otherFees,
    discountBreakdown: { smallCarDiscount, ecoDiscount, multiChildDiscount, welfareDiscount },
  }
}

function DoneStep({ num, label, summary, onEdit }: { num: number; label: string; summary: string; onEdit: () => void }) {
  return (
    <div className="bg-white rounded-2xl px-5 py-3.5 border border-gray-100 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
          <Check size={12} strokeWidth={3} />
        </span>
        <div>
          <p className="text-xs text-gray-400">{num}단계 · {label}</p>
          <p className="text-sm font-semibold text-gray-800">{summary}</p>
        </div>
      </div>
      <button onClick={onEdit} className="text-xs text-blue-500 font-semibold hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">수정</button>
    </div>
  )
}

function NextBtn({ label = '다음', disabled = false, onClick }: { label?: string; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="mt-5 w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 active:bg-blue-800 transition-colors"
    >
      {label} →
    </button>
  )
}

export default function CalculatorClient() {
  const [step, setStep] = useState(1)

  const [price, setPrice] = useState('')
  const [purpose, setPurpose] = useState<Purpose>('private')
  const [carType, setCarType] = useState<CarBodyType>('sedan')
  const [displacement, setDisplacement] = useState('')
  const [region, setRegion] = useState<RegionValue>('seoul')
  const [ecoType, setEcoType] = useState<EcoType>('none')
  const [childDiscount, setChildDiscount] = useState<ChildDiscount>('none')
  const [welfareTypes, setWelfareTypes] = useState<string[]>([])
  const [showDetail, setShowDetail] = useState(false)

  const priceNum = parseFloat(price.replace(/,/g, '')) || 0
  const displacementNum = Number(displacement) || 0
  const isMoto125 = carType === 'motorcycle' && displacementNum > 0 && displacementNum <= 125

  const result = useMemo(() => {
    if (step < 5 || priceNum <= 0) return null
    return calcTax({ price: priceNum, purpose, carType, displacement: displacementNum, region, ecoType, childDiscount, welfareTypes })
  }, [step, priceNum, purpose, carType, displacementNum, region, ecoType, childDiscount, welfareTypes])

  const fmt = (n: number) => n.toLocaleString('ko-KR')
  const handlePrice = (v: string) => {
    const raw = v.replace(/,/g, '').replace(/[^0-9]/g, '')
    setPrice(raw ? Number(raw).toLocaleString('ko-KR') : '')
  }
  const toggleWelfare = (v: string) =>
    setWelfareTypes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])

  const regionInfo = REGIONS.find(r => r.value === region)!
  const carTypeLabel = CAR_TYPES.find(t => t.value === carType)?.label ?? ''
  const purposeLabel = purpose === 'private' ? '비영업용' : '영업용'
  const discountParts = [
    ecoType === 'electric' ? '전기차' : '',
    childDiscount === 'two' ? '다자녀 2명' : childDiscount === 'three_plus' ? '다자녀 3명+' : '',
    welfareTypes.length > 0 ? '복지감면' : '',
  ].filter(Boolean)

  return (
    <>
      <TopAd />

      <div className="mt-6 mb-6">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">취등록세(취득세) 계산기</p>
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          취등록세(취득세) 계산기
        </h1>
        <p className="text-gray-400 text-sm mt-2">경차·전기차·다자녀·복지 감면 자동 반영</p>
      </div>

      <div>
        {/* 진행 바 */}
        <div className="mb-5">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-300 ${step > n ? 'bg-blue-600' : step === n ? 'bg-blue-400' : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{step <= 4 ? `${step} / 4단계` : '계산 완료'}</p>
        </div>

        <div className="space-y-3">

          {/* ── STEP 1: 차량 가격 ── */}
          {step === 1 ? (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                <span className="text-sm font-bold text-gray-700">차량 가격</span>
              </div>

              {/* 인기 차종 템플릿 */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 font-medium mb-2">인기 차종 바로 선택</p>
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {[
                    { label: '아반떼', price: 25_000_000 },
                    { label: '쏘나타', price: 33_000_000 },
                    { label: '쏘렌토', price: 42_000_000 },
                    { label: '그랜저', price: 48_000_000 },
                    { label: '카니발', price: 45_000_000 },
                    { label: '제네시스 G80', price: 68_000_000 },
                  ].map(t => (
                    <button
                      key={t.label}
                      onClick={() => setPrice(t.price.toLocaleString('ko-KR'))}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                        priceNum === t.price
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {t.label}
                      <span className={`ml-1 ${priceNum === t.price ? 'text-blue-200' : 'text-gray-400'}`}>
                        {(t.price / 10000).toFixed(0)}만
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={price}
                  onChange={e => handlePrice(e.target.value)}
                  placeholder="0"
                  autoFocus
                  className="w-full text-3xl font-bold text-gray-900 placeholder-gray-200 pr-8 outline-none border-b-2 border-gray-200 focus:border-blue-500 pb-2 transition-colors bg-transparent"
                />
                <span className="absolute right-0 bottom-2.5 text-sm text-gray-400 font-medium">원</span>
              </div>
              {priceNum > 0 ? (
                <p className="mt-2 text-xs text-gray-400">{(priceNum / 10000).toFixed(0)}만원</p>
              ) : (
                <p className="mt-2 text-xs text-gray-400">부가세·옵션 포함, 탁송료 제외한 실구매가 기준</p>
              )}

              {/* 퀵 입력 버튼 */}
              <div className="mt-3 flex gap-2">
                {[100, 500, 1000].map(v => (
                  <button
                    key={v}
                    onClick={() => handlePrice(String((priceNum + v * 10000).toString()))}
                    className="flex-1 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    +{v}만
                  </button>
                ))}
                {priceNum > 0 && (
                  <button
                    onClick={() => setPrice('')}
                    className="px-3 py-2 text-xs font-semibold text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    초기화
                  </button>
                )}
              </div>

              <NextBtn disabled={priceNum <= 0} onClick={() => setStep(2)} />
            </div>
          ) : (
            <DoneStep num={1} label="차량 가격" summary={`${price}원 (${(priceNum / 10000).toFixed(0)}만원)`} onEdit={() => setStep(1)} />
          )}

          {/* ── STEP 2: 차량 정보 ── */}
          {step === 2 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                <span className="text-sm font-bold text-gray-700">차량 정보</span>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-medium mb-2">차량 용도</p>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                  {([
                    { value: 'private',    label: '비영업용' },
                    { value: 'commercial', label: '영업용' },
                  ] as const).map(p => (
                    <button
                      key={p.value}
                      onClick={() => setPurpose(p.value)}
                      className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                        purpose === p.value ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-medium mb-2">차량 종류</p>
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {CAR_TYPES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setCarType(t.value)}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all whitespace-nowrap ${
                        carType === t.value
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {t.label}
                      <span className={`ml-1.5 text-xs ${carType === t.value ? 'text-blue-200' : 'text-gray-400'}`}>{t.rate}</span>
                    </button>
                  ))}
                </div>
                {purpose === 'commercial' && (
                  <p className="mt-2 text-xs text-blue-500">영업용은 차종 무관 세율 4% 적용</p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-400 font-medium mb-2">배기량</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={displacement}
                    onChange={e => setDisplacement(e.target.value)}
                    placeholder={carType === 'motorcycle' ? '125 이하 면제' : '예: 1998'}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm transition-colors"
                  />
                  <span className="text-sm text-gray-400 font-medium w-6">cc</span>
                </div>
                {isMoto125 && (
                  <p className="mt-2 text-xs text-emerald-600 font-semibold">✓ 125cc 이하 이륜차 — 취득세 면제</p>
                )}
              </div>

              <NextBtn onClick={() => setStep(3)} />
            </div>
          )}
          {step > 2 && (
            <DoneStep num={2} label="차량 정보" summary={`${purposeLabel} · ${carTypeLabel}${displacementNum ? ` · ${displacementNum}cc` : ''}`} onEdit={() => setStep(2)} />
          )}

          {/* ── STEP 3: 등록 지역 ── */}
          {step === 3 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                <span className="text-sm font-bold text-gray-700">등록 지역</span>
              </div>
              <RegionSelector value={region} onChange={setRegion} accentColor="blue" />
              <NextBtn onClick={() => setStep(4)} />
            </div>
          )}
          {step > 3 && (
            <DoneStep num={3} label="등록 지역" summary={`${regionInfo.label} (공채 ${(regionInfo.bondRate * 100).toFixed(0)}%)`} onEdit={() => setStep(3)} />
          )}

          {/* ── STEP 4: 감면 혜택 ── */}
          {step === 4 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                <span className="text-sm font-bold text-gray-700">감면 혜택 <span className="text-gray-400 font-normal">(해당 없으면 바로 계산)</span></span>
              </div>

              {carType !== 'motorcycle' && (
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">친환경차</p>
                  <div className="flex gap-2">
                    {([
                      { value: 'none',     label: '일반',   badge: '' },
                      { value: 'electric', label: '전기차', badge: '최대 140만원' },
                    ] as const).map(e => (
                      <button key={e.value} onClick={() => setEcoType(e.value)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          ecoType === e.value ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        {e.label}
                        {e.badge && ecoType !== e.value && <span className="text-xs text-emerald-500 hidden sm:inline">{e.badge}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {carType !== 'motorcycle' && (
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">다자녀 감면</p>
                  <div className="flex flex-wrap gap-2">
                    {([
                      { value: 'none',       label: '해당 없음', badge: '' },
                      { value: 'two',        label: '2자녀',    badge: '50% · 최대 70만원' },
                      { value: 'three_plus', label: '3자녀+',   badge: '최대 전액' },
                    ] as const).map(c => (
                      <button key={c.value} onClick={() => setChildDiscount(c.value)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          childDiscount === c.value ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        {c.label}
                        {c.badge && childDiscount !== c.value && <span className="text-xs text-amber-500 hidden sm:inline">{c.badge}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {carType !== 'motorcycle' && purpose !== 'commercial' && (
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">복지 감면 (1대 전액 면제)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'disabled',  label: '중증 장애인', sub: '1~3급' },
                      { id: 'veteran',   label: '국가유공자',  sub: '' },
                      { id: 'may18',     label: '5.18 부상자', sub: '' },
                      { id: 'defoliant', label: '고엽제 환자', sub: '' },
                    ].map(w => (
                      <button key={w.id} onClick={() => toggleWelfare(w.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm border transition-all text-left ${
                          welfareTypes.includes(w.id) ? 'bg-violet-500 text-white border-violet-500' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center ${welfareTypes.includes(w.id) ? 'border-white bg-white/20' : 'border-gray-300'}`}>
                          {welfareTypes.includes(w.id) && <span className="text-white text-xs">✓</span>}
                        </span>
                        <span>
                          <span className="font-medium">{w.label}</span>
                          {w.sub && <span className="text-xs opacity-70 ml-1">{w.sub}</span>}
                        </span>
                      </button>
                    ))}
                  </div>
                  {welfareTypes.length > 0 && (
                    <p className="mt-2 text-xs text-violet-500">
                      {carType === 'cargo' || carType === 'van' || carType === 'large_van'
                        ? '화물·승합차 — 배기량 무관 전액 면제'
                        : '승용차 2,000cc 이하 조건 확인 필요'}
                    </p>
                  )}
                </div>
              )}

              <NextBtn label="계산하기" onClick={() => setStep(5)} />
            </div>
          )}
          {step > 4 && (
            <DoneStep num={4} label="감면 혜택" summary={discountParts.length ? discountParts.join(' · ') : '해당 없음'} onEdit={() => setStep(4)} />
          )}

          {/* ── 결과 ── */}
          {step >= 5 && result && (
            <div className="mt-2 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-blue-600 px-6 pt-6 pb-8">
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">예상 총 부대비용</p>
                <p className="text-5xl font-black text-white">{fmt(result.totalCost)}<span className="text-2xl ml-1 font-semibold">원</span></p>
                {result.totalDiscount > 0 && (
                  <p className="mt-2 text-sm text-emerald-300 font-medium">감면 -{fmt(result.totalDiscount)}원 적용됨</p>
                )}
              </div>
              <div className="bg-white px-6 py-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>취득세율</span>
                  <span className="font-semibold text-gray-800">{(result.taxRate * 100).toFixed(0)}%{isMoto125 ? ' (면제)' : ''}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>기본 취득세</span>
                  <span className="font-semibold text-gray-800">{fmt(result.acquisitionTax)}원</span>
                </div>
                {result.totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>감면 합계</span>
                    <span className="font-semibold">-{fmt(result.totalDiscount)}원</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-800 font-bold border-t pt-3">
                  <span>최종 취득세</span>
                  <span>{fmt(result.finalTax)}원</span>
                </div>
                {carType !== 'motorcycle' && (
                  <div className="flex justify-between text-gray-500">
                    <span>공채깡 비용</span>
                    <span className="font-semibold text-gray-800">{fmt(result.bondDiscount)}원</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>번호판·수수료</span>
                  <span className="font-semibold text-gray-800">{fmt(result.otherFees)}원</span>
                </div>

                <button
                  onClick={() => setShowDetail(v => !v)}
                  className="w-full mt-1 flex items-center justify-center gap-1 py-2.5 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded-xl transition-colors"
                >
                  감면 상세 {showDetail ? '닫기' : '보기'}
                  <ChevronRight size={14} className={`transition-transform ${showDetail ? 'rotate-90' : ''}`} />
                </button>

                {showDetail && (
                  <div className="border-t pt-3 space-y-2 text-xs text-gray-500">
                    {result.discountBreakdown.smallCarDiscount > 0 && <div className="flex justify-between"><span>경차 감면</span><span className="text-emerald-600 font-semibold">-{fmt(result.discountBreakdown.smallCarDiscount)}원</span></div>}
                    {result.discountBreakdown.ecoDiscount > 0 && <div className="flex justify-between"><span>전기차 감면</span><span className="text-emerald-600 font-semibold">-{fmt(result.discountBreakdown.ecoDiscount)}원</span></div>}
                    {result.discountBreakdown.multiChildDiscount > 0 && <div className="flex justify-between"><span>다자녀 감면 ({childDiscount === 'two' ? '2자녀' : '3자녀+'})</span><span className="text-emerald-600 font-semibold">-{fmt(result.discountBreakdown.multiChildDiscount)}원</span></div>}
                    {result.discountBreakdown.welfareDiscount > 0 && <div className="flex justify-between"><span>복지 감면</span><span className="text-emerald-600 font-semibold">-{fmt(result.discountBreakdown.welfareDiscount)}원</span></div>}
                    {result.totalDiscount === 0 && <p>적용된 감면 없음</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {step >= 5 && (
            <>
              <Link href="/used-car" className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div>
                  <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">중고차 취등록세(취득세) 계산기</p>
                  <p className="text-xs text-gray-400 mt-0.5">잔가율 자동계산 · 과세표준액 비교</p>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
              </Link>
              <div><InFeedAd /></div>
            </>
          )}

        </div>
      </div>
    </>
  )
}
