import Image from 'next/image'

interface RestaurantOffersProps {
    offers: any[]
    onProductClick?: (product: any) => void
}

export default function RestaurantOffers({ offers, onProductClick }: RestaurantOffersProps) {
    if (!offers || offers.length === 0) return null;

    return (
        <section id="Offers" className="w-full max-w-[1528px] mx-auto px-4 lg:px-16 mt-8 lg:mt-6 font-sans select-none scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {offers.map((offer, index) => (
                    <div key={offer.id} className={`relative w-full h-[325px] rounded-[12px] overflow-hidden shadow-sm group cursor-pointer ${index !== 0 ? 'hidden lg:block' : 'block'}`}>
                        <Image src={offer.imagePath} fill alt={offer.name} className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        <div className="absolute top-0 right-6 bg-[#03081f] w-[88px] h-[66px] rounded-b-[12px] flex items-center justify-center z-10">
                            <span className="text-white font-bold text-[24px]">{offer.discountLabel || "Promo"}</span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-[100px] z-10 flex flex-col items-start">
                            <span className="text-[#fc8a06] font-medium text-[14px] mb-1">Special Offer</span>
                            <h3 className="text-white font-bold text-[32px] leading-tight">{offer.name}</h3>
                        </div>

                        <div className="absolute bottom-0 right-0 bg-white w-[97px] h-[89px] rounded-tl-[45px] rounded-br-[12px] flex items-center justify-center z-20">
                            <button 
                            onClick={(e) => {
                                e.stopPropagation()
                                onProductClick?.(offer)
                            }}
                            className="w-[50px] h-[50px] bg-[#03081f] rounded-full flex items-center justify-center hover:bg-[#fc8a06] transition-colors shadow-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}