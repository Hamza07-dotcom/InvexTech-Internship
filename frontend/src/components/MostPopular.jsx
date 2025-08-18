"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { fetchPopularCars } from "@/features/cars/carsSlice";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

// Helper function to get the correct image URL
const getCarImageUrl = (car) => {
  if (!car) return '/images/img.png';
  
  // If the image path is provided and exists in our public folder
  if (car.img) {
    // Remove any double slashes and ensure proper formatting
    return car.img.replace(/\/+/g, '/');
  }

  // Fallback images based on brand
  const brandImageMap = {
    'BMW': '/images/cars/bmw-m5.jpg',
    'Ferrari': '/images/cars/ferrari-f8.png',
    'Chevrolet': '/images/cars/camaro.png',
    'Porsche': '/images/cars/porshe-911.png',
    'Lamborghini': '/images/cars/lamborgini.png',
    'Volvo': '/images/cars/volvo.png'
  };

  return brandImageMap[car.brand] || '/images/img.png';
};

// Arrows
const CustomNextArrow = ({ onClick, currentSlide, slideCount }) => {
  const slidesToScroll = 4;
  const remainingSlides = slideCount - (currentSlide + slidesToScroll);
  if (remainingSlides <= 0) return null;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
      aria-label="Next slide"
    >
      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

const CustomPrevArrow = ({ onClick, currentSlide }) => {
  if (currentSlide === 0) return null;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
      aria-label="Previous slide"
    >
      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

export default function MostPopular() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const { popularCars: popular, popularStatus, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchPopularCars());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Most Popular Cars</h3>
          <Link href="/products" className="text-sm text-blue-600">
            See all
          </Link>
        </div>

        <div className="relative carousel-container overflow-hidden">
          {popularStatus === "loading" ? (
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 shadow rounded-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"/>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"/>
                    <div className="h-4 bg-gray-200 rounded w-1/2"/>
                  </div>
                </div>
              ))}
            </div>
          ) : popularStatus === "failed" ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-2">Failed to load popular cars: {error}</p>
              <button 
                onClick={() => dispatch(fetchPopularCars())}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            <Slider {...settings}>
            {popular.map((car) => (
              <div key={car.id} className="px-2">
                <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-48 xl:h-52 group">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleFavorite(car.id));
                      }}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
                    >
                      {favorites.includes(car.id) ? (
                        <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-600 hover:text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      )}
                    </button>
                    <Image
                      src={getCarImageUrl(car)}
                      alt={car.name || 'Car image'}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority
                      onError={(e) => {
                        const targetEl = e.target;
                        if (!targetEl.src.includes('img.png')) {
                          console.log('Image failed to load:', car.name, car.img);
                          targetEl.src = '/images/img.png';
                        }
                      }}
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 line-clamp-1">
                      {car.name || `${car.brand} ${car.model}`}
                    </h3>
                    <div className="flex flex-wrap gap-1 my-2">
                      {car.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-blue-600 font-bold mt-2 text-sm sm:text-base">{car.price}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      Installment <span className="font-semibold">{car.installment}</span>
                    </p>
                    {car.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{car.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          )}

          <style jsx global>{`
            .carousel-container .slick-track {
              display: flex !important;
              gap: 1.5rem;
              margin-left: -0.75rem;
            }
            .carousel-container .slick-slide {
              height: inherit !important;
              padding: 0 0.75rem;
            }
            .carousel-container .slick-list {
              margin: 0 -0.75rem;
              overflow: visible;
            }
            .carousel-container .slick-arrow {
              z-index: 10;
            }
            @media (max-width: 640px) {
              .carousel-container .slick-arrow {
                display: none !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
