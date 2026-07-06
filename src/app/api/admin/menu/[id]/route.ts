import { NextResponse } from 'next/server';
import { z } from 'zod'
import prisma from '@/src/shared/lib/prisma'

const bodyShema = z.object({
    name: z.string().min(1).optional(),
    price: z.number().min(1).optional()
})

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
    const { id } = await params
    const itemId = parseInt(id)

    if (isNaN(itemId)) {
        return NextResponse.json(
            { error: 'Invalid id' },
            { status: 400 }
        )
    }

    const parsed = bodyShema.safeParse(await request.json())

    if (!parsed.success) {
        return NextResponse.json(
            { error: 'Invalid data' },
            { status: 400 })
    }

    const updated = await prisma.restaurantMenuItem.update({
        where: { id: itemId },
        data: parsed.data,
    })

    return NextResponse.json({updated})
    }
    
    catch {
        return NextResponse.json(
            { error: 'Item not found' },
            { status: 404 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
    const { id } = await params
    const itemId = parseInt(id)

    if (isNaN(itemId)) {
        return NextResponse.json(
            { error: 'Invalid id' },
            { status: 400 }
        )
    }

    await prisma.menuItem.delete({
        where: { id: itemId }
    })

    return NextResponse.json({ ok: true })

    } catch {
        return NextResponse.json(
            { error: 'Item not found' },
            { status: 404 }
        )
    }
}