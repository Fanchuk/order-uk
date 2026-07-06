'use client'

import Image from 'next/image'

interface SidebarMenuProps {
    categories: string[]
    activeCategory: string
    onCategorySelect: (category: string) => void
    restaurantName?: string
    onPromoClick: () => void
}

export default function SidebarMenu({ categories, activeCategory, onCategorySelect, restaurantName, onPromoClick }: SidebarMenuProps) {
    return (
        <aside className="hidden lg:flex flex-col w-[260px] xl:w-[315px] shrink-0 font-sans">
            {/* Header меню */}
            <div className="w-full bg-[#03081f] text-white rounded-t-[12px] h-[60px] flex items-center px-6 gap-4">
                <Image src="/icon-menu-mobile.svg" alt="menu" width={24} height={24} unoptimized className="brightness-0 invert" />
                <span className="font-bold text-[18px]">Menu</span>
            </div>

            <ul className="flex flex-col bg-gray-50 rounded-b-[12px] border-x border-b border-gray-100 overflow-hidden shadow-sm">
                {categories.map((cat) => (
                    <li
                        key={cat}
                        onClick={() => onCategorySelect(cat)}
                        className={`h-[60px] flex items-center px-6 text-[16px] font-bold cursor-pointer transition-colors border-b border-gray-100 last:border-0 
                        ${activeCategory === cat ? 'bg-white text-black border-l-4 border-l-[#fc8a06]' : 'text-gray-500 hover:bg-white hover:text-black'}`}>
                        {cat}
                    </li>
                ))}
            </ul>

            <div onClick={onPromoClick} className="relative w-full h-[325px] rounded-[12px] overflow-hidden shadow-sm group cursor-pointer mt-8 block">
                <Image src="/offer-first-order.jpg" alt="First Order Discount" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-6 bg-[#03081f] w-[88px] h-[66px] rounded-b-[12px] flex items-center justify-center z-10">
                    <span className="text-white font-bold text-[24px]">-20%</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col items-start">
                    <span className="text-[#fc8a06] font-medium text-[14px] mb-1">{restaurantName || 'Restaurant'}</span>
                    <h3 className="text-white font-bold text-[32px] leading-tight">First Order Discount</h3>
                </div>
            </div>
        </aside>
    )
}
