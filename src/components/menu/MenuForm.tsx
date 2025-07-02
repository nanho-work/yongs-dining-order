'use client';

import { useState } from 'react';
import { db } from '@/lib//firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import Spinner from '@/components/ui/Spinner';

export default function MenuForm() {
  const [menuName, setMenuName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [badge, setBadge] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
  try {
    if (!menuName || !price || !category || !imageFile) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

    setLoading(true);

    // ✅ 이미지 업로드
    const storage = getStorage();
    const imageRef = ref(storage, `yongs-dining-order/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // ✅ Firestore에 기존 메뉴 수 확인 → order 계산
    const menusRef = collection(db, 'menus');
    const snapshot = await getDocs(menusRef);
    const currentCount = snapshot.size;

    // ✅ Firestore에 메뉴 등록
    await addDoc(menusRef, {
      name: menuName,
      price: Number(price.replace(/,/g, '')),
      description,
      category,
      badge,
      imageUrl,
      createdAt: Timestamp.now(),
      order: currentCount, // 새로 등록된 메뉴는 가장 마지막으로
    });

    alert('메뉴가 등록되었습니다.');
    setMenuName('');
    setPrice('');
    setDescription('');
    setCategory('');
    setBadge('');
    setImageFile(null);
    setPreviewUrl('');
  } catch (error) {
    console.error('등록 오류:', error);
    alert('등록 중 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto px-4">

    {/* 카테고리 */}
    <div className="w-full">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="카테고리 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Main두부요리">메인</SelectItem>
          <SelectItem value="그외Main요리">서브메인</SelectItem>
          <SelectItem value="SideMenu">사이드</SelectItem>
          <SelectItem value="SetMenu">셋트</SelectItem>
          <SelectItem value="주류">주류</SelectItem>
          <SelectItem value="맥주">맥주</SelectItem>
          <SelectItem value="하이볼">하이볼</SelectItem>
          <SelectItem value="전통주">전통주</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* 메뉴 이름 */}
    <div className="w-full">
      <Input
        value={menuName}
        onChange={(e) => setMenuName(e.target.value)}
        placeholder="예: 불닭치즈볶음면"
      />
    </div>

    {/* 가격 */}
    <div className="w-full">
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="예: 30,000"
      />
    </div>

    {/* 뱃지 */}
    <div className="w-full">
      <Select value={badge} onValueChange={setBadge}>
        <SelectTrigger>
          <SelectValue placeholder="뱃지 선택 (선택사항)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="best">BEST</SelectItem>
          <SelectItem value="set">SET</SelectItem>
          <SelectItem value="hit">HIT</SelectItem>
          <SelectItem value="signature">SIGNATURE</SelectItem>
          <SelectItem value="new">NEW</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* 설명 */}
    <div className="w-full md:col-span-2">
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={1}
        placeholder="예: 메뉴 설명을 입력하세요"
      />
    </div>

    {/* 이미지 선택 및 미리보기 */}
    <div className="w-full md:col-span-1 flex flex-col gap-2">
      <Input
        type="file"
        onChange={handleImageChange}
        className="text-sm"
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="미리보기"
          className="h-32 object-cover rounded border"
        />
      )}
    </div>

    {/* 등록 버튼 */}
    <div className="w-full md:col-span-3 flex justify-center pt-2">
      {loading ? <Spinner /> : <Button onClick={handleSubmit}>등록</Button>}
    </div>
  </div>
);
}