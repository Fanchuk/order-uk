import { NextResponse } from 'next/server'
import prisma from '@/src/shared/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { code, subtotal } = body

        if (!code || !subtotal) {
            return NextResponse.json({ valid: false, error: 'Некоректні дані' }, { status: 400 })
        }

        // 1. Шукаємо купон у базі
        const coupon = await prisma.coupon.findUnique({
            where: { code: code.toUpperCase() },
        })

        // 2. Перевіряємо, чи він дійсний
        if (!coupon || !coupon.isActive) {
            return NextResponse.json({ valid: false, error: 'Промокод не знайдено або він неактивний' }, { status: 400 })
        }
        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
            return NextResponse.json({ valid: false, error: 'Промокод прострочений' }, { status: 400 })
        }
        if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
            return NextResponse.json({ valid: false, error: 'Ліміт використань промокоду вичерпано' }, { status: 400 })
        }
        if (subtotal < coupon.minOrderAmount) {
            const min = (coupon.minOrderAmount / 100).toFixed(2)
            return NextResponse.json({ valid: false, error: `Мінімальне замовлення для цього коду: £${min}` }, { status: 400 })
        }

        // 3. Рахуємо знижку (все в пенсах)
        let discount = 0
        if (coupon.type === 'FIXED') {
            discount = Math.min(coupon.value, subtotal)
        } else if (coupon.type === 'PERCENT') {
            discount = Math.round(subtotal * (coupon.value / 100))
        }

        const message = coupon.type === 'FREE_DELIVERY' ? 'Безкоштовна доставка!' : `Знижка застосована!`

        // Віддаємо успішну відповідь
        return NextResponse.json({ valid: true, discount, type: coupon.type, message }, { status: 200 })
    } catch (error) {
        console.error('Coupon API Error:', error)
        return NextResponse.json({ valid: false, error: 'Помилка сервера' }, { status: 500 })
    }
}
