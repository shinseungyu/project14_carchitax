'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, MapPin } from 'lucide-react'
import { REGIONS, RegionValue } from '@/data/regions'

interface Props {
  value: RegionValue
  onChange: (value: RegionValue) => void
  accentColor?: 'blue' | 'orange'
}

export default function RegionSelector({ value, onChange, accentColor = 'blue' }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const selected = REGIONS.find(r => r.value === value)!
  const filtered = REGIONS.filter(r => r.label.includes(query))

  const accent = accentColor === 'blue'
    ? { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', ring: 'focus:border-blue-400' }
    : { border: 'border-orange-400', bg: 'bg-orange-50', text: 'text-orange-700', ring: 'focus:border-orange-400' }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = (regionValue: RegionValue) => {
    onChange(regionValue)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative">
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-4 py-4 border-2 rounded-xl transition-colors bg-white ${
          open ? `${accent.border} ${accent.bg}` : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          <MapPin size={16} className={open ? accent.text : 'text-gray-400'} />
          <span className={`font-semibold ${open ? accent.text : 'text-gray-800'}`}>
            {selected.label}
          </span>
          <span className="text-xs text-gray-400 ml-1">공채 {(selected.bondRate * 100).toFixed(0)}%</span>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운 */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {/* 검색 */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="지역 검색..."
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
              />
            </div>
          </div>

          {/* 목록 */}
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">검색 결과 없음</li>
            ) : (
              filtered.map(r => (
                <li key={r.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(r.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                      r.value === value ? `${accent.bg} ${accent.text} font-bold` : 'text-gray-700'
                    }`}
                  >
                    <span>{r.label}</span>
                    <span className="text-xs text-gray-400">공채 {(r.bondRate * 100).toFixed(0)}%</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
