import { AlertTriangle, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import postsData from '@/data/posts.json'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <CalculatorClient />

        {/* SEO 콘텐츠 */}
        <div className="mt-12 space-y-8 text-sm text-gray-600 leading-relaxed">

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">2026년 3월 기준 · 지방세법 제7조 · 행정안전부 고시</p>
          </div>

          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">자동차 취등록세란?</h2>
            <div className="p-4 bg-white border border-gray-100 rounded-xl space-y-2">
              <p>자동차 취등록세는 차량을 취득(구매)할 때 납부하는 <strong>취득세</strong>와 등록면허세를 합산한 세금입니다. 차량 가격에 세율을 곱해 산정하며, 차량 종류·용도에 따라 세율이 달라집니다.</p>
              <p>이 <strong>취등록세 계산기</strong>는 차량 종류·용도·등록 지역·감면 조건을 입력하면 취득세와 공채비용을 포함한 실제 납부 예상액을 자동으로 산출합니다. 경차·전기차·다자녀·복지 감면도 자동 반영됩니다.</p>
              <p className="text-xs text-gray-400">과거 취득세·등록세가 별도였으나 2011년 이후 취득세로 통합되었습니다. 근거 법령: 지방세법 제7조, 제15조.</p>
            </div>
          </article>

          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">취등록세 납부 방법 — 어디서, 어떻게 내나요?</h2>
            <div className="space-y-3">
              {[
                { icon: '🏢', title: '신차 딜러 구매', desc: '딜러(영업사원)가 등록 대행을 해주기 때문에 본인이 직접 납부할 필요가 없습니다. 취득세·공채 비용이 출고 시 정산 내역에 포함됩니다.' },
                { icon: '🤝', title: '중고차 개인 거래', desc: '본인이 직접 신고·납부해야 합니다. 위택스(wetax.go.kr) 온라인 또는 관할 시·군·구청 세무과에서 취득일로부터 60일 이내에 납부하세요. 기한 초과 시 20% 가산세가 붙습니다.' },
                { icon: '📋', title: '감면 혜택은 별도 신청', desc: '다자녀·장애인·국가유공자 등 감면은 자동 적용이 아닙니다. 관련 증빙서류(가족관계증명서, 장애인증명서 등)를 구청에 제출해야 감면이 적용됩니다.' },
              ].map(item => (
                <div key={item.title} className="p-4 bg-white border border-gray-100 rounded-xl flex gap-3">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">2026년 자동차 취득세율표</h2>
            <p className="text-xs text-gray-400 mb-3">지방세법 제7조 기준 · 2026년 현재</p>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 px-4 py-2">
                <span>차량 종류</span><span className="text-center">용도</span><span className="text-right">세율</span>
              </div>
              {[
                { type: '경차 (1000cc 이하)', purpose: '비영업용', rate: '4%', note: '+75만원 감면' },
                { type: '승용차',             purpose: '비영업용', rate: '7%', note: '' },
                { type: '승합·화물',          purpose: '비영업용', rate: '5%', note: '' },
                { type: '모든 차량',          purpose: '영업용',   rate: '4%', note: '' },
                { type: '이륜차 125cc+',      purpose: '비영업용', rate: '2%', note: '' },
                { type: '이륜차 125cc 이하',  purpose: '비영업용', rate: '0%', note: '면제' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-gray-100 px-4 py-2.5 text-sm last:border-0">
                  <span className="text-gray-700">{row.type}</span>
                  <span className="text-center text-gray-400">{row.purpose}</span>
                  <span className="text-right font-semibold text-blue-600">{row.rate}{row.note && <span className="text-xs text-gray-400 ml-1">{row.note}</span>}</span>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">주요 감면 혜택 총정리</h2>
            <div className="space-y-3">
              {[
                { title: '경차 감면', desc: '비영업용 경차(1000cc 이하)는 4% 세율에 추가로 취득세 75만원까지 감면. 사실상 소형차 구매 시 가장 절세 효과가 큽니다.' },
                { title: '전기차 감면 (최대 140만원)', desc: '친환경차 보급 촉진을 위해 전기차는 취득세 140만원까지 감면. 하이브리드는 2024년 12월 31일부로 감면 폐지, 현재 일반 승용차와 동일하게 7% 적용.' },
                { title: '다자녀 감면', desc: '2자녀: 취득세 50% 감면, 최대 70만원. 3자녀 이상: 7인승+ 전액 면제, 6인승 이하 최대 140만원 감면. 출생순서 무관, 미성년 자녀 기준.' },
                { title: '복지 감면', desc: '중증 장애인(1~3급), 국가유공자, 5·18부상자, 고엽제환자 등 1대에 한해 취득세 전액 면제. 비영업용, 승용 2000cc 이하 조건.' },
              ].map(item => (
                <div key={item.title} className="p-4 bg-white border border-gray-100 rounded-xl">
                  <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          {/* 인기 차종별 취득세 예시 */}
          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">취등록세 계산기로 확인하는 인기 차종별 예시</h2>
            <p className="text-xs text-gray-400 mb-3">비영업용 · 서울 기준 · 감면 미적용 (2026년)</p>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 px-4 py-2">
                <span>차종</span><span className="text-center">차량가격</span><span className="text-center">세율</span><span className="text-right">취득세</span>
              </div>
              {[
                { model: '모닝 (경차)',      price: '1,600만원', rate: '4%',        tax: '0원',    note: '75만한도 전액감면', highlight: true },
                { model: '아반떼',           price: '2,500만원', rate: '7%',        tax: '175만원', note: '',                 highlight: false },
                { model: '쏘나타',           price: '3,300만원', rate: '7%',        tax: '231만원', note: '',                 highlight: false },
                { model: '쏘렌토',           price: '4,200만원', rate: '7%',        tax: '294만원', note: '',                 highlight: false },
                { model: '카니발 (승합)',    price: '4,500만원', rate: '5%',        tax: '225만원', note: '승합 세율 적용',   highlight: false },
                { model: '그랜저',           price: '4,800만원', rate: '7%',        tax: '336만원', note: '',                 highlight: false },
                { model: '아이오닉6 (전기)', price: '5,500만원', rate: '7%→감면',  tax: '245만원', note: '140만원 감면 후',  highlight: true },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-4 border-b border-gray-100 px-4 py-2.5 text-sm last:border-0 ${row.highlight ? 'bg-blue-50/40' : ''}`}>
                  <span className="text-gray-700 font-medium">{row.model}</span>
                  <span className="text-center text-gray-500">{row.price}</span>
                  <span className="text-center text-gray-500">{row.rate}</span>
                  <span className="text-right">
                    <span className="font-semibold text-blue-600">{row.tax}</span>
                    {row.note && <span className="block text-xs text-gray-400">{row.note}</span>}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">* 공채깡·번호판 비용 별도. 정확한 금액은 위 <strong>취등록세 계산기</strong>에서 차량 가격을 직접 입력해 확인하세요.</p>
          </article>

          {/* 하이브리드 팩트체크 */}
          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">하이브리드 취득세 감면, 아직도 되나요? <span className="text-red-500 text-base font-bold">팩트체크</span></h2>
            <div className="rounded-2xl overflow-hidden border border-red-100">
              <div className="bg-red-50 px-4 py-3 flex items-start gap-3">
                <span className="text-red-500 text-lg flex-shrink-0 mt-0.5">✕</span>
                <div>
                  <p className="font-bold text-red-700 text-sm">하이브리드 취득세 감면(40만원)은 2024년 12월 31일부로 완전 폐지되었습니다.</p>
                  <p className="text-xs text-red-500 mt-1">15년간 유지되던 혜택이 2024년 말 종료. 2026년 현재 하이브리드 취득세 감면은 0원입니다.</p>
                </div>
              </div>
              <div className="bg-white px-4 py-4 space-y-3 text-sm text-gray-600">
                <div className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <p><strong className="text-gray-800">현재 하이브리드 취득세율:</strong> 일반 승용차와 동일한 <strong className="text-gray-900">7%</strong> 적용 (감면 없음)</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <p><strong className="text-gray-800">개별소비세 감면(최대 70만원):</strong> 2026년 말까지 유지되나, 이는 차량 공장도가에 이미 반영된 금액으로 취득세 계산과는 무관합니다.</p>
                </div>
                <div className="bg-blue-50 rounded-xl px-4 py-3 mt-2">
                  <p className="text-xs text-blue-700 font-semibold mb-1">💡 하이브리드 취득세를 아끼려면?</p>
                  <p className="text-xs text-blue-600">자녀가 2명 이상이라면 <strong>다자녀 감면(2자녀 50%, 최대 70만원)</strong> 적용이 가능합니다. 계산기에서 바로 확인하세요.</p>
                </div>
              </div>
            </div>
          </article>

          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">공채란? 공채깡이란?</h2>
            <div className="p-4 bg-white border border-gray-100 rounded-xl space-y-2">
              <p><strong>지역개발공채</strong>는 차량 등록 시 의무 매입하는 채권입니다. 지역별 공채율(서울 12% 등)을 차량가격에 곱한 금액만큼 국채를 사야 합니다.</p>
              <p>대부분의 구매자는 이를 즉시 할인 매도(공채깡)해 현금으로 환산합니다. 공채깡 비용 = 공채 매입금액 × 할인율(약 2.5%)이며, 이 금액이 실질 부대비용입니다. 위 <strong>취등록세 계산기</strong>는 지역 선택 시 공채비용을 자동으로 포함해 총비용을 계산합니다.</p>
              <p className="text-xs text-gray-400">근거: 지역개발채권법, 행정안전부 고시. 공채율·할인율은 지자체별 상이.</p>
            </div>
          </article>

          <article>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">취등록세 계산기 자주 묻는 질문</h2>
            <div className="space-y-3">
              {[
                { q: '하이브리드 취득세 감면 아직 되나요?', a: '아닙니다. 하이브리드 취득세 감면(40만원)은 2024년 12월 31일부로 완전 폐지되었습니다. 2026년 현재 하이브리드는 일반 승용차와 동일하게 7% 세율이 적용됩니다. 개별소비세 감면(최대 70만원)은 2026년 말까지 유지되나 차량 출고가에 이미 반영됩니다.' },
                { q: '리스·장기렌트는 취득세를 내나요?', a: '리스·장기렌트는 리스사/렌트사가 납부합니다. 본인이 직접 납부할 의무는 없으나 월 리스료에 간접 반영됩니다.' },
                { q: '중고차 취득세는 어떻게 계산하나요?', a: '중고차는 실거래가가 아닌 시가표준액(기준가격 × 잔가율)을 기준으로 취득세를 계산합니다. 중고차 계산기에서 제작년도를 입력하면 자동 산출됩니다.' },
              ].map(item => (
                <div key={item.q} className="p-4 bg-white border border-gray-100 rounded-xl">
                  <p className="font-bold text-gray-900 text-sm mb-1">Q. {item.q}</p>
                  <p className="text-gray-500 text-xs">{item.a}</p>
                </div>
              ))}
            </div>
            <Link href="/faq" className="mt-3 flex items-center justify-center gap-1 py-3 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded-xl border border-blue-100 transition-colors">
              FAQ 전체보기 <ChevronRight size={14} />
            </Link>
          </article>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 flex gap-2">
          <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
          <p>본 계산기는 2026년 기준 참고용이며 실제 세액과 다를 수 있습니다. 정확한 세액은 관할 시·군·구청에 확인하세요.</p>
        </div>

        {/* 게시판 프리뷰 */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-gray-900">취득세 정보</h2>
            <Link href="/board" className="text-sm text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1">
              전체보기 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {postsData.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/board?id=${post.id}`} className="block p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <p className="text-sm font-bold text-gray-900 mt-1">{post.title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.summary}</p>
              </Link>
            ))}
          </div>
          <Link href="/board" className="mt-3 flex items-center justify-center gap-1 py-3 text-sm text-gray-500 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-xl border border-gray-200 transition-colors">
            취득세 정보 더 보기 <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  )
}
