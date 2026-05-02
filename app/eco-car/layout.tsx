import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '친환경차 취득세 완벽 가이드 2026 | 전기차·하이브리드',
  description: '2026년 전기차 취득세 최대 140만원 감면, 하이브리드 감면 폐지 팩트체크, 절세 방법까지 한눈에 정리했습니다.',
  alternates: { canonical: '/eco-car' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
