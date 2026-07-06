import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.neon.tech',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    async rewrites() {
        return []
    },
    // ✅ Винесли з experimental назовні
    serverExternalPackages: ['@prisma/client'],
}

export default nextConfig
