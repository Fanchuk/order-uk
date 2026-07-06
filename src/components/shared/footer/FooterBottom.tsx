'use client'

import { toast } from 'sonner'

const BOTTOM_LINKS = [
    'Privacy Policy',
    'Terms',
    'Pricing',
    'Do not sell or share my personal information',
]
interface Props {
    onOpenPrivacy: () => void
    onOpenTerms: () => void
}
export default function FooterBottom({ onOpenPrivacy, onOpenTerms }: Props) {
    const handleClick = (link: string) => {
        if (link === 'Privacy Policy') onOpenPrivacy()
        else if (link === 'Terms') onOpenTerms()
        else toast.info(`${link} page coming soon.`)
    }
    return (
        <div className="w-full flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 gap-4 py-6 lg:py-0 bg-[#03081f] min-h-[73px] flex-wrap">
            <p className="text-[13px] lg:text-[15px] text-white font-normal text-center lg:text-left">
                Order.uk Copyright 2024, All Rights Reserved.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
                {BOTTOM_LINKS.map((link) => (
                    <li key={link}>
                        <button
                            onClick={() => handleClick(link)}
                            className="text-[13px] lg:text-[15px] text-white font-normal hover:text-[#fc8a06] transition-colors whitespace-nowrap"
                        >
                            {link}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}