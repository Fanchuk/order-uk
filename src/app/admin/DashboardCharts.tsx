'use client'

import { PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { formatPrice } from '@/src/lib/utils'

interface StatusDatum {
    name: string
    value: number
    color: string
}
interface RestaurantDatum {
    name: string
    orders: number
    revenue: number
}
interface RevenueDatum {
    day: string
    revenue: number
}

interface Props {
    statusData: StatusDatum[]
    restaurantData: RestaurantDatum[]
    revenueData: RevenueDatum[]
}

export default function DashboardCharts({ statusData, restaurantData, revenueData }: Props) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-[#03081f] mb-4">Orders by Status</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={2}>
                                {statusData.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number, name: string) => [`${value} orders`, name]} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-[#03081f] mb-4">Orders per Restaurant</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={restaurantData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} interval={0} angle={-15} textAnchor="end" height={50} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <Tooltip cursor={{ fill: '#fc8a0611' }} formatter={(value: number) => [`${value} orders`, 'Orders']} />
                            <Bar dataKey="orders" fill="#fc8a06" radius={[6, 6, 0, 0]} maxBarSize={48} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-[#03081f] mb-4">Revenue (last 7 days)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fc8a06" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#fc8a06" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} />
                        <YAxis tickFormatter={(v: number) => `£${(v / 100).toFixed(0)}`} tick={{ fontSize: 12, fill: '#6b7280' }} />
                        <Tooltip formatter={(value: number) => [formatPrice(value), 'Revenue']} />
                        <Area type="monotone" dataKey="revenue" stroke="#fc8a06" strokeWidth={2.5} fill="url(#revGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}