'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

interface AuthModalProps {
    onClose: () => void
}

export default function AuthModal({ onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email || !password) {
            toast.error('Please fill in all fields to continue.')
            return
        }

        toast.success(isLogin ? "Successfully logged in!" : "Account successfully created!")
        onClose()
    }

    return (
        <div onClick={onClose} className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans cursor-pointer">
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[500px] bg-white rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col p-6 md:p-12 cursor-default">
                
                {/* Хрестик заховано всередину на мобільних (top-4 right-4) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:-top-6 md:-right-6 w-[40px] h-[40px] md:w-[56px] md:h-[56px] bg-[#fc8a06] rounded-full flex items-center justify-center z-50 hover:scale-105 transition-transform shadow-lg">
                    <Image src="/icon-close-white.svg" alt="Close" width={24} height={24} unoptimized className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]" />
                </button>

                <div className="flex justify-center mb-6 md:mb-8">
                    <Image src="/logo.svg" alt="Order.uk" width={140} height={40} className="h-auto md:w-[160px]" priority />
                </div>

                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-[26px] md:text-[32px] font-bold text-[#03081f] mb-2" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-[#03081f] opacity-70 text-[14px] md:text-[16px]">
                        {isLogin ? 'Sign in to access your saved orders.' : 'Sign up to start ordering fresh food.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[13px] md:text-[14px] font-bold text-[#03081f] ml-1">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="eg. you@example.com"
                            className="w-full h-[52px] md:h-[58px] bg-[#efefef] rounded-[8px] px-4 md:px-5 text-[15px] md:text-[16px] text-black font-medium outline-none focus:ring-2 focus:ring-[#fc8a06] transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-[13px] md:text-[14px] font-bold text-[#03081f]">Password</label>
                            {isLogin && (
                                <span className="text-[12px] md:text-[13px] font-bold text-[#fc8a06] hover:underline cursor-pointer">Forgot password?</span>
                            )}
                        </div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-[52px] md:h-[58px] bg-[#efefef] rounded-[8px] px-4 md:px-5 text-[15px] md:text-[16px] text-black font-medium outline-none focus:ring-2 focus:ring-[#fc8a06] transition-all"
                        />
                    </div>

                    <button type="submit" className="w-full h-[54px] md:h-[60px] bg-[#03081f] text-white font-bold text-[18px] md:text-[20px] rounded-[8px] hover:bg-black transition-colors mt-2 md:mt-4 shadow-md">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="flex items-center gap-4 w-full my-6 md:my-8">
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                    <span className="font-medium text-[13px] md:text-[14px] text-gray-400">or continue with</span>
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                </div>

                <div className="flex flex-col gap-3">
                    <button className="w-full h-[52px] md:h-[58px] bg-white border border-[#cfcfcf] rounded-[8px] flex items-center justify-center gap-3 text-[#03081f] font-bold text-[15px] md:text-[16px] hover:bg-gray-50 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[24px] md:h-[24px]">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>
                </div>

                <div className="mt-6 md:mt-8 text-center">
                    <span className="text-[#03081f] text-[14px] md:text-[15px] mr-1.5">
                        {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
                    </span>
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-bold text-[#fc8a06] text-[14px] md:text-[15px] hover:underline"
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    )
}