import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: '자동차 취등록세 계산기 | 2026 신차·중고차 취득세 자동계산',
  description: '2026년 최신 세율 반영! 신차 및 중고차 구입 시 발생하는 취등록세를 10초 만에 계산해 보세요. 경차, 다자녀, 친환경차 감면 혜택까지 정확하게 산출해 드립니다.',
  metadataBase: new URL('https://carprotax.com'),
  keywords: ['자동차 취등록세 계산기', '중고차 취등록세', '자동차 취득세', '경차 감면', '전기차 취득세', '다자녀 감면', '공채 계산기'],
  openGraph: {
    title: '자동차 취등록세 계산기 | 2026 신차·중고차 취득세 자동계산',
    description: '2026년 최신 세율 반영! 신차 및 중고차 구입 시 발생하는 취등록세를 10초 만에 계산해 보세요. 경차, 다자녀, 친환경차 감면 혜택까지 정확하게 산출해 드립니다.',
    siteName: 'CarProTax',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/thumb.webp',
        width: 1200,
        height: 630,
        alt: '자동차 취등록세 계산기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차 취등록세 계산기 | 2026 신차·중고차 취득세 자동계산',
    description: '2026년 최신 세율 반영! 신차 및 중고차 구입 시 발생하는 취등록세를 10초 만에 계산해 보세요. 경차, 다자녀, 친환경차 감면 혜택까지 정확하게 산출해 드립니다.',
  },
  authors: [{ name: 'CarProTax' }],
  publisher: 'CarProTax',
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    other: {
      'naver-site-verification': '1f53ce612acd99cccb028683ad929ab2ead49298',
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: '자동차 취등록세 계산기',
      url: 'https://carprotax.com',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      description: '2026년 최신 세율 반영! 신차 및 중고차 구입 시 발생하는 취등록세를 10초 만에 계산해 보세요. 경차, 다자녀, 친환경차 감면 혜택까지 정확하게 산출해 드립니다.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      inLanguage: 'ko',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '자동차 취득세율은 얼마인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '2026년 기준 비영업용 승용차 7%, 경차(1000cc 이하) 4%+75만원 한도 감면, 화물·승합 5%, 영업용 전 차종 4%입니다. 지방세법 제7조 기준.',
          },
        },
        {
          '@type': 'Question',
          name: '전기차 취득세 감면 혜택이 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '순수 전기차(BEV)는 2026년 현재 취득세 최대 140만원 감면이 유지됩니다. 플러그인 하이브리드(PHEV)는 감면 대상이 아닙니다.',
          },
        },
        {
          '@type': 'Question',
          name: '하이브리드 취득세 감면 아직도 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '아닙니다. 하이브리드 취득세 감면(40만원)은 2024년 12월 31일부로 완전 폐지되었습니다. 2026년 현재 하이브리드는 일반 승용차와 동일하게 7% 세율이 적용됩니다.',
          },
        },
        {
          '@type': 'Question',
          name: '다자녀 취득세 감면은 얼마나 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '18세 미만 자녀 2명이면 취득세 50% 감면(최대 70만원), 3명 이상이면 최대 140만원(사실상 전액) 감면됩니다. 7인승 이상은 3자녀 시 전액 면제.',
          },
        },
        {
          '@type': 'Question',
          name: '취득세 납부 기한은 언제까지인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '차량 취득일(등록일)로부터 60일 이내에 납부해야 합니다. 기한 초과 시 20% 가산세와 일 단위 이자가 부과됩니다.',
          },
        },
        {
          '@type': 'Question',
          name: '경차 취득세 감면은 어떻게 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '비영업용 경차(배기량 1000cc 이하)는 취득세율 4% 적용 후 세액의 최대 75만원을 추가 감면합니다. 차량가격 1,875만원 이하면 사실상 취득세 0원입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '중고차 취득세는 어떻게 계산하나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '중고차는 실거래가와 시가표준액(신차 기준가격 × 연식별 잔가율) 중 높은 금액이 과세표준입니다. 다운계약서를 써도 시가표준액 이하로 신고하면 추징됩니다.',
          },
        },
        {
          '@type': 'Question',
          name: '공채깡이란 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '차량 등록 시 의무 매입해야 하는 지역개발공채를 즉시 할인 매도하는 것을 공채깡이라 합니다. 실질 비용은 공채 매입금액의 약 2~3%이며 지역·차종마다 다릅니다.',
          },
        },
        {
          '@type': 'Question',
          name: '취득세 감면을 중복 적용할 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '원칙적으로 불가합니다. 전기차·경차·다자녀·장애인·국가유공자 감면 중 가장 유리한 한 가지만 적용됩니다.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-H0BDK8VQLR" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H0BDK8VQLR');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-extrabold text-lg text-gray-900 tracking-tight">🚗 자동차 취등록세(취득세)</Link>
            <div className="flex gap-6">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">취등록세(취득세) 계산기</Link>
              <Link href="/used-car" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">중고차 취등록세(취득세) 계산기</Link>
              <Link href="/eco-car" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">친환경차 취등록세(취득세)</Link>
              <Link href="/discount-guide" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">감면 혜택 가이드</Link>
              <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">FAQ</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="mt-16 border-t border-gray-200 py-8 text-center text-xs text-gray-400">
          <div className="flex justify-center gap-6 mb-2">
            <Link href="/privacy-policy" className="hover:text-gray-600">개인정보 처리방침</Link>
            <Link href="/terms-of-service" className="hover:text-gray-600">이용약관</Link>
            <Link href="/cookie-policy" className="hover:text-gray-600">쿠키 정책</Link>
          </div>
          <p>© 2026 CarProTax · 본 계산기는 참고용이며 실제 세액과 다를 수 있습니다.</p>
        </footer>
      </body>
    </html>
  )
}
