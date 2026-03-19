'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { AlertTriangle, ChevronRight, ChevronDown, Check } from 'lucide-react'
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

const RESIDUAL_RATES: Record<number, number> = {
  0: 1.000, 1: 0.849, 2: 0.720, 3: 0.611, 4: 0.519,
  5: 0.440, 6: 0.373, 7: 0.317, 8: 0.269, 9: 0.228,
  10: 0.194, 11: 0.165,
}
const CURRENT_YEAR = 2026
const MFR_YEARS = Array.from({ length: CURRENT_YEAR - 2013 }, (_, i) => CURRENT_YEAR - i)

function getResidualRate(mfrYear: number): number {
  const elapsed = CURRENT_YEAR - mfrYear
  if (elapsed <= 0) return RESIDUAL_RATES[0]
  if (elapsed >= 12) return 0.140
  return RESIDUAL_RATES[elapsed]
}

function getTaxRate(purpose: Purpose, carType: CarBodyType, displacement: number): number {
  if (purpose === 'commercial') return 0.04
  if (carType === 'motorcycle') return displacement > 0 && displacement <= 125 ? 0 : 0.02
  if (carType === 'small') return 0.04
  if (carType === 'sedan') return 0.07
  return 0.05
}

function calcUsedCarTax({ basePrice, mfrYear, purpose, carType, displacement, region, ecoType, childDiscount, welfareTypes }: {
  basePrice: number; mfrYear: number; purpose: Purpose; carType: CarBodyType; displacement: number
  region: RegionValue; ecoType: EcoType; childDiscount: ChildDiscount; welfareTypes: string[]
}) {
  const residualRate = getResidualRate(mfrYear)
  const taxBase = Math.floor(basePrice * residualRate)
  const regionInfo = REGIONS.find(r => r.value === region)!
  const taxRate = getTaxRate(purpose, carType, displacement)
  const acquisitionTax = Math.floor(taxBase * taxRate)

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

  const bondAmount = carType === 'motorcycle' ? 0 : Math.floor(taxBase * regionInfo.bondRate)
  const bondDiscount = carType === 'motorcycle' ? 0 : Math.floor(bondAmount * regionInfo.discountRate)
  const otherFees = 120_000

  return {
    residualRate, taxBase, taxRate, acquisitionTax, totalDiscount, finalTax,
    bondAmount, bondDiscount, otherFees,
    totalCost: finalTax + bondDiscount + otherFees,
    discountBreakdown: { smallCarDiscount, ecoDiscount, multiChildDiscount, welfareDiscount },
  }
}

function DoneStep({ num, label, summary, onEdit }: { num: number; label: string; summary: string; onEdit: () => void }) {
  return (
    <div className="bg-white rounded-2xl px-5 py-3.5 border border-gray-100 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center">
          <Check size={12} strokeWidth={3} />
        </span>
        <div>
          <p className="text-xs text-gray-400">{num}단계 · {label}</p>
          <p className="text-sm font-semibold text-gray-800">{summary}</p>
        </div>
      </div>
      <button onClick={onEdit} className="text-xs text-orange-500 font-semibold hover:text-orange-700 px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors">수정</button>
    </div>
  )
}

function NextBtn({ label = '다음', disabled = false, onClick }: { label?: string; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="mt-5 w-full py-3.5 rounded-xl bg-orange-500 text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 active:bg-orange-700 transition-colors"
    >
      {label} →
    </button>
  )
}

export default function UsedCarPage() {
  const [step, setStep] = useState(1)

  const [basePrice, setBasePrice] = useState('')
  const [mfrYear, setMfrYear] = useState(2022)
  const [purpose, setPurpose] = useState<Purpose>('private')
  const [carType, setCarType] = useState<CarBodyType>('sedan')
  const [displacement, setDisplacement] = useState('')
  const [region, setRegion] = useState<RegionValue>('seoul')
  const [ecoType, setEcoType] = useState<EcoType>('none')
  const [childDiscount, setChildDiscount] = useState<ChildDiscount>('none')
  const [welfareTypes, setWelfareTypes] = useState<string[]>([])
  const [showDetail, setShowDetail] = useState(false)

  const basePriceNum = parseFloat(basePrice.replace(/,/g, '')) || 0
  const displacementNum = Number(displacement) || 0
  const residualRate = getResidualRate(mfrYear)
  const isMoto125 = carType === 'motorcycle' && displacementNum > 0 && displacementNum <= 125

  const result = useMemo(() => {
    if (step < 5 || basePriceNum <= 0) return null
    return calcUsedCarTax({ basePrice: basePriceNum, mfrYear, purpose, carType, displacement: displacementNum, region, ecoType, childDiscount, welfareTypes })
  }, [step, basePriceNum, mfrYear, purpose, carType, displacementNum, region, ecoType, childDiscount, welfareTypes])

  const fmt = (n: number) => n.toLocaleString('ko-KR')
  const handlePrice = (v: string) => {
    const raw = v.replace(/,/g, '').replace(/[^0-9]/g, '')
    setBasePrice(raw ? Number(raw).toLocaleString('ko-KR') : '')
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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <TopAd />

        <div className="mt-6 mb-6">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">중고차 취득세 계산기</p>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            이 중고차,<br />세금 얼마?
          </h1>
          <p className="text-gray-400 text-sm mt-2">제작년도 입력 → 시가표준액 자동 계산</p>
        </div>

        <div>
          {/* 진행 바 */}
          <div className="mb-5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-300 ${step > n ? 'bg-orange-500' : step === n ? 'bg-orange-300' : 'bg-gray-200'}`} />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">{step <= 4 ? `${step} / 4단계` : '계산 완료'}</p>
          </div>

          <div className="space-y-3">

            {/* ── STEP 1: 차량 정보 기본 (가격 + 제작년도) ── */}
            {step === 1 ? (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <span className="text-sm font-bold text-gray-700">차량 기준가격 · 제작년도</span>
                </div>

                {/* 가격 */}
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-2">차량 기준가격 (신차 출고가 기준)</p>

                  {/* 인기 차종 템플릿 */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-300 mb-2">인기 차종 기준가 바로 선택</p>
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                      {[
                        { label: '아반떼', price: 25_000_000 },
                        { label: '쏘나타', price: 33_000_000 },
                        { label: '쏘렌토', price: 42_000_000 },
                        { label: '그랜저', price: 48_000_000 },
                        { label: '카니발', price: 45_000_000 },
                        { label: 'G80', price: 68_000_000 },
                      ].map(t => (
                        <button
                          key={t.label}
                          onClick={() => setBasePrice(t.price.toLocaleString('ko-KR'))}
                          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                            basePriceNum === t.price
                              ? 'bg-orange-500 text-white border-orange-500'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                          }`}
                        >
                          {t.label}
                          <span className={`ml-1 ${basePriceNum === t.price ? 'text-orange-200' : 'text-gray-400'}`}>
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
                      value={basePrice}
                      onChange={e => handlePrice(e.target.value)}
                      placeholder="0"
                      autoFocus
                      className="w-full text-3xl font-bold text-gray-900 placeholder-gray-200 pr-8 outline-none border-b-2 border-gray-200 focus:border-orange-400 pb-2 transition-colors bg-transparent"
                    />
                    <span className="absolute right-0 bottom-2.5 text-sm text-gray-400 font-medium">원</span>
                  </div>
                  {basePriceNum > 0 ? (
                    <p className="mt-2 text-xs text-gray-400">{(basePriceNum / 10000).toFixed(0)}만원</p>
                  ) : (
                    <p className="mt-2 text-xs text-gray-400">자동차민원대국민포털(자동차365)에서 신차 출고가 확인</p>
                  )}

                  {/* 퀵 입력 버튼 */}
                  <div className="mt-3 flex gap-2">
                    {[100, 500, 1000].map(v => (
                      <button
                        key={v}
                        onClick={() => handlePrice(String(basePriceNum + v * 10000))}
                        className="flex-1 py-2 text-xs font-semibold text-orange-500 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                      >
                        +{v}만
                      </button>
                    ))}
                    {basePriceNum > 0 && (
                      <button
                        onClick={() => setBasePrice('')}
                        className="px-3 py-2 text-xs font-semibold text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        초기화
                      </button>
                    )}
                  </div>
                </div>

                {/* 제작년도 */}
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-2">제작년도</p>
                  <div className="flex gap-3 items-center">
                    <div className="relative flex-1">
                      <select
                        value={mfrYear}
                        onChange={e => setMfrYear(Number(e.target.value))}
                        className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm bg-white pr-10"
                      >
                        {MFR_YEARS.map(y => <option key={y} value={y}>{y}년</option>)}
                        <option value={2013}>2013년 이전 (12년+)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs text-gray-400">잔가율</p>
                      <p className="text-2xl font-black text-orange-500">{(residualRate * 100).toFixed(1)}<span className="text-sm font-semibold">%</span></p>
                    </div>
                  </div>
                  {basePriceNum > 0 && (
                    <div className="mt-3 flex items-center justify-between bg-orange-50 rounded-xl px-4 py-3">
                      <span className="text-xs text-orange-600">시가표준액 (과세표준)</span>
                      <span className="font-black text-orange-700 text-base">{fmt(Math.floor(basePriceNum * residualRate))}원</span>
                    </div>
                  )}
                </div>

                <NextBtn disabled={basePriceNum <= 0} onClick={() => setStep(2)} />
              </div>
            ) : (
              <DoneStep
                num={1}
                label="차량 기준가격 · 제작년도"
                summary={`${basePrice}원 · ${mfrYear}년 (잔가율 ${(residualRate * 100).toFixed(1)}%)`}
                onEdit={() => setStep(1)}
              />
            )}

            {/* ── STEP 2: 차량 정보 ── */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">2</span>
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
                          purpose === p.value ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
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
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        {t.label}
                        <span className={`ml-1.5 text-xs ${carType === t.value ? 'text-orange-200' : 'text-gray-400'}`}>{t.rate}</span>
                      </button>
                    ))}
                  </div>
                  {purpose === 'commercial' && (
                    <p className="mt-2 text-xs text-orange-400">영업용은 차종 무관 세율 4% 적용</p>
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
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm transition-colors"
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
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">3</span>
                  <span className="text-sm font-bold text-gray-700">등록 지역</span>
                </div>
                <RegionSelector value={region} onChange={setRegion} accentColor="orange" />
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
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">4</span>
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
                <div className="bg-orange-500 px-6 pt-6 pb-8">
                  <p className="text-orange-200 text-xs font-semibold uppercase tracking-widest mb-1">예상 총 부대비용</p>
                  <p className="text-5xl font-black text-white">{fmt(result.totalCost)}<span className="text-2xl ml-1 font-semibold">원</span></p>
                  {result.totalDiscount > 0 && (
                    <p className="mt-2 text-sm text-emerald-300 font-medium">감면 -{fmt(result.totalDiscount)}원 적용됨</p>
                  )}
                </div>
                <div className="bg-white px-6 py-4 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>시가표준액</span>
                    <span className="font-semibold text-gray-800">{fmt(result.taxBase)}원</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{fmt(basePriceNum)}원 × {(result.residualRate * 100).toFixed(1)}%</span>
                  </div>
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
                    className="w-full mt-1 flex items-center justify-center gap-1 py-2.5 text-sm text-orange-500 font-semibold hover:bg-orange-50 rounded-xl transition-colors"
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
                <Link href="/" className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl hover:border-orange-400 hover:shadow-md transition-all group">
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-orange-500 transition-colors">신차 취등록세 계산기</p>
                    <p className="text-xs text-gray-400 mt-0.5">신차 구매 시 취득세·공채 계산</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
                </Link>
                <div><InFeedAd /></div>
              </>
            )}

          </div>
        </div>

        {/* SEO */}
        <div className="mt-12 space-y-8 text-sm text-gray-600 leading-relaxed">
          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">중고차 연식별 잔가율표 (2026)</h2>
            <p className="mb-4 text-gray-500">시가표준액 = 기준가격 × 잔가율 (행정안전부 고시 기준)</p>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 px-4 py-2">
                <span>제작년도</span><span className="text-center">경과년수</span><span className="text-right">잔가율</span>
              </div>
              {MFR_YEARS.slice(0, 13).map(y => (
                <div key={y} className={`grid grid-cols-3 border-b border-gray-100 px-4 py-2.5 text-sm ${mfrYear === y ? 'bg-orange-50 font-bold' : ''}`}>
                  <span className="text-gray-700">{y}년{mfrYear === y ? ' ✓' : ''}</span>
                  <span className="text-center text-gray-400">{CURRENT_YEAR - y}년</span>
                  <span className="text-right font-semibold text-orange-500">{(getResidualRate(y) * 100).toFixed(1)}%</span>
                </div>
              ))}
              <div className="grid grid-cols-3 px-4 py-2.5 text-sm text-gray-400">
                <span>2013년 이전</span><span className="text-center">12년+</span><span className="text-right font-semibold text-orange-400">14.0%</span>
              </div>
            </div>
          </article>

          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">중고차 취득세 감면 혜택 (2026)</h2>
            <div className="space-y-3">
              {[
                { title: '다자녀 2자녀', desc: '2자녀 50% 감면(최대 70만원). 3자녀+ 최대 전액 면제. 7인승 이상 승합 선택 시 유리.' },
                { title: '전기차 (중고도 적용)', desc: '중고 전기차도 최대 140만원 감면. 차량이력서로 전기차 여부 확인 필수.' },
                { title: '복지 감면', desc: '중증 장애인(1~3급), 국가유공자 등 1대 전액 면제. 승용 2000cc 이하 조건.' },
                { title: '경차', desc: '취득세 4% + 75만원 추가 감면. 중고 경차도 동일 적용.' },
              ].map(item => (
                <div key={item.title} className="p-4 bg-white border border-gray-100 rounded-xl">
                  <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">과세표준액 — 다운 계약서가 안 통하는 이유</h2>
            <div className="p-4 bg-white border border-gray-100 rounded-xl space-y-2">
              <p>중고차 취득세는 <strong>시가표준액과 실거래가 중 높은 금액</strong>으로 부과됩니다. 다운 계약서를 써도 시가표준액이 더 높으면 줄일 수 없습니다.</p>
              <p className="text-xs text-gray-400">국토교통부 자동차민원대국민포털(자동차 365)에서 차량번호로 시가표준액 무료 조회 가능.</p>
            </div>
          </article>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 flex gap-2">
          <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
          <p>본 계산기는 2026년 기준 참고용이며 실제 세액과 다를 수 있습니다. 정확한 세액은 관할 시·군·구청에 확인하세요.</p>
        </div>
      </div>
    </main>
  )
}
