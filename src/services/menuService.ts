// 예: src/services/menuService.ts

import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// 메뉴 추가
export async function addMenuItem(item: {
  name: string;
  price: number;
  imageUrl?: string;
}) {
  await addDoc(collection(db, "menus"), item);
}

// 메뉴 목록 가져오기
export async function fetchMenuItems() {
  const snapshot = await getDocs(collection(db, "menus"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}