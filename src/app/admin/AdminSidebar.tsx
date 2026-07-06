'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, ClipboardList, UtensilsCrossed, LogOut } from 'lucide-react'

const NAV = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ClipboardList },
    { name: 'Menu', href: '/admin/menu', icon: UtensilsCrossed },
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()
 
    const handleLogout = async () => { 
        await fetch('/api/admin/login', { method: 'DELETE' })
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <aside className="w-[240px] shrink-0 bg-[#03081f] text-white flex flex-col p-5 sticky top-0 h-screen">
            <div className="px-2 mb-8">
                <span className="text-[22px] font-black">
                    Order<span className="text-[#fc8a06]">.uk</span>
                </span>
                <p className="text-gray-500 text-[12px] mt-0.5">Admin Panel</p>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                {NAV.map((item) => {
                    const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 h-[46px] rounded-xl text-[15px] font-medium transition-colors
                                ${isActive ? 'bg-[#fc8a06] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                            <Icon size={19} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <button onClick={handleLogout} className="flex items-center gap-3 px-4 h-[46px] rounded-xl text-[15px] font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                <LogOut size={19} />
                Log out
            </button>
        </aside>
    )
}