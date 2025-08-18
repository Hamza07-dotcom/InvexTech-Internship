"use client";
import Link from "next/link";

export default function HowToApplyForCredit() {
  return (
    <section className="bg-blue-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          <Link
            href="/credit-simulation"
            className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600"
          >
            Credit simulation
          </Link>
          <Link
            href="/how-to-apply-for-credit"
            className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium"
          >
            How to apply for credit
          </Link>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold mb-4">How to Apply for Credit</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Choose your desired car from our listings.</li>
          <li>Open the Credit Simulation page and calculate your financing.</li>
          <li>Prepare required documents (ID, income proof, etc.).</li>
          <li>Submit your credit application online or in person.</li>
          <li>Wait for approval and complete the purchase process.</li>
        </ol>
      </div>
    </section>
  );
}
