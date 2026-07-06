'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HOW_IT_WORKS } from '@/src/shared/lib/constants/aboutUs'

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#fafafa] font-sans">
            <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 py-12 lg:py-20 overflow-hidden">
                <div className="text-center mb-16 lg:mb-24 animate-in slide-in-from-bottom-8 duration-700">
                    <Link href="/" className="text-[#fc8a06] font-bold hover:underline mb-6 inline-block tracking-wide uppercase text-[14px]">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-[40px] lg:text-[64px] font-bold text-[#03081f] leading-[1.1] mb-6" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        How <span className="text-[#fc8a06]">Order.uk</span> Works
                    </h1>
                    <p className="text-[18px] lg:text-[22px] text-gray-500 max-w-[700px] mx-auto leading-relaxed">
                        From your cravings to your doorstep in three simple steps. We make ordering food fast, reliable, and incredibly easy.
                    </p>
                </div>

                <div className="flex flex-col gap-12 lg:gap-24 relative">
                    <div className="hidden lg:block absolute left-1/2 top-[10%] bottom-[10%] w-1 bg-gray-200 -translate-x-1/2 z-0 rounded-full"></div>

                    {HOW_IT_WORKS.map((step, index) => {
                        const isEven = index % 2 === 0

                        return (
                            <div key={step.id} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                <div className={`flex-1 flex flex-col items-center lg:items-start text-center lg:text-left ${isEven ? 'lg:pr-12' : 'lg:pl-12 lg:items-end lg:text-right'}`}>
                                    <div className="w-[60px] h-[60px] rounded-full bg-[#03081f] text-white flex items-center justify-center font-bold text-[24px] mb-6 shadow-lg">{index + 1}</div>
                                    <h2 className="text-[28px] lg:text-[40px] font-bold text-black mb-4">{step.title}</h2>
                                    <p className="text-[16px] lg:text-[20px] text-gray-600 leading-relaxed max-w-[450px]">{step.description}</p>
                                </div>

                                <div className="flex-1 flex justify-center items-center">
                                    <div className="relative w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-[8px] border-white flex items-center justify-center p-8 group hover:shadow-[0_20px_50px_rgba(252,138,6,0.15)] transition-shadow duration-500">
                                        <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
                                            <Image src={step.image} alt={step.title} fill unoptimized className="object-contain" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-24 lg:mt-32 bg-[#fc8a06] rounded-[24px] p-10 lg:p-16 text-center flex flex-col items-center shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white opacity-10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black opacity-10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2"></div>

                    <h2 className="text-[32px] lg:text-[48px] font-bold text-white mb-6 relative z-10" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        Ready to feast?
                    </h2>
                    <p className="text-white/90 text-[18px] lg:text-[22px] mb-10 max-w-[600px] relative z-10">
                        Join thousands of happy customers in London and get your favorite meals delivered blazing fast.
                    </p>
                    <Link
                        href="/#restaurants-section"
                        className="bg-[#03081f] text-white px-10 py-5 rounded-[120px] font-bold text-[18px] hover:bg-black hover:scale-105 transition-all shadow-lg flex items-center gap-3 relative z-10">
                        Explore Restaurants
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>
            </main>
        </div>
    )
}
