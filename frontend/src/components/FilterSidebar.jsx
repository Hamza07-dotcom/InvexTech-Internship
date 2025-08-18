export default function FilterSidebar() {
  return (
    <div className="space-y-6">
      {/* Car brand */}
      <div>
        <h4 className="font-semibold mb-3">Car brand</h4>
        <div className="grid grid-cols-3 gap-3">
          {["/images/brands/volvo.png","/images/brands/landrover.png","/images/brands/chevrolet.png","/images/brands/bmw.png","/images/brands/porsche.png","/images/brands/maserati.png"].map((src, i) => (
            <div key={i} className="flex justify-center">
              <img src={src} alt="brand" className="h-8 object-contain" />
            </div>
          ))}
        </div>
        <button className="mt-2 text-sm text-blue-600">See all</button>
      </div>

      {/* Car type */}
      <div>
        <h4 className="font-semibold mb-3">Car type</h4>
        <div className="grid grid-cols-3 gap-3 text-sm text-center">
          {["MPV","SUV","Sedan","Coupe","Van","Truck"].map((type) => (
            <div key={type} className="p-2 border rounded-lg hover:border-blue-600">{type}</div>
          ))}
        </div>
        <button className="mt-2 text-sm text-blue-600">See all</button>
      </div>

      {/* Transmission */}
      <div>
        <h4 className="font-semibold mb-3">Transmission</h4>
        {["Automatic","Manual"].map((t) => (
          <label key={t} className="block text-sm text-gray-700">
            <input type="checkbox" className="mr-2" /> {t}
          </label>
        ))}
      </div>

      {/* Fuel */}
      <div>
        <h4 className="font-semibold mb-3">Fuel</h4>
        {["Gas","Electric","Hybrid","Diesel"].map((f) => (
          <label key={f} className="block text-sm text-gray-700">
            <input type="checkbox" className="mr-2" /> {f}
          </label>
        ))}
      </div>

      {/* Engine capacity */}
      <div>
        <h4 className="font-semibold mb-3">Engine capacity</h4>
        {["<1000 cc","1000 - 2000 cc","2000 - 3000 cc",">3000 cc"].map((cap) => (
          <label key={cap} className="block text-sm text-gray-700">
            <input type="checkbox" className="mr-2" /> {cap}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <h4 className="font-semibold mb-3">Price</h4>
        <div className="flex space-x-2">
          <input type="number" placeholder="Min" className="w-1/2 rounded-lg border border-gray-300 px-2 py-1" />
          <input type="number" placeholder="Max" className="w-1/2 rounded-lg border border-gray-300 px-2 py-1" />
        </div>
      </div>

      {/* Installments */}
      <div>
        <h4 className="font-semibold mb-3">Installments</h4>
        {["<$1,000/month","<$2,000/month",">$2,000/month"].map((opt) => (
          <label key={opt} className="block text-sm text-gray-700">
            <input type="radio" name="installment" className="mr-2" /> {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
