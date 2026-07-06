'use client'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PartnerPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success('Application submitted! We will contact you soon.')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-2xl flex flex-col md:flex-row overflow-hidden">
                <div className="flex-1 p-8 md:p-12">
                    <Link href="/" className="text-[#fc8a06] font-bold mb-8 block hover:underline">
                        ← Back to Home
                    </Link>
                    <h1 className="text-[32px] font-bold text-[#03081f] mb-2">Partner with Order.uk</h1>
                    <p className="text-gray-500 mb-8">Boost your sales and reach more customers today.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[14px] font-bold text-black">First Name</label>
                                <input type="text" required className="w-full bg-gray-100 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#fc8a06]" />
                            </div>
                            <div>
                                <label className="text-[14px] font-bold text-black">Last Name</label>
                                <input type="text" required className="w-full bg-gray-100 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#fc8a06]" />
                            </div>
                        </div>
                        <div>
                            <label className="text-[14px] font-bold text-black">Restaurant/Business Name</label>
                            <input type="text" required className="w-full bg-gray-100 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#fc8a06]" />
                        </div>
                        <div>
                            <label className="text-[14px] font-bold text-black">Email</label>
                            <input type="email" required className="w-full bg-gray-100 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#fc8a06]" />
                        </div>
                        <button type="submit" className="mt-4 bg-[#fc8a06] text-white font-bold text-[18px] py-4 rounded-[120px] hover:bg-orange-600 transition">
                            Submit Application
                        </button>
                    </form>
                </div>
                <div className="hidden md:block flex-1 bg-[#03081f] p-12 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-40">
                        <Image src="/partner-business.jpg" alt="Partner" fill className="object-cover" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-[40px] font-bold mb-4">Grow your business with us</h2>
                        <ul className="space-y-4 text-[18px]">
                            <li>✅ Lower commission fees</li>
                            <li>✅ 24/7 Support team</li>
                            <li>✅ Custom dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
