"use client";
import Image from "next/image";

export default function BrandCarousel() {
  const brands = [
    { name: "BMW", logo: "/images/brands/bmw-logo.png" },
    { name: "Mercedes", logo: "/images/brands/mercedes.png" },
    { name: "Audi", logo: "/images/brands/audi.png" },
    { name: "Toyota", logo: "/images/brands/toyota.png" },
    { name: "Honda", logo: "/images/brands/honda.png" },
    { name: "Chevrolet", logo: "/images/brands/chevrolet.png" },
  ];

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Popular Brands
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {brands.map((brand, idx) => (
            <div key={idx} className="w-24">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={96}
                height={96}
                className="mx-auto h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
