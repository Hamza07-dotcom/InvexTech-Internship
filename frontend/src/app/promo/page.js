"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PromoPage() {
  const promos = [
    { title: "10% Down payment discount", code: "10DPCAMARO", desc: "Valid for all Chevrolet Camaro purchases" },
    { title: "$500 off all Chevrolet cars", code: "500CHEVCARS", desc: "Applies to any Chevrolet car" },
    { title: "Free servicing for 1 year", code: "FREESERVICE2023", desc: "Available for all SUV purchases" },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Promo code "${code}" copied to clipboard!`);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Active Promotions</h1>
        <p className="mb-8 text-gray-600">Take advantage of our latest offers and discounts.</p>

        <div className="space-y-6">
          {promos.map((promo, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{promo.title}</h3>
                <p className="text-gray-500">{promo.desc}</p>
                <p className="mt-1 font-mono text-blue-600">{promo.code}</p>
              </div>
              <button
                onClick={() => copyCode(promo.code)}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:mt-0"
              >
                Copy Code
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
