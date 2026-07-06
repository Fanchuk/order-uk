'use client'

import { X } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
    onClose: () => void
}

export default function AppModal({ onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-[480px] w-full shadow-2xl p-8 text-center relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <X size={16} />
                </button>

                <div className="text-6xl mb-4">📱</div>
                <h2 className="font-bold text-[22px] text-[#03081f] mb-2">Order.UK Mobile App</h2>
                <p className="text-gray-500 text-[14px] mb-6 leading-relaxed">Our mobile app is coming soon! Enjoy faster ordering, exclusive deals, and real-time tracking.</p>

                <div className="bg-[#fc8a06]/10 rounded-xl p-4 mb-6 text-left">
                    <h3 className="font-bold text-[#03081f] mb-2">🚀 What to expect:</h3>
                    <ul className="text-[13px] text-gray-600 space-y-1.5">
                        <li>✅ One-tap reordering of favourites</li>
                        <li>✅ Live GPS order tracking</li>
                        <li>✅ Exclusive app-only discounts</li>
                        <li>✅ Push notifications for order updates</li>
                    </ul>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            toast.success("We'll notify you when the iOS app launches! 🍎")
                            onClose()
                        }}
                        className="flex-1 h-[48px] bg-[#03081f] text-white rounded-xl font-bold text-[13px] hover:bg-black transition-colors">
                        🍎 Notify me (iOS)
                    </button>
                    <button
                        onClick={() => {
                            toast.success("We'll notify you when the Android app launches! 🤖")
                            onClose()
                        }}
                        className="flex-1 h-[48px] bg-[#028643] text-white rounded-xl font-bold text-[13px] hover:bg-green-700 transition-colors">
                        🤖 Notify me (Android)
                    </button>
                </div>
            </div>
        </div>
    )
}
