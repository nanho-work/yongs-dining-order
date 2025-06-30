// src/app/layout.tsx
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'

export const metadata = {
  title: '짱구즉석떡볶이',
  description: '매운맛의 정석, 짱구떡볶이 공식 홈페이지',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-gray-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}