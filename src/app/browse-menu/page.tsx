import type { Metadata } from 'next'
import prisma from '@/src/shared/lib/prisma'
import BrowseMenuClient from '@/src/components/browse-menu/BrowseMenuClient'

export const metadata: Metadata = {
    title: 'Browse Menu | Order.uk',
    description: 'Browse food by category — Burgers, Pizza, Salads, Pasta and more.',
}

export default async function BrowseMenuPage() {
    const categories = await prisma.category.findMany({
        orderBy: { id: 'asc' },
    })

    const restaurants = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            logoPath: true,
            bannerImagePath: true,
            rating: true,
            deliveryTimeMinutes: true,
            minimumOrder: true,
            _count: { select: { menuItems: true } },
        },
        orderBy: { rating: 'desc' },
    })

    const featuredItems = await prisma.restaurantMenuItem.findMany({
        take: 12,
        where: { isPromo: true },
        include: {
            restaurant: { select: { name: true, id: true } },
            menuCategory: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
    })

    return <BrowseMenuClient categories={categories} restaurants={restaurants} featuredItems={featuredItems} />
}
