import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroSection";
import CarBrands from "@/components/CarBrands";
import CarRecommendation from "@/components/CarRecommendation";
import MostPopular from "@/components/MostPopular";
import NewestCars from "@/components/NewestCars";
import Testimonials from "@/components/Testimonials";
import WhyCarvista from "@/components/WhyCarvista";
import Footer from "@/components/Footer";
import Credit from '@/components/CreditSection'
import BuyTrade from '@/components/HowToBuyOrTrade'



export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <CarBrands />
      <CarRecommendation />
      <MostPopular />
      <Credit/>
      <NewestCars />
      <BuyTrade/>
      <Testimonials />
      <WhyCarvista />
      <Footer />
    </>
  );
}
