'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, Clock, ShoppingBag, ArrowRight, Tag, ChevronRight } from 'lucide-react'
import { formatPrice } from '@/src/lib/utils'

const CATEGORY_ICONS: Record<string, string> = {
    'Burgers & Fast food': '🍔',
    Salads: '🥗',
    'Pasta & Casuals': '🍝',
    Pizza: '🍕',
    Breakfast: '🍳',
    Soups: '🍲',
}

interface Category {
    id: number
    name: string
    slug: string
    imagePath: string
}

interface Restaurant {
    id: number
    name: string
    logoPath: string
    bannerImagePath: string
    rating: number
    deliveryTimeMinutes: string
    minimumOrder: number
    _count: { menuItems: number }
}

interface FeaturedItem {
    id: number
    name: string
    description: string
    price: number
    oldPrice: number | null
    discountLabel: string | null
    imagePath: string
    restaurant: { name: string; id: number }
    menuCategory: { name: string } | null
}

interface Props {
    categories: Category[]
    restaurants: Restaurant[]
    featuredItems: FeaturedItem[]
}

export default function BrowseMenuClient({ categories, restaurants, featuredItems }: Props) {
    const [activeCategory, setActiveCategory] = useState<number | null>(null)
    const [search, setSearch] = useState('')

    const filteredRestaurants = useMemo(() => {
        let result = restaurants
        if (search) {
            result = result.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
        }
        return result
    }, [restaurants, search])

    const activecat = categories.find((c) => c.id === activeCategory)

    return (
        <div className="min-h-screen bg-[#f8f9fa] font-sans">
            <div className="bg-[#03081f] text-white">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
                    <span className="inline-block bg-[#fc8a06]/20 text-[#fc8a06] text-sm font-bold px-4 py-1.5 rounded-full mb-4">🍽️ Browse by food type</span>
                    <h1 className="text-[36px] lg:text-[52px] font-black leading-tight mb-3">
                        What are you <span className="text-[#fc8a06]">craving</span> today?
                    </h1>
                    <p className="text-gray-400 text-lg max-w-[500px]">Pick a food category and explore the best dishes near you.</p>

                    <div className="mt-8 relative max-w-[560px]">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search restaurants or dishes..."
                            className="w-full h-[56px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-6 outline-none text-white placeholder:text-gray-400 focus:border-[#fc8a06] transition-colors text-[15px]"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
                <div className="mb-10">
                    <h2 className="text-[20px] lg:text-[24px] font-bold text-[#03081f] mb-5">Browse by Category</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`group relative w-full h-[130px] rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 
                                ${activeCategory === null ? 'border-[#fc8a06] shadow-lg shadow-orange-100' : 'border-transparent hover:border-gray-200'}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#03081f] to-[#1a2040]" />
                            <span className="relative text-4xl">🌟</span>
                            <span className="relative font-bold text-white text-[14px]">All Dishes</span>
                            {activeCategory === null && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fc8a06]" />}
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                                className={`group relative w-full h-[130px] rounded-2xl overflow-hidden border-2 transition-all duration-300 
                                    ${activeCategory === cat.id ? 'border-[#fc8a06] shadow-lg shadow-orange-100 scale-[1.02]' : 'border-transparent hover:border-gray-200 hover:scale-[1.01]'}`}>
                                <Image src={cat.imagePath || '/placeholder.jpg'} alt={cat.name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 px-2">
                                    <span className="text-2xl mb-1">{CATEGORY_ICONS[cat.name] || '🍽️'}</span>
                                    <span className="text-white font-bold text-[12px] lg:text-[13px] text-center leading-tight">{cat.name}</span>
                                </div>
                                {activeCategory === cat.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fc8a06]" />}
                            </button>
                        ))}
                    </div>

                    {activeCategory && activecat && (
                        <div className="mt-4 flex items-center justify-between p-4 bg-[#fc8a06]/10 rounded-xl border border-[#fc8a06]/20">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{CATEGORY_ICONS[activecat.name] || '🍽️'}</span>
                                <span className="font-bold text-[#fc8a06]">{activecat.name}</span>
                                <span className="text-gray-500 text-sm">— {filteredRestaurants.length} restaurants</span>
                            </div>
                            <Link href={`/categories/${activecat.id}`} className="flex items-center gap-1 text-sm font-bold text-[#fc8a06] hover:text-orange-600 transition-colors">
                                Browse all <ChevronRight size={16} />
                            </Link>
                        </div>
                    )}
                </div>

                {!search && featuredItems.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[20px] lg:text-[24px] font-bold text-[#03081f] flex items-center gap-2">
                                <Tag size={22} className="text-[#fc8a06]" />
                                Today's Special Deals
                            </h2>
                            <Link href="/special-offers" className="text-[#fc8a06] font-medium text-sm hover:text-orange-600 transition-colors flex items-center gap-1">
                                View all <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {featuredItems.slice(0, 8).map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/restaurants/${item.restaurant.id}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                                    <div className="relative w-full h-[160px] bg-gray-100 overflow-hidden">
                                        <Image
                                            src={item.imagePath || '/placeholder.jpg'}
                                            alt={item.name}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {item.discountLabel && (
                                            <div className="absolute top-3 right-3 bg-[#03081f] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">{item.discountLabel}</div>
                                        )}
                                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#03081f] px-2 py-0.5 rounded-full text-xs font-medium">
                                            {item.menuCategory?.name || 'Special'}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold text-[15px] text-[#03081f] leading-tight mb-1 line-clamp-1">{item.name}</h3>
                                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-[#028643] text-[16px]">{formatPrice(item.price)}</span>
                                                {item.oldPrice && <span className="text-gray-400 text-xs line-through">{formatPrice(item.oldPrice)}</span>}
                                            </div>
                                            <span className="text-xs text-gray-500">{item.restaurant.name}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[20px] lg:text-[24px] font-bold text-[#03081f]">
                            {search ? `Results for "${search}"` : activeCategory ? `Restaurants with ${activecat?.name}` : 'All Restaurants'}
                        </h2>
                        <span className="text-sm text-gray-500">{filteredRestaurants.length} found</span>
                    </div>

                    {filteredRestaurants.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="text-5xl mb-4">🔍</div>
                            <p className="text-gray-500 font-medium">No restaurants found. Try a different search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRestaurants.map((r) => (
                                <Link
                                    key={r.id}
                                    href={`/restaurants/${r.id}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                                    <div className="relative w-full h-[180px] bg-gray-100 overflow-hidden">
                                        <Image
                                            src={r.bannerImagePath || '/restaurant-bg.jpg'}
                                            alt={r.name}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                        <div className="absolute top-3 right-3 bg-white rounded-xl px-2.5 py-1 flex items-center gap-1 shadow-sm">
                                            <Star size={12} className="fill-[#fc8a06] text-[#fc8a06]" />
                                            <span className="font-bold text-[13px] text-[#03081f]">{r.rating}</span>
                                        </div>

                                        <div className="absolute bottom-3 left-3 w-[48px] h-[48px] bg-white rounded-xl p-1.5 shadow-md">
                                            <div className="relative w-full h-full">
                                                <Image src={r.logoPath || '/placeholder.jpg'} alt={r.name} fill unoptimized className="object-contain" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold text-[17px] text-[#03081f] mb-2">{r.name}</h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Clock size={13} /> {r.deliveryTimeMinutes} min
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <ShoppingBag size={13} /> Min {formatPrice(r.minimumOrder)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#028643] text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">Open now</span>
                                            <span className="text-[#fc8a06] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                View menu <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
