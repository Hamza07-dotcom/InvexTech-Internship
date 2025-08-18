"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "@/features/cars/carsSlice";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import Image from "next/image";
import Link from "next/link";

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

const getCarImageUrl = (car) => {
  if (car.image && (car.image.startsWith('http') || car.image.startsWith('/'))) {
    if (!car.image.includes('bmw5.jpg')) {
      return car.image;
    }
  }

  const modelToImage = {
    'bmw m5': '/images/cars/bmw-m5.jpg',
    'ferrari f8': '/images/cars/ferrari-f8.png',
    'camaro': '/images/cars/camaro.png',
    'chevrolet camaro': '/images/cars/camaro.png',
    'porsche 911': '/images/cars/porshe-911.png',
    'lamborghini': '/images/cars/lamborgini.png',
    'volvo xc90': '/images/cars/volvo.png',
    'volvo': '/images/cars/volvo.png'
  };

  const modelKey = car.model?.toLowerCase();
  if (modelKey && modelToImage[modelKey]) {
    return modelToImage[modelKey];
  }

  const brandDefaults = {
    'ferrari': '/images/cars/ferrari-f8.png',
    'chevrolet': '/images/cars/camaro.png',
    'porsche': '/images/cars/porshe-911.png',
    'lamborghini': '/images/cars/lamborgini.png',
    'volvo': '/images/cars/volvo.png'
  };

  const brandKey = car.brand?.toLowerCase();
  if (brandKey && brandDefaults[brandKey]) {
    return brandDefaults[brandKey];
  }

  return '/images/img.png';
};
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CarRecommendation() {
  const dispatch = useDispatch();
  const { items: cars, status, error } = useSelector((state) => state.cars);
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    if (cars?.length) {
      console.log('Cars data available:', cars.length, 'cars');
      console.log('First car example:', cars[0]);
    }
  }, [cars]);

  if (status === "loading") return (
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
  );

  if (error) return (
    <div className="text-center py-8">
      <p className="text-red-500 mb-2">Failed to load cars: {error}</p>
      <button 
        onClick={() => dispatch(fetchCars())}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );

  console.log('Cars data:', cars); 

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
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const filteredCars = cars.filter(car => car.id !== 1);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recommended Cars</h2>
        <Link href="/products" className="text-sm text-blue-600">See all</Link>
      </div>
      <div className="relative carousel-container overflow-hidden">
        <style jsx global>{`
          .carousel-container .slick-dots {
            bottom: -35px;
          }
          .carousel-container .slick-dots li button:before {
            color: #000;
            opacity: 0.25;
            font-size: 8px;
          }
          .carousel-container .slick-dots li.slick-active button:before {
            opacity: 0.75;
          }
          .carousel-container .slick-slider {
            margin: 0 -5px;  /* Compensate for slide padding */
          }
          .carousel-container .slick-slide {
            padding: 0 5px;
            box-sizing: border-box;
          }
          .carousel-container .slick-slide > div {
            width: 100%;
          }
          @media (max-width: 640px) {
            .carousel-container .slick-arrow {
              display: none !important;
            }
          }
        `}</style>
        <Slider {...settings}>
          {filteredCars.map((car) => (
        <Link key={car.id} href={`/product/${car.id}`}>
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
              <Image
                src={getCarImageUrl(car)}
                alt={car.model || 'Car image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                priority
                onError={(e) => {
                  const targetEl = e.target;
                  if (!targetEl.src.includes('img.png')) {
                    targetEl.src = '/images/img.png';
                  }
                }}
              />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{car.model}</h3>
              <p className="text-gray-500 text-sm sm:text-base">{car.brand} {car.year}</p>
              <p className="text-blue-600 font-bold mt-3 text-lg sm:text-xl">
                ${new Intl.NumberFormat('en-US').format(car.price)}
              </p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{car.description}</p>
            </div>
          </div>
        </Link>
        ))}
        </Slider>
      </div>
    </div>
  );
}
