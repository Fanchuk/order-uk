'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PIZZA_TOPPINGS_DATA } from '@/src/shared/lib/constants/modals'
import { formatPrice } from '@/src/lib/utils'

interface PizzaToppingsModalProps {
    price: number
    onClose: () => void
    onBack: () => void
    onNext: (toppings: string[]) => void
}

export default function PizzaToppingsModal({ price, onClose, onBack, onNext }: PizzaToppingsModalProps) {
    const [selectedToppings, setSelectedToppings] = useState<string[]>([])
    const FREE_LIMIT = 4

    const toggleTopping = (topping: string) => {
        setSelectedToppings((prev) => {
            if (prev.includes(topping)) return prev.filter((t) => t !== topping)
            return [...prev, topping]
        })
    }

    const selectedCount = selectedToppings.length

    return (
        <div onClick={onClose} style={{ zIndex: 99999 }} className="fixed inset-0 flex items-center justify-center bg-black/80 p-4 lg:p-8 font-sans cursor-pointer">
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[1045px] h-full max-h-[90vh] flex flex-col cursor-default">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 lg:-top-6 lg:-right-6 w-[40px] h-[40px] lg:w-[56px] lg:h-[56px] bg-brand-orange rounded-full flex items-center justify-center z-50 shadow-lg hover:scale-105 transition-transform">
                    <Image src="/icon-close-white.svg" alt="Close" width={24} height={24} unoptimized className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
                </button>

                <div className="w-full h-full bg-white rounded-[12px] flex flex-col overflow-hidden shadow-2xl">
                    <div className="relative w-full h-[150px] lg:h-[280px] shrink-0 bg-gray-100">
                        <Image src="/modal-pizza-bg.jpg" alt="Pizza" fill unoptimized className="object-cover" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 lg:p-12 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
                        <div className="flex flex-col gap-8 lg:gap-10">
                            {PIZZA_TOPPINGS_DATA.map((category) => (
                                <div key={category.id} className="relative pt-[25px] lg:pt-[35px]">
                                    <div className="absolute top-0 left-4 lg:left-6 z-10 flex items-center h-[50px] lg:h-[69px] bg-brand-dark rounded-r-[12px] rounded-l-[35px] pr-6 lg:pr-8 shadow-md">
                                        <div className="w-[50px] h-[50px] lg:w-[69px] lg:h-[69px] bg-brand-orange rounded-full flex items-center justify-center shrink-0 border-[3px] lg:border-[4px] border-[#03081f]">
                                            <Image src={category.icon} alt="icon" width={24} height={24} unoptimized className="lg:w-[32px] lg:h-[32px] brightness-0 invert" />
                                        </div>
                                        <span className="text-white font-bold text-[16px] lg:text-[20px] ml-3 lg:ml-4 tracking-wide">{category.title}</span>
                                    </div>
                                    <div className="w-full border border-gray-200 rounded-[12px] pt-[40px] lg:pt-[60px] pb-6 lg:pb-8 px-4 lg:px-8">
                                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-4 lg:gap-y-6 gap-x-2 lg:gap-x-4">
                                            {category.items.map((item) => {
                                                const isSelected = selectedToppings.includes(item)
                                                return (
                                                    <label key={item} className="flex items-center gap-3 lg:gap-4 cursor-pointer group">
                                                        <div
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                toggleTopping(item)
                                                            }}
                                                            className={`w-[28px] h-[28px] lg:w-[35px] lg:h-[35px] rounded-[6px] flex items-center justify-center transition-colors border-[2px] lg:border-[3px] shrink-0 ${isSelected ? 'bg-brand-green border-brand-green' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                                                            {isSelected && (
                                                                <svg
                                                                    width="16"
                                                                    height="16"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="white"
                                                                    strokeWidth="4"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="lg:w-[20px] lg:h-[20px]">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className="text-[14px] lg:text-[18px] font-bold text-black select-none">{item}</span>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 lg:mt-16 flex flex-col gap-4 lg:gap-6">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full">
                                <div className="w-full lg:w-[342px] h-[60px] lg:h-[70px] bg-brand-orange rounded-[8px] flex items-center justify-between px-6 text-white shadow-sm shrink-0">
                                    <span className="font-bold text-[16px] lg:text-[18px]">Total to pay</span>
                                    <span className="font-bold text-[22px] lg:text-[28px]">{formatPrice(price)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-end items-center gap-4 lg:gap-12 mt-2 lg:mt-0 w-full">
                                <button onClick={onBack} className="font-bold text-[16px] lg:text-[18px] text-black hover:underline transition-all">
                                    Take me back
                                </button>
                                <button
                                    onClick={() => onNext(selectedToppings)}
                                    className="w-full lg:w-[342px] h-[60px] lg:h-[70px] bg-brand-green rounded-[8px] flex items-center justify-center gap-3 text-white font-bold text-[20px] lg:text-[24px] hover:bg-[#027038] transition-colors shadow-md shrink-0">
                                    <Image src="/icon-arrow-right-white.svg" alt="Next" width={24} height={24} unoptimized className="lg:w-[28px] lg:h-[28px]" />
                                    Next Step
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
