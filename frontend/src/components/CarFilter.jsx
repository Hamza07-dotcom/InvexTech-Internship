export default function CarFilter() {
  return (
    <div className="border rounded-lg bg-white p-4 space-y-6">
      <div>
        <h4 className="font-semibold">Car brand</h4>
        <div className="mt-2 space-y-2">
          <p>Brand logos here</p>
        </div>
        <button className="text-blue-600 text-sm mt-2">See all</button>
      </div>

      <div>
        <h4 className="font-semibold">Car type</h4>
        <div className="mt-2 space-y-1">
          <p>Type icons here</p>
        </div>
        <button className="text-blue-600 text-sm mt-2">See all</button>
      </div>

      <div>
        <h4 className="font-semibold">Transmission</h4>
        <div className="mt-2 space-y-1">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Automatic
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Manual
          </label>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">Fuel</h4>
        <div className="mt-2 space-y-1">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Gas
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Electric
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Hybrid
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Diesel
          </label>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">Price</h4>
        <input
          type="number"
          placeholder="Min"
          className="border rounded w-full p-1 mt-1 text-sm"
        />
        <input
          type="number"
          placeholder="Max"
          className="border rounded w-full p-1 mt-2 text-sm"
        />
      </div>
    </div>
  );
}
