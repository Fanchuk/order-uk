'use client'

import Image from 'next/image'
import { X } from 'lucide-react'

const SOCIAL_DATA = [
    {
        name: 'Facebook',
        icon: '/social-facebook.png',
        url: 'https://facebook.com',
        handle: '@OrderUK',
        followers: '24K followers',
        description: 'Follow us for daily deals, restaurant features, and community stories.',
    },
    {
        name: 'Instagram',
        icon: '/social-instagram.png',
        url: 'https://instagram.com',
        handle: '@order.uk',
        followers: '18K followers',
        description: 'Beautiful food photography, behind-the-scenes, and exclusive reels.',
    },
    {
        name: 'TikTok',
        icon: '/social-tiktok.png',
        url: 'https://tiktok.com',
        handle: '@orderuk',
        followers: '52K followers',
        description: 'Food challenges, restaurant tours, and fun delivery content.',
    },
    {
        name: 'Snapchat',
        icon: '/social-snapchat.png',
        url: 'https://snapchat.com',
        handle: 'orderuk',
        followers: '8K subscribers',
        description: 'Snap stories about our latest dishes and flash deals.',
    },
]

interface Props {
    onClose: () => void
}

export default function SocialModal({ onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-[520px] w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="font-bold text-[18px] text-[#03081f]">🌐 Follow Order.UK</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-3">
                    {SOCIAL_DATA.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">
                            <div className="w-[44px] h-[44px] rounded-xl overflow-hidden shrink-0">
                                <Image 
                                src={social.icon} 
                                alt={social.name} 
                                width={44} 
                                height={44} 
                                unoptimized />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-[15px] text-[#03081f]">{social.name}</span>
                                    <span className="text-xs text-gray-400">{social.handle}</span>
                                </div>
                                <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1">{social.description}</p>
                            </div>

                            <div className="text-right shrink-0">
                                <span className="text-xs font-bold text-gray-400">{social.followers}</span>
                                <div className="text-[11px] text-[#fc8a06] font-medium mt-0.5 group-hover:underline">Follow →</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
