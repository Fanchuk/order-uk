'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { SOCIAL_ICONS } from '@/src/shared/lib/constants/footer'

interface Props {
    onOpenSocial: () => void
    onOpenPrivacy: () => void
}

export default function FooterSubscribe({ onOpenSocial, onOpenPrivacy }: Props) {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubscribe = async () => {
        if (!email) {
            toast.error('Please enter your email address.')
            return
        }
        if (!email.includes('@') || !email.includes('.')) {
            toast.error('Please enter a valid email.')
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to subscribe')
            toast.success('Successfully subscribed! 📧🎊')
            setEmail('')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <h3 className="text-[18px] font-bold text-[#03081f]">Get Exclusive Deals in your Inbox</h3>

            <div className="flex items-center rounded-full overflow-hidden w-full max-w-[450px] h-[59px] bg-[#d9d9d9]">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    disabled={isLoading}
                    placeholder="youremail@gmail.com"
                    className="flex-1 bg-transparent outline-none pl-6 pr-4 text-[14px] text-black placeholder:text-gray-500 h-full min-w-0"
                />
                <button
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    className="shrink-0 rounded-full text-white font-semibold text-[15px] hover:opacity-90 transition-opacity h-full px-8 disabled:opacity-50"
                    style={{ background: '#fc8a06' }}>
                    {isLoading ? 'Wait...' : 'Subscribe'}
                </button>
            </div>

            <p className="text-[13px] text-black">
                we won’t spam, read our{' '}
                <button onClick={onOpenPrivacy} className="underline text-black hover:text-[#fc8a06] transition-colors">
                    email policy
                </button>
            </p>

            <div className="flex items-center gap-3 flex-wrap">
                {SOCIAL_ICONS.map((icon) => (
                    <button 
                    key={icon.alt} 
                    onClick={onOpenSocial} 
                    className="hover:opacity-80 hover:scale-110 transition-all duration-200">
                        <Image 
                        src={icon.src} 
                        alt={icon.alt} 
                        width={45} 
                        height={45} 
                        unoptimized />
                    </button>
                ))}
            </div>
        </div>
    )
}
