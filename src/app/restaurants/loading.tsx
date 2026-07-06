export default function RestaurantsLoading() {
    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <section className="bg-[#03081f]">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16">
                    <div className="h-7 w-44 bg-white/10 rounded-full mb-4 animate-pulse" />
                    <div className="h-12 w-[500px] max-w-full bg-white/10 rounded-2xl animate-pulse" />
                    <div className="h-5 w-[380px] max-w-full bg-white/5 rounded-lg mt-4 animate-pulse" />
                </div>
            </section>
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
                <div className="flex gap-4 mb-6">
                    <div className="h-[52px] flex-1 bg-gray-200 rounded-xl animate-pulse" />
                    <div className="h-[52px] w-[160px] bg-gray-200 rounded-xl animate-pulse" />
                </div>
                <div className="flex gap-2 mb-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-8 w-16 bg-gray-200 rounded-full animate-pulse" />
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                            <div className="h-[160px] bg-gray-200 animate-pulse" />
                            <div className="pt-8 px-4 pb-4">
                                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                                <div className="flex gap-4 mt-2">
                                    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
