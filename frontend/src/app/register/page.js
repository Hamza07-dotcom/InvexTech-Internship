// app/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.find((u) => u.email === data.email);
    if (userExists) {
      setError("User already exists with this email.");
      return;
    }

    // Add new user
    users.push({ email: data.email, password: data.password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Successfully registered! You can now log in.");
    // Optionally redirect after a short delay
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE - Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo.png" // 👉 put your logo in /public/images/
              alt="Carvista Logo"
              className="h-12"
            />
          </div>

          <h1 className="mb-2 text-2xl font-bold">Create an Account</h1>
          <p className="mb-6 text-gray-600">Register to find your dream car.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full rounded-lg border p-3"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full rounded-lg border p-3"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Show error */}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {/* Show success */}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Image */}
      <div className="hidden md:block w-1/2">
        <img
          src="/images/login/blue-car.png"
          alt="Register Carvista"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}
