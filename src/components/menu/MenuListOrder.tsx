'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MenuCard from './MenuCard';
import OrderBar from './OrderBar';
import { useSearchParams } from 'next/navigation';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  badge?: string;
  imageUrl: string | string[];
  order?: number;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export default function MenuListOrder() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get('table'); // 예: "1"
  const CATEGORY_ORDER = ['Main두부요리', '그외Main요리', 'SideMenu', 'SetMenu', '주류', '맥주', '하이볼', '전통주'];


  useEffect(() => {
    const fetchMenus = async () => {
      const querySnapshot = await getDocs(collection(db, 'menus'));
      const fetchedMenus = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MenuItem[];
      setMenus(fetchedMenus);
    };

    fetchMenus();
  }, []);

  const handleQuantityChange = (menu: MenuItem, quantity: number) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === menu.id);
      if (quantity === 0) {
        return prev.filter((item) => item.id !== menu.id);
      }
      if (existing) {
        return prev.map((item) =>
          item.id === menu.id ? { ...item, quantity } : item
        );
      }
      return [...prev, { ...menu, quantity }];
    });
  };

  const categories = Array.from(new Set(menus.map((m) => m.category))).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-20">
      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 px-4sm:grid-cols-2 md:grid-cols-3 gap-20 ">
            {menus
              .filter((menu) => menu.category === category)
              .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999)) // 여기 추가
              .map((menu) => (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  quantity={
                    orderItems.find((item) => item.id === menu.id)?.quantity || 0
                  }
                  onQuantityChange={handleQuantityChange}
                />
              ))}
          </div>
        </div>
      ))}

      <OrderBar orderItems={orderItems} tableNumber={tableNumber ?? ''} />
    </div>
  );
}