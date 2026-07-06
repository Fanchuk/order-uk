'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ReactConfetti from 'react-confetti'

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [showConfetti, setShowConfetti] = useState(true)

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        const timer = setTimeout(() => setShowConfetti(false), 5000)
        return () => clearTimeout(timer)
    }, [])

    const formattedOrderId = params.id.padStart(6, '0')

    return (
        <div className="min-h-screen bg-brand-gray flex items-center justify-center p-4">
            {showConfetti && (
                <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} colors={['#fc8a06', '#028643', '#03081f', '#ffffff', '#fbbf24']} />
            )}

            <div className="bg-white rounded-3xl shadow-xl p-10 lg:p-16 text-center max-w-[500px] w-full border border-gray-100">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl">🎉</span>
                </div>

                <h1 className="text-[32px] font-bold text-brand-dark mb-3">Order Placed!</h1>
                <p className="text-gray-500 mb-2">Your order has been received. The restaurant will start preparing it shortly.</p>

                <p className="text-sm text-gray-400 mb-8">
                    Order ID: <span className="font-mono font-bold text-brand-dark">#{formattedOrderId}</span>
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">Status</p>
                        <p className="font-bold text-brand-green">✅ Confirmed</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">Est. Time</p>
                        <p className="font-bold text-brand-orange">⏱ 20–40 min</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href={`/track-order/${params.id}`}
                        className="w-full h-14 bg-brand-green text-white rounded-2xl flex items-center justify-center font-bold text-lg hover:opacity-90 transition-opacity">
                        Track My Order 🚴
                    </Link>
                    <Link
                        href="/restaurants"
                        className="w-full h-12 border border-gray-200 text-gray-600 rounded-2xl flex items-center justify-center font-medium hover:border-brand-orange hover:text-brand-orange transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}
