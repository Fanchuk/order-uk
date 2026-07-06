'use client'

import Image from 'next/image'

export default function AppPromo() {
    return (
        <section className="w-full mx-auto max-w-[1528px] mt-12 lg:mt-16 font-sans select-none">
            <div className="w-full h-auto min-h-[524px] lg:h-[611px] bg-gradient-to-b from-[#eee] to-[#e0e1dc] rounded-[12px] flex flex-col lg:flex-row relative overflow-hidden pt-10 lg:pt-0">
                
                <div className="relative w-full h-[300px] lg:h-full lg:w-1/2 flex-shrink-0 order-2 lg:order-1 mt-6 lg:mt-0">
                    <Image 
                        src="/app-promo-couple.png" 
                        alt="People using Order.uk app" 
                        fill 
                        unoptimized 
                        priority 
                        className="object-contain object-bottom lg:object-left-bottom lg:ml-[10%]" 
                    />
                </div>

                <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left lg:w-1/2 z-10 order-1 lg:order-2 px-6 lg:px-0 lg:pr-[80px]">
                    <h2 className="text-[40px] lg:text-[68px] font-bold text-black tracking-tight lg:tracking-[-0.06em] leading-tight mb-4 lg:mb-6">
                        <span className="font-extrabold">
                            Order<span className="text-brand-primary">.uk</span>
                        </span>{' '}
                        is more
                    </h2>

                    <div className="bg-brand-dark rounded-[120px] px-6 lg:px-10 py-3 lg:py-4 mb-4 lg:mb-8 shadow-md">
                        <span className="text-[20px] lg:text-[54px] font-bold tracking-tight lg:tracking-[-0.06em] leading-none flex items-center gap-2">
                            <span className="text-brand-primary underline decoration-brand-primary decoration-[2px] lg:decoration-[4px] underline-offset-4 lg:underline-offset-8">Personalised</span>
                            <span className="text-white whitespace-pre"> & Instant</span>
                        </span>
                    </div>

                    <p className="text-[14px] lg:text-[24px] text-black tracking-tight lg:tracking-[-0.06em] mb-6 lg:mb-10 font-medium">
                        Download the Order.uk app for faster ordering
                    </p>

                    <div className="relative w-[270px] lg:w-[412px] h-[40px] lg:h-[61px] hover:scale-105 transition-transform cursor-pointer">
                        <Image 
                            src="/app-badges.png" 
                            alt="Download on the App Store and Google Play" 
                            fill 
                            unoptimized 
                            priority 
                            className="object-contain"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}