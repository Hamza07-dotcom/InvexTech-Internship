"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '@/features/cars/carsSlice';

export default function FeaturedCars() {
  const dispatch = useDispatch();
  const { items: cars, status, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          Loading...
        </div>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-red-600">
          Error: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Featured Cars
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <Link
              key={car.id}
              href={`/product/${car.id}`}
              className="overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition block"
            >
              <Image
                src={car.image || '/images/cars/default-car.jpg'}
                alt={car.name}
                width={400}
                height={250}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {car.model || car.name}
                </h3>
                <p className="mt-2 text-blue-600 font-bold">${new Intl.NumberFormat('en-US').format(car.price)}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="mr-2">{car.year}</span>
                  <span className="mr-2">•</span>
                  <span>{car.brand}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
