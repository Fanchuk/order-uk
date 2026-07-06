import { NextResponse } from 'next/server'
import prisma from '@/src/shared/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params
        const restaurantId = parseInt(resolvedParams.id)

        if (isNaN(restaurantId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: { id: restaurantId },
            include: {
                menuItems: {
                    include: {
                        menuCategory: true,
                    },
                },
            },
        })

        if (!restaurant) {
            return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
        }

        return NextResponse.json(restaurant)
    } catch (error) {
        console.error('Error fetching restaurant:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
