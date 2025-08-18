export default function CarCard({ car }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{car.name}</h3>
        <p className="text-blue-600 font-bold">
          ${car.price.toLocaleString()}
        </p>
        <div className="flex gap-2 text-xs text-gray-500 mt-1">
          <span>{car.type}</span>
          <span>{car.seats}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Installment ${car.installment.toLocaleString()}/month
        </p>
      </div>
    </div>
  );
}
