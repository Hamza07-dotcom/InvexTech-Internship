"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery) params.append('search', searchQuery);
    if (brand && brand !== 'Car brand') params.append('brand', brand);
    if (type && type !== 'Car type') params.append('type', type);
    if (priceRange && priceRange !== 'Price') params.append('price', priceRange);

    router.push(`/products?${params.toString()}`);
  };

  return (
    <section
      className="relative h-[420px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/img.png')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
          Turn your dream car <br /> into reality with us today!
        </h1>

        <div
          className="
            flex flex-col w-full 
            max-w-lg sm:max-w-xl md:max-w-2xl 
            rounded-lg bg-white p-4 shadow-lg 
            relative md:top-[35%] z-10
          "
        >
          <input
            type="text"
            placeholder="Search your dream car..."
            className="
              w-full rounded-lg border-none 
              px-4 py-2 text-gray-700 
              focus:outline-none text-sm sm:text-base
            "
          />

          <div
            className="
              mt-3 flex flex-col sm:flex-row gap-2
            "
          >
            <select
              className="
                flex-1 rounded-lg border border-gray-200 
                px-3 py-2 text-gray-600 
                focus:outline-none text-sm sm:text-base
              "
            >
              <option>Car brand</option>
              <option>BMW</option>
              <option>Porsche</option>
            </select>

            <select
              className="
                flex-1 rounded-lg border border-gray-200 
                px-3 py-2 text-gray-600 
                focus:outline-none text-sm sm:text-base
              "
            >
              <option>Car type</option>
              <option>SUV</option>
              <option>Coupe</option>
            </select>

            <select
              className="
                flex-1 rounded-lg border border-gray-200 
                px-3 py-2 text-gray-600 
                focus:outline-none text-sm sm:text-base
              "
            >
              <option>Price</option>
              <option>$0 - $50k</option>
              <option>$50k - $100k</option>
            </select>

            <button onClick={handleSearch}
              className="
                rounded-lg bg-blue-600 px-4 sm:px-6 py-2 
                text-white hover:bg-blue-700 transition 
                text-sm sm:text-base
              "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
