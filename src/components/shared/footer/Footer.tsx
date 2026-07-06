'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SOCIAL_ICONS } from '@/src/shared/lib/constants/footer'

import FooterSubscribe from './FooterSubscribe'
import FooterLinks from './FooterLinks'
import FooterBottom from './FooterBottom'

import Modal from './modals/Modal'
import AppModal from './modals/AppModal'
import SocialModal from './modals/SocialModal'

import { LEGAL_CONTENT } from './constants/legalContent'
import { IMPORTANT_CONTENT } from './constants/importantContent'

type ModalType = 'legal' | 'important' | 'app' | 'social' | null

export default function Footer() {
    const [activeModal, setActiveModal] = useState<ModalType>(null)
    const [modalKey, setModalKey] = useState('')

    const openModal = (type: ModalType, key: string = '') => {
        setActiveModal(type)
        setModalKey(key)
    }
    const closeModal = () => {
        setActiveModal(null)
        setModalKey('')
    }

    const legalLinks = Object.keys(LEGAL_CONTENT)
    const importantLinks = Object.keys(IMPORTANT_CONTENT)

    return (
        <>
            <footer className="w-full font-sans select-none mt-0">
                <div className="w-full bg-[#ebebeb]">
                    <div className="mx-auto max-w-[1528px] px-4 lg:px-8 py-10 lg:py-14">

                        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-10 items-start">

                            <div className="flex flex-col gap-5">
                                <Image src="/logo.svg" alt="Order.uk" width={180} height={50} priority />
                                <button
                                    onClick={() => openModal('app')}
                                    className="relative w-full max-w-[312px] h-[60px] hover:opacity-80 transition-opacity"
                                >
                                    <Image src="/app-badges.png" alt="Download App" fill unoptimized priority className="object-contain object-left" />
                                </button>
                                <p className="text-[13px] text-black leading-relaxed max-w-[260px]">
                                    Company # 490039-445, Registered with House of companies.
                                </p>
                            </div>

                            <FooterSubscribe
                                onOpenSocial={() => openModal('social')}
                                onOpenPrivacy={() => openModal('legal', 'Privacy')}
                            />

                            <FooterLinks
                                title="Legal Pages"
                                links={legalLinks}
                                onLinkClick={(label) => openModal('legal', label)}
                            />

                            <FooterLinks
                                title="Important Links"
                                links={importantLinks}
                                onLinkClick={(label) => openModal('important', label)}
                            />
                        </div>

                        <div className="lg:hidden flex flex-col gap-8">
                            <div className="flex flex-col items-center gap-4">
                                <Image src="/logo.svg" alt="Order.uk" width={160} height={44} priority />
                                <button onClick={() => openModal('app')} className="relative w-full max-w-[280px] h-[52px]">
                                    <Image src="/app-badges.png" alt="App badges" fill unoptimized priority className="object-contain" />
                                </button>
                                <p className="text-[12px] text-black text-center">
                                    Company # 490039-445, Registered with House of companies.
                                </p>
                            </div>

                            <FooterSubscribe
                                onOpenSocial={() => openModal('social')}
                                onOpenPrivacy={() => openModal('legal', 'Privacy')}
                            />

                            <div className="grid grid-cols-2 gap-8">
                                <FooterLinks
                                    title="Legal Pages"
                                    links={legalLinks}
                                    onLinkClick={(label) => openModal('legal', label)}
                                />
                                <FooterLinks
                                    title="Important Links"
                                    links={importantLinks}
                                    onLinkClick={(label) => openModal('important', label)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <FooterBottom
                    onOpenPrivacy={() => openModal('legal', 'Privacy')}
                    onOpenTerms={() => openModal('legal', 'Terms and conditions')}
                />
            </footer>

            {activeModal === 'legal' && modalKey && LEGAL_CONTENT[modalKey] && (
                <Modal
                    title={LEGAL_CONTENT[modalKey].title}
                    content={LEGAL_CONTENT[modalKey].content}
                    onClose={closeModal}
                />
            )}
            {activeModal === 'important' && modalKey && IMPORTANT_CONTENT[modalKey] && (
                <Modal
                    title={IMPORTANT_CONTENT[modalKey].title}
                    content={IMPORTANT_CONTENT[modalKey].content}
                    onClose={closeModal}
                />
            )}
            {activeModal === 'app' && <AppModal onClose={closeModal} />}
            {activeModal === 'social' && <SocialModal onClose={closeModal} />}
        </>
    )
}