"use client";
import { useState } from "react";

export default function HowToBuyOrTrade() {
  const [activeTab, setActiveTab] = useState("buy");

  const buySteps = [
    { img: "/images/buy car/01.png", text: "Search and find your dream car, fully available on Carvista." },
    { img: "/images/buy car/02.jpg", text: "Explore comprehensive details of your dream car." },
    { img: "/images/buy car/03.jpg", text: "Make your choice and submit your dream car purchase." },
    { img: "/images/buy car/04.png", text: "Our team will contact you as soon as possible." }
  ];

  const tradeSteps = [
    { img: "/images/trade1.jpg", text: "Get your current car inspected and appraised by our team." },
    { img: "/images/trade2.jpg", text: "Receive a trade-in offer based on your car’s condition and market value." },
    { img: "/images/trade3.jpg", text: "Choose your next car from our collection and apply the trade-in value." },
    { img: "/images/trade4.jpg", text: "Complete the paperwork and drive away with your new car." }
  ];

  const steps = activeTab === "buy" ? buySteps : tradeSteps;

  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Tabs */}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={() => setActiveTab("buy")}
            className={`pb-1 ${
              activeTab === "buy"
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            How to buy car
          </button>
          <button
            onClick={() => setActiveTab("trade")}
            className={`pb-1 ${
              activeTab === "trade"
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            How to trade-in
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              {activeTab === "buy"
                ? "Confused about how to buy or trade in a car?"
                : "Trading in your car is simple with Carvista!"}
            </h2>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={step.img}
                  alt={`Step ${idx + 1}`}
                  className="rounded-lg mb-3 object-cover w-full h-40"
                />
                <p className="text-gray-700 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
