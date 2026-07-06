import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 font-sans px-4 text-center">
            <div className="w-[100px] h-[100px] bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-[48px] font-black text-[#fc8a06]">
                    4<span className="text-[#03081f]">0</span>4
                </span>
            </div>
            <h1 className="text-[36px] font-bold text-[#03081f] mb-3">Page Not Found</h1>
            <p className="text-gray-500 mb-8 max-w-[400px]">This page went out for delivery and got lost. Let&apos;s get you back on track.</p>
            <Link href="/" className="bg-[#fc8a06] text-white px-10 py-3 rounded-[120px] font-bold hover:bg-[#e07a05] transition-colors">
                Back to Home
            </Link>
        </div>
    )
}
