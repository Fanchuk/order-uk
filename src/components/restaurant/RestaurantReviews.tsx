import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { REVIEWS } from '@/src/shared/lib/constants/reviews'

export default function RestaurantReviews() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 3,
        loop: true,
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    return (
        <section className="w-full bg-[rgba(217,217,217,0.5)] lg:bg-[#d9d9d9] relative pt-10 lg:pt-16 pb-10 lg:pb-[89px] font-sans select-none mt-8 lg:mt-0 mb-0 lg:mb-24">
            <div className="max-w-[1528px] mx-auto px-4 lg:px-16 flex flex-col">
                <div className="hidden lg:flex justify-between items-center mb-12">
                    <h2 className="text-[44px] font-bold text-black" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        Customer Reviews
                    </h2>
                    <div className="flex gap-4">
                        <button onClick={scrollPrev} className="w-[75px] h-[75px] rounded-full bg-[#fc8a06] flex items-center justify-center hover:opacity-80 transition-opacity shadow-md">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button onClick={scrollNext} className="w-[75px] h-[75px] rounded-full bg-[#fc8a06] flex items-center justify-center hover:opacity-80 transition-opacity shadow-md">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex lg:hidden flex-col items-center mb-8">
                    <h2 className="text-[32px] font-bold text-black mb-8 text-center" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        Customer Reviews
                    </h2>
                    <RatingBadge />
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-6">
                        {REVIEWS.map((review) => (
                            <div key={review.id} className="flex-none w-full lg:w-[calc(33.333%-16px)] h-[274px] bg-white rounded-[12px] shadow-sm p-5 lg:p-8 flex flex-col border border-gray-100">
                                <div className="flex items-center justify-between mb-4 lg:mb-6">
                                    <div className="flex items-center gap-3 lg:gap-4">
                                        <Image
                                            src="/review-avatar.jpg"
                                            alt="User Avatar"
                                            width={54}
                                            height={54}
                                            className="rounded-full w-[45px] h-[45px] lg:w-[54px] lg:h-[54px] object-cover"
                                            unoptimized
                                        />
                                        <div className="w-[2px] h-[40px] lg:h-[50px] bg-[#fc8a06]" />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[16px] lg:text-[18px] text-black">{review.name}</span>
                                            <span className="text-[14px] lg:text-[16px] text-[#fc8a06]">{review.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1.5 lg:gap-2">
                                        <div className="flex gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Image key={i} src="/icon-star-orange.svg" alt="star" width={16} height={16} className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" unoptimized />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Image src="/icon-clock-orange.svg" alt="clock" width={16} height={16} unoptimized />
                                            <span className="text-[12px] lg:text-[14px] text-gray-500 font-medium whitespace-nowrap">{review.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[14px] lg:text-[16px] leading-[160%] lg:leading-[169%] font-normal text-black opacity-90 flex-1 overflow-hidden line-clamp-4 lg:line-clamp-none">
                                    {review.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex lg:hidden justify-center gap-4 mt-8">
                    <button onClick={scrollPrev} className="w-[60px] h-[60px] rounded-full bg-[#fc8a06] flex items-center justify-center hover:opacity-80 transition-opacity shadow-md">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button onClick={scrollNext} className="w-[60px] h-[60px] rounded-full bg-[#fc8a06] flex items-center justify-center hover:opacity-80 transition-opacity shadow-md">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30">
                <RatingBadge />
            </div>
        </section>
    )
}

function RatingBadge() {
    return (
        <div className="w-[153px] h-[178px] bg-white rounded-[12px] shadow-[5px_5px_15px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-2 border border-gray-100 shrink-0">
            <span className="text-[64px] font-bold leading-none text-black">3.4</span>
            <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                    <Image key={i} src="/icon-star-orange.svg" alt="star" width={18} height={18} unoptimized />
                ))}
            </div>
            <span className="text-[14px] text-gray-400 font-semibold mt-1 tracking-wide">1,360 reviews</span>
        </div>
    )
}
