import Image from 'next/image'
import Link from 'next/link'
import { POPULAR_RESTAURANTS } from '@/src/shared/lib/constants/restaurants'

interface PopularRestaurantsProps {
    title?: string
}

export default function PopularRestaurants({ title }: PopularRestaurantsProps) {
    return (
        <section className="w-full mx-auto max-w-[1528px] mt-12 lg:mt-16 font-sans select-none">
            <h2 className="text-[16px] lg:text-[32px] font-bold text-black tracking-tight mb-6 lg:mb-10 text-center lg:text-left">{title}</h2>

            <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 gap-4 lg:gap-6 pb-4 lg:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {POPULAR_RESTAURANTS.map((restaurant) => (
                    <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id} className="shrink-0 w-[238px] lg:w-full flex flex-col snap-start group">
                        <div className="w-full flex flex-col rounded-[12px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="relative w-full h-[203px] bg-[#f3f4f6] overflow-hidden rounded-t-[12px]">
                                <Image
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    fill
                                    unoptimized
                                    priority
                                    sizes="(max-width: 1024px) 238px, 16vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="h-[63px] bg-brand-primary flex items-center justify-center px-2 rounded-b-[12px]">
                                <h3 className="text-white text-[16px] font-bold text-center truncate">{restaurant.name}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
