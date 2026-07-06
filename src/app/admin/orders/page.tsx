import prisma from '@/src/shared/lib/prisma'
import OrdersTable from './OrdersTable'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            status: true,
            total: true,
            createdAt: true,
            couponCode: true,
            restaurant: { select: { name: true } },
            items: { select: { name: true, quantity: true } },
        },
    })

    const serialized = orders.map((o) => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
    }))

    return (
        <div className="max-w-[1100px]">
            <h1 className="text-[28px] font-bold text-[#03081f] mb-1">Orders</h1>
            <p className="text-gray-500 mb-8">{orders.length} orders total. Change status inline.</p>
            <OrdersTable orders={serialized} />
        </div>
    )
}
