import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ car }) {
  return (
    <Link href={`/product/${car.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
        <Image
          src={car.image}
          alt={car.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{car.name}</h3>
          <p className="text-blue-600 font-bold mt-1">${car.price}</p>
        </div>
      </div>
    </Link>
  );
}
