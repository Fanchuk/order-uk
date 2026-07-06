import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/shared/lib/prisma'

interface SubscribeRequest {
    email: string
}

interface SubscribeSuccess {
    message: string
    email: string
}

interface SubscribeError {
    error: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as SubscribeRequest

        // Валідація
        if (!body.email) {
            return NextResponse.json({ error: 'Email is required' } as SubscribeError, { status: 400 })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(body.email)) {
            return NextResponse.json({ error: 'Invalid email format' } as SubscribeError, { status: 400 })
        }

        // Перевіряємо дублювання
        const existing = await prisma.emailSubscriber.findUnique({
            where: { email: body.email },
        })

        if (existing) {
            return NextResponse.json({ error: 'Email already subscribed' } as SubscribeError, { status: 409 })
        }

        // Зберігаємо
        const subscriber = await prisma.emailSubscriber.create({
            data: {
                email: body.email,
            },
        })

        return NextResponse.json(
            {
                message: 'Successfully subscribed to exclusive deals!',
                email: subscriber.email,
            } as SubscribeSuccess,
            { status: 201 },
        )
    } catch (error) {
        console.error('Subscribe error:', error)
        return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' } as SubscribeError, { status: 500 })
    }
}
