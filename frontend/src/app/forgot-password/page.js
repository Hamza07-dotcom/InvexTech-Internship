// app/login/page.jsx
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* LOGO outside card, top-left */}
      <div className="absolute top-6 left-6">
        <img
          src="/images/logo.png"  // put logo file in /public/images/logo.png
          alt="Carvista Logo"
          className="h-10 w-auto"
        />
      </div>

      {/* LEFT SIDE - Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-2xl font-bold">Welcome to Carvista</h1>
          <p className="mb-6 text-gray-600">Enter and find your dream car now.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border p-3"
            />
            <input
              type="password"
              placeholder="Input your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border p-3"
            />

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
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              {loading ? "Logging in..." : "Login"}
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

      {/* RIGHT SIDE - Image */}
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
