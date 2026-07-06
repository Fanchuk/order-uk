import { NextResponse } from 'next/server';
import { z } from 'zod'
import prisma from '@/src/shared/lib/prisma'

const bodyShema = z.object({
    name: z.string().min(1),
    price: z.number().min(1),
    restaurantId: z.number()
})

export async function POST(request: Request) {
    try {
        const parse = bodyShema.safeParse(await request.json())

        if (!parse.success) {
            return NextResponse.json(
                { error: 'Failed' },
                { status: 400 }
            )
        }

        const item = await prisma.restaurantMenuItem.create({ data: parse.data })
        
        return NextResponse.json(item, { status: 201 })

    } catch {
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 })
    }
}