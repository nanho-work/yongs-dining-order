'use client';

import { useEffect, useState } from 'react';
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    query,
    orderBy,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import {
    getStorage,
    ref,
    deleteObject
} from 'firebase/storage';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';

interface MenuItem {
    id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    badge?: string;
    imageUrl: string | string[];
    limited?: boolean;
    order?: number;
}

export default function MenuList() {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const CATEGORY_ORDER = ['Main두부요리', '그외Main요리', 'SideMenu', 'SetMenu', '주류', '맥주', '하이볼', '전통주'];

    useEffect(() => {
        const fetchMenus = async () => {
            const q = query(collection(db, 'menus'));
            const snapshot = await getDocs(q);
            const fetchedMenus = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            })) as MenuItem[];

            fetchedMenus.sort((a, b) => {
                const catA = CATEGORY_ORDER.indexOf(a.category);
                const catB = CATEGORY_ORDER.indexOf(b.category);
                if (catA !== catB) return catA - catB;
                return (a.order ?? 0) - (b.order ?? 0);
            });
            setMenus(fetchedMenus);
        };

        fetchMenus();
    }, []);

    const deleteMenu = async (menuId: string, imagePath?: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        try {
            await deleteDoc(doc(db, 'menus', menuId));

            if (imagePath) {
                const storage = getStorage();
                const imageRef = ref(storage, imagePath);
                await deleteObject(imageRef);
            }

            setMenus((prev) => prev.filter((menu) => menu.id !== menuId));
        } catch (error) {
            console.error('삭제 실패:', error);
            alert('삭제 중 오류 발생');
        }
    };

    const onDragEnd = async (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const reordered = Array.from(menus);
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);

        // order 필드 업데이트
        setMenus(reordered);
        await Promise.all(
            reordered.map((menu, index) => {
                const ref = doc(db, 'menus', menu.id);
                return updateDoc(ref, { order: index });
            })
        );
    };

    return (
        <div className="space-y-10">
            <DragDropContext onDragEnd={onDragEnd}>
                {CATEGORY_ORDER.map((category, index) => {
                    const filteredMenus = menus.filter((menu) => menu.category === category);
                    if (filteredMenus.length === 0) return null;

                    const droppableId = `droppable-${index}-${category.replace(/\s+/g, '-')}`;

                    return (
                        <div key={category}>
                            <h2 className="text-xl font-bold mb-4">{category}</h2>
                            <Droppable droppableId={droppableId}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                                    >
                                        {filteredMenus.map((menu, index) => {
                                            const images = Array.isArray(menu.imageUrl)
                                                ? menu.imageUrl
                                                : [menu.imageUrl];
                                            const image = images[0] || '/coming-soon.png';

                                            return (
                                                <Draggable
                                                    key={menu.id}
                                                    draggableId={menu.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="border rounded-lg p-4 shadow w-[300px] max-w-sm mx-auto bg-white"
                                                        >
                                                            <div className="relative w-full aspect-[16/9] overflow-hidden">
                                                                <Image
                                                                    src={image}
                                                                    alt={menu.name}
                                                                    fill
                                                                    className="object-contain object-center rounded"
                                                                />
                                                            </div>
                                                            <div className="text-lg font-semibold">{menu.name}</div>
                                                            <div className="text-sm text-gray-500">{menu.description}</div>
                                                            <div className="mt-1 text-red-500 font-bold">
                                                                {menu.price}원
                                                            </div>
                                                            {menu.badge && (
                                                                <div className="inline-block px-2 py-1 mt-2 text-xs bg-yellow-200 rounded">
                                                                    {menu.badge.toUpperCase()}
                                                                </div>
                                                            )}
                                                            <div className="mt-4 flex gap-2">
                                                                <button
                                                                    className="text-red-600 text-sm hover:underline"
                                                                    onClick={() => deleteMenu(menu.id, image)}
                                                                >
                                                                    삭제
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}