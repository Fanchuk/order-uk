'use client'

import Link from 'next/link'

interface NotFoundStateProps {
    title?: string
    message?: string
}

export default function NotFoundState({ title = 'Oops! 404', message = 'It seems this page went out for delivery and got lost.' }: NotFoundStateProps) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 font-sans px-4 text-center">
            <div className="w-[120px] h-[120px] bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            </div>

            <h1 className="text-[32px] md:text-[40px] font-bold text-[#03081f] mb-3" style={{ fontFamily: '"Poppins", sans-serif' }}>
                {title}
            </h1>

            <p className="text-[16px] text-gray-500 mb-8 max-w-[400px]">{message}</p>

            <Link href="/" className="bg-[#fc8a06] text-white px-8 py-3 rounded-[120px] font-bold text-[16px] hover:bg-[#e07a05] transition-colors shadow-md flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
                Go Back Home
            </Link>
        </div>
    )
}
