'use client'

import { create } from 'zustand'

interface AuthStore {
    isAuthModalOpen: boolean
    openAuth: () => void
    closeAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthModalOpen: false,

    openAuth: () => set({ isAuthModalOpen: true }),
    closeAuth: () => set({ isAuthModalOpen: false }),
}))
