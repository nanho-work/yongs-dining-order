// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="text-center py-20 bg-red-100">
        <h1 className="text-4xl font-bold mb-4">짱구즉석떡볶이</h1>
        <p className="text-lg text-gray-600">매운맛의 정석, 짱구의 맛</p>
      </section>

      {/* 이미지 */}
      <section className="flex justify-center py-10">
        <img
          src="/side-muk.png"
          alt="대표 떡볶이 이미지"
          className="w-[400px] h-auto rounded-xl shadow"
        />
      </section>

      {/* 대표 메뉴 */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">인기 메뉴</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-4 shadow">
            <h3 className="text-lg font-bold mb-2">오리지널 즉석떡볶이</h3>
            <p>매콤한 국물에 쫄깃한 떡과 어묵</p>
          </div>
          <div className="border rounded-xl p-4 shadow">
            <h3 className="text-lg font-bold mb-2">치즈떡볶이</h3>
            <p>부드러운 치즈가 듬뿍 올라간 인기 메뉴</p>
          </div>
          <div className="border rounded-xl p-4 shadow">
            <h3 className="text-lg font-bold mb-2">모둠튀김</h3>
            <p>김말이, 만두, 오징어 등 다양한 튀김 구성</p>
          </div>
        </div>
      </section>

      {/* 하단 메뉴 링크 */}
      <section className="text-center py-10">
        <a href="/menu" className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          전체 메뉴 보기
        </a>
      </section>
    </main>
  );
}