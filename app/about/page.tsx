import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '사이트 소개 | 취등록세 계산기',
  description: 'CarProTax(carprotax.com)는 자동차 취득세·취등록세를 차종·조건별로 쉽게 계산하고, 감면·공채 등 자동차 세금 정보를 정리해 제공하는 개인 운영 정보 사이트입니다.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  const h2 = { fontSize: '17px', fontWeight: 700, marginTop: '28px', marginBottom: '10px', color: '#111' } as const
  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 20px 80px', fontFamily: 'sans-serif', color: '#374151', lineHeight: 1.85 }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '6px', color: '#111' }}>사이트 소개</h1>
      <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>CarProTax · carprotax.com</p>

      <h2 style={h2}>어떤 사이트인가요?</h2>
      <p>
        CarProTax(carprotax.com)는 자동차를 살 때 반드시 따라오는 취득세·취등록세를 누구나 쉽게 계산할 수 있도록
        만든 정보 제공 사이트입니다. 신차·중고차·전기차·경차 등 차종과 조건에 따라 달라지는 세금을 계산기로 즉시
        확인하고, 감면 제도와 공채(채권) 매입 같은 헷갈리는 부분을 함께 정리해 안내합니다.
      </p>

      <h2 style={h2}>이런 정보를 다룹니다</h2>
      <ul style={{ marginLeft: '18px', listStyleType: 'disc' }}>
        <li>차종·조건별 <strong>취득세 계산</strong>과 실부담액 확인</li>
        <li>중고차 <strong>잔가율</strong>과 과세표준 개념</li>
        <li>전기차·다자녀·경차 등 <strong>감면 제도</strong> 안내</li>
        <li><strong>공채(채권) 매입·할인</strong> 등 등록 시 추가 비용</li>
      </ul>

      <h2 style={h2}>정보의 신뢰성</h2>
      <p>
        본 사이트의 모든 콘텐츠는 공개된 지방세법·관련 고시 등을 바탕으로 이해하기 쉽게 재구성한 것입니다.
        세율과 감면 기준은 정책에 따라 바뀔 수 있으므로, 실제 취득·등록 전에는 위택스(wetax.go.kr)나 관할
        지자체·차량 등록사업소에서 최신 기준을 확인하시기 바랍니다. 계산 결과는 참고용 추정치이며 실제 세액과
        다를 수 있습니다.
      </p>

      <h2 style={h2}>운영 주체</h2>
      <p>
        본 사이트는 <strong>개인이 운영</strong>하는 정보 제공 목적의 웹사이트입니다. 회원가입 없이 무료로 이용할 수
        있으며, 운영 비용 충당을 위해 Google AdSense 광고가 게재됩니다.
      </p>
      <ul style={{ marginLeft: '18px', listStyleType: 'disc' }}>
        <li><strong>운영:</strong> CarProTax 운영자 (개인)</li>
        <li><strong>문의:</strong> <a href="mailto:tlsfkaus0711@gmail.com" style={{ color: '#f97316' }}>tlsfkaus0711@gmail.com</a></li>
      </ul>

      <p style={{ marginTop: '28px' }}>
        문의는 <Link href="/contact" style={{ color: '#f97316' }}>연락처 페이지</Link>를,
        개인정보 처리에 관한 내용은 <Link href="/privacy-policy" style={{ color: '#f97316' }}>개인정보 처리방침</Link>을 참고해 주세요.
      </p>
    </main>
  )
}
