'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function RestaurantInfo() {
    const [showPolicy, setShowPolicy] = useState(false)

    return (
        <section className="w-full max-w-[1528px] mx-auto px-4 md:px-6 lg:px-16 mt-16 mb-24 font-sans text-[#000]">
            <div className="flex flex-col lg:flex-row w-full bg-[#fbfbfb] rounded-[4px] lg:rounded-[12px] shadow-[5px_5px_14px_0_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="flex flex-col md:flex-row flex-1 p-6 lg:py-[70px] lg:px-[80px] gap-10 lg:gap-20">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6 lg:mb-8">
                            <Image src="/icon-shipping-truck.svg" alt="Delivery" width={32} height={32} unoptimized className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" />
                            <h2 className="text-[20px] lg:text-[32px] font-bold text-[#03081f] leading-[150%]" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                <button onClick={() => setShowPolicy(true)} className="text-[#fc8a06] underline font-bold">
                                    Read Full Policy
                                </button>
                            </h2>
                        </div>

                        {showPolicy && (
                            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                                <div className="bg-white p-8 rounded-xl max-w-lg w-full relative">
                                    <button onClick={() => setShowPolicy(false)} className="absolute top-4 right-4 font-bold text-xl">
                                        ✕
                                    </button>
                                    <h2 className="text-2xl font-bold mb-4">Detailed Policy</h2>
                                    <p>Here goes the detailed text about allergies, delivery borders, and terms of service...</p>
                                </div>
                            </div>
                        )}

                        <ul className="flex flex-col text-[14px] lg:text-[18px] leading-[329%] lg:leading-[256%]">
                            <li>
                                <span className="font-bold">Monday:</span> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM
                            </li>
                            <li>
                                <span className="font-bold">Tuesday:</span> 8:00 AM–3:00 AM
                            </li>
                            <li>
                                <span className="font-bold">Wednesday:</span> 8:00 AM–3:00 AM
                            </li>
                            <li>
                                <span className="font-bold">Thursday:</span> 8:00 AM–3:00 AM
                            </li>
                            <li>
                                <span className="font-bold">Friday:</span> 8:00 AM–3:00 AM
                            </li>
                            <li>
                                <span className="font-bold">Saturday:</span> 8:00 AM–3:00 AM
                            </li>
                            <li>
                                <span className="font-bold">Sunday:</span> 8:00 AM–12:00 AM
                            </li>
                            <li className="mt-2 lg:mt-4">
                                <span className="font-bold">Estimated time until delivery:</span> 20 min
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6 lg:mb-8">
                            <Image src="/icon-contact.svg" alt="Contact" width={32} height={32} unoptimized className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" />
                            <h2 className="text-[20px] lg:text-[32px] font-bold text-[#03081f] leading-[150%]" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                Contact information
                            </h2>
                        </div>

                        <p className="text-[14px] lg:text-[18px] leading-[180%] lg:leading-[200%] mb-6 lg:mb-8 font-medium opacity-90">
                            If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="font-bold text-[16px] lg:text-[20px] leading-[230%]">Phone number</h3>
                                <p className="font-normal text-[16px] lg:text-[20px] text-[#03081f] leading-[240%]">+934443-43</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[16px] lg:text-[20px] leading-[230%]">Website</h3>
                                <p className="font-normal text-[16px] lg:text-[20px] text-[#03081f] leading-[240%]">http://mcdonalds.uk/</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-auto lg:w-[496px] shrink-0 bg-[#03081f] p-6 lg:py-[70px] lg:px-[60px] m-4 lg:m-0 rounded-[4px] lg:rounded-none lg:rounded-l-none lg:rounded-r-[12px] text-white">
                    <div className="flex items-center gap-4 mb-6 lg:mb-8">
                        <Image src="/icon-time-schedule.svg" alt="Clock" width={32} height={32} unoptimized className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" />
                        <h2 className="text-[20px] lg:text-[32px] font-bold leading-[150%]" style={{ fontFamily: '"Poppins", sans-serif' }}>
                            Operational Times
                        </h2>
                    </div>

                    <ul className="flex flex-col text-[14px] lg:text-[16px] leading-[288%]">
                        <li>
                            <span className="font-bold">Monday:</span> 8:00 AM–3:00 AM
                        </li>
                        <li>
                            <span className="font-bold">Tuesday:</span> 8:00 AM–3:00 AM
                        </li>
                        <li>
                            <span className="font-bold">Wednesday:</span> 8:00 AM–3:00 AM
                        </li>
                        <li>
                            <span className="font-bold">Thursday:</span> 8:00 AM–3:00 AM
                        </li>
                        <li>
                            <span className="font-bold">Friday:</span> 8:00 AM–3:00 AM
                        </li>
                        <li>
                            <span className="font-bold">Saturday:</span> 8:00 AM–3:00 AM
                        </li>
                        <li>
                            <span className="font-bold">Sunday:</span> 8:00 AM–3:00 AM
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
