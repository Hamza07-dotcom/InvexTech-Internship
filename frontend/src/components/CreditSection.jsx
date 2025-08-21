"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "@/features/cars/carsSlice";

export default function CreditSection() {
  const dispatch = useDispatch();
  const { items: cars } = useSelector((state) => state.cars);
  const [activeTab, setActiveTab] = useState("simulation");
  const [selectedCar, setSelectedCar] = useState(null);
  const [carPrice, setCarPrice] = useState(13000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [loanTerm, setLoanTerm] = useState(5);
  const [financier, setFinancier] = useState("ABC Finance");
  const [customPrice, setCustomPrice] = useState(false);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const calculateLoan = () => {
    const price = selectedCar ? selectedCar.price : carPrice;
    const downPayment = (price * downPaymentPercent) / 100;
    const adminFee = 100;
    const totalDownPayment = downPayment + adminFee;
    const loanAmount = price - downPayment;
    
    const annualInterestRate = 0.05; 
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    const totalCost = (monthlyPayment * numberOfPayments) + totalDownPayment;
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      loanAmount: Math.round(loanAmount),
      totalDownPayment: Math.round(totalDownPayment),
      totalCost: Math.round(totalCost)
    };
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 ">
        
        <div className="flex items-center justify-center gap-6 mb-8 text-center">
          <button
            onClick={() => setActiveTab("simulation")}
            className={`pb-1 ${
              activeTab === "simulation"
                ? "text-[#1F5095] font-sans font-semibold border-b-2 border-[#1F5095] lg:text-[20px]"
                : "text-[#8F949B] hover:text-[#1F5095]"
            }`}
          >
            Credit simulation
          </button>
          <button
            onClick={() => setActiveTab("howto")}
            className={`pb-1 ${
              activeTab === "howto"
                ? "text-[#1F5095] font-sans lg:text-[20px] font-semibold border-b-2 border-[#1F5095]"
                : "text-[#8F949B] hover:text-blue-600"
            }`}
          >
            How to apply for credit
          </button>
        </div>

        {activeTab === "simulation" && (
          <div className="bg-[#F0F6FF] rounded-xl shadow-md p-6 px-[200px]">
            <h2 className="text-2xl font-bold mb-2 text-center">Simulate your credit now!</h2>
            <p className="text-gray-500 mb-6 text-center">
              We will help estimate your credit costs quickly and easily.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
              <div className="space-y-4">
                <select 
                  className="w-full bg-[#FFFFFF] border border-gray-300 rounded-md px-3 py-2"
                  value={selectedCar ? selectedCar.id : ""}
                  onChange={(e) => {
                    const car = cars.find(c => c.id === parseInt(e.target.value));
                    setSelectedCar(car);
                    setCustomPrice(false);
                  }}
                >
                  <option value="">Select car brand, model or variant</option>
                  {cars.map(car => (
                    <option key={car.id} value={car.id}>
                      {car.brand} {car.model} - ${new Intl.NumberFormat('en-US').format(car.price)}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <span className="flex-1 border-t border-gray-300"></span>
                  <span className="text-gray-400">or</span>
                  <span className="flex-1 border-t border-gray-300"></span>
                </div>
                <input
                  type="text"
                  placeholder="Car price"
                  value={customPrice ? `$${new Intl.NumberFormat('en-US').format(carPrice)}` : selectedCar ? `$${new Intl.NumberFormat('en-US').format(selectedCar.price)}` : `$${new Intl.NumberFormat('en-US').format(carPrice)}`}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                    setCarPrice(value || 0);
                    setCustomPrice(true);
                    setSelectedCar(null);
                  }}
                  className="w-full bg-[#FFFFFF] border border-gray-300 rounded-md px-3 py-2"
                />
                <div className="flex gap-4">
                  <select 
                    className="w-1/2 bg-[#FFFFFF] border border-gray-300 rounded-md px-3 py-2"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                  >
                    <option value={10}>10%</option>
                    <option value={20}>20%</option>
                    <option value={30}>30%</option>
                    <option value={40}>40%</option>
                    <option value={50}>50%</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Down payment"
                    value={`$${new Intl.NumberFormat('en-US').format(((selectedCar?.price || carPrice) * downPaymentPercent) / 100)}`}
                    readOnly
                    className="w-1/2 bg-[#FFFFFF] border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex gap-4">
                  <select 
                    className="w-1/2 bg-[#FFFFFF] border border-gray-300 rounded-md px-3 py-2"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  >
                    <option value={1}>1 year</option>
                    <option value={2}>2 years</option>
                    <option value={3}>3 years</option>
                    <option value={4}>4 years</option>
                    <option value={5}>5 years</option>
                    <option value={6}>6 years</option>
                    <option value={7}>7 years</option>
                  </select>
                  <select 
                    className="w-1/2 bg-[#FFFFFF] border border-gray-300 rounded-md px-3 py-2"
                    value={financier}
                    onChange={(e) => setFinancier(e.target.value)}
                  >
                    <option value="ABC Finance">ABC Finance</option>
                    <option value="XYZ Bank">XYZ Bank</option>
                    <option value="Car Loan Pro">Car Loan Pro</option>
                  </select>
                </div>
              </div>

              <div className="border bg-[#ffffff] border-gray-200  rounded-md p-6 flex flex-col justify-between">
                <div className="bg-[#FFFFFF]">
                  <p className="text-sm text-gray-500">Monthly installments*</p>
                  <p className="text-4xl font-bold text-blue-600">
                    ${new Intl.NumberFormat('en-US').format(calculateLoan().monthlyPayment)}
                  </p>
                  {selectedCar && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected car: {selectedCar.brand} {selectedCar.model}
                    </div>
                  )}
                  <hr className="my-4" />
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total loan amount</span>
                    <span>${new Intl.NumberFormat('en-US').format(calculateLoan().loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Down payment ({downPaymentPercent}%) + admin fee ($100)</span>
                    <span>${new Intl.NumberFormat('en-US').format(calculateLoan().totalDownPayment)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Total cost</span>
                    <span>${new Intl.NumberFormat('en-US').format(calculateLoan().totalCost)}</span>
                  </div>
                </div>
                <p className="mt-4 text-xs bg-[#F0F6FF] text-gray-400">
                  *The results of the calculation provided here are for simulation purposes only. 
                  Actual calculations may differ from the results shown here.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "howto" && (
          <div className="bg-[#F0F6FF] rounded-xl justify-center shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">How to apply for credit</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-center py-[20px] ">
              <li>Choose your desired car from our listings.</li>
              <li>Use the credit simulator to estimate your monthly installments.</li>
              <li>Submit your application with the required documents.</li>
              <li>Our finance partner will review and approve your application.</li>
              <li>Drive away in your new car!</li>
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
