import { NextResponse } from 'next/server'
import prisma from '@/src/shared/lib/prisma'

export async function GET() {
    try {
        const categories = await prisma.promoCategory.findMany({
            include: {
                promos: {
                    orderBy: {
                        id: 'asc',
                    },
                },
            },
            orderBy: {
                id: 'asc',
            },
        })

        const promos = await prisma.specialPromo.findMany({
            include: {
                category: true,
            },
        })

        return NextResponse.json({
            categories,
            promos,
        })
    } catch (error) {
        console.error('Error fetching exclusive deals:', error)

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: 'Failed to fetch exclusive deals',
                    details: error.message,
                },
                { status: 500 },
            )
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
