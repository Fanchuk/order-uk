'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ExclusiveDeals() {
    const [categories, setCategories] = useState<any[]>([])
    const [promos, setPromos] = useState<any[]>([])
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const res = await fetch('/api/exclusive-deals')
                if (!res.ok) throw new Error('Failed to load exclusive deals')
                const data = await res.json()
                setCategories(data.categories)
                setPromos(data.promos)
                if (data.categories && data.categories.length > 0) {
                    setActiveCategoryId(data.categories[0].id)
                }
            } catch (error: any) {
                console.error('Fetch error:', error)
                toast.error(error.message || 'Something went wrong while fetching deals.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchDeals()
    }, [])

    const filteredPromos = promos.filter((promo) => promo.promoCategoryId === activeCategoryId)

    if (isLoading) {
        return (
            <div className="w-full flex justify-center py-20">
                <Loader2 className="animate-spin text-[#fc8a06]" size={40} />
            </div>
        )
    }

    return (
        <section className="w-full max-w-[1528px] mx-auto px-4 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                <h2 className="text-[32px] font-bold text-black flex items-center gap-3" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    Up to -40% 🎊 Order.uk exclusive deals
                </h2>
                <div className="flex flex-wrap items-center gap-3 lg:gap-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategoryId(cat.id)}
                            className={`px-8 py-3 rounded-[120px] font-medium text-[16px] transition-all duration-300 border 
                            ${activeCategoryId === cat.id ? 'border-[#fc8a06] text-[#fc8a06] bg-orange-50 shadow-sm' : 'border-transparent text-gray-600 hover:text-black hover:bg-gray-50'}`}>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromos.length === 0 ? (
                    <div className="col-span-full py-10 text-center text-gray-500 font-medium">No exclusive deals found for this category.</div>
                ) : (
                    filteredPromos.map((promo) => (
                        <Link
                            key={promo.id}
                            href="/special-offers"
                            className="relative w-full h-[320px] rounded-[16px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 block">
                            <Image src={promo.imagePath || '/placeholder.jpg'} alt={promo.name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-700" />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                            <div className="absolute top-0 right-6 bg-[#03081f] text-white px-6 py-4 rounded-b-[12px] flex items-center justify-center z-10 shadow-md group-hover:bg-[#fc8a06] transition-colors">
                                <span className="font-bold text-[24px] leading-none">{promo.discountPercent}</span>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col items-start">
                                <span className="text-[#fc8a06] font-medium text-[14px] mb-1">Tap to see all deals →</span>
                                <h3 className="text-white font-bold text-[24px] lg:text-[28px] leading-tight drop-shadow-md">{promo.name}</h3>
                            </div>

                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#fc8a06] rounded-[16px] transition-colors pointer-events-none" />
                        </Link>
                    ))
                )}
            </div>

            <div className="flex justify-center mt-8">
                <Link
                    href="/special-offers"
                    className="px-8 py-3 border-2 border-[#fc8a06] text-[#fc8a06] rounded-full font-bold text-[15px] hover:bg-[#fc8a06] hover:text-white transition-all duration-300">
                    View All Special Offers →
                </Link>
            </div>
        </section>
    )
}
