export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 짱구즉석떡볶이. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="mailto:info@zzanggu.com" className="hover:text-red-500">이메일</a>
          <a href="#privacy" className="hover:text-red-500">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  )
}