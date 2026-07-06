'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/src/lib/utils'

const PIZZA_OPTIONS = [
    { id: 1, name: 'Margherita', qty: 1, isActive: false },
    { id: 2, name: 'Polo', qty: 1, isActive: false },
    { id: 3, name: 'Meat Fiest', qty: 1, isActive: false },
    { id: 4, name: 'Hawaiian', qty: 1, isActive: false },
    { id: 5, name: 'Toscana', qty: 1, isActive: false },
]

interface CustomisePizzaModalProps {
    price: number
    onClose: () => void
    onNext: (pizzas: any[]) => void
}

export default function CustomisePizzaModal({ price, onClose, onNext }: CustomisePizzaModalProps) {
    const [pizzas, setPizzas] = useState(PIZZA_OPTIONS)

    const handleSelectPizza = (id: number) => {
        setPizzas((prevPizza) => prevPizza.map((pizza) => ({ ...pizza, isActive: pizza.id === id })))
    }

    const handleQuantityChange = (id: number, delta: number) => {
        setPizzas((prevPizza) =>
            prevPizza.map((pizza) => {
                if (pizza.id === id) {
                    const newQty = pizza.qty + delta
                    return { ...pizza, qty: newQty < 1 ? 1 : newQty }
                }
                return pizza
            }),
        )
    }

    return (
        <div onClick={onClose} style={{ zIndex: 99999 }} className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 lg:p-8 font-sans">
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[1045px] h-full max-h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 lg:-top-6 lg:-right-6 w-[40px] h-[40px] lg:w-[56px] lg:h-[56px] bg-brand-orange rounded-full flex items-center justify-center z-50 shadow-lg hover:scale-105 transition-transform">
                    <Image src="/icon-close-white.svg" alt="Close" width={24} height={24} unoptimized className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
                </button>

                <div className="w-full h-full bg-white rounded-[12px] flex flex-col overflow-hidden shadow-2xl">
                    <div className="relative w-full h-[150px] lg:h-[280px] shrink-0 bg-gray-100">
                        <Image src="/modal-pizza-bg.jpg" alt="Pizza Customization" fill unoptimized className="object-cover" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 lg:p-12 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
                        <div className="mb-6 lg:mb-8">
                            <h2 className="text-[20px] lg:text-[32px] font-medium text-black">Please select your first Pizza</h2>
                        </div>

                        <div className="flex flex-col gap-3 lg:gap-4">
                            {pizzas.map((pizza) => (
                                <div
                                    key={pizza.id}
                                    onClick={() => handleSelectPizza(pizza.id)}
                                    className={`w-full h-[70px] lg:h-[92px] rounded-[12px] px-4 lg:px-6 flex items-center justify-between transition-colors border cursor-pointer ${
                                        pizza.isActive ? 'bg-brand-dark border-brand-dark' : 'bg-[#f3f4f6] border-transparent hover:border-gray-300'
                                    }`}>
                                    <div className="flex items-center gap-3 lg:gap-6">
                                        <div className="w-[45px] h-[45px] lg:w-[74px] lg:h-[74px] rounded-full overflow-hidden bg-white border border-gray-200 shrink-0">
                                            <Image src="/menu-pizza.jpg" alt={pizza.name} width={74} height={74} unoptimized className="object-cover w-full h-full" />
                                        </div>
                                        <span className={`text-[15px] lg:text-[22px] font-bold tracking-wide ${pizza.isActive ? 'text-brand-orange' : 'text-black'}`}>{pizza.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2 lg:gap-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleQuantityChange(pizza.id, -1)
                                            }}
                                            className="hover:scale-110 transition-transform">
                                            <Image
                                                src={pizza.isActive ? '/icon-minus-white.svg' : '/icon-minus-dark.svg'}
                                                alt="minus"
                                                width={24}
                                                height={24}
                                                unoptimized
                                                className="lg:w-[28px] lg:h-[28px]"
                                            />
                                        </button>
                                        <span className={`w-[16px] lg:w-[20px] text-center font-bold text-[16px] lg:text-[20px] ${pizza.isActive ? 'text-white' : 'text-black'}`}>{pizza.qty}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleQuantityChange(pizza.id, 1)
                                            }}
                                            className="hover:scale-110 transition-transform">
                                            <Image
                                                src={pizza.isActive ? '/icon-plus-white.svg' : '/icon-plus-dark.svg'}
                                                alt="plus"
                                                width={24}
                                                height={24}
                                                unoptimized
                                                className="lg:w-[28px] lg:h-[28px]"
                                            />
                                        </button>
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
                                <span className="text-[12px] lg:text-[14px] text-black font-medium opacity-80 text-center lg:text-right w-full lg:w-auto">
                                    Delivery & Tax will be calculated in the next step
                                </span>
                            </div>

                            <div className="flex flex-col lg:flex-row justify-end items-center gap-4 lg:gap-12 mt-2 lg:mt-0 w-full">
                                <button onClick={onClose} className="font-bold text-[16px] lg:text-[18px] text-black hover:underline transition-all">
                                    Take me back
                                </button>
                                <button
                                    onClick={() => onNext(pizzas.filter((p) => p.isActive))}
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
