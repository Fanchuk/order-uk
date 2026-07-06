import type { Metadata } from 'next'
import prisma from '@/src/shared/lib/prisma'
import OffersExplorer from '@/src/features/offers/OffersExplorer'

export const metadata: Metadata = {
    title: 'Special Offers',
    description: 'Exclusive deals and discounts on your favourite food.',
}

export const revalidate = 3600

export default async function SpecialOffersPage() {
    const categories = await prisma.promoCategory.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            promos: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true, // пенси
                    discountPercent: true,
                    imagePath: true,
                    promoCategoryId: true,
                },
                orderBy: { id: 'asc' },
            },
        },
        orderBy: { id: 'asc' },
    })

    const totalPromos = categories.reduce((sum, c) => sum + c.promos.length, 0)

    return (
        <div className="min-h-screen bg-brand-gray">
            {/* Hero */}
            <section className="relative bg-brand-dark text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[120px]" aria-hidden="true" />

                <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-24">
                    <span className="inline-block bg-brand-orange text-white text-sm font-black px-4 py-1.5 rounded-full mb-5">🔥 {totalPromos} EXCLUSIVE DEALS</span>
                    <h1 className="text-[44px] lg:text-[64px] font-black leading-tight max-w-[800px]">
                        Special offers,
                        <br />
                        <span className="text-brand-orange">serious savings</span>
                    </h1>
                    <p className="text-gray-400 text-lg mt-5 max-w-[540px]">Hand-picked deals updated daily.</p>
                </div>
            </section>

            <OffersExplorer categories={categories} />
        </div>
    )
}
