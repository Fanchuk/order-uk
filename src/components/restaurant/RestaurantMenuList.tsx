import Image from 'next/image'
import { formatPrice } from '@/src/lib/utils'

interface RestaurantMenuListProps {
    menuItems: any[]
    onProductClick?: (product: any) => void
}

export default function RestaurantMenuList({ menuItems, onProductClick }: RestaurantMenuListProps) {
    if (!menuItems || menuItems.length === 0) return null

    const categories = Array.from(new Set(menuItems.map((item) => item.menuCategory?.name || 'Menu')))

    const renderPeppers = (spiciness: number) => {
        if (!spiciness || spiciness === 0) return null
        return (
            <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                    <Image key={i} src={i < spiciness ? '/icon-pepper-red.svg' : '/icon-pepper-grey.svg'} alt="pepper" width={21} height={21} unoptimized className="rotate-[23deg]" />
                ))}
            </div>
        )
    }

    return (
        <section className="w-full max-w-[1528px] mx-auto px-4 md:px-6 lg:px-16 mt-8 md:mt-16 mb-16 md:mb-24 font-sans select-none">
            <div className="hidden md:block">
                {categories.map((category) => {
                    const categoryItems = menuItems.filter((item) => (item.menuCategory?.name || 'Menu') === category)
                    if (categoryItems.length === 0) return null

                    return (
                        <div key={category} id={category} className="mb-16 last:mb-0 scroll-mt-32">
                            <h2 className="text-[32px] lg:text-[44px] font-bold mb-8 lg:mb-10 text-[#fc8a06]" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                {category}
                            </h2>

                            <div className="grid grid-cols-2 xl:grid-cols-3 gap-[20px]">
                                {categoryItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full h-auto min-h-[245px] rounded-[15px] bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-between p-4 lg:p-6 group hover:shadow-[0px_8px_25px_rgba(0,0,0,0.1)] transition-shadow duration-300 cursor-pointer">
                                        <div className="flex flex-col justify-between h-full py-1 pr-2 lg:pr-4 flex-1 min-w-0">
                                            <div>
                                                <h3 className="text-[16px] lg:text-[20px] font-semibold text-black leading-[115%] mb-2 lg:mb-3 truncate whitespace-normal line-clamp-2">{item.name}</h3>
                                                <p className="text-[12px] lg:text-[14px] text-black font-normal leading-[179%] line-clamp-3">{item.description}</p>
                                            </div>
                                            <span className="text-[16px] lg:text-[18px] font-bold text-[#03081f] mt-3 lg:mt-0">{formatPrice(item.price)}</span>
                                        </div>

                                        <div className="relative w-[140px] lg:w-[203px] h-[140px] lg:h-[199px] shrink-0 rounded-[12px] overflow-hidden bg-gray-50 flex items-center justify-center self-stretch my-auto">
                                            <Image src={item.imagePath} alt={item.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute bottom-0 right-0 w-[60px] h-[60px] lg:w-[88px] lg:h-[81px] bg-white/90 rounded-tl-[30px] lg:rounded-tl-[45px] rounded-br-[12px] flex items-center justify-center z-10">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onProductClick?.(item)
                                                    }}
                                                    className="w-[35px] h-[35px] lg:w-[49px] lg:h-[49px] bg-[#03081f] rounded-full flex items-center justify-center hover:bg-[#fc8a06] transition-colors shadow-md">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="white"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="scale-75 lg:scale-100">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex md:hidden flex-col gap-5">
                {menuItems.map((item) => (
                    <div key={item.id} className="w-full bg-white rounded-[12px] border border-[rgba(0,0,0,0.3)] p-4 flex flex-col gap-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-col pt-1">
                                <h3 className="text-[18px] font-[600] text-black leading-[120%]">{item.name}</h3>
                                {renderPeppers(item.spiciness)}
                            </div>
                            <div className="relative shrink-0 w-[117px] h-[117px] mt-2">
                                <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                                    <Image src={item.imagePath} alt={item.name} fill unoptimized className="object-cover" />
                                </div>
                            </div>
                        </div>

                        <p className="text-[14px] text-black font-normal leading-[140%] opacity-80">{item.description}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                            <div
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onProductClick?.(item)
                                }}
                                className="flex items-center justify-between h-[58px] px-2 gap-3 border border-[#8e8e8e] rounded-[4px] cursor-pointer hover:border-black transition-colors bg-[#03081f]">
                                <span className="font-bold text-[14px] pl-2 text-white">Add to basket</span>
                                <div className="h-[39px] px-4 bg-[#028643] rounded-[4px] flex items-center justify-center">
                                    <span className="font-bold text-[14px] text-white tracking-wide">{formatPrice(item.price)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
