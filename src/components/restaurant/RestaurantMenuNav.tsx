'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { RESTAURANT_CATEGORIES, SORT_OPTIONS } from '@/src/shared/lib/constants/restaurants'

interface RestaurantMenuNavProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    restaurantName?: string
}

export default function RestaurantMenuNav({ searchQuery, setSearchQuery, restaurantName }: RestaurantMenuNavProps) {
    const [activeCategory, setActiveCategory] = useState(RESTAURANT_CATEGORIES[0])
    const [activeSort, setActiveSort] = useState(SORT_OPTIONS[0])
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)

    const name = restaurantName || 'this Restaurant'

    const handleCategoryClick = (cat: string) => {
        setActiveCategory(cat)
        setIsCategoryMenuOpen(false)

        const element = document.getElementById(cat)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
            const slugElement = document.getElementById(cat.toLowerCase().replace(/\s+/g, '-').replace('®', ''))
            if (slugElement) {
                slugElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting)
                if (visible) setActiveCategory(visible.target.id as (typeof RESTAURANT_CATEGORIES)[number])
            },
            { rootMargin: '-154px 0px -60% 0px', threshold: 0 },
        )

        RESTAURANT_CATEGORIES.forEach((cat) => {
            const el = document.getElementById(cat)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="w-full font-sans select-none relative z-40">
            {/* ДЕСКТОП: заголовок і пошук */}
            <div className="hidden lg:flex max-w-[1528px] mx-auto px-16 items-center justify-between mb-8 mt-8">
                <h2 className="text-[32px] font-bold text-black" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    All Offers from {name}
                </h2>
                <div className="flex items-center w-[344px] h-[63px] border border-[#03081f] rounded-[120px] px-6 bg-white shrink-0">
                    <Image src="/icon-search.svg" alt="Search" width={24} height={24} unoptimized />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search from menu..."
                        className="ml-3 outline-none bg-transparent w-full text-[16px] text-black placeholder:text-gray-500"
                    />
                </div>
            </div>

            {/* МОБІЛЬНА: пошук і заголовок */}
            <div className="flex lg:hidden flex-col items-center px-4 w-full gap-6 mb-6 mt-8">
                <div className="flex items-center w-full max-w-[344px] h-[63px] border border-[#03081f] rounded-[120px] px-6 bg-white shrink-0">
                    <Image src="/icon-search.svg" alt="Search" width={24} height={24} unoptimized />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search from menu..."
                        className="ml-3 outline-none bg-transparent w-full text-[16px] text-black placeholder:text-gray-500"
                    />
                </div>
                <h2 className="text-[18px] font-semibold text-black text-center" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    Order from {name}
                </h2>
            </div>

            {/* ДЕСКТОП: навігаційна смуга — sticky, прилипає під хедером тільки після скролу до неї */}
            <div className="hidden lg:block w-full bg-[#fc8a06] h-[96px] sticky top-0 z-30 shadow-md">
                <div className="max-w-[1528px] mx-auto px-16 h-full flex items-center gap-10 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {RESTAURANT_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`whitespace-nowrap transition-all duration-200 ${
                                activeCategory === cat
                                    ? 'bg-[#03081f] text-white border border-black rounded-[120px] px-8 h-[39px] font-bold text-[16px] shadow-sm'
                                    : 'text-white font-bold text-[21px] hover:opacity-80 hover:scale-95'
                            }`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* МОБІЛЬНА: дропдаун меню */}
            <div className="flex lg:hidden flex-col px-4 w-full max-w-[405px] mx-auto relative">
                <button
                    onClick={() => {
                        setIsCategoryMenuOpen(!isCategoryMenuOpen)
                        setIsSortMenuOpen(false)
                    }}
                    className="relative w-full h-[78px] rounded-[12px] border border-[rgba(0,0,0,0.3)] flex items-center justify-between px-6 bg-white shadow-sm mb-6 z-20">
                    <div className="flex items-center gap-5">
                        <Image src="/icon-menu-mobile.svg" alt="Menu" width={42} height={42} unoptimized />
                        <span className="font-bold text-[30px] text-black">Menu</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[20px] font-medium text-black opacity-80">{activeCategory}</span>
                        <Image src="/icon-arrow-down.svg" alt="Arrow" width={32} height={32} className={`transition-transform duration-300 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} unoptimized />
                    </div>
                </button>

                {isCategoryMenuOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsCategoryMenuOpen(false)} />
                        <div className="absolute top-[85px] left-4 right-4 bg-[#fbfbfb] border border-[#bcbcbc] rounded-[12px] shadow-2xl z-30 flex flex-col overflow-hidden max-h-[400px] overflow-y-auto">
                            <ul className="flex flex-col">
                                {RESTAURANT_CATEGORIES.map((cat) => (
                                    <li
                                        key={cat}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleCategoryClick(cat)
                                        }}
                                        className={`px-8 py-4 text-[22px] font-bold cursor-pointer transition-colors ${
                                            activeCategory === cat ? 'bg-[#03081f] text-white' : 'text-[#282828] hover:bg-gray-200 border-b border-gray-200 last:border-0'
                                        }`}>
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <div className="flex items-center justify-between w-full mb-6 gap-2 relative">
                    <h3 className="font-bold text-[30px] text-black truncate pr-2">{activeCategory}</h3>
                    <button
                        onClick={() => {
                            setIsSortMenuOpen(!isSortMenuOpen)
                            setIsCategoryMenuOpen(false)
                        }}
                        className="relative shrink-0 w-[207px] h-[52px] rounded-[120px] bg-[#f6f6f6] border border-[#cfcfcf] flex items-center justify-between px-5 z-20">
                        <span className="font-medium text-[14px] text-black truncate pr-2">{activeSort}</span>
                        <Image src="/icon-sort-arrow.svg" alt="Arrow" width={20} height={20} className={`transition-transform duration-300 ${isSortMenuOpen ? 'rotate-180' : ''}`} unoptimized />
                    </button>

                    {isSortMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsSortMenuOpen(false)} />
                            <div className="absolute top-[60px] right-0 w-[207px] bg-white border border-[#cfcfcf] rounded-[12px] shadow-xl z-30 flex flex-col overflow-hidden">
                                <ul className="flex flex-col">
                                    {SORT_OPTIONS.map((sort) => (
                                        <li
                                            key={sort}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setActiveSort(sort)
                                                setIsSortMenuOpen(false)
                                            }}
                                            className={`px-5 py-3 text-[14px] font-medium cursor-pointer transition-colors hover:bg-gray-100 border-b border-gray-100 last:border-0 ${
                                                activeSort === sort ? 'text-[#fc8a06] bg-gray-50' : 'text-black'
                                            }`}>
                                            {sort}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
