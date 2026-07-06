import NotFound from '../../not-found'
import type { Metadata } from 'next'
import prisma from '@/src/shared/lib/prisma'
import RestaurantMenu from '@/src/features/catalog/RestaurantMenu'
import RestaurantHero from '@/src/components/restaurant/RestaurantHero'

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const restaurant = await prisma.restaurant.findUnique({
        where: { id: Number(id) },
        select: { name: true },
    })
    return { title: restaurant?.name ?? 'Restaurant' }
}

export default async function RestaurantPage({ params }: PageProps) {
    const { id } = await params

    const restaurant = await prisma.restaurant.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            name: true,
            logoPath: true,
            bannerImagePath: true,
            rating: true,
            deliveryTimeMinutes: true,
            minimumOrder: true,
            menuItems: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    imagePath: true,
                    isPromo: true,
                    oldPrice: true,
                    discountLabel: true,
                    menuCategory: {
                        select: { id: true, name: true, slug: true },
                    },
                },
                orderBy: { menuCategoryId: 'asc' },
            },
        },
    })

    if (!restaurant) return NotFound()

    return (
        <div className="flex flex-col min-h-screen">
            <RestaurantHero restaurant={restaurant} />

            <RestaurantMenu
                restaurant={restaurant}
                menuItems={restaurant.menuItems}
                minimumOrder={restaurant.minimumOrder}
            />
        </div>
    )
}