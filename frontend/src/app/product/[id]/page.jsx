/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarDetailClient from "./CarDetailClient";

export default function CarDetail() {
  return (
    <>
      <Navbar />
      <CarDetailClient />
      <Footer />
    </>
  );
}
