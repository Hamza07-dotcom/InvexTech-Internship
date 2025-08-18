"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "@/features/cars/carsSlice";

export default function CarDetailClient() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCar: car, status, error } = useSelector((state) => state.cars);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="animate-pulse">
            <div className="h-[420px] w-full bg-gray-200 rounded-xl mb-8"></div>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="lg:col-span-4">
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchCarById(id))}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!car) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">Car not found</p>
          </div>
        </div>
      </section>
    );
  }

  const images = car.images;

  const quickSpecs = [
    { label: "Car type", value: car.type || "Sport" },
    { label: "Engine capacity", value: `${car.engineCapacity} cc` },
    { label: "Transmission", value: car.transmission },
    { label: "Fuel", value: car.fuel },
    { label: "Year", value: car.year },
    { label: "Seats", value: car.seats || "4" },
    { label: "Engine HP", value: car.horsePower || "450" },
    { label: "Drive type", value: car.driveType || "RWD" },
  ];

  const specifications = car.specifications;

  const variants = car.variants?.map(variant => ({
    ...variant,
    installment: `$${(Number(variant.price.replace(/[^0-9.-]+/g,"")) * 0.015).toFixed(2)}/month`,
  }));

  const promos = [
    { title: `10% Down payment discount for ${car.brand}`, code: `10DP${car.brand.toUpperCase()}` },
    { title: `$500 off all ${car.brand} cars`, code: `500${car.brand.toUpperCase()}` },
  ];

  const recommendations = car.recommendations?.map(rec => ({
    ...rec,
    meta: `${rec.type} · ${rec.seats} seat`,
    installment: `$${(Number(rec.price.replace(/[^0-9.-]+/g,"")) * 0.015).toFixed(2)}/month`,
  }));

  
  const price = 32495;
  const adminFee = 100;
  const dpPct = 10;
  const tenorYears = 5;
  const dpVal = +(price * (dpPct / 100)).toFixed(2);
  const months = tenorYears * 12;
  const monthly = +(((price - dpVal) / months) || 0).toFixed(2);
  const totalLoan = +(price - dpVal).toFixed(2);
  const totalCost = +(price + adminFee).toFixed(2);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 grid lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8">
          
          <div className="relative rounded-xl overflow-hidden border border-gray-200">
            <img
              src={images[currentImageIndex]}
              alt={`${car.brand} ${car.model} image ${currentImageIndex + 1}`}
              className="w-full h-[420px] object-cover"
              onError={(e) => {
                if (!e.target.src.includes('img.png')) {
                  e.target.src = '/images/img.png';
                }
              }}
            />

            
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="text-[11px] font-medium rounded-full bg-white/90 px-2 py-1 shadow">
                {currentImageIndex + 1}/{images.length}
              </span>
              <span className="text-[11px] font-semibold rounded-full bg-white/90 px-2 py-1 shadow">
                Chevrolet
              </span>
            </div>

            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`h-14 w-20 overflow-hidden rounded-md border border-gray-200 ${
                    i === currentImageIndex ? "ring-2 ring-blue-600" : "opacity-85 hover:opacity-100"
                  }`}
                  aria-label={`${car.brand} ${car.model} image ${i + 1}`}
                >
                  <img 
                    src={src} 
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      if (!e.target.src.includes('img.png')) {
                        e.target.src = '/images/img.png';
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Specification</h2>

            {Object.entries(specifications).map(([section, items]) => (
              <div key={section} className="mt-4 rounded-xl border border-gray-200 p-5">
                <h3 className="mb-3 text-base font-semibold text-gray-900">{section}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 list-disc pl-5">
                  {items.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Variants</h2>
              <button className="text-sm font-medium text-blue-600 hover:underline">
                See other variants
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {variants.map((v) => (
                <div key={v.name} className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{v.name}</p>
                      <p className="text-xs text-gray-500">Manual, Gasoline</p>
                    </div>
                    <span
                      className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${
                        v.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{v.price}</p>
                      <p className="text-xs text-gray-600">Installment {v.installment}</p>
                    </div>
                    <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                      Choose
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Car recommendation</h2>
              <button className="text-sm font-medium text-blue-600 hover:underline">See all</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((r) => (
                <div key={r.name} className="rounded-xl border border-gray-200 overflow-hidden">
                  <img src={r.img} alt={r.name} className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <p className="font-semibold text-gray-900">{r.name}</p>
                    <p className="text-sm text-gray-800 mt-1">{r.price}</p>
                    <div className="mt-1 text-xs text-gray-600">{r.meta}</div>
                    <div className="mt-1 text-[11px] text-gray-500">Installment {r.installment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-6 space-y-5">
            
            <div className="rounded-xl border border-gray-200 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{car.brand}</p>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">{car.model}</h1>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">Starting from</p>
                  <p className="text-2xl font-extrabold text-gray-900">
                    ${new Intl.NumberFormat("en-US").format(car.price)}
                  </p>
                </div>
              </div>

              
              <button className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700">
                Submit a purchase
              </button>

              
              <div className="mt-3 grid grid-cols-3 gap-2">
                <button className="rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Trade-in
                </button>
                <button className="rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Brochure
                </button>
                <button className="rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Favorite
                </button>
              </div>
            </div>

            
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-3">See more</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {quickSpecs.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-gray-500">{s.label}</span>
                    <span className="font-medium text-gray-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-base font-semibold text-gray-900">Available promo</h3>
              <div className="mt-3 space-y-3">
                {promos.map((p) => (
                  <div key={p.code} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.code}</p>
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:underline">See detail</button>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-base font-semibold text-gray-900">Simulate your credit now!</h3>
              <p className="text-sm text-gray-500">
                We will help estimate your credit costs quickly and easily.
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Car variants</span>
                  <span className="font-medium">1LT</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Down payment</span>
                  <span className="font-medium">10% (${dpVal.toLocaleString()})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tenor</span>
                  <span className="font-medium">{tenorYears} years</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Financing Partner</span>
                  <span className="font-medium">ABC Finance</span>
                </div>

                <hr className="my-2" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Monthly installments*</span>
                  <span className="font-semibold">${monthly.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total loan amount</span>
                  <span className="font-medium">${totalLoan.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Down payment (10%) + admin fee ($100)</span>
                  <span className="font-medium">${(dpVal + adminFee).toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total cost</span>
                  <span className="font-semibold">${totalCost.toLocaleString()}</span>
                </div>

                <p className="mt-2 text-[11px] leading-4 text-gray-500">
                  *The results of the calculation provided here are for simulation purposes only.
                  Actual calculations may differ from the results shown. For more detailed information, please contact us.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
