import prisma from '@/src/shared/lib/prisma'
import { formatPrice } from '@/src/lib/utils'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminMenuPage() {
    const restaurants = await prisma.restaurant.findMany({
        orderBy: { id: 'asc' },
        select: {
            id: true,
            name: true,
            _count: { select: { menuItems: true } },
        },
    })

    return (
        <div className="max-w-[1100px]">
            <h1 className="text-[28px] font-bold text-[#03081f] mb-1">Menu</h1>
            <p className="text-gray-500 mb-8">Manage menu items per restaurant.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {restaurants.map((r) => (
                    <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-[#03081f]">{r.name}</h3>
                        <p className="text-[13px] text-gray-500 mt-1">{r._count.menuItems} menu items</p>
                        <Link 
                        href={`/admin/menu/${r.id}`}
                        className="mt-4 text-[13px] font-bold text-[#fc8a06] hover:underline">Edit menu →</Link>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-5 bg-[#fc8a06]/5 border border-[#fc8a06]/20 rounded-2xl text-[14px] text-gray-600">
                🚧 <b>Наступний крок:</b> форма додати/редагувати позицію (react-hook-form + Zod) і кнопки видалення. API-роути: POST/PUT/DELETE <code>/api/admin/menu</code>.
            </div>
        </div>
    )
}
