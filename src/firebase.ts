// ✅ src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase 구성 (네가 준 값 그대로)
const firebaseConfig = {
  apiKey: "AIzaSyBPl2zWxfbnTL8ELgSvsw2JMVMwcWAB_Ow",
  authDomain: "yongs-dining.firebaseapp.com",
  projectId: "yongs-dining",
  storageBucket: "yongs-dining.firebasestorage.app",
  messagingSenderId: "165881662736",
  appId: "1:165881662736:web:da1f6482af7002fa3be995",
  measurementId: "G-1XVZNHZ8DM",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 export
export const db = getFirestore(app);