'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { ABOUT_TABS, HOW_IT_WORKS, STATS } from '@/src/shared/lib/constants/aboutUs'
import { FAQ_DATA, TAB_CONTENT } from '@/src/shared/lib/constants/aboutUsContent'

function FAQModal({ question, answer, onClose }: { question: string; answer: string; onClose: () => void }) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-[560px] w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between p-6 border-b border-gray-100 gap-4">
                    <h2 className="font-bold text-[16px] text-[#03081f] leading-snug">{question}</h2>
                    <button onClick={onClose} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <X size={16} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="text-[14px] text-gray-600 leading-relaxed">
                        {answer.split('\n').map((line, i) => (
                            <p key={i} className={`mb-2 ${line.startsWith('**') && line.endsWith('**') ? 'font-bold text-[#03081f] text-[15px] mt-3' : ''}`}>
                                {line.replace(/\*\*/g, '')}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function AboutUs() {
    const [activeTab, setActiveTab] = useState(ABOUT_TABS[0])
    const [activeFAQ, setActiveFAQ] = useState<typeof FAQ_DATA[0] | null>(null)

    useEffect(() => {
        document.body.style.overflow = activeFAQ ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [activeFAQ])

    return (
        <>
            <section className="w-full mx-auto max-w-[1528px] mt-12 lg:mt-16 font-sans select-none flex flex-col gap-0 px-4 lg:px-0">

                <div className="hidden lg:flex items-center justify-between mb-10">
                    <h2 className="text-[32px] font-bold text-black tracking-tight">Know more about us!</h2>
                    <ul className="flex items-center gap-8">
                        {ABOUT_TABS.map((tab) => (
                            <li
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`cursor-pointer text-[16px] font-medium transition-all duration-200 ${
                                    activeTab === tab
                                        ? 'border border-[#fc8a06] text-black rounded-[120px] px-6 py-3 bg-[#fc8a06]/5'
                                        : 'text-black hover:text-[#fc8a06]'
                                }`}>
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>

                <h2 className="lg:hidden text-[22px] font-bold text-black tracking-tight mb-6 text-center">Know more about us!</h2>

                <div className="lg:hidden flex flex-col gap-4 mb-6">
                    <Link
                        href="/how-it-works"
                        className="w-full h-[52px] rounded-[120px] text-white font-bold text-[14px] px-6 flex items-center hover:opacity-90 transition-all shadow-md"
                        style={{ background: '#fc8a06' }}>
                        How does Order.UK work?
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                    <div className="flex flex-col gap-4">
                        {FAQ_DATA.map((item) => (
                            <button
                                key={item.question}
                                onClick={() => setActiveFAQ(item)}
                                className="cursor-pointer text-[14px] font-bold text-black text-center leading-snug transition-colors hover:text-[#fc8a06]">
                                {item.question}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:hidden w-full rounded-[12px] p-4 flex flex-col gap-4 mb-4" style={{ background: '#03081f' }}>
                    {HOW_IT_WORKS.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-3 rounded-[12px] px-4 py-6" style={{ background: '#d9d9d9' }}>
                            <h3 className="text-[14px] font-bold text-black text-center">{step.title}</h3>
                            <div className="w-[128px] h-[128px] relative shrink-0">
                                <Image src={step.image} alt={step.title} fill unoptimized className="object-contain" />
                            </div>
                            <p className="text-[12px] text-black text-center font-medium leading-snug">{step.description}</p>
                        </div>
                    ))}
                    <p className="text-[12px] text-white text-center font-normal leading-relaxed px-2 mt-2">
                        Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your
                        doorstep in no time!
                    </p>
                </div>

                <div className="hidden lg:block w-full rounded-[12px] bg-white p-10 mb-6" style={{ minHeight: '526px' }}>
                    <div className="flex gap-12 h-full">
                        <div className="flex flex-col gap-6 w-[380px] shrink-0">
                            <Link
                                href="/how-it-works"
                                className="w-[346px] h-[62px] rounded-[120px] text-white font-bold text-[16px] px-8 flex items-center justify-between hover:bg-orange-600 transition-all shadow-md hover:scale-105"
                                style={{ background: '#fc8a06' }}>
                                How does Order.UK work?
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                            <ul className="flex flex-col gap-5">
                                {FAQ_DATA.map((item) => (
                                    <li key={item.question}>
                                        <button
                                            onClick={() => {
                                                setActiveTab('Frequent Questions')
                                                setActiveFAQ(item)
                                            }}
                                            className="cursor-pointer text-[16px] font-bold text-black leading-snug transition-colors hover:text-[#fc8a06] text-left w-full">
                                            {item.question}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6 flex-1">
                            {activeTab === 'Frequent Questions' ? (
                                <div className="grid grid-cols-3 gap-6">
                                    {HOW_IT_WORKS.map((step) => (
                                        <div key={step.id} className="flex flex-col items-center justify-center gap-3 rounded-[12px] px-4 py-6" style={{ background: '#d9d9d9', minHeight: '285px' }}>
                                            <h3 className="text-[16px] font-bold text-black text-center">{step.title}</h3>
                                            <div className="w-[128px] h-[128px] relative shrink-0">
                                                <Image src={step.image} alt={step.title} fill unoptimized className="object-contain" />
                                            </div>
                                            <p className="text-[13px] text-black text-center font-medium leading-snug">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                TAB_CONTENT[activeTab]
                            )}

                            {activeTab === 'Frequent Questions' && (
                                <p className="text-[14px] text-black text-center font-normal leading-relaxed max-w-[640px] mx-auto">
                                    Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favourite dishes, and proceed to checkout. Your delicious meal will be on its way
                                    to your doorstep in no time!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:hidden w-full rounded-[12px] flex flex-col items-center py-6 px-4" style={{ background: '#fc8a06' }}>
                    {STATS.map((stat, index) => (
                        <div key={stat.label} className="flex flex-col items-center w-full">
                            <div className="flex flex-col items-center py-5">
                                <span className="text-white" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 300, fontSize: '56px', lineHeight: 1 }}>
                                    {stat.value}
                                </span>
                                <span className="text-white mt-1" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 700, fontSize: '18px' }}>
                                    {stat.label}
                                </span>
                            </div>
                            {index < STATS.length - 1 && <div className="w-full h-px bg-white/30" />}
                        </div>
                    ))}
                </div>

                <div className="hidden lg:flex w-full rounded-[12px] items-center justify-around px-12" style={{ background: '#fc8a06', height: '158px' }}>
                    {STATS.map((stat, index) => (
                        <div key={stat.label} className="flex items-center gap-8">
                            <div className="flex flex-col items-center text-center">
                                <span className="text-white" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 300, fontSize: '64px', lineHeight: 0.59, marginBottom: '12px' }}>
                                    {stat.value}
                                </span>
                                <span className="text-white" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 700, fontSize: '24px' }}>
                                    {stat.label}
                                </span>
                            </div>
                            {index < STATS.length - 1 && <div className="w-px h-16 bg-white/30" />}
                        </div>
                    ))}
                </div>
            </section>

            {activeFAQ && (
                <FAQModal
                    question={activeFAQ.question}
                    answer={activeFAQ.answer}
                    onClose={() => setActiveFAQ(null)}
                />
            )}
        </>
    )
}