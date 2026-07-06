'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Flame, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { formatPrice } from '@/src/lib/utils'
import { useBasketStore } from '@/src/features/basket/store/useBasketStore'

import CustomisePizzaModal from '@/src/components/restaurant/CustomisePizzaModal'
import PizzaToppingsModal from '@/src/components/restaurant/PizzaToppingsModal'
import SpecialRequestModal from '@/src/components/restaurant/SpecialRequestModal'
import SimpleProductModal from '@/src/components/restaurant/SimpleProductModal'

interface Promo {
    id: number
    name: string
    description: string
    price: number
    discountPercent: string
    imagePath: string
    promoCategoryId: number
    restaurantId: number
}

interface Category {
    id: number
    name: string
    slug: string
    promos: Promo[]
}

type PromoWithCategory = Promo & { categoryName: string }

export default function OffersExplorer({ categories }: { categories: Category[] }) {
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all')
    const addItem = useBasketStore((state) => state.addItem)

    const [modalStep, setModalStep] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState<PromoWithCategory | null>(null)
    const [draftData, setDraftData] = useState<{ pizzas?: any[]; toppings?: string[] }>({})

    useEffect(() => {
        document.body.style.overflow = modalStep > 0 ? 'hidden' : 'unset'
        return () => { document.body.style.overflow = 'unset' }
    }, [modalStep])

    const allPromos = useMemo(
        () => categories.flatMap((cat) =>
            cat.promos.map((promo) => ({ ...promo, categoryName: cat.name }))
        ),
        [categories]
    )

    const visiblePromos = useMemo(() =>
        activeCategory === 'all'
            ? allPromos
            : allPromos.filter((p) => p.promoCategoryId === activeCategory),
        [allPromos, activeCategory]
    )

    const handleOpenModal = (promo: PromoWithCategory) => {
        setSelectedProduct(promo)

        const productName = promo.name.toLowerCase()
        const categoryName = promo.categoryName.toLowerCase()
        
        const complexKeywords = ['burger', 'pizza', 'whopper', 'baconator', 'dave', 'mac', 'zinger', 'twister', 'combo', 'box']

        const isComplexProduct = categoryName.includes('pizza') || categoryName.includes('fast food') || complexKeywords.some((keyword) => productName.includes(keyword))

        setModalStep(isComplexProduct ? 1 : 4)
    }

    const handleAddToCart = (instructions: string) => {
        if (!selectedProduct) return

        const toppingsText = draftData.toppings?.length ? `Toppings: ${draftData.toppings.join(', ')}` : ''
        const instructionsText = instructions ? `Note: ${instructions}` : ''
        const finalDesc = [toppingsText, instructionsText].filter(Boolean).join(' | ')

        addItem({
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.imagePath,
            qty: 1,
            desc: finalDesc || selectedProduct.description || 'Special Offer',
        }, selectedProduct.restaurantId)

        setModalStep(0)
        setDraftData({})
        setSelectedProduct(null)
        toast.success(`${selectedProduct.name} added to basket!`)
    }

    const handleAddToCartSimple = (quantity: number, instructions: string) => {
        if (!selectedProduct) return

        addItem({
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.imagePath,
            qty: quantity,
            desc: instructions ? `Note: ${instructions}` : selectedProduct.description || 'Special Offer',
        }, selectedProduct.restaurantId)

        setModalStep(0)
        setSelectedProduct(null)
        toast.success(`${selectedProduct.name} added to basket!`)
    }

    return (
        <>
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
                <div className="flex gap-2.5 overflow-x-auto pb-2 mb-8 [&::-webkit-scrollbar]:hidden">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold border transition-all
                            ${activeCategory === 'all' ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                    >
                        All Deals
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold border transition-all
                                ${activeCategory === cat.id ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                        >
                            {cat.name} <span className="opacity-60">({cat.promos.length})</span>
                        </button>
                    ))}
                </div>

                {visiblePromos.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
                        <Flame size={48} className="text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500">No deals in this category right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {visiblePromos.map((promo) => (
                            <div key={promo.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="relative h-[180px] overflow-hidden bg-gray-100">
                                    <Image src={promo.imagePath || '/placeholder.jpg'} alt={promo.name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-brand-orange text-white text-xs font-black px-3 py-1.5 rounded-full">
                                        <Flame size={12} className="fill-white" /> {promo.discountPercent}
                                    </div>
                                    <span className="absolute top-3 right-3 bg-black/40 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full">
                                        {promo.categoryName}
                                    </span>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-brand-dark leading-tight">{promo.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 flex-1">{promo.description}</p>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                        <span className="font-black text-xl text-brand-green">{formatPrice(promo.price)}</span>
                                        <button
                                            onClick={() => handleOpenModal(promo)}
                                            aria-label={`Customise ${promo.name}`}
                                            className="w-[44px] h-[44px] bg-brand-dark hover:bg-brand-orange text-white rounded-xl flex items-center justify-center transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {modalStep === 1 && (
                <CustomisePizzaModal
                    price={selectedProduct?.price || 0}
                    onClose={() => setModalStep(0)}
                    onNext={(pizzas) => {
                        setDraftData({ ...draftData, pizzas })
                        setModalStep(2)
                    }}
                />
            )}

            {modalStep === 2 && (
                <PizzaToppingsModal
                    price={selectedProduct?.price || 0}
                    onClose={() => setModalStep(0)}
                    onBack={() => setModalStep(1)}
                    onNext={(toppings) => {
                        setDraftData({ ...draftData, toppings })
                        setModalStep(3)
                    }}
                />
            )}

            {modalStep === 3 && (
                <SpecialRequestModal
                    price={selectedProduct?.price || 0}
                    onClose={() => setModalStep(0)}
                    onBack={() => setModalStep(2)}
                    onAdd={(instructions) => handleAddToCart(instructions)}
                />
            )}

            {modalStep === 4 && (
                <SimpleProductModal
                    product={selectedProduct}
                    onClose={() => setModalStep(0)}
                    onAdd={(quantity, instructions) => handleAddToCartSimple(quantity, instructions)}
                />
            )}
        </>
    )
}