// src/app/page.js
import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroSection";
import CarBrands from "@/components/CarBrands";
import CarRecommendation from "@/components/CarRecommendation";
import MostPopular from "@/components/MostPopular";
import CreditSimulation from "@/components/CreditSimulator";
import NewestCars from "@/components/NewestCars";
import Testimonials from "@/components/Testimonials";
import WhyCarvista from "@/components/WhyCarvista";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import Credit from '@/components/CreditSection'
import BuyTrade from '@/components/HowToBuyOrTrade'
// import ApiTest from "@/components/ApiTest";



export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* <ApiTest />  Temporary API test component */}
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
