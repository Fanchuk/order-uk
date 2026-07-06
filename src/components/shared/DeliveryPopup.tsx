'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface DeliveryPopupProps {
    onClose: () => void
}

type PopupStatus = 'idle' | 'error' | 'success' | 'collection'

export default function DeliveryPopup({ onClose }: DeliveryPopupProps) {
    const [status, setStatus] = useState<PopupStatus>('idle')
    const [postcode, setPostcode] = useState('')

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    const handleFind = () => {
        if (!postcode.trim()) return

        if (postcode.toLowerCase() === 'error') {
            setStatus('error')
        } else {
            setStatus('success')
            localStorage.setItem('user_postcode', postcode.trim())
            localStorage.removeItem('delivery_mode')
            setTimeout(() => {
                onClose()
            }, 1500)
        }
    }

    const renderContent = () => {
        if (status === 'collection') {
            return (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-[353px] lg:max-w-[850px] bg-white rounded-[12px] p-6 lg:p-12 flex flex-col items-center justify-center relative shadow-2xl cursor-default mx-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 lg:-top-6 lg:-right-6 w-[40px] h-[40px] lg:w-[56px] lg:h-[56px] bg-[#03081f] rounded-full flex items-center justify-center z-50 hover:scale-105 transition-transform shadow-lg">
                        <Image src="/icon-close-white.svg" alt="Close" width={24} height={24} unoptimized className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] brightness-200" />
                    </button>

                    <h2 className="text-[32px] lg:text-[54px] font-bold text-[#03081f] text-center mb-1 lg:mb-2" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        Order Now
                    </h2>
                    <p className="text-[15px] lg:text-[18px] font-medium text-black mb-8 lg:mb-12">
                        Minimum Delivery is <span className="font-bold">£10</span>
                    </p>

                    <div className="flex flex-col gap-4 lg:gap-6 w-full max-w-[562px]">
                        <button
                            onClick={() => setStatus('idle')}
                            className="w-full h-[70px] lg:h-[122px] bg-[#03081f] rounded-[120px] flex items-center justify-center gap-3 lg:gap-4 hover:bg-black transition-colors">
                            <Image src="/icon-scooter-green.svg" alt="Delivery" width={28} height={28} unoptimized className="lg:w-[40px] lg:h-[40px]" />
                            <span className="text-white font-bold text-[18px] lg:text-[24px]">Deliver my order</span>
                        </button>

                        <button
                            onClick={() => {
                                localStorage.setItem('delivery_mode', 'collection')
                                localStorage.removeItem('user_postcode')
                                onClose()
                            }}
                            className="w-full h-[70px] lg:h-[122px] bg-[#fc8a06] rounded-[120px] flex items-center justify-center gap-3 lg:gap-4 hover:bg-[#e07a05] transition-colors">
                            <Image src="/icon-store-black.svg" alt="Collect" width={28} height={28} unoptimized className="lg:w-[40px] lg:h-[40px]" />
                            <span className="text-[#03081f] font-bold text-[18px] lg:text-[24px]">I will come & Collect</span>
                        </button>
                    </div>

                    <div className="mt-6 lg:mt-8 flex flex-col items-center gap-1 lg:gap-2">
                        <span className="text-[14px] lg:text-[16px] font-bold text-black">or</span>
                        <button onClick={onClose} className="text-[#03081f] font-bold text-[16px] lg:text-[18px] underline underline-offset-4 decoration-2">
                            Cancel & Go back
                        </button>
                    </div>
                </div>
            )
        }

        const bgImage = status === 'success' ? '/delivery-bg-success.jpg' : status === 'error' ? '/delivery-bg-error.jpg' : '/delivery-bg-default.jpg'
        const title1 = status === 'success' ? "You're All Set!" : 'Please Enter Your'
        const isSuccess = status === 'success'
        const isError = status === 'error'

        return (
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[396px] lg:max-w-[1270px] h-auto lg:h-[880px] bg-white rounded-[12px] flex flex-row shadow-[20px_24px_44px_0_rgba(0,0,0,0.5)] overflow-hidden lg:overflow-visible cursor-default mx-4">
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 lg:-top-6 lg:-right-6 w-[40px] h-[40px] lg:w-[56px] lg:h-[56px] bg-[#fc8a06] lg:bg-[#03081f] rounded-full flex items-center justify-center z-50 hover:scale-105 transition-transform shadow-lg">
                    <Image src="/icon-close-white.svg" alt="Close" width={24} height={24} unoptimized className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] lg:brightness-200" />
                </button>

                <div className="w-[140px] h-[400px] lg:w-[464px] lg:h-full shrink-0 relative lg:border-r-[11px] border-[#fc8a06] bg-[#03081f] lg:rounded-l-[12px] lg:overflow-hidden">
                    <Image src={bgImage} alt="Delivery" fill unoptimized className="object-cover object-center" priority />
                </div>

                <div className="flex-1 min-w-0 px-4 py-6 lg:px-[60px] lg:py-[80px] flex flex-col relative justify-center">
                    
                    <div className="max-w-[480px] lg:max-w-[640px] w-full text-left">
                        <h2 className="text-[28px] lg:text-[54px] font-bold text-[#03081f] leading-[110%] mb-4 lg:mb-6" style={{ fontFamily: '"Poppins", sans-serif' }}>
                            {title1} <br />
                            <span
                                className={`${isSuccess ? 'text-[#028643]' : isError ? 'text-[#e53935]' : 'text-[#03081f]'} underline decoration-[3px] lg:decoration-[4px] underline-offset-4 lg:underline-offset-8`}>
                                Post Code
                            </span>{' '}
                            {status === 'success' ? 'Submitted' : ''}
                        </h2>

                        <p className="text-[15px] lg:text-[26px] text-black leading-[145%] lg:leading-[154%] font-normal mb-6 lg:mb-12">
                            To start placing delivery order, please enter your full postcode here
                        </p>

                        <div className="relative w-full h-[60px] lg:h-[99px] flex items-center mb-4">
                            <input
                                type="text"
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                                placeholder="eg. AA1 1BB"
                                className="w-full h-full bg-[#efefef] rounded-[120px] pl-6 pr-[65px] lg:pl-10 lg:pr-[230px] text-[16px] lg:text-[22px] text-black font-medium outline-none placeholder:text-gray-400"
                            />

                            <button
                                onClick={isSuccess ? () => setStatus('idle') : handleFind}
                                className={`absolute right-2 lg:right-2 h-[44px] w-[44px] lg:h-[83px] lg:w-[210px] rounded-full lg:rounded-[120px] flex items-center justify-center text-white font-bold text-[18px] lg:text-[28px] transition-colors shadow-sm lg:shadow-md
                                    ${isSuccess ? 'bg-[#03081f] hover:bg-black' : isError ? 'bg-[#03081f] hover:bg-black' : 'bg-[#fc8a06] hover:bg-[#e07a05]'}`}>
                                <span className="hidden lg:inline">{isSuccess ? 'Change' : 'Find'}</span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lg:hidden text-white">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>

                        {isError && <p className="text-[#e53935] font-bold text-[14px] lg:text-[18px] ml-2 lg:ml-10">Sorry, we don&apos;t do delivery to your area.</p>}
                        {isSuccess && <p className="text-[#028643] font-bold text-[14px] lg:text-[18px] ml-2 lg:ml-10">We deliver to your area.</p>}

                        <div className="mt-8 lg:mt-16 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-4 w-full max-w-[280px] lg:max-w-none mx-auto">
                                <div className="h-[2px] bg-[#fc8a06] flex-1"></div>
                                <span className="font-bold text-[16px] lg:text-[20px] text-black">or</span>
                                <div className="h-[2px] bg-[#fc8a06] flex-1"></div>
                            </div>

                            <button
                                onClick={() => setStatus('collection')}
                                className="text-[#03081f] font-bold text-[16px] lg:text-[22px] underline decoration-2 underline-offset-4 hover:text-[#fc8a06]">
                                I want to come and collect
                            </button>
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 lg:bottom-12 lg:left-12 w-[80px] h-[80px] lg:w-[166px] lg:h-[166px] opacity-10 pointer-events-none hidden sm:block">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div onClick={onClose} className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 font-sans cursor-pointer">
            {renderContent()}
        </div>
    )
}