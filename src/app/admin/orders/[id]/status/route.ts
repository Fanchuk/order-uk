import { NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/src/shared/lib/prisma'

const STATUSES = ['CONFIRMED', 'PREPARING', 'READY', 'ON_THE_WAY', 'DELIVERED', 'CANCELLED'] as const

const bodySchema = z.object({
    status: z.enum(STATUSES),
})

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const orderId = parseInt(id)

        if (isNaN(orderId)) {
            return NextResponse.json({ error: 'Invalid order id' }, { status: 400 })
        }

        const parsed = bodySchema.safeParse(await request.json())
        if (!parsed.success) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
        }

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status: parsed.data.status },
        })

        return NextResponse.json({ status: order.status })
    } catch {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
}
