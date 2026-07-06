import { NextResponse } from 'next/server'
import prisma from '@/src/shared/lib/prisma'

const DELIVERY_FEE = 250
const MINIMUM_ORDER = 2000

interface CheckoutItem {
    menuItemId: number
    name: string
    price: number
    qty: number
}

export async function POST(request: Request) {
    const userId = 'user-customer-1'

    try {
        const body = await request.json()
        const { restaurantId, addressId, items, couponCode, notes } = body as {
            restaurantId: number
            addressId?: number
            items: CheckoutItem[]
            couponCode?: string
            notes?: string
        }

        if (!items || items.length === 0) {
            return NextResponse.json({ success: false, error: 'Кошик порожній' }, { status: 400 })
        }

        const missingMenuItemId = items.find((item) => !item.menuItemId)
        if (missingMenuItemId) {
            return NextResponse.json({ success: false, error: `Item "${missingMenuItemId.name}" missing menuItemId` }, { status: 400 })
        }

        const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

        if (subtotal < MINIMUM_ORDER) {
            return NextResponse.json({ success: false, error: 'Не досягнуто мінімальної суми замовлення' }, { status: 400 })
        }

        let discount = 0
        let currentDeliveryFee = DELIVERY_FEE

        if (couponCode) {
            const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } })

            const isCouponValid = coupon && (coupon.maxUses === null || coupon.usedCount < coupon.maxUses)

            if (isCouponValid && coupon) {
                if (subtotal < coupon.minOrderAmount) {
                    return NextResponse.json({ success: false, error: `Coupon requires a minimum order of £${(coupon.minOrderAmount / 100).toFixed(2)}` }, { status: 400 })
                }
                if (coupon.type === 'FIXED') discount = Math.min(coupon.value, subtotal)
                else if (coupon.type === 'PERCENT') discount = Math.round(subtotal * (coupon.value / 100))
                else if (coupon.type === 'FREE_DELIVERY') currentDeliveryFee = 0
            }
        }

        const total = subtotal - discount + currentDeliveryFee

        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    restaurantId,
                    addressId,
                    subtotal,
                    deliveryFee: currentDeliveryFee,
                    discount,
                    total,
                    couponCode,
                    notes,
                    status: 'CONFIRMED',
                    items: {
                        create: items.map((item) => ({
                            menuItemId: item.menuItemId,
                            name: item.name,
                            price: item.price,
                            quantity: item.qty,
                        })),
                    },
                },
            })

            if (couponCode) {
                await tx.coupon.update({
                    where: { code: couponCode },
                    data: { usedCount: { increment: 1 } },
                })
            }

            return newOrder
        })

        return NextResponse.json({ success: true, orderId: order.id }, { status: 201 })
    } catch (error) {
        console.error('Checkout API Error:', error)
        return NextResponse.json({ success: false, error: 'Не вдалося створити замовлення' }, { status: 500 })
    }
}
