'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MapPin, ShoppingBasket, ArrowDownCircle, User, Star, Menu, X, Trash2 } from 'lucide-react'
import { useDeliveryStore } from '@/src/features/basket/store/useDeliveryStore'
import { useAuthStore } from '@/src/features/basket/store/useAuthStore'
import { useBasketStore } from '@/src/features/basket/store/useBasketStore'
import { toast } from 'sonner'

interface HeaderProps {
    onChangeLocationClick?: () => void
}

export default function Header({ onChangeLocationClick }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const params = useParams()
    const pathname = usePathname()
    const router = useRouter()

    const restaurantId = params.id as string | undefined

    const openDelivery = useDeliveryStore((state) => state.openDelivery)
    const openAuth = useAuthStore((state) => state.openAuth)

    const { items, getTotal, removeItem } = useBasketStore()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
    const totalPrice = (getTotal() / 100).toFixed(2)

    const handleBasketClick = () => {
        const savedPostCode = localStorage.getItem('user_postcode')
        const isCollection = localStorage.getItem('delivery_mode') === 'collection'

        if (!savedPostCode && !isCollection) {
            openDelivery()
            return
        }

        if (pathname.includes('/restaurants/')) {
            const basketElement = document.getElementById('desktop-basket')
            if (basketElement) {
                basketElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            } else {
                router.push('/checkout')
            }
        } else {
            router.push('/checkout')
        }
    }

    const navItems = [
        {
            name: 'Home',
            href: '/',
            isActive: pathname === '/',
        },
        {
            name: 'Browse Menu',
            href: restaurantId ? '#menu-list' : '/browse-menu',
            isActive: pathname.startsWith('/browse-menu'),
        },
        {
            name: 'Special Offers',
            href: '/special-offers',
            isActive: pathname === '/special-offers',
        },
        {
            name: 'Restaurants',
            href: '/restaurants',
            isActive: pathname === '/restaurants',
        },
        {
            name: 'Track Order',
            href: '/track-order',
            isActive: pathname.startsWith('/track-order'),
        },
    ]

    return (
        <header className="w-full font-sans pb-0 lg:pb-6 relative z-[100]">
            {/* ─── МОБІЛЬНА ВЕРСІЯ ─── */}
            <div className="flex flex-col lg:hidden">
                <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
                    <Link href="/">
                        <Image src="/logo.svg" alt="Order.uk Logo" width={130} height={35} className="h-auto" priority />
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 z-50 relative">
                        {isOpen ? <X size={32} className="text-black" /> : <Menu size={32} className="text-black" />}
                    </button>
                </div>

                {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

                {isOpen && (
                    <div className="fixed top-[70px] right-4 w-[280px] bg-white border border-[#bcbcbc] rounded-[12px] shadow-2xl z-50 flex flex-col overflow-hidden">
                        <ul className="flex flex-col">
                            {navItems.map((item) => (
                                <li key={item.name} className="border-b border-gray-100">
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-6 py-4 text-[18px] font-bold hover:bg-gray-50 transition-colors
                                            ${item.isActive ? 'text-[#fc8a06]' : 'text-[#282828]'}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li
                                onClick={() => {
                                    setIsOpen(false)
                                    openAuth()
                                }}
                                className="px-6 py-4 bg-[#03081f] text-white text-[18px] font-bold flex items-center gap-3 cursor-pointer hover:bg-black transition-colors">
                                <User size={20} /> Login/Signup
                            </li>
                        </ul>
                    </div>
                )}

                <div className="flex w-full h-[65px]">
                    <div onClick={() => router.push('/restaurants')} className="w-1/2 bg-[#fc8a06] flex items-center justify-center gap-3 cursor-pointer">
                        <ShoppingBasket size={22} className="text-white" />
                        <span className="text-white font-semibold text-[15px]">Restaurants</span>
                    </div>
                    <div onClick={handleBasketClick} className="w-1/2 bg-[#028643] flex items-center justify-center gap-3 text-white cursor-pointer">
                        <ShoppingBasket size={24} />
                        {/* 🔴 FIX: isMounted guard — сервер і клієнт рендерять однаково '0.00' */}
                        <span className="font-semibold text-[15px]">GBP {isMounted ? totalPrice : '0.00'}</span>
                    </div>
                </div>
            </div>

            {/* ─── ДЕСКТОПНА ВЕРСІЯ ─── */}
            <div className="hidden lg:block">
                <div className="mx-auto max-w-[1528px] h-[70px] bg-[#fafafa] border border-black/10 border-t-0 rounded-b-[12px] flex items-center justify-between relative">
                    <div className="flex items-center justify-between w-full px-8">
                        <div className="flex items-center gap-2">
                            <Star size={20} className="text-[#fc8a06] fill-[#fc8a06]" />
                            <span className="text-[15px] font-medium text-black">
                                Get 5% Off your first order,{' '}
                                <span
                                    onClick={() => {
                                        navigator.clipboard.writeText('ORDER5')
                                        toast.success('Promo code ORDER5 copied! 🎁')
                                    }}
                                    className="font-bold text-[#fc8a06] underline cursor-pointer hover:text-orange-600 transition-colors"
                                    title="Click to copy!">
                                    Promo: ORDER5
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-[14px] font-medium text-black">
                            <MapPin size={18} className="text-black fill-black" />
                            <span>Regent Street, A4, A4201, London</span>
                            <span onClick={openDelivery} className="font-bold text-[#fc8a06] underline cursor-pointer ml-2">
                                Change Location
                            </span>
                        </div>
                    </div>

                    <div className="w-[378px] h-full bg-[#028643] rounded-b-[12px] flex items-center justify-between px-6 text-white shrink-0 border-l border-black/10 cursor-pointer hover:bg-green-700 transition-colors">
                        <div onClick={handleBasketClick} className="flex items-center gap-3 border-r border-white/20 pr-4 h-full py-4">
                            <div className="bg-white text-[#028643] rounded-md p-1.5 flex items-center justify-center">
                                <ShoppingBasket size={24} />
                            </div>
                            <span className="font-semibold text-[15px]">{isMounted ? totalItems : 0} Items</span>
                        </div>
                        <div onClick={() => setIsCartOpen(!isCartOpen)} className="flex items-center gap-4">
                            {/* 🔴 FIX: isMounted guard — десктоп версія */}
                            <span className="font-semibold text-[15px]">GBP {isMounted ? totalPrice : '0.00'}</span>
                            <ArrowDownCircle size={28} className="text-white" />
                        </div>
                    </div>

                    {isCartOpen && <div className="fixed inset-0 z-[140] cursor-default bg-transparent" onClick={() => setIsCartOpen(false)} />}

                    {isCartOpen && (
                        <div className="absolute top-[75px] right-0 w-[360px] bg-white shadow-2xl rounded-[16px] border border-gray-100 p-5 z-[150] flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <ShoppingBasket size={20} className="text-[#028643]" />
                                    <h3 className="font-bold text-[#03081f] text-[18px]">Mini Basket</h3>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {items.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 flex flex-col items-center gap-2">
                                    <ShoppingBasket size={44} className="opacity-20" />
                                    <p className="text-[14px] font-medium">Your basket is currently empty.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center gap-2 bg-gray-50 p-2.5 rounded-[8px] border border-gray-100">
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <div className="w-[26px] h-[26px] rounded-full bg-[#fc8a06] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                                                        {item.qty}x
                                                    </div>
                                                    <span className="text-[14px] font-semibold text-[#03081f] truncate">{item.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className="text-[14px] font-bold text-[#028643]">£{((item.price * item.qty) / 100).toFixed(2)}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeItem(item.id)
                                                        }}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                                        <span className="font-bold text-gray-500 text-[14px]">Subtotal:</span>
                                        <span className="font-black text-[#028643] text-[22px]">£{isMounted ? totalPrice : '0.00'}</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsCartOpen(false)
                                            router.push('/checkout')
                                        }}
                                        className="w-full h-[48px] bg-[#028643] hover:bg-green-700 text-white rounded-[8px] font-bold text-[16px] flex items-center justify-center gap-2 transition-colors shadow-sm">
                                        Go to Checkout
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <nav className="mx-auto max-w-[1528px] mt-8 flex items-center justify-between px-2">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src="/logo.svg" alt="Order.uk Logo" width={180} height={50} className="h-auto" priority />
                        </Link>
                    </div>

                    <ul className="flex items-center gap-8 text-[18px] font-medium text-black">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center justify-center h-[45px] transition-colors duration-200
                                        ${item.isActive ? 'bg-[#fc8a06] text-white px-8 rounded-[120px]' : 'text-black hover:text-[#fc8a06] px-2'}`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={openAuth}
                        className="bg-[#03081f] text-white w-[234px] h-[61px] rounded-[120px] text-[18px] font-medium flex items-center justify-center gap-3 hover:bg-black transition-colors">
                        <div className="bg-[#fc8a06]/20 p-1 rounded-full">
                            <User size={24} className="text-[#fc8a06] fill-[#fc8a06]" />
                        </div>
                        Login/Signup
                    </button>
                </nav>
            </div>
        </header>
    )
}
