'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function TrackOrderPage() {
    const router = useRouter()
    const [orderId, setOrderId] = useState('')
    const [error, setError] = useState('')

    const handleTrack = () => {
        const trimmed = orderId.trim()

        if (!trimmed) {
            setError('Please enter your order number')
            return
        }
        if (isNaN(Number(trimmed)) || Number(trimmed) <= 0) {
            setError('Order number must be a positive number (e.g. 5)')
            return
        }

        router.push(`/track-order/${trimmed}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleTrack()
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
            <div className="w-full max-w-[480px]">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#fc8a06]/10 rounded-full flex items-center justify-center">
                        <span className="text-4xl">🛵</span>
                    </div>
                </div>

                <h1 className="text-[32px] font-bold text-[#03081f] text-center mb-2">Track Your Order</h1>
                <p className="text-gray-500 text-center mb-8 text-[15px]">Enter your order number to see real-time status</p>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
                    <label className="font-bold text-[#03081f] text-sm">Order Number</label>

                    <div className="flex gap-3">
                        <div className="flex-1 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:border-[#fc8a06] transition-colors">
                            <span className="text-gray-400 font-mono font-bold text-lg">#</span>
                            <input
                                type="number"
                                min="1"
                                value={orderId}
                                onChange={(e) => {
                                    setOrderId(e.target.value)
                                    setError('')
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="000005"
                                className="flex-1 bg-transparent py-3 text-[16px] font-mono text-[#03081f] outline-none placeholder:text-gray-300"
                            />
                        </div>

                        <button
                            onClick={handleTrack}
                            className="h-[52px] px-5 bg-[#fc8a06] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-md shrink-0">
                            <Search size={18} />
                            Track
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                    <div className="bg-[#fc8a06]/5 border border-[#fc8a06]/20 rounded-xl p-4 text-sm text-gray-600">
                        <p className="font-bold text-[#03081f] mb-1">📋 Where to find your order number?</p>
                        <ul className="flex flex-col gap-1 text-[13px]">
                            <li>
                                • On the <strong>Order Placed</strong> confirmation page (e.g. #000005)
                            </li>
                            <li>
                                • In your <strong>confirmation email</strong>
                            </li>
                            <li>
                                • In your <strong>order history</strong> (coming soon)
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-sm font-medium">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <Link
                    href="/track-order/demo"
                    className="w-full h-[52px] border-2 border-[#03081f] text-[#03081f] rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-[#03081f] hover:text-white transition-all">
                    🎮 View Demo Order
                </Link>

                <p className="text-center text-[12px] text-gray-400 mt-4">Demo shows a real order from our database</p>
            </div>
        </div>
    )
}
