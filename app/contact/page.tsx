import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '연락처 | 취등록세 계산기',
  description: 'CarProTax(carprotax.com) 문의 안내. 세금 정보 오류 제보, 내용 요청, 제휴 및 일반 문의를 이메일로 받고 있습니다.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const h2 = { fontSize: '17px', fontWeight: 700, marginTop: '28px', marginBottom: '10px', color: '#111' } as const
  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 20px 80px', fontFamily: 'sans-serif', color: '#374151', lineHeight: 1.85 }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '6px', color: '#111' }}>연락처</h1>
      <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>문의 및 제보 안내</p>

      <p>CarProTax(carprotax.com)를 이용해 주셔서 감사합니다. 아래 이메일로 문의를 보내주시면 확인 후 순차적으로 답변드립니다.</p>

      <div style={{ margin: '24px 0', padding: '20px 24px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>이메일 문의</p>
        <a href="mailto:tlsfkaus0711@gmail.com" style={{ fontSize: '20px', fontWeight: 800, color: '#f97316' }}>tlsfkaus0711@gmail.com</a>
      </div>

      <h2 style={h2}>이런 문의를 받습니다</h2>
      <ul style={{ marginLeft: '18px', listStyleType: 'disc' }}>
        <li><strong>세금 정보 오류 제보</strong> — 세율·감면 기준이 바뀌었거나 잘못된 부분을 발견하셨다면 알려주세요.</li>
        <li><strong>내용 요청</strong> — 다뤄줬으면 하는 차종·주제</li>
        <li><strong>제휴·광고 문의</strong></li>
        <li><strong>기타 일반 문의</strong></li>
      </ul>

      <h2 style={h2}>답변 안내</h2>
      <p>
        문의는 보통 영업일 기준 2~3일 이내에 답변드리도록 노력하고 있습니다. 개인 운영 사이트 특성상 답변이 다소
        늦어질 수 있는 점 양해 부탁드립니다. 개인정보 관련 요청은{' '}
        <Link href="/privacy-policy" style={{ color: '#f97316' }}>개인정보 처리방침</Link>의 안내에 따라 처리됩니다.
      </p>

      <p style={{ marginTop: '28px' }}>
        사이트에 대한 더 자세한 내용은 <Link href="/about" style={{ color: '#f97316' }}>사이트 소개</Link>를 참고해 주세요.
      </p>
    </main>
  )
}
