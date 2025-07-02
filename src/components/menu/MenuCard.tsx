'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MenuItem } from './MenuListOrder';

interface Props {
    menu: MenuItem;
    quantity: number;
    onQuantityChange: (menu: MenuItem, quantity: number) => void;
}

export default function MenuCard({ menu, quantity, onQuantityChange }: Props) {
    const [flipped, setFlipped] = useState(false);

    const handleAdd = () => onQuantityChange(menu, quantity + 1);
    const handleRemove = () => onQuantityChange(menu, Math.max(0, quantity - 1));

    const image = Array.isArray(menu.imageUrl) ? menu.imageUrl[0] : menu.imageUrl;

    return (
        <div className="relative w-full aspect-[16/9] group overflow-visible">
            <div className="[perspective:1000px] w-full h-full" onClick={() => setFlipped(!flipped)}>
                <div className={`relative w-full h-[238px] duration-700 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
                    {/* 앞면 */}
                    <div className="absolute inset-0 backface-hidden z-20">
                        <Image
                            src={image || '/coming-soon.png'}
                            alt={menu.name}
                            fill
                            className="object-contain object-center rounded"
                        />
                        <div className="absolute bottom-0 w-full bg-black/50 text-white text-center p-2">
                            <h3 className="text-sm font-semibold">{menu.name}</h3>
                            <p className="text-xs">{menu.price}원</p>
                            <p className="text-[10px] mt-1">(카드를 터치하여 상세 보기)</p>
                            {/* 수량 조절 */}
                            <div
                                className="mt-4 flex items-center bg-white/70 px-4 py-2 rounded text-black gap-4 mx-auto w-fit"
                                onClick={(e) => e.stopPropagation()} // 카드 뒤집힘 방지
                            >
                                <button onClick={handleRemove} className="text-lg font-bold">−</button>
                                <span>{quantity}</span>
                                <button onClick={handleAdd} className="text-lg font-bold">＋</button>
                            </div>


                        </div>

                    </div>

                    {/* 뒷면 */}
                    <div
                        className="absolute inset-0 rotate-y-180 flex flex-col justify-center items-center text-white px-4 py-3"
                        style={{
                            backgroundImage: 'url(/background2.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <h3 className="text-lg font-bold mb-2">{menu.name}</h3>
                        <p className="text-sm text-center">{menu.description}</p>
                        <p className="mt-2 font-semibold">{menu.price}원</p>


                    </div>
                </div>
            </div>

            {/* 뱃지 */}
            {menu.badge && (
                <span className="absolute z-30 top-[-12px] left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md pointer-events-none">
                    {menu.badge}
                </span>
            )}
        </div>
    );
}