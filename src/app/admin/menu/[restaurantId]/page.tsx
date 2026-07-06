import prisma from '@/src/shared/lib/prisma'
import MenuClient from './MenuClient'

export const dynamic = 'force-dynamic'

export default async function RestaurantMenuPage({
    params,
}: {
    params: Promise<{ restaurantId: string }>
}) {
    const { restaurantId } = await params
    const itemId = parseInt(restaurantId)

    const restaurant = await prisma.restaurant.findUnique({
        where: { id: itemId },
        select: { id: true, name: true },
    })

    if (!restaurant) {
        return <div>Restaurant not found</div>
    }

    const items = await prisma.restaurantMenuItem.findMany({
        where: { restaurantId: itemId },
        orderBy: { id: 'asc' },
    })

    return (
        <div className="max-w-[1100px]">
            <h1 className="text-[28px] font-bold text-[#03081f] mb-1">
                {restaurant.name}
            </h1>
            <p className="text-gray-500 mb-8">{items.length} menu items</p>
            <MenuClient restaurantId={itemId} initialItems={items} />
        </div>
    )
}