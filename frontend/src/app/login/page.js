
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");

  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!userFound) {
      setError("The user is not found. You have to register first.");
      return;
    }

    
    localStorage.setItem("user", JSON.stringify(userFound));
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
  
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo.png" 
              alt="Carvista Logo"
              className="h-12"
            />
          </div>

          <h1 className="mb-2 text-2xl font-bold">Welcome to Carvista</h1>
          <p className="mb-6 text-gray-600">Enter and find your dream car now.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
            <div>
              <input
                type="email"
                placeholder="Input your email"
                {...register("email", { required: "Email is required" })}
                className="w-full rounded-lg border p-3"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Input your password"
                {...register("password", { required: "Password is required" })}
                className="w-full rounded-lg border p-3 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "hide" : "show"}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            
            {error && <p className="text-sm text-red-500">{error}</p>}

            
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Do you not have an account yet?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block w-1/2">
        <img
          src="/images/login/blue-car.png"
          alt="Carvista Login"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}
