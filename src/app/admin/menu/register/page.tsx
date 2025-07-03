

'use client';

export const dynamic = 'force-dynamic';

import MenuForm from '@/components/menu/MenuForm';
import MenuList from '@/components/menu/MenuList';


export default function MenuRegisterPage() {
  return (
    <main className="p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">메뉴 등록</h1>
      <MenuForm />
      <MenuList />
    </main>
  );
}