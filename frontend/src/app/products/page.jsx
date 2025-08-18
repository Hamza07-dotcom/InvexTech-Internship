"use client";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "@/features/cars/carsSlice";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const getCarImageUrl = (car) => {
  if (car.image && (car.image.startsWith("http") || car.image.startsWith("/"))) {
    return car.image;
  }

  const modelToImage = {
    "bmw m5": "/images/brands/bmw-logo.png",
    "ferrari f8": "/images/brands/ferrari-f8.png",
    "camaro": "/images/cars/camaro.png",
    "chevrolet camaro": "/images/cars/camaro.png",
    "porsche 911": "/images/cars/porshe-911.png",
    "lamborghini": "/images/cars/lamborgini.png",
    "volvo xc90": "/images/cars/volvo.png",
    "volvo": "/images/cars/volvo.png",
  };

  const modelKey = car.model?.toLowerCase();
  if (modelKey && modelToImage[modelKey]) {
    return modelToImage[modelKey];
  }

  const brandDefaults = {
    ferrari: "/images/brands/bmw-logo.png",
    chevrolet: "/images/brands/chevrolet-logo.png",
    porsche: "/images/brands/porshe-911.png",
    lamborghini: "/brands/cars/lamborgini.png",
    volvo: "/images/brands/volvo.png",
  };

  const brandKey = car.brand?.toLowerCase();
  if (brandKey && brandDefaults[brandKey]) {
    return brandDefaults[brandKey];
  }

  return "/images/img.png";
};

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items: cars, status, error } = useSelector((state) => state.cars);
  const favorites = useSelector((state) => state.favorites.items);
  const [filters, setFilters] = useState({
    brand: [],
    type: [],
    transmission: [],
    fuel: [],
    engineCapacity: [],
    priceRange: { min: '', max: '' },
    installmentRange: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevant');
  const itemsPerPage = 9;

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  // Initialize filters from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newFilters = { ...filters };

    const search = searchParams.get('search');
    const brand = searchParams.get('brand');
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (brand) {
      newFilters.brand = [brand];
    }
    if (type) {
      newFilters.type = [type];
    }
    if (minPrice || maxPrice) {
      newFilters.priceRange = {
        min: minPrice || '',
        max: maxPrice || ''
      };
    }

    setFilters(newFilters);
    // Store search query for filtering
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const handleBrandClick = (brand) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand.includes(brand) 
        ? prev.brand.filter(b => b !== brand)
        : [...prev.brand, brand]
    }));
    setCurrentPage(1);
  };

  const handleTypeClick = (type) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type]
    }));
    setCurrentPage(1);
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
    setCurrentPage(1);
  };

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
    setCurrentPage(1);
  };

  const handleInstallmentChange = (value) => {
    setFilters(prev => ({
      ...prev,
      installmentRange: value
    }));
    setCurrentPage(1);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const monthlyInstallment = car.price * 0.015;
      
      // Search query filter
      if (searchQuery) {
        const searchStr = searchQuery.toLowerCase();
        const modelMatch = car.model?.toLowerCase().includes(searchStr);
        const brandMatch = car.brand?.toLowerCase().includes(searchStr);
        const descMatch = car.description?.toLowerCase().includes(searchStr);
        
        if (!modelMatch && !brandMatch && !descMatch) {
          return false;
        }
      }
      
      return (
        // Brand filter
        (filters.brand.length === 0 || filters.brand.includes(car.brand)) &&
        
        // Type filter
        (filters.type.length === 0 || filters.type.includes(car.type)) &&
        
        // Transmission filter
        (filters.transmission.length === 0 || filters.transmission.includes(car.transmission)) &&
        
        // Fuel filter
        (filters.fuel.length === 0 || filters.fuel.includes(car.fuel)) &&
        
        // Engine capacity filter
        (filters.engineCapacity.length === 0 || filters.engineCapacity.some(range => {
          if (range === '<1000') return car.engineCapacity < 1000;
          if (range === '1000-2000') return car.engineCapacity >= 1000 && car.engineCapacity <= 2000;
          if (range === '2000-3000') return car.engineCapacity >= 2000 && car.engineCapacity <= 3000;
          if (range === '>3000') return car.engineCapacity > 3000;
          return true;
        })) &&
        
        // Price range filter
        (!filters.priceRange.min || car.price >= Number(filters.priceRange.min)) &&
        (!filters.priceRange.max || car.price <= Number(filters.priceRange.max)) &&
        
        // Installment filter
        (!filters.installmentRange || 
          (filters.installmentRange === '<1000' && monthlyInstallment < 1000) ||
          (filters.installmentRange === '<2000' && monthlyInstallment < 2000) ||
          (filters.installmentRange === '>2000' && monthlyInstallment > 2000))
      );
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0; // default sorting (most relevant)
    });
  }, [cars, filters, sortBy]);

  // Get current page items
  const currentCars = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCars.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCars, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const goToProductDetail = (carId) => {
    router.push(`/product/${carId}`);
  };

  return status === "loading" ? (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="bg-white p-4 rounded-lg shadow-sm border space-y-6 h-fit animate-pulse">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </aside>
          <div className="md:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 shadow rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : status === "failed" ? (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">Failed to load cars: {error}</p>
          <button
            onClick={() => dispatch(fetchCars())}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* ---- Sidebar (NEW DESIGN) ---- */}
          <aside className="bg-white p-4 rounded-lg shadow-sm border space-y-6 h-fit">
            {/* Car brand */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Car brand
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {["Volvo", "Land Rover", "Chevrolet", "BMW", "Porsche"].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandClick(brand)}
                    className={`p-2 rounded transition-all ${
                      filters.brand.includes(brand)
                        ? "bg-blue-50 ring-2 ring-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={`/images/brands/${brand.toLowerCase().replace(" ", "-")}.png`}
                      alt={brand}
                      className="w-full h-10 object-contain"
                    />
                  </button>
                ))}
              </div>
              <button className="text-blue-600 text-xs mt-2">See all</button>
            </div>

            {/* Car type */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Car type
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-700">
                {["MPV", "SUV", "Sedan", "Coupe", "Van", "Truck"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeClick(type)}
                    className={`p-2 rounded transition-all ${
                      filters.type.includes(type)
                        ? "bg-blue-50 ring-2 ring-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={`/images/car-types/${type.toLowerCase()}.png`}
                      className="w-10 mx-auto mb-1"
                      alt={type}
                    />
                    {type}
                  </button>
                ))}
              </div>
              <button className="text-blue-600 text-xs mt-2">See all</button>
            </div>

            {/* Transmission */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Transmission
              </h3>
              <div className="space-y-1 text-sm">
                {["Automatic", "Manual"].map((trans) => (
                  <label key={trans} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.transmission.includes(trans)}
                      onChange={() => handleCheckboxChange("transmission", trans)}
                    />
                    {trans}
                  </label>
                ))}
              </div>
            </div>

            {/* Fuel */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Fuel</h3>
              <div className="space-y-1 text-sm">
                {["Gas", "Electric", "Hybrid", "Diesel"].map((fuel) => (
                  <label key={fuel} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.fuel.includes(fuel)}
                      onChange={() => handleCheckboxChange("fuel", fuel)}
                    />
                    {fuel}
                  </label>
                ))}
              </div>
            </div>

            {/* Engine capacity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Engine capacity
              </h3>
              <div className="space-y-1 text-sm">
                {[
                  { value: "<1000", label: "<1000 cc" },
                  { value: "1000-2000", label: "1000 - 2000 cc" },
                  { value: "2000-3000", label: "2000 - 3000 cc" },
                  { value: ">3000", label: ">3000 cc" }
                ].map((range) => (
                  <label key={range.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.engineCapacity.includes(range.value)}
                      onChange={() => handleCheckboxChange("engineCapacity", range.value)}
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Price
              </h3>
              <input
                type="number"
                placeholder="Minimum price"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full border rounded px-2 py-1 mb-2 text-sm"
              />
              <input
                type="number"
                placeholder="Maximum price"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>

            {/* Installments */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Installments
              </h3>
              <div className="space-y-1 text-sm">
                {[
                  { value: "<1000", label: "<$1,000/month" },
                  { value: "<2000", label: "<$2,000/month" },
                  { value: ">2000", label: ">$2,000/month" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="installments"
                      value={option.value}
                      checked={filters.installmentRange === option.value}
                      onChange={(e) => handleInstallmentChange(e.target.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ---- Main content ---- */}
          <main className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm">
                Showing {filteredCars.length} results
                {filters.brand.length > 0 && ` for ${filters.brand.join(', ')}`}
                {filters.type.length > 0 && ` in ${filters.type.join(', ')}`}
              </p>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevant">Most relevant</option>
                <option value="price_asc">Lowest price</option>
                <option value="price_desc">Highest price</option>
              </select>
            </div>

            {/* Cars Grid */}
            {filteredCars.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No cars found matching your filters</p>
                <button
                  onClick={() => {
                    setFilters({
                      brand: [],
                      type: [],
                      transmission: [],
                      fuel: [],
                      engineCapacity: [],
                      priceRange: { min: '', max: '' },
                      installmentRange: '',
                    });
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCars.map((car) => (
                    <div
                      key={car.id}
                      onClick={() => goToProductDetail(car.id)}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  {/* Image + Heart */}
                  <div className="relative w-full h-48">
                    <Image
                      src={getCarImageUrl(car)}
                      alt={car.model || "Car image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleFavorite(car.id));
                      }}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
                    >
                      {favorites.includes(car.id) ? (
                        <svg
                          className="w-6 h-6 text-pink-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-gray-600 hover:text-pink-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {car.model}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {car.brand} {car.year}
                    </p>
                    <p className="text-blue-600 font-bold">
                      $
                      {new Intl.NumberFormat("en-US").format(car.price)}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Installment ${(car.price * 0.015).toFixed(2)}/month
                    </p>
                    {car.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {car.description}
                      </p>
                    )}
                  </div>
                </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {filteredCars.length > 0 && (
              <div className="flex justify-between items-center mt-8">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 border rounded px-4 py-2 text-sm ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    ← Previous page
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                    className={`flex items-center gap-2 border rounded px-4 py-2 text-sm ${
                      currentPage >= totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Next page →
                  </button>
                </div>
                <p className="text-sm">
                  Page <strong>{currentPage}</strong> of {totalPages}
                  <span className="ml-2 text-gray-500">
                    ({filteredCars.length} cars total)
                  </span>
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
