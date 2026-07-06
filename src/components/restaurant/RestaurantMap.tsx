export default function RestaurantMap() {
    return (
        <section className="w-full max-w-[1528px] mx-auto px-4 lg:px-16 mt-8 lg:mt-12 mb-8 font-sans select-none">

            <div
                className="relative w-full rounded-[12px] overflow-hidden"
                style={{
                    height: '659px',
                    boxShadow: '5px 5px 14px 0 rgba(0,0,0,0.25)',
                }}
            >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540423162157!2d-0.0837864233791054!3d51.50330347181347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876035159bb13c5%3A0xa61e28965c352376!2sTooley%20St%2C%20London!5e0!3m2!1suk!2sua!4v1718712345678!5m2!1suk!2sua"
                    className="absolute inset-0 w-full h-full border-0 z-0"
                    loading="lazy"
                />

                <div
                    className="hidden lg:flex absolute top-[50px] left-[50px] bottom-[50px] flex-col justify-between pt-[60px] pb-[70px] px-[65px] rounded-[12px] z-10"
                    style={{
                        width: '448px',
                        background: 'rgba(3, 8, 31, 0.97)',
                    }}
                >
                    <InfoCardContent />
                </div>

                <div
                    className="lg:hidden absolute bottom-6 inset-x-4 flex flex-col justify-center px-6 py-8 rounded-[12px] z-10"
                    style={{
                        background: 'rgba(3, 8, 31, 0.97)',
                    }}
                >
                    <InfoCardContent mobile />
                </div>

            </div>
        </section>
    )
}

function InfoCardContent({ mobile }: { mobile?: boolean }) {
    return (
        <div className="flex flex-col gap-0 select-none">
            <h2
                className="text-white leading-[119%]"
                style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 700,
                    fontSize: mobile ? '28px' : '32px',
                }}
            >
                McDonald&apos;s
            </h2>

            <p
                className="mt-1 mb-5"
                style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 600,
                    fontSize: mobile ? '18px' : '22px',
                    color: '#fc8a06',
                }}
            >
                South London
            </p>

            <p
                className="text-white mb-6"
                style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 400,
                    fontSize: mobile ? '15px' : '18px',
                    lineHeight: '172%',
                }}
            >
                Tooley St, London Bridge, London SE1 2TF, United Kingdom
            </p>

            <div className="flex flex-col mb-4">
                <span
                    className="text-white"
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 700,
                        fontSize: mobile ? '15px' : '18px',
                        lineHeight: '256%',
                    }}
                >
                    Phone number
                </span>
                <span
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 400,
                        fontSize: mobile ? '20px' : '24px',
                        lineHeight: '158%',
                        color: '#fc8a06',
                    }}
                >
                    +934443-43
                </span>
            </div>

            <div className="flex flex-col">
                <span
                    className="text-white"
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 700,
                        fontSize: mobile ? '15px' : '18px',
                        lineHeight: '256%',
                    }}
                >
                    Website
                </span>
                <a
                    href="http://mcdonalds.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 400,
                        fontSize: mobile ? '20px' : '24px',
                        lineHeight: '158%',
                        color: '#fc8a06',
                    }}
                    className="hover:underline truncate"
                >
                    http://mcdonalds.uk/
                </a>
            </div>
        </div>
    )
}