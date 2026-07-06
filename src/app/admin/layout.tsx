import type { Metadata } from 'next'
import AdminSidebar from './AdminSidebar'

export const metadata: Metadata = {
    title: 'Admin | Order.uk',
    robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-[#f4f5f7] font-sans">
            <AdminSidebar />
            <main className="flex-1 min-w-0 p-6 lg:p-10">{children}</main>
        </div>
    )
}
