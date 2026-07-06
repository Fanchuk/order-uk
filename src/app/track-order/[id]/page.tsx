import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Receipt, Clock } from 'lucide-react'
import prisma from '@/src/shared/lib/prisma'
import { formatPrice } from '@/src/lib/utils'
import OrderStatusStepper from '@/src/features/track-order/OrderStatusStepper'

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    return { title: id === 'demo' ? 'Track Order #DEMO' : `Track Order #${id.padStart(6, '0')}` }
}

type OrderStatus = 'CONFIRMED' | 'PREPARING' | 'READY' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED'

const STATUS_INFO: Record<OrderStatus, { label: string; description: string; color: string }> = {
    CONFIRMED: { label: 'Order Confirmed', description: 'Your order has been received', color: '#028643' },
    PREPARING: { label: 'Preparing', description: 'Kitchen is cooking your food', color: '#fc8a06' },
    READY: { label: 'Ready to Pick Up', description: 'Packed and ready for delivery', color: '#8b5cf6' },
    ON_THE_WAY: { label: 'On the Way', description: 'Courier is heading to you', color: '#3b82f6' },
    DELIVERED: { label: 'Delivered! 🎉', description: 'Enjoy your meal!', color: '#028643' },
    CANCELLED: { label: 'Cancelled', description: 'This order was cancelled', color: '#ef4444' },
}

async function getOrder(numericId: number) {
    const order = await prisma.order.findUnique({
        where: { id: numericId },
        include: {
            restaurant: { select: { name: true, logoPath: true, deliveryTimeMinutes: true } },
            address: true,
            items: {
                include: {
                    menuItem: { select: { imagePath: true } },
                },
            },
        },
    })

    if (!order) return null

    return {
        id: order.id,
        status: order.status as OrderStatus,
        restaurantName: order.restaurant.name,
        restaurantLogo: order.restaurant.logoPath,
        estimatedMinutes: order.restaurant.deliveryTimeMinutes,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        discount: order.discount,
        couponCode: order.couponCode,
        total: order.total,
        notes: order.notes,
        address: order.address ? `${order.address.line1}${order.address.line2 ? `, ${order.address.line2}` : ''}, ${order.address.city}, ${order.address.postcode}` : 'Address not provided',
        items: order.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imagePath: item.menuItem.imagePath,
        })),
    }
}

async function getDemoOrder() {
    const realOrder = await prisma.order.findFirst({
        orderBy: { createdAt: 'desc' },
        include: {
            restaurant: { select: { name: true, logoPath: true, deliveryTimeMinutes: true } },
            address: true,
            items: { include: { menuItem: { select: { imagePath: true } } } },
        },
    })

    if (realOrder) {
        return {
            id: realOrder.id,
            status: realOrder.status as OrderStatus,
            restaurantName: realOrder.restaurant.name,
            restaurantLogo: realOrder.restaurant.logoPath,
            estimatedMinutes: realOrder.restaurant.deliveryTimeMinutes,
            subtotal: realOrder.subtotal,
            deliveryFee: realOrder.deliveryFee,
            discount: realOrder.discount,
            couponCode: realOrder.couponCode,
            total: realOrder.total,
            notes: realOrder.notes || 'This is a demo view of a real order from the database.',
            address: realOrder.address ? `${realOrder.address.line1}, ${realOrder.address.city}, ${realOrder.address.postcode}` : '42 Baker Street, London, NW1 6XE',
            items: realOrder.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imagePath: item.menuItem.imagePath,
            })),
            isDemo: true,
        }
    }

    const restaurant = await prisma.restaurant.findFirst({ orderBy: { id: 'asc' } })
    return {
        id: 0,
        status: 'PREPARING' as OrderStatus,
        restaurantName: restaurant?.name || "McDonald's London",
        restaurantLogo: restaurant?.logoPath || '/mcdonalds.png',
        estimatedMinutes: restaurant?.deliveryTimeMinutes || '20-30',
        subtotal: 417,
        deliveryFee: 250,
        discount: 0,
        couponCode: null,
        total: 667,
        notes: 'This is a placeholder demo order — run `npx prisma db seed` to see real data.',
        address: '42 Baker Street, London, NW1 6XE',
        items: [
            { id: -1, name: 'Big Mac Combo', price: 199, quantity: 1, imagePath: '/burger_double.jpg' },
            { id: -2, name: 'Nuggets 6 pcs', price: 89, quantity: 2, imagePath: '/chicken_nuggets.jpg' },
            { id: -3, name: 'Coca-Cola 0.5L', price: 40, quantity: 1, imagePath: '/drink_cola.jpg' },
        ],
        isDemo: true,
    }
}

export default async function TrackOrderPage({ params }: PageProps) {
    const { id } = await params

    let order: Awaited<ReturnType<typeof getOrder>> | Awaited<ReturnType<typeof getDemoOrder>> | null

    if (id === 'demo') {
        order = await getDemoOrder()
    } else {
        const numericId = parseInt(id, 10)
        if (isNaN(numericId)) {
            notFound()
        }
        order = await getOrder(numericId)
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                    <p className="text-gray-500 mb-6">
                        We couldn't find an order with ID <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">#{id}</code>
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/track-order/demo" className="px-6 py-3 bg-[#fc8a06] text-white rounded-full font-bold hover:bg-orange-600 transition-colors">
                            View Demo Order
                        </Link>
                        <Link href="/" className="px-6 py-3 bg-[#03081f] text-white rounded-full font-bold hover:bg-black transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const statusInfo = STATUS_INFO[order.status]

    return (
        <div className="min-h-screen bg-[#f8f9fa] pb-16 font-sans">
            <div className="max-w-[860px] mx-auto px-4 lg:px-8 py-8">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#fc8a06] transition-colors mb-6 text-sm font-medium">
                    <ArrowLeft size={18} /> Back to Home
                </Link>

                <div className="bg-[#03081f] rounded-3xl p-6 lg:p-8 text-white mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#fc8a06]/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-4">
                            <div className="w-[56px] h-[56px] rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-md">
                                <div className="relative w-full h-full">
                                    <Image src={order.restaurantLogo || '/placeholder.jpg'} alt={order.restaurantName} fill unoptimized className="object-contain" />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-mono">Order #{order.id === 0 ? 'DEMO' : String(order.id).padStart(6, '0')}</p>
                                <h1 className="text-xl font-bold">{order.restaurantName}</h1>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: statusInfo.color }} />
                                    <span className="text-sm" style={{ color: statusInfo.color }}>
                                        {statusInfo.label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-400">Estimated delivery</p>
                            <p className="text-2xl font-black" style={{ color: '#fc8a06' }}>
                                <Clock size={18} className="inline mr-1 mb-0.5" />
                                {order.estimatedMinutes} min
                            </p>
                        </div>
                    </div>
                </div>

                {order.status !== 'CANCELLED' && (
                    <OrderStatusStepper
                        currentStatus={order.status}
                        estimatedMinutes={order.estimatedMinutes}
                        orderId={order.id || undefined}
                        isDemo={'isDemo' in order ? Boolean(order.isDemo) : false}
                    />
                )}

                {order.status === 'CANCELLED' && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                        <p className="text-red-600 font-bold text-lg">❌ This order was cancelled</p>
                    </div>
                )}

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-6">
                    <h2 className="flex items-center gap-2 font-bold text-[#03081f] mb-4 text-[16px]">
                        <MapPin size={18} className="text-[#fc8a06]" /> Delivery Address
                    </h2>
                    <p className="text-gray-600 text-[15px]">{order.address}</p>
                    {order.notes && (
                        <p className="mt-3 text-sm text-[#fc8a06] bg-[#fc8a06]/10 p-3 rounded-xl border border-[#fc8a06]/20">
                            <strong>Note:</strong> {order.notes}
                        </p>
                    )}
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-6">
                    <h2 className="flex items-center gap-2 font-bold text-[#03081f] mb-5 text-[16px]">
                        <Receipt size={18} className="text-[#fc8a06]" /> Order Summary
                    </h2>

                    <div className="flex flex-col gap-3 mb-5">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-[40px] h-[40px] rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                        <Image src={item.imagePath || '/placeholder.jpg'} alt={item.name} fill unoptimized className="object-cover" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-[26px] h-[26px] bg-[#fc8a06] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{item.quantity}×</span>
                                        <span className="text-[#03081f] font-medium text-[14px]">{item.name}</span>
                                    </div>
                                </div>
                                <span className="font-bold text-[#03081f] shrink-0">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-dashed border-gray-100 pt-4 flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Delivery</span>
                            <span>{order.deliveryFee === 0 ? 'Free 🎉' : formatPrice(order.deliveryFee)}</span>
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between text-red-500 font-medium">
                                <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                                <span>-{formatPrice(order.discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-1">
                            <span className="font-bold text-base text-[#03081f]">Total</span>
                            <span className="font-black text-2xl text-[#028643]">{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8 flex-wrap">
                    <Link
                        href="/restaurants"
                        className="flex-1 min-w-[200px] h-[52px] bg-[#03081f] text-white rounded-full flex items-center justify-center gap-2 font-bold hover:bg-black transition-colors">
                        Order Again
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 min-w-[200px] h-[52px] border-2 border-[#03081f] text-[#03081f] rounded-full flex items-center justify-center gap-2 font-bold hover:bg-gray-50 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
