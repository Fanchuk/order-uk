'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'

import MyBasket from '@/src/components/restaurant/MyBasket'
import CustomisePizzaModal from '@/src/components/restaurant/CustomisePizzaModal'
import PizzaToppingsModal from '@/src/components/restaurant/PizzaToppingsModal'
import SpecialRequestModal from '@/src/components/restaurant/SpecialRequestModal'
import SimpleProductModal from '@/src/components/restaurant/SimpleProductModal'
import LoadingSpinner from '@/src/components/ui/LoadingSpinner'
import NotFoundState from '@/src/components/ui/NotFoundState'
import { useBasketStore } from '@/src/features/basket/store/useBasketStore'

const SORT_OPTIONS = ['Top Rated', 'Price: Low to High', 'Price: High to Low']

export default function CategoryPage() {
    const addItem = useBasketStore((state) => state.addItem)
    const params = useParams()
    const categoryId = params.id as string

    // СТЕЙТИ БАЗИ ДАНИХ (Додано subcategories)
    const [categoryData, setCategoryData] = useState<{ categoryName: string; subcategories?: any[]; products: any[] } | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    // СТЕЙТИ ІНТЕРАКТИВНОСТІ
    const [activeCategory, setActiveCategory] = useState('All items')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOption, setSortOption] = useState('Top Rated')
    const [isSortOpen, setIsSortOpen] = useState(false)

    // СТЕЙТИ МОДАЛОК
    const [modalStep, setModalStep] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [draftData, setDraftData] = useState<{ pizzas?: any[]; toppings?: string[] }>({})

    // FETCH DATA
    useEffect(() => {
        if (!categoryId) return

        const fetchCategoryProducts = async () => {
            try {
                const res = await fetch(`/api/categories/${categoryId}`)
                if (!res.ok) throw new Error('Failed to fetch')

                const data = await res.json()
                setCategoryData(data)
                setActiveCategory('All items') // За замовчуванням показуємо всі
            } catch (error) {
                console.error('Error fetching category data:', error)
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategoryProducts()
    }, [categoryId])

    useEffect(() => {
        if (modalStep > 0) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [modalStep])

    if (isLoading) return <LoadingSpinner />
    if (error || !categoryData) return <NotFoundState title="Category Not Found" message="We couldn't find any products in this category." />

    // Динамічний список категорій для бокового меню (додаємо "All items" на початок)
    const sidebarCategories = ['All items', ...(categoryData.subcategories?.map((s) => s.name) || [])]

    // ФІЛЬТРАЦІЯ ТА СОРТУВАННЯ
    const filteredItems = (categoryData.products || [])
        .filter((item) => {
            if (activeCategory === 'All items') return true

            // Тимчасовий розумний фільтр: шукаємо ключове слово підкатегорії у назві чи описі
            // Наприклад, для "Vegan Burgers" шукаємо слово "Vegan"
            const keyword = activeCategory.split(' ')[0].toLowerCase()
            return item.name.toLowerCase().includes(keyword) || (item.description && item.description.toLowerCase().includes(keyword))
        })
        .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())))
        .sort((a, b) => {
            const priceA = a.price || 0
            const priceB = b.price || 0
            if (sortOption === 'Price: Low to High') return priceA - priceB
            if (sortOption === 'Price: High to Low') return priceB - priceA
            return 0
        })

    const handleOpenModal = (item: any) => {
        const productObj = { ...item, name: item.name, price: item.price, imagePath: item.imagePath }
        setSelectedProduct(productObj)

        const productName = productObj.name.toLowerCase()
        const isComplexProduct = ['burger', 'pizza', 'whopper', 'baconator', 'combo', 'box'].some((kw) => productName.includes(kw))

        if (isComplexProduct) setModalStep(1)
        else setModalStep(4)
    }

    const handleAddToCart = (instructions: string) => {
        if (!selectedProduct) return
        const toppingsText = draftData.toppings?.length ? `Toppings: ${draftData.toppings.join(', ')}` : ''
        const instructionsText = instructions ? `Note: ${instructions}` : ''
        const finalDesc = [toppingsText, instructionsText].filter(Boolean).join(' | ')

        addItem({
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.imagePath || '/placeholder.jpg',
            qty: 1,
            desc: finalDesc || selectedProduct.description || 'Standard recipe',
        })
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
            image: selectedProduct.imagePath || '/placeholder.jpg',
            qty: quantity,
            desc: instructions ? `Note: ${instructions}` : selectedProduct.description || 'Standard recipe',
        })
        setModalStep(0)
        setSelectedProduct(null)
        toast.success(`${selectedProduct.name} added to basket!`)
    }

    const renderPeppers = (spiciness: number) => {
        if (!spiciness || spiciness === 0) return null
        return (
            <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                    <Image key={i} src={i < spiciness ? '/icon-pepper-red.svg' : '/icon-pepper-grey.svg'} alt="pepper" width={16} height={16} unoptimized className="rotate-[23deg]" />
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex flex-col flex-grow w-full overflow-hidden bg-white pb-24">
                {/* ПОШУК ТА ХЕДЕР СТОРІНКИ */}
                <div className="w-full max-w-[1528px] mx-auto px-4 lg:px-8 mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 hidden lg:flex">
                    <h2 className="text-[32px] font-bold text-black border-b-2 border-[#fc8a06] inline-block pb-2" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        Browse {categoryData.categoryName}
                    </h2>
                    <div className="w-[300px] h-[45px] rounded-[120px] border border-gray-300 flex items-center px-4 gap-2 bg-white focus-within:border-[#fc8a06] transition-all">
                        <Image src="/icon-search.svg" alt="Search" width={20} height={20} unoptimized />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            placeholder="Search in category..."
                            className="outline-none bg-transparent w-full text-[14px]"
                        />
                    </div>
                </div>

                {/* 3-КОЛОНКОВИЙ МАКЕТ */}
                <div className="w-full max-w-[1528px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-6 mt-8">
                    {/* 1. ЛІВЕ МЕНЮ (Підтягує підкатегорії з БД) */}
                    <aside className="hidden lg:flex flex-col w-[260px] xl:w-[315px] shrink-0 font-sans">
                        <div className="w-full bg-[#03081f] text-white rounded-t-[12px] h-[60px] flex items-center px-6 gap-4">
                            <Image src="/icon-menu-mobile.svg" alt="menu" width={24} height={24} unoptimized className="brightness-0 invert" />
                            <span className="font-bold text-[18px]">Sub-Categories</span>
                        </div>
                        <ul className="flex flex-col bg-gray-50 rounded-b-[12px] border-x border-b border-gray-100 overflow-hidden shadow-sm">
                            {sidebarCategories.map((cat) => (
                                <li
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat)
                                        setSearchQuery('')
                                    }}
                                    className={`h-[60px] flex items-center px-6 text-[16px] font-bold cursor-pointer transition-colors border-b border-gray-100 last:border-0 
                                    ${activeCategory === cat ? 'bg-white text-black border-l-4 border-l-[#fc8a06]' : 'text-gray-500 hover:bg-white hover:text-black'}`}>
                                    {cat}
                                </li>
                            ))}
                        </ul>

                        {/* Рекламний банер зліва */}
                        <div
                            onClick={() => handleOpenModal({ name: 'Special Category Discount', price: 10.99, imagePath: '/offer-first-order.jpg' })}
                            className="relative w-full h-[325px] rounded-[12px] overflow-hidden shadow-sm group cursor-pointer mt-8 block">
                            <Image src="/offer-first-order.jpg" alt="Discount" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                            <div className="absolute top-0 right-6 bg-[#03081f] w-[88px] h-[66px] rounded-b-[12px] flex items-center justify-center z-10">
                                <span className="text-white font-bold text-[24px]">-15%</span>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col items-start">
                                <span className="text-[#fc8a06] font-medium text-[14px] mb-1">{categoryData.categoryName} Specials</span>
                                <h3 className="text-white font-bold text-[32px] leading-tight">Today Only</h3>
                            </div>
                        </div>
                    </aside>

                    {/* 2. ЦЕНТРАЛЬНА ЧАСТИНА З ТОВАРАМИ */}
                    <div className="flex-1 flex flex-col min-w-0">
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <h2 className="text-[28px] font-bold text-black capitalize" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                {searchQuery ? `Search: "${searchQuery}"` : activeCategory}
                            </h2>

                            <div className="relative z-20">
                                <div
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 border border-gray-200 rounded-[120px] px-4 py-2 bg-white cursor-pointer hover:bg-gray-50 shadow-sm">
                                    <span className="text-[14px] font-medium text-black">Sort by: {sortOption}</span>
                                    <Image
                                        src="/icon-arrow-down-grey.svg"
                                        alt="sort"
                                        width={16}
                                        height={16}
                                        unoptimized
                                        className={isSortOpen ? 'rotate-180 transition-transform duration-200' : 'transition-transform duration-200'}
                                    />
                                </div>

                                {isSortOpen && (
                                    <div className="absolute right-0 top-12 w-[200px] bg-white border border-gray-100 shadow-lg rounded-[12px] overflow-hidden">
                                        {SORT_OPTIONS.map((opt) => (
                                            <div
                                                key={opt}
                                                onClick={() => {
                                                    setSortOption(opt)
                                                    setIsSortOpen(false)
                                                }}
                                                className={`px-4 py-3 text-[14px] font-medium cursor-pointer hover:bg-gray-50 ${sortOption === opt ? 'text-[#fc8a06]' : 'text-black'}`}>
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            {filteredItems.length === 0 ? (
                                <div className="p-10 text-center text-gray-500 font-medium bg-white rounded-[12px] border border-gray-100 shadow-sm">
                                    No products found for this sub-category. Try selecting "All items".
                                </div>
                            ) : (
                                filteredItems.map((item) => (
                                    <div key={item.id} className="w-full bg-white rounded-[12px] border border-[rgba(0,0,0,0.11)] p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex flex-col pt-1">
                                                <h3 className="text-[18px] font-bold text-black leading-[120%]">{item.name}</h3>
                                                {renderPeppers(item.spiciness)}
                                            </div>

                                            <div className="relative shrink-0 w-[117px] h-[117px] mt-2">
                                                <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                                                    <Image src={item.imagePath || '/placeholder.jpg'} alt={item.name} fill unoptimized className="object-cover" />
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[14px] text-black font-normal leading-[140%] opacity-80">{item.description}</p>

                                        <div className="flex mt-2">
                                            <div
                                                onClick={() => handleOpenModal(item)}
                                                className="flex items-center justify-between w-[250px] h-[58px] px-2 gap-3 border border-[rgba(0,0,0,0.11)] rounded-[4px] cursor-pointer hover:border-black transition-colors bg-[#03081f]">
                                                <span className="font-bold text-[14px] pl-2 text-white">Add to Basket</span>
                                                <div className="h-[39px] px-4 bg-[#028643] rounded-[4px] flex items-center justify-center">
                                                    <span className="font-bold text-[14px] text-white tracking-wide">£{Number(item.price).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* 3. ПРАВА ЧАСТИНА (КОШИК) */}
                    <aside className="hidden lg:flex flex-col w-[300px] xl:w-[367px] shrink-0 sticky top-6 h-fit z-30">
                        <div className="w-full bg-[#fc8a06] text-white rounded-[8px] h-[125px] flex items-center justify-center gap-2 mb-4 shadow-sm font-bold">
                            <Image src="/icon-clock-white.svg" alt="clock" width={58} height={58} unoptimized />
                            <span className="text-[18px] tracking-wide">Fast Delivery</span>
                        </div>
                        <MyBasket />
                    </aside>
                </div>
            </main>

            {/* Модалки */}
            {modalStep === 1 && (
                <CustomisePizzaModal
                    product={selectedProduct}
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
                    product={selectedProduct}
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
                    product={selectedProduct}
                    price={selectedProduct?.price || 0}
                    onClose={() => setModalStep(0)}
                    onBack={() => setModalStep(2)}
                    onAdd={(instructions) => handleAddToCart(instructions)}
                />
            )}
            {modalStep === 4 && <SimpleProductModal product={selectedProduct} onClose={() => setModalStep(0)} onAdd={handleAddToCartSimple} />}
        </div>
    )
}
