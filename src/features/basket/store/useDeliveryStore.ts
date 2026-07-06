'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DeliveryStore {
    mode: 'delivery' | 'collection'
    postcode: string | null
    isDeliveryPopupOpen: boolean

    setMode: (mode: 'delivery' | 'collection') => void
    setPostcode: (code: string) => void
    openDelivery: () => void
    closeDelivery: () => void
}

export const useDeliveryStore = create<DeliveryStore>()(
    persist(
        (set) => ({
            mode: 'delivery',
            postcode: null,
            isDeliveryPopupOpen: false,

            setMode: (mode) => set({ mode }),
            setPostcode: (code) => set({ postcode: code }),
            openDelivery: () => set({ isDeliveryPopupOpen: true }),
            closeDelivery: () => set({ isDeliveryPopupOpen: false }),
        }),
        {
            name: 'order-uk-delivery', // Ключ у localStorage
            storage: createJSONStorage(() => localStorage),
            // partialize: кажемо Zustand зберігати ТІЛЬКИ mode та postcode
            partialize: (state) => ({
                mode: state.mode,
                postcode: state.postcode,
            }),
        },
    ),
)
