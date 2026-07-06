'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Lock } from "lucide-react"

export default function AdminLoginPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [isPending, setIsPending] = useState(false)

    const handleLogin = async () => {
        if (!password) return
        setIsPending(true)

        try {
            const res = await fetch('/api/admin/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        })

        if (!res.ok) {
            toast.error('Wrong password')
            return
        }

        toast.success('Welcome, Admin!')
        router.push('/admin')
        router.refresh()
        } catch {
            toast.error('Something went wrong')
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#03081f] font-sans px-4">
            <div className="w-full max-w-[400px] bg-[#0b1230] border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#fc8a06]/20 flex items-center justify-center mb-4">
                        <Lock className="text-[#fc8a06]" size={26} />
                    </div>
                    <h1 className="text-white font-bold text-[24px]">Admin Panel</h1>
                    <p className="text-gray-400 text-[14px] mt-1">Order.uk management</p>
                </div>

                <label className="text-gray-300 text-[13px] font-medium ml-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="••••••••"
                    className="w-full h-[52px] mt-1.5 bg-white/5 border border-white/10 rounded-xl px-4 text-white outline-none focus:border-[#fc8a06] transition-colors"
                    autoFocus
                />

                <button
                    onClick={handleLogin}
                    disabled={isPending}
                    className="w-full h-[52px] mt-5 bg-[#fc8a06] text-white font-bold rounded-xl hover:bg-[#e07a05] transition-colors disabled:opacity-50">
                    {isPending ? 'Signing in...' : 'Sign In'}
                </button>
            </div>
        </div>
    )
}


