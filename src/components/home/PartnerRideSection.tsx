import Image from 'next/image'
import Link from 'next/link'

export default function PartnerRideSection() {
    return (
        <section className="w-full mx-auto max-w-[1528px] mt-12 lg:mt-16 font-sans select-none px-4 lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="relative w-full h-[223px] sm:h-[280px] md:h-[320px] lg:h-[425px] rounded-[12px] overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <Image
                        src="/partner-business.jpg"
                        alt="Partner with us"
                        fill
                        unoptimized
                        priority
                        className="object-cover object-[80%_center] group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none"></div>

                    <div className="absolute top-0 left-6 lg:left-12 bg-white flex items-center justify-center rounded-b-[4px] lg:rounded-b-[12px] w-[191px] lg:w-[288px] h-[33px] lg:h-[63px] z-10 shadow-md">
                        <span className="text-black font-bold text-[13px] lg:text-[18px]">Earn more with lower fees</span>
                    </div>

                    <div className="absolute bottom-4 lg:bottom-10 left-6 lg:left-12 z-20 flex flex-col items-start">
                        <span className="text-brand-primary text-[12px] lg:text-[18px] font-medium mb-0.5 lg:mb-2">Signup as a business</span>
                        <h3 className="text-white text-[22px] lg:text-[44px] font-bold leading-none mb-3 lg:mb-6">Partner with us</h3>
                        <Link href="/partner">
                            <button className="bg-brand-primary text-white font-medium text-[12px] lg:text-[18px] rounded-[120px] w-[110px] lg:w-[205px] h-[32px] lg:h-[52px] hover:bg-orange-600 transition-colors">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="relative w-full h-[223px] sm:h-[280px] md:h-[320px] lg:h-[425px] rounded-[12px] overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <Image src="/partner-rider.jpg" alt="Ride with us" fill unoptimized priority className="object-cover object-[70%_center] group-hover:scale-105 transition-transform duration-500" />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none"></div>

                    <div className="absolute top-0 left-6 lg:left-12 bg-white flex items-center justify-center rounded-b-[4px] lg:rounded-b-[12px] w-[191px] lg:w-[288px] h-[33px] lg:h-[63px] z-10 shadow-md">
                        <span className="text-black font-bold text-[13px] lg:text-[18px]">Avail exclusive perks</span>
                    </div>

                    <div className="absolute bottom-4 lg:bottom-10 left-6 lg:left-12 z-20 flex flex-col items-start">
                        <span className="text-brand-primary text-[12px] lg:text-[18px] font-medium mb-0.5 lg:mb-2">Signup as a rider</span>
                        <h3 className="text-white text-[22px] lg:text-[44px] font-bold leading-none mb-3 lg:mb-6">Ride with us</h3>
                        <Link href="/partner">
                            <button className="bg-brand-primary text-white font-medium text-[12px] lg:text-[18px] rounded-[120px] w-[110px] lg:w-[205px] h-[32px] lg:h-[52px] hover:bg-orange-600 transition-colors">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}