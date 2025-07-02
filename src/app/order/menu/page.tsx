// 예시: /app/order/page.tsx
import MenuListOrder from '@/components/menu/MenuListOrder';

export default function OrderPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">메뉴 주문</h1>
      <MenuListOrder />
    </main>
  );
}