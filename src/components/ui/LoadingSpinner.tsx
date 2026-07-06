'use client'

import { HashLoader } from 'react-spinners'

export default function LoadingSpinner() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 font-sans">
            {/* Анімований спінер з бібліотеки */}
            <HashLoader color="#fc8a06" size={60} speedMultiplier={1.2} />

            <p className="text-[18px] font-medium text-gray-500 mt-8 animate-pulse" style={{ fontFamily: '"Poppins", sans-serif' }}>
                Loading delicious food...
            </p>
        </div>
    )
}
