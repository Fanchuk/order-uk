import prisma from '@/src/shared/lib/prisma'
import { formatPrice } from '@/src/lib/utils'
import { ClipboardList, PackageCheck, XCircle, PoundSterling } from 'lucide-react'
import DashboardCharts from './DashboardCharts'

export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<string, string> = {
    CONFIRMED: '#3b82f6',
    PREPARING: '#f59e0b',
    READY: '#8b5cf6',
    ON_THE_WAY: '#fc8a06',
    DELIVERED: '#028643',
    CANCELLED: '#ef4444',
}

export default async function AdminDashboardPage() {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 6)
    weekAgo.setHours(0, 0, 0, 0)

    const [agg, byStatus, byRestaurant, restaurants, weekOrders] = await Promise.all([
        prisma.order.aggregate({ _count: true, _sum: { total: true } }),
        prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
        prisma.order.groupBy({ by: ['restaurantId'], _count: { _all: true }, _sum: { total: true } }),
        prisma.restaurant.findMany({ select: { id: true, name: true } }),
        prisma.order.findMany({
            where: { createdAt: { gte: weekAgo } },
            select: { createdAt: true, total: true },
        }),
    ])

    const totalOrders = agg._count
    const totalRevenue = agg._sum.total ?? 0
    const deliveredCount = byStatus.find((s) => s.status === 'DELIVERED')?._count._all ?? 0
    const cancelledCount = byStatus.find((s) => s.status === 'CANCELLED')?._count._all ?? 0

    const cards = [
        { label: 'Total Orders', value: String(totalOrders), icon: ClipboardList, color: '#fc8a06' },
        { label: 'Delivered', value: String(deliveredCount), icon: PackageCheck, color: '#028643' },
        { label: 'Cancelled', value: String(cancelledCount), icon: XCircle, color: '#ef4444' },
        { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: PoundSterling, color: '#3b82f6' },
    ]

    const statusData = byStatus.map((s) => ({
        name: s.status,
        value: s._count._all,
        color: STATUS_COLORS[s.status] ?? '#9ca3af',
    }))

    const nameById = new Map(restaurants.map((r) => [r.id, r.name]))
    const restaurantData = byRestaurant.map((r) => ({
        name: nameById.get(r.restaurantId) ?? `#${r.restaurantId}`,
        orders: r._count._all,
        revenue: r._sum.total ?? 0,
    }))

    const days: { day: string; revenue: number }[] = []
    for (let i = 0; i < 7; i++) {
        const d = new Date(weekAgo)
        d.setDate(weekAgo.getDate() + i)
        days.push({ day: d.toLocaleDateString('en-GB', { weekday: 'short' }), revenue: 0 })
    }
    weekOrders.forEach((o) => {
        const idx = Math.floor((o.createdAt.getTime() - weekAgo.getTime()) / (1000 * 60 * 60 * 24))
        if (idx >= 0 && idx < 7) days[idx].revenue += o.total
    })

    return (
        <div className="max-w-[1200px]">
            <h1 className="text-[28px] font-bold text-[#03081f] mb-1">Dashboard</h1>
            <p className="text-gray-500 mb-8">Overview of your delivery platform.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                {cards.map((c) => {
                    const Icon = c.icon
                    return (
                        <div key={c.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${c.color}1a` }}>
                                <Icon size={22} style={{ color: c.color }} />
                            </div>
                            <div className="text-[26px] font-black text-[#03081f]">{c.value}</div>
                            <div className="text-[13px] text-gray-500 mt-0.5">{c.label}</div>
                        </div>
                    )
                })}
            </div>

            <DashboardCharts statusData={statusData} restaurantData={restaurantData} revenueData={days} />
        </div>
    )
}
