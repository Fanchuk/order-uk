'use client'

import { Toaster } from 'sonner'
import DeliveryPopup from '@/src/components/shared/DeliveryPopup'
import AuthModal from '@/src/components/shared/AuthModal'
import { useDeliveryStore } from '@/src/features/basket/store/useDeliveryStore'
import { useAuthStore } from '@/src/features/basket/store/useAuthStore'

export default function Providers({ children }: { children: React.ReactNode }) {
    const { isDeliveryPopupOpen, closeDelivery } = useDeliveryStore()
    const { isAuthModalOpen, closeAuth } = useAuthStore()

    return (
        <>
            {children}

            <Toaster position="top-right" richColors />

            {isDeliveryPopupOpen && <DeliveryPopup onClose={closeDelivery} />}
            {isAuthModalOpen && <AuthModal onClose={closeAuth} />}
        </>
    )
}
