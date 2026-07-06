import type { Metadata } from 'next'
import prisma from '@/src/shared/lib/prisma'
import RestaurantCatalog from '@/src/components/home/RestaurantCatalog'

export const metadata: Metadata = {
    title: 'All Restaurants',
    description: 'Browse all restaurants available for delivery.',
}

export const revalidate = 3600

export default async function RestaurantsPage() {
    const restaurants = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            logoPath: true,
            bannerImagePath: true,
            rating: true,
            deliveryTimeMinutes: true,
            minimumOrder: true,
        },
        orderBy: { rating: 'desc' },
    })

    return (
        <div className="min-h-screen bg-brand-gray">
            <section className="bg-brand-dark text-white">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16">
                    <span className="inline-block bg-brand-orange/15 text-brand-orange text-sm font-bold px-4 py-1.5 rounded-full mb-4">{restaurants.length} restaurants near you</span>
                    <h1 className="text-[40px] lg:text-[56px] font-black leading-tight max-w-[700px]">
                        Find your next <span className="text-brand-orange">favourite</span> meal
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-[520px]">Filter by rating, delivery time, or search by name.</p>
                </div>
            </section>

            <RestaurantCatalog restaurants={restaurants} />
        </div>
    )
}
