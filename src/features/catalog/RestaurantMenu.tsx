'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import RestaurantMenuNav from '@/src/components/restaurant/RestaurantMenuNav'
import RestaurantOffers from '@/src/components/restaurant/RestaurantOffers'
import RestaurantMenuList from '@/src/components/restaurant/RestaurantMenuList'
import RestaurantInfo from '@/src/components/restaurant/RestaurantInfo'
import RestaurantMap from '@/src/components/restaurant/RestaurantMap'
import RestaurantReviews from '@/src/components/restaurant/RestaurantReviews'
import PopularRestaurants from '@/src/components/home/PopularRestaurants'
import CustomisePizzaModal from '@/src/components/restaurant/CustomisePizzaModal'
import PizzaToppingsModal from '@/src/components/restaurant/PizzaToppingsModal'
import SpecialRequestModal from '@/src/components/restaurant/SpecialRequestModal'
import SimpleProductModal from '@/src/components/restaurant/SimpleProductModal'
import { useBasketStore } from '@/src/features/basket/store/useBasketStore'

interface RestaurantMenuProps {
    restaurant: any
    menuItems: any[]
    minimumOrder: number
}

export default function RestaurantMenu({ restaurant, menuItems, minimumOrder }: RestaurantMenuProps) {
    const [modalStep, setModalStep] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [draftData, setDraftData] = useState<{ pizzas?: any[]; toppings?: any[] }>({})
    const [searchQuery, setSearchQuery] = useState('')
    const addItem = useBasketStore((state) => state.addItem)

    useEffect(() => {
        document.body.style.overflow = modalStep > 0 ? 'hidden' : 'unset'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [modalStep])

    const filteredMenuItems = menuItems.filter((item: any) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()))

    const handleOpenModal = (product: any) => {
        setSelectedProduct(product)

        const categorySlug = product.menuCategory?.slug || ''
        const productName = (product.name || '').toLowerCase()
        const complexKeywords = ['burger', 'pizza', 'whopper', 'baconator', 'dave', 'mac', 'zinger', 'twister', 'combo', 'box']

        const isComplexProduct = categorySlug === 'burgers' || categorySlug === 'pizza' || complexKeywords.some((keyword) => productName.includes(keyword))

        setModalStep(isComplexProduct ? 1 : 4)
    }

    const handleAddToCart = (instructions: string) => {
        if (!selectedProduct) return

        const toppingsText = draftData.toppings?.length ? `Toppings: ${draftData.toppings.join(', ')}` : ''
        const instructionsText = instructions ? `Note: ${instructions}` : ''
        const finalDesc = [toppingsText, instructionsText].filter(Boolean).join(' | ')

        addItem(
            {
                menuItemId: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price || selectedProduct.newPrice,
                image: selectedProduct.imagePath || selectedProduct.image,
                qty: 1,
                desc: finalDesc || selectedProduct.description || 'Standard recipe',
            },
            restaurant.id,
        )

        setModalStep(0)
        setDraftData({})
        setSelectedProduct(null)
        toast.success(`${selectedProduct.name} added to basket!`)
    }

    const handleAddToCartSimple = (quantity: number, instructions: string) => {
        if (!selectedProduct) return

        addItem(
            {
                menuItemId: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price || selectedProduct.newPrice,
                image: selectedProduct.imagePath,
                qty: quantity,
                desc: instructions ? `Note: ${instructions}` : selectedProduct.description || 'Standard recipe',
            },
            restaurant.id,
        )

        setModalStep(0)
        setSelectedProduct(null)
        toast.success(`${selectedProduct.name} added to basket!`)
    }

    const regularMenu = filteredMenuItems.filter((item: any) => !item.isPromo)
    const promoOffers = filteredMenuItems.filter((item: any) => item.isPromo)

    return (
        <>
            <main className="flex flex-col flex-grow w-full overflow-hidden">
                <RestaurantMenuNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} restaurantName={restaurant.name} />

                <div id="menu-list" className="flex flex-col w-full">
                    <div className="order-1 md:order-2 w-full">
                        <RestaurantMenuList menuItems={regularMenu} onProductClick={handleOpenModal} />
                    </div>
                    <div className="order-2 md:order-1 w-full">
                        <RestaurantOffers offers={promoOffers} onProductClick={handleOpenModal} />
                    </div>
                </div>

                <RestaurantInfo />
                <RestaurantMap />
                <RestaurantReviews />
                <PopularRestaurants title="Similar Restaurants" />
            </main>

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
                <SpecialRequestModal price={selectedProduct?.price || 0} onClose={() => setModalStep(0)} onBack={() => setModalStep(2)} onAdd={(instructions) => handleAddToCart(instructions)} />
            )}

            {modalStep === 4 && <SimpleProductModal product={selectedProduct} onClose={() => setModalStep(0)} onAdd={(quantity, instructions) => handleAddToCartSimple(quantity, instructions)} />}
        </>
    )
}
