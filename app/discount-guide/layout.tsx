import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '자동차 취득세 감면 완벽 가이드 | 다자녀·장애인·국가유공자',
  description: '2026년 최신 기준 다자녀(2자녀 50%·3자녀 전액), 장애인, 국가유공자 자동차 취득세 감면 조건과 신청 방법을 한눈에 정리했습니다.',
  alternates: { canonical: '/discount-guide' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
