import HeroSection from '../components/home/HeroSection'
import ExclusiveDeals from '../components/home/ExclusiveDeals'
import PopularCategories from '../components/home/PopularCategories'
import PopularRestaurants from '../components/home/PopularRestaurants'
import AppPromo from '../components/home/AppPromo'
import PartnerRideSection from '../components/home/PartnerRideSection'
import AboutUs from '../components/home/AboutUs'

export default function Home() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            <HeroSection />

            <div className="container mx-auto px-4 flex flex-col gap-16">
                <ExclusiveDeals />
                <PopularCategories />
                <div id="restaurants-section">
                    <PopularRestaurants title="Popular Restaurants" />
                </div>
                <AppPromo />
                <PartnerRideSection />
                <AboutUs />
            </div>
        </div>
    )
}
