import ProductCard from "./ProductCard";

export default function SimilarCars() {
  const similarCars = [
    {
      id: 2,
      name: "Lamborghini Huracan",
      price: "$267,292",
      type: "Coupe",
      seats: 2,
      installment: "$4,009.38/month",
      image: "/images/cars/lamborghini-huracan.jpg"
    },
    {
      id: 3,
      name: "Porsche 911 Turbo S",
      price: "$126,484",
      type: "Coupe",
      seats: 2,
      installment: "$1,987.26/month",
      image: "/images/cars/porsche-911.jpg"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h3 className="text-xl font-semibold mb-6">Similar Cars</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {similarCars.map((car) => (
          <ProductCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
