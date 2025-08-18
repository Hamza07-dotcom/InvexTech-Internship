
"use client";
import React, { useState, useEffect } from "react";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  
  const handleSendOtp = () => {
    if (!input) {
      setError("Please enter your email or phone number.");
      return;
    }
    setError("");
    const generatedOtp = generateOTP();
    setOtp(generatedOtp);
    localStorage.setItem("otp", generatedOtp);
    localStorage.setItem("userContact", input);
    setStep(2);
  };

  
  const handleVerifyOtp = () => {
    const storedOtp = localStorage.getItem("otp");
    if (enteredOtp === storedOtp) {
      setError("");
      setStep(3);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  
  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    const userContact = localStorage.getItem("userContact");
    localStorage.setItem(`password_${userContact}`, newPassword);
    setError("");
    setStep(4);
    setTimeout(() => {
      setRedirecting(true);
      window.location.href = "/login";
    }, 3000); 
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
      {step === 1 && (
        <>
          <label className="block mb-2">Email or Phone Number</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded mb-3"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter your email or phone"
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <label className="block mb-2">Enter OTP</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded mb-3"
            value={enteredOtp}
            onChange={e => setEnteredOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <div className="mb-2 text-xs text-gray-500">(Simulation: OTP is <span className="font-bold">{otp}</span>)</div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-3"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-3"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </>
      )}
      {step === 4 && (
        <div className="text-green-600 text-center font-semibold">
          Password changed successfully! You can now login with your new password.<br />
          {!redirecting && (
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => window.location.href = "/login"}
            >
              Go to Login
            </button>
          )}
          {redirecting && (
            <div className="mt-2 text-xs text-gray-500">Redirecting to login...</div>
          )}
        </div>
      )}
      {error && <div className="mt-3 text-red-600 text-center">{error}</div>}
    </div>
  );
}
