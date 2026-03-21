'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/', label: '취등록세(취득세) 계산기' },
  { href: '/used-car', label: '중고차 취등록세(취득세) 계산기' },
  { href: '/eco-car', label: '친환경차 취등록세(취득세)' },
  { href: '/discount-guide', label: '감면 혜택 가이드' },
  { href: '/faq', label: 'FAQ' },
]

export default function NavMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 데스크탑 */}
      <div className="hidden md:flex gap-6">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
            {l.label}
          </Link>
        ))}
      </div>

      {/* 모바일 햄버거 버튼 */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        onClick={() => setOpen(!open)}
        aria-label="메뉴 열기"
      >
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-md z-50">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
