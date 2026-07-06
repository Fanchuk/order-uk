import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { headers } from 'next/headers'
import Header from '@/src/components/shared/Header'
import Footer from '../components/shared/footer/Footer'
import Providers from './providers'
import './globals.css'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        default: 'Order.uk — Fast Food Delivery',
        template: '%s | Order.uk',
    },
    description: 'Order restaurant food delivered to your door.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headersList = await headers()
    const pathname = headersList.get('x-pathname') || ''
    const isAdmin = pathname.startsWith('/admin')

    return (
        <html lang="uk" className={`${poppins.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col font-sans bg-[#FAFAFA]" style={{ fontFamily: 'var(--font-poppins)' }}>
                {!isAdmin && <Header />}

                <Providers>
                    <main className="flex-1">{children}</main>
                </Providers>

                {!isAdmin && <Footer />}
            </body>
        </html>
    )
}
