"use client";
import { useState } from "react";
import Link from "next/link";

export default function CreditSimulation() {
  const [carPrice, setCarPrice] = useState(13000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [tenor, setTenor] = useState(5);
  const adminFee = 100;

  const downPayment = (carPrice * downPaymentPercent) / 100;
  const loanAmount = carPrice - downPayment;
  const monthlyInstallment = Math.round(loanAmount / (tenor * 12));

  return (
    <div className="bg-[#f3f6fb] py-10 px-6 rounded-2xl">
      {/* Navigation Tabs */}
      <div className="flex gap-6 mb-8 border-b border-gray-300">
        <Link
          href="/credit-simulation"
          className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium"
        >
          Credit simulation
        </Link>
        <Link
          href="/how-to-apply-for-credit"
          className="pb-2 text-gray-500 hover:text-blue-600"
        >
          How to apply for credit
        </Link>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-2">Simulate your credit now!</h2>
      <p className="text-gray-600 mb-8">
        We will help estimate your credit costs quickly and easily.
      </p>

      {/* Form + Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Select car brand, model or variant"
            className="w-full rounded-lg border border-gray-300 p-3 bg-white"
          />

          <div className="flex items-center gap-2 text-gray-400">
            <hr className="flex-1 border-gray-300" /> or{" "}
            <hr className="flex-1 border-gray-300" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Car price</label>
            <input
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 p-3 bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Down payment</label>
            <select
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 p-3 bg-white"
            >
              <option value={10}>10%</option>
              <option value={20}>20%</option>
              <option value={30}>30%</option>
            </select>
            <input
              type="number"
              value={downPayment}
              disabled
              className="w-full rounded-lg border border-gray-300 p-3 bg-white mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Tenor</label>
              <select
                value={tenor}
                onChange={(e) => setTenor(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 p-3 bg-white"
              >
                <option value={3}>3 years</option>
                <option value={5}>5 years</option>
                <option value={7}>7 years</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Financing Partner</label>
              <select className="w-full rounded-lg border border-gray-300 p-3 bg-white">
                <option>ABC Finance</option>
                <option>XYZ Finance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          <p className="text-gray-500 mb-2">Monthly installments*</p>
          <p className="text-blue-700 text-3xl font-bold mb-4">
            ${monthlyInstallment}
          </p>
          <hr className="mb-4" />
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Total loan amount</span>
            <span>${loanAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>
              Down payment ({downPaymentPercent}%) + admin fee (${adminFee})
            </span>
            <span>${(downPayment + adminFee).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total cost</span>
            <span>
              ${(carPrice + adminFee).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            *The results of the calculation provided here are for simulation
            purposes only. Actual calculations may differ from the results
            shown here. For more detailed information, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
