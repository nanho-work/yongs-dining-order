'use client';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  orderItems: OrderItem[];
  tableNumber?: string; // ✅ 테이블 번호는 선택사항으로 처리
}

export default function OrderBar({ orderItems, tableNumber }: Props) {
  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (orderItems.length === 0) return;

    try {
      await addDoc(collection(db, 'orders'), {
        items: orderItems,
        total,
        tableNumber: tableNumber || null, // ✅ null 저장 방지
        createdAt: Timestamp.now(),
      });

      alert('주문이 완료되었습니다!');
      // 선택 초기화 기능 필요시 여기에 추가
    } catch (error) {
      console.error('주문 실패:', error);
      alert('주문에 실패했습니다.');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t px-4 py-3 z-50">
      {orderItems.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>{item.quantity}개</span>
                <span>{(item.price * item.quantity).toLocaleString()}원</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="font-bold">총액:</span>
            <span className="font-bold">{total.toLocaleString()}원</span>
          </div>

          <button
            onClick={handleOrder}
            className="mt-2 bg-black text-white py-2 rounded font-semibold"
          >
            주문하기
          </button>
        </div>
      ) : (
        <div className="text-center text-sm text-gray-500">
          선택한 메뉴가 없습니다.
        </div>
      )}
    </div>
  );
}