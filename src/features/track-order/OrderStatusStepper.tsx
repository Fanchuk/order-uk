'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, ChefHat, Package, Bike, PartyPopper, ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react'

type OrderStatus = 'CONFIRMED' | 'PREPARING' | 'READY' | 'ON_THE_WAY' | 'DELIVERED'

const STEPS = [
    { status: 'CONFIRMED' as OrderStatus, label: 'Confirmed', description: 'Order received', icon: <CheckCircle size={20} /> },
    { status: 'PREPARING' as OrderStatus, label: 'Preparing', description: 'Kitchen is cooking', icon: <ChefHat size={20} /> },
    { status: 'READY' as OrderStatus, label: 'Ready', description: 'Packed & ready', icon: <Package size={20} /> },
    { status: 'ON_THE_WAY' as OrderStatus, label: 'On the Way', description: 'Courier en route', icon: <Bike size={20} /> },
    { status: 'DELIVERED' as OrderStatus, label: 'Delivered', description: 'Enjoy your meal!', icon: <PartyPopper size={20} /> },
]

interface Props {
    currentStatus: OrderStatus
    estimatedMinutes: string
    orderId?: number
    isDemo?: boolean
}

export default function OrderStatusStepper({ currentStatus, estimatedMinutes, orderId, isDemo = false }: Props) {
    const [status, setStatus] = useState<OrderStatus>(currentStatus)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setStatus(currentStatus)
        setIsPlaying(false)
    }, [currentStatus])

    const currentIndex = STEPS.findIndex((s) => s.status === status)
    const progressPercent = (currentIndex / (STEPS.length - 1)) * 100
    const activeStep = STEPS[currentIndex]

    const isFirst = currentIndex === 0
    const isLast = currentIndex === STEPS.length - 1

    const updateStatus = useCallback(
        async (newStatus: OrderStatus) => {
            setStatus(newStatus)

            if (isDemo || !orderId) return

            try {
                setIsLoading(true)
                await fetch(`/api/orders/${orderId}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus }),
                })
            } catch {
                console.error('Failed to update status')
            } finally {
                setIsLoading(false)
            }
        },
        [orderId, isDemo],
    )

    const handleNext = () => {
        if (isLast) return
        updateStatus(STEPS[currentIndex + 1].status)
    }

    const handlePrev = () => {
        if (isFirst) return
        updateStatus(STEPS[currentIndex - 1].status)
    }

    useEffect(() => {
        if (!isPlaying) return
        if (isLast) {
            setIsPlaying(false)
            return
        }
        const timer = setTimeout(() => {
            updateStatus(STEPS[currentIndex + 1].status)
        }, 2000)
        return () => clearTimeout(timer)
    }, [isPlaying, currentIndex, isLast, updateStatus])

    return (
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-sm">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1.5 rounded-full text-sm font-bold mb-3">
                    <span className={`w-2 h-2 bg-brand-orange rounded-full ${!isLast ? 'animate-pulse' : ''}`} />
                    {status === 'DELIVERED' ? 'Completed' : `Arriving in ~${estimatedMinutes} min`}
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-brand-dark">{activeStep.label}</h2>
                <p className="text-gray-500 mt-1">{activeStep.description}</p>
            </div>

            <div className="hidden sm:block relative px-2">
                <div className="absolute top-[26px] left-[26px] right-[26px] h-[4px] bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-green to-brand-orange rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                </div>

                <div className="flex justify-between relative">
                    {STEPS.map((step, index) => {
                        const isDone = index < currentIndex
                        const isCurrent = index === currentIndex
                        return (
                            <div key={step.status} className="flex flex-col items-center gap-2.5 w-[80px]">
                                <div
                                    className={`w-[52px] h-[52px] rounded-full flex items-center justify-center border-[3px] transition-all duration-500 z-10
                                    ${
                                        isDone
                                            ? 'bg-brand-green border-brand-green text-white'
                                            : isCurrent
                                              ? 'bg-white border-brand-orange text-brand-orange shadow-lg scale-110'
                                              : 'bg-white border-gray-200 text-gray-300'
                                    }`}>
                                    {step.icon}
                                </div>
                                <p className={`text-xs font-bold text-center ${isCurrent ? 'text-brand-orange' : isDone ? 'text-brand-green' : 'text-gray-400'}`}>{step.label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="sm:hidden flex flex-col gap-1">
                {STEPS.map((step, index) => {
                    const isDone = index < currentIndex
                    const isCurrent = index === currentIndex
                    const isLastStep = index === STEPS.length - 1
                    return (
                        <div key={step.status} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-[44px] h-[44px] rounded-full flex items-center justify-center border-[3px] transition-all
                                    ${
                                        isDone
                                            ? 'bg-brand-green border-brand-green text-white'
                                            : isCurrent
                                              ? 'bg-white border-brand-orange text-brand-orange shadow-md'
                                              : 'bg-white border-gray-200 text-gray-300'
                                    }`}>
                                    {step.icon}
                                </div>
                                {!isLastStep && <div className={`w-[3px] h-[28px] my-1 rounded-full ${isDone ? 'bg-brand-green' : 'bg-gray-100'}`} />}
                            </div>
                            <div className="pt-2.5">
                                <p className={`font-bold ${isCurrent ? 'text-brand-orange' : isDone ? 'text-brand-green' : 'text-gray-400'}`}>{step.label}</p>
                                <p className="text-sm text-gray-400">{step.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {isDemo && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center mb-4 font-medium">🎮 Demo Controls — simulate order progress</p>
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={isFirst || isLoading}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm
                                hover:border-brand-orange hover:text-brand-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                            <ChevronLeft size={16} /> Prev
                        </button>

                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            disabled={isLast || isLoading}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed
                                ${isPlaying ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-brand-orange text-white hover:bg-orange-600 shadow-md'}`}>
                            {isPlaying ? (
                                <>
                                    <Pause size={16} /> Pause
                                </>
                            ) : (
                                <>
                                    <Play size={16} /> Auto Play
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={isLast || isLoading}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm
                                hover:border-brand-orange hover:text-brand-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                            Next <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-[30px]">{Math.round(progressPercent)}%</span>
                        <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-brand-green to-brand-orange rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">
                            Step {currentIndex + 1}/{STEPS.length}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
