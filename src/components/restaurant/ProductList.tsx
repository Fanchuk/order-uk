// src/components/restaurant/ProductList.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

const SORT_OPTIONS = ['Top Rated', 'Price: Low to High', 'Price: High to Low']

interface ProductListProps {
    items: any[]
    searchQuery: string
    activeCategory: string
    sortOption: string
    onSortChange: (sort: string) => void
    onProductClick: (item: any) => void
}

export default function ProductList({ items, searchQuery, activeCategory, sortOption, onSortChange, onProductClick }: ProductListProps) {
    const [isSortOpen, setIsSortOpen] = useState(false)

    const renderPeppers = (spiciness: number) => {
        if (!spiciness || spiciness === 0) return null
        return (
            <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                    <Image key={i} src={i < spiciness ? '/icon-pepper-red.svg' : '/icon-pepper-grey.svg'} alt="pepper" width={16} height={16} unoptimized className="rotate-[23deg]" />
                ))}
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col min-w-0 z-10">
            <div className="hidden lg:flex items-center justify-between mb-6">
                <h2 className="text-[28px] font-bold text-black capitalize" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    {searchQuery ? `Search: "${searchQuery}"` : activeCategory}
                </h2>

                <div className="relative z-20">
                    <div
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 border border-gray-200 rounded-[120px] px-4 py-2 bg-white cursor-pointer hover:bg-gray-50 shadow-sm">
                        <span className="text-[14px] font-medium text-black">Sort by: {sortOption}</span>
                        <Image
                            src="/icon-arrow-down-grey.svg"
                            alt="sort"
                            width={16}
                            height={16}
                            unoptimized
                            className={isSortOpen ? 'rotate-180 transition-transform duration-200' : 'transition-transform duration-200'}
                        />
                    </div>

                    {isSortOpen && (
                        <div className="absolute right-0 top-12 w-[200px] bg-white border border-gray-100 shadow-lg rounded-[12px] overflow-hidden z-20">
                            {SORT_OPTIONS.map((opt) => (
                                <div
                                    key={opt}
                                    onClick={() => {
                                        onSortChange(opt)
                                        setIsSortOpen(false)
                                    }}
                                    className={`px-4 py-3 text-[14px] font-medium cursor-pointer hover:bg-gray-50 ${sortOption === opt ? 'text-[#fc8a06]' : 'text-black'}`}>
                                    {opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                {items.length === 0 ? (
                    <div className="p-10 text-center text-gray-500 font-medium bg-white rounded-[12px] border border-gray-100 shadow-sm">No items found. Try another search.</div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="w-full bg-white rounded-[12px] border border-[rgba(0,0,0,0.11)] p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex flex-col pt-1">
                                    <h3 className="text-[18px] font-bold text-black leading-[120%]">{item.name}</h3>
                                    {renderPeppers(item.spiciness)}
                                </div>
                                <div className="relative shrink-0 w-[117px] h-[117px] mt-2">
                                    <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                                        <Image src={item.imagePath || '/placeholder.jpg'} alt={item.name} fill unoptimized className="object-cover" />
                                    </div>
                                </div>
                            </div>

                            <p className="text-[14px] text-black font-normal leading-[140%] opacity-80 line-clamp-2">{item.description}</p>

                            <div className="flex mt-2">
                                <div
                                    onClick={() => onProductClick(item)}
                                    className="flex items-center justify-between w-[250px] h-[58px] px-2 gap-3 border border-[rgba(0,0,0,0.11)] rounded-[4px] cursor-pointer hover:border-black transition-colors bg-[#03081f]">
                                    <span className="font-bold text-[14px] pl-2 text-white">Add to Basket</span>
                                    <div className="h-[39px] px-4 bg-[#028643] rounded-[4px] flex items-center justify-center">
                                        <span className="font-bold text-[14px] text-white tracking-wide">£{Number(item.price).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
