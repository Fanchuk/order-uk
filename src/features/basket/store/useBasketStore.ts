import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface BasketItem {
    id: string
    menuItemId: string
    name: string
    price: number
    image: string
    qty: number
    desc?: string
}

interface BasketStore {
    items: BasketItem[]
    activeRestaurantId: number | null
    deliveryFee: number

    addItem: (item: Omit<BasketItem, 'id'>, restaurantId?: number) => void
    removeItem: (id: string) => void
    increaseQty: (id: string) => void
    decreaseQty: (id: string) => void
    clearBasket: () => void

    getSubTotal: () => number
    getTotal: () => number
    getTotalItems: () => number
}

export const useBasketStore = create<BasketStore>()(
    persist(
        (set, get) => ({
            items: [],
            activeRestaurantId: null,
            deliveryFee: 250,

            addItem: (item, restaurantId) =>
                set((state) => {
                    if (restaurantId != null && state.activeRestaurantId !== null && state.activeRestaurantId !== restaurantId) {
                        return {
                            activeRestaurantId: restaurantId,
                            items: [{ ...item, id: crypto.randomUUID() }],
                        }
                    }

                    const existing = state.items.find((i) => i.menuItemId === item.menuItemId && i.desc === item.desc)

                    if (existing) {
                        return {
                            items: state.items.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + item.qty } : i)),
                        }
                    }

                    return {
                        ...(restaurantId != null && { activeRestaurantId: restaurantId }),
                        items: [...state.items, { ...item, id: crypto.randomUUID() }],
                    }
                }),

            removeItem: (id) =>
                set((state) => {
                    const nextItems = state.items.filter((i) => i.id !== id)
                    return {
                        items: nextItems,
                        activeRestaurantId: nextItems.length === 0 ? null : state.activeRestaurantId,
                    }
                }),

            increaseQty: (id) =>
                set((state) => ({
                    items: state.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
                })),

            decreaseQty: (id) =>
                set((state) => {
                    const item = state.items.find((i) => i.id === id)
                    if (!item) return state

                    if (item.qty <= 1) {
                        const nextItems = state.items.filter((i) => i.id !== id)
                        return {
                            items: nextItems,
                            activeRestaurantId: nextItems.length === 0 ? null : state.activeRestaurantId,
                        }
                    }

                    return {
                        items: state.items.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)),
                    }
                }),

            clearBasket: () => set({ items: [], activeRestaurantId: null }),

            getSubTotal: () => get().items.reduce((sum, item) => sum + item.price * item.qty, 0),

            getTotal: () => {
                const sub = get().getSubTotal()
                if (sub === 0) return 0
                return sub + get().deliveryFee
            },

            getTotalItems: () => get().items.reduce((sum, item) => sum + item.qty, 0),
        }),
        {
            name: 'order-uk-basket',
            storage: createJSONStorage(() => localStorage)
        },
    ),
)