'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/src/lib/utils'

interface SpecialRequestModalProps {
    price: number
    onClose: () => void
    onBack: () => void
    onAdd: (instructions: string) => void
}

export default function SpecialRequestModal({ price, onClose, onBack, onAdd }: SpecialRequestModalProps) {
    const [instructions, setInstructions] = useState('')

    return (
        <div onClick={onClose} style={{ zIndex: 99999 }} className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 lg:p-8 font-sans cursor-pointer">
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[1045px] h-full max-h-[90vh] flex flex-col cursor-default">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-[40px] h-[40px] lg:w-[56px] lg:h-[56px] bg-brand-orange rounded-full flex items-center justify-center z-50 shadow-lg hover:scale-105 transition-transform">
                    <Image src="/icon-close-white.svg" alt="Close" width={24} height={24} unoptimized className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
                </button>

                <div className="w-full h-full bg-white rounded-[12px] flex flex-col overflow-hidden shadow-2xl">
                    <div className="relative w-full h-[150px] lg:h-[280px] shrink-0 bg-gray-100">
                        <Image src="/modal-pizza-bg.jpg" alt="Pizza" fill unoptimized className="object-cover" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 lg:p-12 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
                        <h2 className="text-[28px] lg:text-[32px] font-bold text-brand-orange mb-6">Add your special request</h2>

                        <div className="w-full mb-12">
                            <textarea
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                placeholder="Write your special instructions here..."
                                className="w-full h-[300px] lg:h-[419px] bg-[#f4f4f4] border border-[rgba(0,0,0,0.3)] rounded-[12px] p-6 text-[16px] text-black outline-none resize-none shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] placeholder:text-gray-500"
                            />
                        </div>

                        <div className="mt-auto pt-6 flex flex-col gap-6">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                                <div className="w-[342px] h-[70px] bg-[rgba(252,138,6,0.8)] border border-[rgba(0,0,0,0.11)] rounded-[8px] flex items-center justify-between px-6 text-white shadow-sm shrink-0">
                                    <span className="font-bold text-[18px]">Total to pay</span>
                                    <span className="font-bold text-[28px] lg:text-[36px]" style={{ lineHeight: '69%' }}>
                                        {formatPrice(price)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row justify-end items-center gap-6 lg:gap-12 mt-4 lg:mt-0">
                                <button onClick={onBack} className="font-bold text-[18px] lg:text-[24px] text-black hover:underline transition-all">
                                    Take me back
                                </button>
                                <button
                                    onClick={() => onAdd(instructions)}
                                    className="w-full lg:w-[342px] h-[70px] bg-brand-green border border-[rgba(0,0,0,0.11)] rounded-[8px] flex items-center justify-center gap-3 text-white font-bold text-[24px] hover:bg-[#027038] transition-colors shadow-md shrink-0">
                                    <Image src="/icon-arrow-right-white.svg" alt="Add" width={28} height={28} unoptimized />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
