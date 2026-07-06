import Image from 'next/image'

interface RestaurantHeroProps {
    restaurant: any
}

export default function RestaurantHero({ restaurant }: RestaurantHeroProps) {
    if (!restaurant) return null;

    return (
        <section className="relative w-full max-w-[1528px] mx-auto lg:h-[477px] lg:rounded-[12px] overflow-hidden mt-4 lg:mt-10 flex flex-col lg:flex-row items-center px-4 py-8 lg:py-0 lg:px-16">
            <div className="absolute inset-0 z-0">
                <Image src={restaurant.bannerImagePath || "/restaurant-bg.jpg"} fill alt="Background" className="object-cover" unoptimized priority />
                <div className="absolute inset-0 bg-[rgba(226,226,226,0.9)] lg:bg-[rgba(3,8,31,0.9)] z-10" />
            </div>

            <div className="hidden lg:flex absolute bottom-0 left-0 bg-[#fc8a06] text-white items-center justify-center gap-3 w-[335px] h-[61px] rounded-r-[12px] z-30">
                <Image src="/icon-clock.svg" width={24} height={24} alt="Clock" unoptimized />
                <span className="font-bold text-[18px]">Open until 3:00 AM</span>
            </div>

            <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full h-full lg:py-14">
                <div className="order-1 lg:order-2 relative shrink-0 w-[228px] lg:w-[581px] h-[142px] lg:h-[361px] rounded-[12px] mt-4 lg:mt-0">
                    <div className="block lg:hidden relative w-full h-full">
                        <Image src={restaurant.bannerImagePath || "/restaurant-bg.jpg"} fill alt="Food Mobile" className="object-cover rounded-[12px]" unoptimized priority />
                    </div>
                    <div className="hidden lg:block relative w-full h-full">
                        <Image src={restaurant.bannerImagePath || "/restaurant-bg.jpg"} fill alt="Food Desktop" className="object-cover rounded-[12px]" unoptimized priority />
                    </div>

                    <div className="absolute -left-3 lg:-left-[68px] bottom-[-15px] lg:bottom-8 bg-white rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center w-[53px] lg:w-[136px] h-[62px] lg:h-[158px] z-30">
                        <span className="text-black font-bold text-[18px] lg:text-[48px] leading-none">{restaurant.rating || "0.0"}</span>
                        <div className="flex items-center gap-[1px] lg:gap-1 mt-1 lg:mt-2">
                            {[1, 2, 3].map((i) => (
                                <svg key={i} className="w-[8px] h-[8px] lg:w-[20px] lg:h-[20px]" viewBox="0 0 24 24" fill="#fc8a06">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                            <svg className="w-[8px] h-[8px] lg:w-[20px] lg:h-[20px]" viewBox="0 0 24 24" fill="#fc8a06">
                                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27V15v-1.64h1.64l1.64-7.03L18.18 21z" />
                            </svg>
                            <svg className="w-[8px] h-[8px] lg:w-[20px] lg:h-[20px]" viewBox="0 0 24 24" fill="#d9d9d9">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        </div>
                        <span className="hidden lg:block text-[#A6A6A6] font-medium text-[12px] mt-2">1,360 reviews</span>
                    </div>
                </div>

                <div className="lg:hidden order-2 flex items-center justify-center gap-2 bg-[#fc8a06] text-white w-full max-w-[335px] h-[61px] rounded-[12px] mt-8 mb-6 font-bold text-[16px] z-20">
                    <Image src="/icon-clock.svg" width={24} height={24} alt="Clock" unoptimized />
                    Open until 3:00 AM
                </div>

                <div className="order-3 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-[666px]">
                    <span className="text-black lg:text-white text-[14px] lg:text-[18px] font-medium mb-1 lg:mb-2">I&apos;m lovin&apos; it!</span>
                    <h1 className="text-black lg:text-white text-[32px] lg:text-[54px] font-semibold leading-[122%] tracking-tight mb-8 lg:mb-12">{restaurant.name}</h1>
                    <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                        <button className="flex items-center justify-center gap-3 w-full lg:w-[330px] h-[63px] rounded-[120px] bg-[#03081f] lg:bg-transparent lg:border lg:border-white text-white font-medium text-[15px] lg:text-[16px]">
                            <Image src="/icon-order.svg" width={24} height={24} alt="Order" unoptimized />
                            Minimum Order: {restaurant.minimumOrder} GBP
                        </button>
                        <button className="flex items-center justify-center gap-3 w-full lg:w-[330px] h-[63px] rounded-[120px] bg-[#03081f] lg:bg-transparent lg:border lg:border-white text-white font-medium text-[15px] lg:text-[16px]">
                            <Image src="/icon-delivery.svg" width={24} height={24} alt="Delivery" unoptimized />
                            Delivery in {restaurant.deliveryTimeMinutes} Minutes
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}