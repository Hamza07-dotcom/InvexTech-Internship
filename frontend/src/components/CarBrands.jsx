"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "@/features/brands/brandsSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomNextArrow = ({ onClick, currentSlide, slideCount, slidesToShow }) => {
  const remainingSlides = slideCount - (currentSlide + slidesToShow);
  if (remainingSlides <= 0) return null;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
      aria-label="Next slide"
    >
      <svg 
        className="w-5 h-5 text-gray-700" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
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
      <svg 
        className="w-5 h-5 text-gray-700" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
    </button>
  );
};

export default function CarBrands() {
  const dispatch = useDispatch();
  const { items: brands, status, error } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        }
      }
    ]
  };

  // Fallback brand if not enough from API
  const fallbackBrands = [
    {
      id: 'fallback-1',
      name: 'TestBrand',
      logo: '/images/brands/bmw-logo.png',
    },
  ];

  const displayBrands = brands.length < 7
    ? [...brands, ...fallbackBrands]
    : brands;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
  <h2 className="mb-6 text-[24px] leading-[150%] tracking-[1.5%] font-bold font-sans text-[#1F2937]">Car brand</h2>
        <div className="relative carousel-container overflow-hidden ">
          {status === 'loading' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="rounded-lg bg-gray-100 h-24 animate-pulse"/>
              ))}
            </div>
          ) : status === 'failed' ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-2">Failed to load brands: {error}</p>
              <button 
                onClick={() => dispatch(fetchBrands())}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            <Slider {...settings}>
              {displayBrands.filter(brand => brand.name.toLowerCase() !== 'bmw').map((brand) => (
                <div key={brand.id} className="px-2">
                  <div className="rounded-lg bg-white p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-24 flex items-center justify-center">
                    <Image
                      src={brand.logo || `/images/brands/${brand.name.toLowerCase()}-logo.png`}
                      alt={brand.name}
                      width={120}
                      height={48}
                      className="object-contain max-h-12"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      <style jsx global>{`
        .carousel-container .slick-track {
          display: flex !important;
          align-items: center;
          gap: 1rem;
        }
        .carousel-container .slick-slide {
          height: inherit !important;
        }
        .carousel-container .slick-slide > div {
          height: 100%;
        }
  /* Remove hiding arrows on small screens so arrows always show */
      `}</style>
    </section>
  );
}
