"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function TradeInPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    carBrand: "",
    carModel: "",
    carYear: "",
    carMileage: "",
    condition: "Good",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trade-in Request Submitted:", form);
    alert("Trade-in request submitted! We will contact you soon.");
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Trade-in Your Car</h1>
        <p className="mb-8 text-gray-600">
          Fill out the form below and we’ll provide an estimated trade-in value for your car.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-6 shadow-md space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Car Brand</label>
              <input
                type="text"
                name="carBrand"
                value={form.carBrand}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Car Model</label>
              <input
                type="text"
                name="carModel"
                value={form.carModel}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Car Year</label>
              <input
                type="number"
                name="carYear"
                value={form.carYear}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mileage (km)</label>
              <input
                type="number"
                name="carMileage"
                value={form.carMileage}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Condition</label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
