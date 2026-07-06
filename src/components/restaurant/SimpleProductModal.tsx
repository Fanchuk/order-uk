'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/src/lib/utils'

interface SimpleProductModalProps {
    product: any
    onClose: () => void
    onAdd: (quantity: number, instructions: string) => void
}

export default function SimpleProductModal({ product, onClose, onAdd }: SimpleProductModalProps) {
    const [quantity, setQuantity] = useState(1)
    const [instructions, setInstructions] = useState('')

    if (!product) return null

    const handleMinus = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (quantity > 1) setQuantity((prev) => prev - 1)
    }

    const handlePlus = (e: React.MouseEvent) => {
        e.stopPropagation()
        setQuantity((prev) => prev + 1)
    }

    const basePrice = product.price || product.newPrice || 0

    return (
        <div
            onClick={onClose}
            style={{ zIndex: 99999 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans cursor-pointer transition-all duration-300">
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[700px] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden cursor-default">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-[44px] h-[44px] bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center z-50 shadow-lg hover:bg-black/60 hover:scale-110 transition-all">
                    <Image src="/icon-close-white.svg" alt="Close" width={18} height={18} unoptimized />
                </button>

                <div className="relative w-full h-[240px] md:h-[340px] bg-gray-100 shrink-0">
                    <Image src={product.imagePath} alt={product.name} fill unoptimized className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 md:p-8 flex flex-col gap-8 overflow-y-auto max-h-[65vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
                    <div>
                        <div className="flex justify-between items-start gap-4">
                            <h2 className="text-[28px] md:text-[36px] font-bold text-[#03081f] leading-tight" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                {product.name}
                            </h2>
                            {/* 🔴 FIX: formatPrice() ділить на 100 (ціни в пенсах) */}
                            <span className="text-[24px] md:text-[28px] font-bold text-[#fc8a06] shrink-0 mt-1">{formatPrice(basePrice)}</span>
                        </div>
                        <p className="text-[15px] md:text-[17px] text-gray-500 leading-relaxed font-medium mt-3">{product.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-y border-gray-100 py-6">
                        <span className="font-bold text-[18px] md:text-[20px] text-black">Quantity</span>
                        <div className="flex items-center gap-5 bg-[#f4f4f4] px-5 py-2.5 rounded-full border border-gray-200">
                            <button onClick={handleMinus} className="p-1 hover:scale-110 transition-transform flex items-center justify-center">
                                <Image src="/icon-minus-dark.svg" alt="minus" width={20} height={20} unoptimized />
                            </button>
                            <span className="w-[30px] text-center font-bold text-[20px] text-black">{quantity}</span>
                            <button onClick={handlePlus} className="p-1 hover:scale-110 transition-transform flex items-center justify-center">
                                <Image src="/icon-plus-dark.svg" alt="plus" width={20} height={20} unoptimized />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="font-bold text-[18px] text-black">Special instructions</label>
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="e.g. No ice, extra sauce, allergy notes..."
                            className="w-full h-[120px] bg-[#f8f8f8] border border-gray-200 rounded-[16px] p-5 text-[16px] text-black outline-none resize-none placeholder:text-gray-400 focus:border-[#fc8a06] focus:ring-1 focus:ring-[#fc8a06] transition-all"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                        <div className="w-full sm:w-[220px] h-[68px] bg-[#fc8a06] rounded-[12px] flex items-center justify-between px-6 text-white shadow-md shrink-0">
                            <span className="font-medium text-[16px]">Total to pay</span>
                            <span className="font-bold text-[26px]">{formatPrice(basePrice * quantity)}</span>
                        </div>

                        <button
                            onClick={() => onAdd(quantity, instructions)}
                            className="w-full sm:flex-1 h-[68px] bg-[#028643] rounded-[12px] flex items-center justify-center gap-3 text-white font-bold text-[20px] hover:bg-[#027038] transition-colors shadow-xl">
                            Add to basket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
