'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Star, Clock, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/src/lib/utils'

interface Restaurant {
    id: number
    name: string
    logoPath: string
    bannerImagePath: string
    rating: number
    deliveryTimeMinutes: string
    minimumOrder: number
}

type SortOption = 'rating' | 'delivery' | 'name'

function parseMinTime(time: string): number {
    const match = time.match(/\d+/)
    return match ? Number(match[0]) : 999
}

export default function RestaurantCatalog({ restaurants }: { restaurants: Restaurant[] }) {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState<SortOption>('rating')
    const [minRating, setMinRating] = useState(0)

    const filtered = useMemo(() => {
        let result = restaurants.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
        if (minRating > 0) result = result.filter((r) => r.rating >= minRating)

        return [...result].sort((a, b) => {
            if (sort === 'rating') return b.rating - a.rating
            if (sort === 'delivery') return parseMinTime(a.deliveryTimeMinutes) - parseMinTime(b.deliveryTimeMinutes)
            return a.name.localeCompare(b.name)
        })
    }, [restaurants, search, sort, minRating])

    return (
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search restaurants..."
                        aria-label="Search restaurants"
                        className="w-full h-[52px] bg-white border border-gray-200 rounded-xl pl-11 pr-4 outline-none focus:border-brand-orange text-sm"
                    />
                </div>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    aria-label="Sort restaurants"
                    className="h-[52px] bg-white border border-gray-200 rounded-xl px-4 outline-none focus:border-brand-orange text-sm font-medium">
                    <option value="rating">Top rated</option>
                    <option value="delivery">Fastest delivery</option>
                    <option value="name">Name (A–Z)</option>
                </select>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
                <span className="text-sm text-gray-500 self-center">Rating:</span>
                {[0, 4, 4.5, 4.7].map((r) => (
                    <button
                        key={r}
                        onClick={() => setMinRating(r)}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold border transition-all
                            ${minRating === r ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                        {r === 0 ? (
                            'All'
                        ) : (
                            <>
                                <Star size={12} className="fill-brand-orange text-brand-orange" /> {r}+
                            </>
                        )}
                    </button>
                ))}
            </div>

            <p className="text-sm text-gray-500 mb-6">
                Showing <strong>{filtered.length}</strong> of {restaurants.length} restaurants
            </p>

            {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
                    <ShoppingBag size={48} className="text-gray-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-brand-dark mb-2">No restaurants found</h3>
                    <p className="text-gray-500">Try changing your search or filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((r) => (
                        <Link
                            key={r.id}
                            href={`/restaurants/${r.id}`}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="relative h-[160px] overflow-hidden bg-gray-100">
                                <Image src={r.bannerImagePath || '/restaurant-bg.jpg'} alt={r.name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="absolute -bottom-5 left-4 w-[48px] h-[48px] rounded-xl bg-white shadow-md border border-gray-100 overflow-hidden p-1">
                                    <div className="relative w-full h-full">
                                        <Image src={r.logoPath || '/placeholder.jpg'} alt="" fill unoptimized className="object-contain" />
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 px-2 py-1 rounded-full text-sm font-bold text-brand-dark shadow-sm">
                                    <Star size={12} className="fill-brand-orange text-brand-orange" /> {r.rating}
                                </div>
                            </div>
                            <div className="pt-8 px-4 pb-4">
                                <h3 className="font-bold text-brand-dark group-hover:text-brand-orange transition-colors truncate">{r.name}</h3>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Clock size={13} className="text-brand-green" /> {r.deliveryTimeMinutes} min
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <ShoppingBag size={13} className="text-brand-green" /> Min {formatPrice(r.minimumOrder)}
                                    </span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-xs font-bold text-brand-green">Open now</span>
                                    <span className="text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform">View menu →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}