import Image from 'next/image'
import Link from 'next/link' // ДОДАНО
import { POPULAR_CATEGORIES } from '@/src/shared/lib/constants/categories'

export default function PopularCategories() {
    return (
        <section className="w-full mx-auto max-w-[1528px] mt-12 lg:mt-16 font-sans select-none px-4 lg:px-0">
            <h2 className="text-[24px] lg:text-[32px] font-bold text-black tracking-tight mb-6 lg:mb-10 text-left">
                <span className="lg:hidden">Order.Uk’s Popular Categories</span>
                <span className="hidden lg:inline">Order.uk Popular Categories 🤩</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                {POPULAR_CATEGORIES.map((category) => (
                    <Link
                        href={`/categories/${category.id}`}
                        key={category.id}
                        className="w-full flex flex-col bg-[#03081f] rounded-[12px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                        <div className="relative w-full aspect-[238/203] overflow-hidden bg-[#f3f4f6]">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                unoptimized
                                priority
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="flex flex-col justify-center px-4 h-[60px] lg:h-[70px]">
                            <h3 className="text-[#fc8a06] text-[14px] lg:text-[18px] font-bold leading-tight truncate">{category.name}</h3>
                            <p className="text-white text-[12px] lg:text-[14px] font-medium mt-0.5 opacity-80">{category.count}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
