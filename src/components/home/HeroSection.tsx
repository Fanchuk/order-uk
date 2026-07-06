'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, MapPin } from 'lucide-react'


export default function HeroSection() {
    
    const [postcode, setpostcode] = useState('')
    const router = useRouter()
    
    const handleSearch = () => {
        if (postcode.length < 3) {
            toast.error('Please enter a valid post')
            return
        }
    
        localStorage.setItem('user_postcode', postcode)
        toast.success('Please enter a valid postcode')
        router.push('/#restaurants-section')
    }
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex lg:hidden items-center justify-center gap-2 py-4 w-full">
                <MapPin size={18} className="text-black fill-black" />
                <span className="text-[14px] font-medium">Lution Street, N4G-00....</span>
            </div>

            <section className="mx-auto w-full max-w-[1528px] lg:min-w-[1200px] h-auto lg:h-[610px] bg-brand-dark rounded-[12px] relative overflow-hidden flex flex-col lg:flex-row mt-0 lg:mt-8">
                <div className="flex-1 flex flex-col justify-center px-4 py-12 lg:py-0 lg:pl-[80px] z-20 min-w-0 lg:min-w-[500px] text-center lg:text-left">
                    <p className="text-white text-[14px] lg:text-[16px] mb-2 lg:mb-4 font-medium">Order Restaurant food, takeaway and groceries.</p>

                    <h1 className="text-white text-[34px] lg:text-[54px] font-semibold leading-[1.1] lg:leading-[1.22] mb-6 lg:mb-8">
                        Feast Your Senses,
                        <br />
                        <span className="text-brand-primary">Fast and Fresh</span>
                    </h1>

                    <p className="text-white text-[13px] mb-4 font-medium">Enter a postcode to see what we deliver</p>

                    <div className="relative w-full max-w-[373px] mx-auto lg:mx-0 h-[57px] bg-white rounded-[120px] flex items-center">
                        <input
                            value={postcode}
                            onChange={(e) => setpostcode(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            type="text"
                            placeholder="e.g. EC4R 3TE"
                            className="flex-1 bg-transparent outline-none pl-6 lg:pl-8 pr-[70px] lg:pr-[140px] text-black h-full rounded-[120px] placeholder:text-gray-400 font-medium"
                        />
                        <button 
                        onClick={handleSearch}
                        className="hidden lg:block absolute right-0 top-0 w-[160px] h-[57px] bg-brand-primary text-white text-[16px] font-medium rounded-[120px] hover:bg-orange-600 transition-colors">
                            Search
                        </button>
                        <button className="block lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-brand-primary rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                            <ChevronRight className="text-black" size={24} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block w-[850px] h-full relative shrink-0 z-10">
                    <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
                        <Image src="/hero-orange-bg.png" alt="Orange shape" width={626} height={565} priority />
                    </div>

                    <div className="absolute bottom-0 right-[150px] opacity-20 z-0 pointer-events-none">
                        <Image src="/hero-girl-faint.png" alt="Girl eating pizza background" width={805} height={537} priority />
                    </div>

                    <div className="absolute bottom-0 left-[50px] z-10 pointer-events-none">
                        <Image src="/hero-girl-main.png" alt="Girl pointing at notifications" width={465} height={541} priority />
                    </div>

                    <div className="absolute right-[50px] top-[60px] flex flex-col gap-6 z-20 w-[440px]">
                        <div className="relative ml-auto w-[390px]">
                            <div className="absolute -top-6 right-6 text-[80px] font-bold text-transparent z-0 pointer-events-none" style={{ WebkitTextStroke: '2px white' }}>
                                1
                            </div>
                            <div className="w-full h-[100px] bg-white rounded-[12px] shadow-xl flex flex-col justify-center px-6 z-10 relative">
                                <div className="flex justify-between items-center mb-2">
                                    <Image src="/logo.svg" alt="Order.uk" width={58} height={15} />
                                    <span className="text-[12px] font-medium text-gray-400">now</span>
                                </div>
                                <h3 className="text-[12px] font-semibold text-black leading-tight">We&apos;ve Received your order!</h3>
                                <p className="text-[12px] text-black/80 font-normal mt-0.5">Awaiting Restaurant acceptance</p>
                            </div>
                        </div>

                        <div className="relative mr-auto w-[390px]">
                            <div className="absolute -top-6 right-8 text-[80px] font-bold text-transparent z-0 pointer-events-none" style={{ WebkitTextStroke: '2px white' }}>
                                2
                            </div>
                            <div className="w-full h-[100px] bg-white rounded-[12px] shadow-xl flex flex-col justify-center px-6 z-10 relative">
                                <div className="flex justify-between items-center mb-2">
                                    <Image src="/logo.svg" alt="Order.uk" width={58} height={15} />
                                    <span className="text-[12px] font-medium text-gray-400">now</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-[12px] font-semibold text-black leading-tight">Order Accepted!</h3>
                                    <CheckCircle2 size={14} className="text-green-600 fill-green-600/20" />
                                </div>
                                <p className="text-[12px] text-black/80 font-normal mt-0.5">Your order will be delivered shortly</p>
                            </div>
                        </div>

                        <div className="relative ml-auto w-[390px]">
                            <div className="absolute -top-6 right-6 text-[80px] font-bold text-transparent z-0 pointer-events-none" style={{ WebkitTextStroke: '2px white' }}>
                                3
                            </div>
                            <div className="w-full h-[100px] bg-white rounded-[12px] shadow-xl flex flex-col justify-center px-6 z-10 relative">
                                <div className="flex justify-between items-center mb-2">
                                    <Image src="/logo.svg" alt="Order.uk" width={58} height={15} />
                                    <span className="text-[12px] font-medium text-gray-400">now</span>
                                </div>
                                <h3 className="text-[12px] font-semibold text-black leading-tight">Your rider&apos;s nearby</h3>
                                <p className="text-[12px] text-black/80 font-normal mt-0.5">They&apos;re almost there - get ready!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
