'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useBasketStore } from '@/src/features/basket/store/useBasketStore'
import { formatPrice } from '@/src/lib/utils'

interface UserAddress {
    id: number
    label: string
    line1: string
    postcode: string
    isDefault?: boolean
}

const MINIMUM_ORDER = 2000

export default function CheckoutPage() {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

    const { items, activeRestaurantId, deliveryFee, removeItem, increaseQty, decreaseQty, clearBasket, getTotalItems } = useBasketStore()

    const [addresses, setAddresses] = useState<UserAddress[]>([])
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)

    const [couponCode, setCouponCode] = useState('')
    const [appliedCoupon, setAppliedCoupon] = useState<{
        code: string
        discount: number
        message: string
    } | null>(null)
    const [notes, setNotes] = useState('')

    useEffect(() => {
        async function fetchUserAddresses() {
            try {
                const res = await fetch('/api/checkout/addresses')
                if (res.ok) {
                    const data = await res.json()
                    setAddresses(data)
                    if (data.length > 0) {
                        setSelectedAddressId(data.find((a: UserAddress) => a.isDefault)?.id || data[0].id)
                    }
                }
            } catch (err) {
                console.error('Помилка завантаження адрес:', err)
            }
        }
        fetchUserAddresses()
    }, [])

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
    const discount = appliedCoupon?.discount ?? 0
    const total = subtotal - discount + (subtotal > 0 ? deliveryFee : 0)

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return
        setIsPending(true)
        try {
            const response = await fetch('/api/coupon/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: couponCode, subtotal }),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Невірний промокод')
            setAppliedCoupon({ code: couponCode.toUpperCase(), discount: data.discount, message: data.message })
            toast.success(data.message)
            setCouponCode('')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsPending(false)
        }
    }

    const handlePlaceOrder = async () => {
        if (items.length === 0) return
        if (subtotal < MINIMUM_ORDER) {
            toast.error(`Мінімальне замовлення ${formatPrice(MINIMUM_ORDER)}`)
            return
        }

        setIsPending(true)
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    restaurantId: activeRestaurantId,
                    addressId: selectedAddressId,
                    items: items.map((i) => ({
                        menuItemId: i.menuItemId,
                        name: i.name,
                        price: i.price,
                        qty: i.qty,
                    })),
                    couponCode: appliedCoupon?.code || null,
                    notes: notes || null,
                }),
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Помилка при створенні замовлення')

            clearBasket()
            router.push(`/order/${data.orderId}/success`)

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsPending(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
                <div className="text-center bg-white rounded-2xl p-12 shadow-sm border border-gray-100 max-w-sm flex flex-col items-center gap-4">
                    <p className="text-6xl mb-2">🛒</p>
                    <h2 className="text-2xl font-bold text-brand-dark">Кошик порожній</h2>
                    <p className="text-gray-500 mb-2">Looks like you haven’t added anything yet.</p>
                    <Link href="/" className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                        Explore Menu
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-[#f8f9fa] font-sans pt-8 pb-24 select-none">
            <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-orange transition-colors mb-6 font-medium">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Continue Shopping
                </Link>

                <h1 className="text-[32px] lg:text-[40px] font-bold text-brand-dark mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start relative">
                    {/* ── Ліва колонка ─────────────────────────────── */}
                    <div className="flex-1 w-full flex flex-col gap-4">
                        {/* Адреса */}
                        <div className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm flex flex-col gap-3">
                            <h2 className="text-[18px] font-bold text-brand-dark flex items-center gap-2">📍 Delivery Address</h2>
                            {addresses.length === 0 ? (
                                <p className="text-sm text-gray-400">Using default delivery address (Auth coming soon).</p>
                            ) : (
                                <select
                                    value={selectedAddressId}
                                    onChange={(e) => setSelectedAddressId(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-brand-orange">
                                    {addresses.map((addr) => (
                                        <option key={addr.id} value={addr.id}>
                                            {addr.label}: {addr.line1}, {addr.postcode}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Товари */}
                        <div className="flex items-center justify-between mt-2 px-2">
                            <h2 className="text-[20px] font-bold text-brand-dark">Order Items ({items.length})</h2>
                        </div>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-[20px] p-4 lg:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                                    <div className="relative w-[80px] h-[80px] shrink-0 rounded-[12px] bg-gray-50 border border-gray-100 overflow-hidden">
                                        <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill unoptimized className="object-cover" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-bold text-brand-dark text-[16px] lg:text-[18px] truncate">{item.name}</h3>
                                        {item.desc && <p className="text-gray-500 text-[14px] mt-1 line-clamp-2 pr-4">{item.desc}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full sm:w-auto gap-6 mt-4 sm:mt-0 shrink-0">
                                    <div className="flex items-center bg-gray-50 rounded-[10px] px-3 py-1 border border-gray-200 gap-3">
                                        <button onClick={() => decreaseQty(item.id)} className="font-bold text-gray-500 hover:text-brand-orange text-lg">
                                            −
                                        </button>
                                        <span className="font-bold text-brand-dark text-[16px] w-4 text-center">{item.qty}</span>
                                        <button onClick={() => increaseQty(item.id)} className="font-bold text-gray-500 hover:text-brand-orange text-lg">
                                            +
                                        </button>
                                    </div>
                                    <span className="font-bold text-brand-green text-[20px] w-[90px] text-right">{formatPrice(item.price * item.qty)}</span>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="w-[44px] h-[44px] rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Нотатки */}
                        <div className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-sm mt-2">
                            <label className="font-bold text-brand-dark block mb-2 text-sm" htmlFor="order-notes">
                                Special Instructions / Notes
                            </label>
                            <textarea
                                id="order-notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Allergies, door codes, note details..."
                                rows={3}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-brand-orange resize-none"
                            />
                        </div>
                    </div>

                    {/* ── Права колонка — Order Summary ─────────────── */}
                    <div className="w-full lg:w-[400px] shrink-0 sticky top-8">
                        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 lg:p-8">
                            <h2 className="text-[22px] font-bold text-brand-dark mb-6">Order Summary</h2>

                            {/* Купон */}
                            {appliedCoupon ? (
                                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
                                    <span className="text-brand-green font-bold text-sm">✓ {appliedCoupon.code}</span>
                                    <button onClick={() => setAppliedCoupon(null)} className="text-gray-400 hover:text-red-500 text-xs font-semibold">
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2 mb-5">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        placeholder="Add Promo Code"
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-brand-orange text-[14px]"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={isPending || !couponCode}
                                        className="bg-brand-dark text-white px-6 rounded-[12px] font-bold text-[14px] hover:bg-black transition-colors disabled:opacity-50">
                                        Apply
                                    </button>
                                </div>
                            )}

                            {/* Рядки суми */}
                            <div className="flex flex-col gap-4 text-[16px] text-gray-600 mb-6">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-brand-dark">{formatPrice(subtotal)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between items-center">
                                        <span>Discount</span>
                                        <span className="font-semibold text-red-500">-{formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span>Delivery Fee</span>
                                    <span className="font-semibold text-brand-dark">{formatPrice(deliveryFee)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t-2 border-dashed border-gray-200 pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-[18px] font-bold text-brand-dark">Total</span>
                                    <div className="flex flex-col items-end">
                                        <span className="font-black text-[36px] text-brand-green leading-[1]">{formatPrice(total)}</span>
                                        <span className="text-[12px] text-gray-500 mt-1">Includes taxes</span>
                                    </div>
                                </div>
                            </div>

                            {/* Попередження про мінімум */}
                            {subtotal < MINIMUM_ORDER && subtotal > 0 && (
                                <p className="text-red-500 text-xs text-center bg-red-50 rounded-xl p-3 mb-4 font-semibold">Add {formatPrice(MINIMUM_ORDER - subtotal)} more to place your order</p>
                            )}

                            {/* Place Order */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={isPending || subtotal < MINIMUM_ORDER}
                                className="w-full h-[64px] bg-brand-orange rounded-[16px] flex items-center justify-center gap-3 text-white font-bold text-[18px] hover:opacity-90 hover:shadow-lg transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                                {isPending ? 'Processing...' : 'Place Order'}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
