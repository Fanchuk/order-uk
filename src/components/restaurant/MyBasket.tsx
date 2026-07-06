'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'
import { useBasketStore } from '@/src/features/basket/store/useBasketStore'
import { formatPrice } from '@/src/lib/utils'

const MINIMUM_ORDER = 2000
const DELIVERY_FEE = 250

interface AppliedCoupon {
    code: string
    discount: number
}

export default function MyBasket() {
    const router = useRouter()
    const { items, removeItem, getSubTotal, addItem } = useBasketStore()

    const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'collection'>('delivery')
    const [showCouponInput, setShowCouponInput] = useState(false)
    const [couponInputValue, setCouponInputValue] = useState('')
    const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
    const [isApplying, setIsApplying] = useState(false)

    const subTotal = getSubTotal()
    const discount = appliedCoupon?.discount ?? 0
    const deliveryCost = deliveryMode === 'delivery' ? DELIVERY_FEE : 0

    const totalPay = subTotal > 0 ? Math.max(0, subTotal - discount + deliveryCost) : 0

    const isCheckoutDisabled = subTotal < MINIMUM_ORDER || subTotal === 0
    const amountLeft = Math.max(0, MINIMUM_ORDER - subTotal)

    const handleApplyCoupon = async () => {
        const code = couponInputValue.trim()
        if (!code) return

        setIsApplying(true)
        try {
            const res = await fetch('/api/coupon/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, subtotal: subTotal }),
            })
            const data = await res.json()

            if (!res.ok || !data.valid) {
                toast.error(data.error || 'Invalid coupon code!')
                return
            }

            setAppliedCoupon({ code: code.toUpperCase(), discount: data.discount ?? 0 })
            setShowCouponInput(false)
            toast.success(`Coupon ${code.toUpperCase()} applied!`)
        } catch {
            toast.error('Could not validate coupon. Try again.')
        } finally {
            setIsApplying(false)
        }
    }

    const handleFreeItemClick = () => {
        addItem({
            menuItemId: 'free-gift',
            name: 'Coca-Cola 0.33L (Free Gift)',
            price: 0,
            image: '/menu-drink.jpg',
            qty: 1,
            desc: 'Promo gift for your order',
        })
        toast.success('Free gift added to your basket!')
    }

    return (
        <div className="w-full lg:w-[367px] bg-white border border-[rgba(0,0,0,0.11)] rounded-t-[8px] flex flex-col font-sans shadow-sm shrink-0">
            <div className="w-full h-[117px] bg-[#028643] rounded-t-[8px] flex items-center justify-center gap-4 shrink-0">
                <Image src="/icon-basket-check.svg" alt="Basket" width={45} height={45} unoptimized className="brightness-0 invert" />
                <span className="font-bold text-[32px] text-white">My Basket</span>
            </div>

            <div className="flex flex-col w-full max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200">
                {items.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 font-medium">Your basket is empty. Add some tasty food!</div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-4 border-b border-[rgba(0,0,0,0.05)]">
                            <div className="w-[35px] h-[35px] rounded-full bg-[#fc8a06] flex items-center justify-center shrink-0">
                                <span className="font-bold text-[16px] text-white">{item.qty}x</span>
                            </div>

                            <div className="flex flex-col flex-1 pt-1">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[18px] text-[#028643]">{formatPrice(item.price * item.qty)}</span>
                                        <span className="font-bold text-[16px] text-black leading-tight mt-1">{item.name}</span>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="p-1 hover:bg-gray-100 rounded-md transition-colors shrink-0">
                                        <Image src="/icon-trash-grey.svg" alt="Delete" width={20} height={20} unoptimized />
                                    </button>
                                </div>
                                {item.desc && <span className="text-[12px] text-gray-500 font-medium mt-1 leading-snug">{item.desc}</span>}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex flex-col px-6 py-6 gap-2 border-b border-[rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-[16px] text-black">Sub Total:</span>
                    <span className="font-bold text-[16px] text-black">{formatPrice(subTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-[16px] text-black">Discounts:</span>
                    <span className="font-bold text-[16px] text-black">{discount > 0 ? `-${formatPrice(discount)}` : formatPrice(0)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-[16px] text-black">Delivery Fee:</span>
                    <span className="font-bold text-[16px] text-black">{subTotal > 0 && deliveryMode === 'delivery' ? formatPrice(DELIVERY_FEE) : formatPrice(0)}</span>
                </div>
            </div>

            <div className="px-4 mt-6">
                <div className="w-full h-[70px] bg-[rgba(252,138,6,0.8)] border border-[rgba(0,0,0,0.11)] rounded-[8px] flex items-center justify-between px-6 shadow-sm">
                    <span className="font-bold text-[18px] text-white">Total to pay</span>
                    <span className="font-bold text-[28px] text-white">{formatPrice(totalPay)}</span>
                </div>
            </div>

            <div className="px-4 mt-4 flex flex-col gap-3">
                <button
                    onClick={handleFreeItemClick}
                    className="w-full h-[52px] bg-[#f6f6f6] border border-[#cfcfcf] rounded-[120px] flex items-center justify-between px-5 hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-[14px] text-black">Choose your free item..</span>
                    <Image src="/icon-arrow-down-circle.svg" alt="Down" width={24} height={24} unoptimized />
                </button>

                {!showCouponInput && !appliedCoupon ? (
                    <button
                        onClick={() => setShowCouponInput(true)}
                        className="w-full h-[52px] bg-white border border-[#cfcfcf] rounded-[120px] flex items-center justify-between px-5 hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-[14px] text-black">Apply Coupon Code here</span>
                        <Image src="/icon-arrow-right-green.svg" alt="Apply" width={24} height={24} unoptimized />
                    </button>
                ) : appliedCoupon ? (
                    <div className="w-full h-[52px] bg-[#f4fef8] border border-[#028643] rounded-[120px] flex items-center justify-between px-5">
                        <span className="font-medium text-[14px] text-[#028643]">Coupon {appliedCoupon.code} Applied!</span>
                        <button onClick={() => setAppliedCoupon(null)} className="text-[12px] text-gray-400 hover:text-red-500 transition-colors">
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="w-full h-[52px] bg-white border border-[#fc8a06] rounded-[120px] flex items-center justify-between px-2 overflow-hidden shadow-sm">
                        <input
                            type="text"
                            value={couponInputValue}
                            onChange={(e) => setCouponInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                            placeholder="Enter code (e.g. ORDER5)"
                            className="w-full h-full outline-none px-4 text-[14px] bg-transparent"
                            autoFocus
                        />
                        <button
                            onClick={handleApplyCoupon}
                            disabled={isApplying}
                            className="h-[36px] px-4 bg-[#fc8a06] text-white rounded-[120px] text-[14px] font-bold hover:bg-[#e07a05] transition-colors disabled:opacity-50">
                            {isApplying ? '...' : 'Apply'}
                        </button>
                    </div>
                )}
            </div>

            <div className="px-4 mt-6 flex items-center gap-3">
                <div
                    onClick={() => setDeliveryMode('delivery')}
                    className={`flex-1 h-[70px] rounded-[8px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors border 
                        ${deliveryMode === 'delivery' ? 'bg-[#f4fef8] border-[#028643]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <Image src="/icon-scooter-green.svg" alt="Delivery" width={24} height={24} unoptimized />
                    <span className="font-bold text-[12px] text-black">Delivery</span>
                    <span className="text-[10px] text-gray-500">Starts at 17:50</span>
                </div>
                <div
                    onClick={() => setDeliveryMode('collection')}
                    className={`flex-1 h-[70px] rounded-[8px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors border 
                        ${deliveryMode === 'collection' ? 'bg-[#f4fef8] border-[#028643]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <Image src="/icon-collection-store.svg" alt="Collection" width={24} height={24} unoptimized />
                    <span className="font-bold text-[12px] text-black">Collection</span>
                    <span className="text-[10px] text-gray-500">Starts at 16:50</span>
                </div>
            </div>

            <div className="px-4 mt-6 mb-6 relative">
                <button
                    disabled={isCheckoutDisabled}
                    onClick={() => {
                        if (!isCheckoutDisabled) router.push('/checkout')
                    }}
                    className={`w-full h-[70px] rounded-[8px] flex items-center justify-center gap-3 transition-colors shadow-sm
                        ${isCheckoutDisabled ? 'bg-[#ffb1b1] cursor-not-allowed border border-[rgba(0,0,0,0.11)]' : 'bg-[#028643] hover:bg-[#027038]'}
                    `}>
                    <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
                        <Image src="/icon-arrow-right-green.svg" alt="Checkout" width={18} height={18} unoptimized />
                    </div>
                    <span className="font-bold text-[24px] text-white">Checkout!</span>
                </button>

                <div className="mt-4 relative w-full bg-[#03081f] rounded-[8px] p-4 flex flex-col items-center justify-center text-center">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#03081f] rotate-45 rounded-sm"></div>

                    {subTotal === 0 ? (
                        <p className="font-bold text-[14px] text-white leading-snug">
                            Minimum delivery is <span className="text-[#fc8a06]">{formatPrice(MINIMUM_ORDER)}</span>
                        </p>
                    ) : isCheckoutDisabled ? (
                        <p className="font-bold text-[14px] text-white leading-snug">
                            Minimum delivery is <span className="text-[#fc8a06]">{formatPrice(MINIMUM_ORDER)}</span>, You must
                            <br />
                            Spend <span className="text-[#fc8a06]">{formatPrice(amountLeft)} more</span> for the checkout!
                        </p>
                    ) : (
                        <p className="font-bold text-[14px] text-white leading-snug">
                            We are open now, but delivery
                            <br />
                            starts at <span className="text-[#fc8a06]">18:00</span> however you may
                            <br />
                            order and collect in store now
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
