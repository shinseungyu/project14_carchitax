import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '중고차 취득세 계산기 2026 | 시가표준액·잔가율 자동계산',
  description: '2026년 중고차 취득세를 연식별 잔가율과 시가표준액 기준으로 자동 계산해 드립니다. 경차·전기차·다자녀 감면 적용 포함.',
  alternates: { canonical: '/used-car' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
