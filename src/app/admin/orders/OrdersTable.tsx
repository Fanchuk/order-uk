'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { formatPrice } from '@/src/lib/utils'

const STATUSES = ['CONFIRMED', 'PREPARING', 'READY', 'ON_THE_WAY', 'DELIVERED'] as const
type Status = (typeof STATUSES)[number]

const STATUS_STYLES: Record<string, string> = {
    CONFIRMED: 'bg-blue-50 text-blue-600',
    PREPARING: 'bg-amber-50 text-amber-600',
    READY: 'bg-purple-50 text-purple-600',
    ON_THE_WAY: 'bg-orange-50 text-[#fc8a06]',
    DELIVERED: 'bg-green-50 text-[#028643]',
    CANCELLED: 'bg-red-50 text-red-500',
}

interface Order {
    id: number
    status: string
    total: number
    createdAt: string
    restaurant: { name: string }
    items: { name: string; quantity: number }[]
}

export default function OrdersTable({ orders: initialOrders }: { orders: Order[] }) {
    const [orders, setOrders] = useState(initialOrders)
    const [updatingId, setUpdatingId] = useState<number | null>(null)

    const handleStatusChange = async (orderId: number, newStatus: Status) => {
        setUpdatingId(orderId)
        const prev = orders
        setOrders((os) => os.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))

        try {
            const res = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })
            if (!res.ok) throw new Error('Failed')
            toast.success(`Order #${orderId} → ${newStatus}`)
        } catch {
            setOrders(prev)
            toast.error('Could not update status')
        } finally {
            setUpdatingId(null)
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 text-[13px] text-gray-500">
                            <th className="px-5 py-4 font-semibold">Order</th>
                            <th className="px-5 py-4 font-semibold">Restaurant</th>
                            <th className="px-5 py-4 font-semibold">Items</th>
                            <th className="px-5 py-4 font-semibold">Total</th>
                            <th className="px-5 py-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <td className="px-5 py-4">
                                    <span className="font-bold text-[#03081f]">#{o.id}</span>
                                    <div className="text-[12px] text-gray-400">{new Date(o.createdAt).toLocaleDateString('en-GB')}</div>
                                </td>
                                <td className="px-5 py-4 text-[14px] text-gray-700">{o.restaurant.name}</td>
                                <td className="px-5 py-4 text-[13px] text-gray-500 max-w-[220px]">{o.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}</td>
                                <td className="px-5 py-4 font-bold text-[#028643]">{formatPrice(o.total)}</td>
                                <td className="px-5 py-4">
                                    <select
                                        value={STATUSES.includes(o.status as Status) ? o.status : 'CONFIRMED'}
                                        disabled={updatingId === o.id}
                                        onChange={(e) => handleStatusChange(o.id, e.target.value as Status)}
                                        className={`text-[12px] font-bold px-3 py-1.5 rounded-full outline-none cursor-pointer disabled:opacity-50 ${STATUS_STYLES[o.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {STATUSES.map((s) => (
                                            <option key={s} value={s} className="bg-white text-black">
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
