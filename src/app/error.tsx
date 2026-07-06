'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Логуємо в майбутньому: Sentry, LogRocket etc.
        console.error('[GlobalError]', error)
    }, [error])

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 font-sans px-4 text-center">
            <div className="w-[100px] h-[100px] bg-red-50 rounded-full flex items-center justify-center mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </div>
            <h1 className="text-[32px] font-bold text-[#03081f] mb-3">Something went wrong</h1>
            <p className="text-gray-500 mb-8 max-w-[400px]">An unexpected error occurred. This has been logged and we&apos;ll fix it soon.</p>
            <div className="flex gap-3">
                <button onClick={reset} className="bg-[#fc8a06] text-white px-8 py-3 rounded-[120px] font-bold hover:bg-[#e07a05] transition-colors">
                    Try Again
                </button>
                <Link href="/" className="bg-white text-[#03081f] border border-gray-200 px-8 py-3 rounded-[120px] font-bold hover:border-gray-400 transition-colors">
                    Go Home
                </Link>
            </div>
        </div>
    )
}
