'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold text-red-600">짱구즉석떡볶이</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          {/* 👉 사용자용 오더 페이지 */}
          <Link href="/order/menu" className="hover:text-red-500">오더</Link>

          {/* 👉 관리자용 메뉴 등록 페이지 */}
          <Link href="/admin/menu/register" className="hover:text-red-500">관리자</Link>
        </nav>
      </div>
    </header>
  )
}