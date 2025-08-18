"use client";
import React, { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const userName = user?.name || user?.username || user?.email;
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Carvista"
              className="h-5 sm:h-6 w-auto"
            />
          </Link>

          {/* Middle - Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-xs sm:text-sm font-medium">
            <div className="relative group">
              <button className="hover:text-blue-600 flex items-center">
                Buy car <span className="ml-1">▼</span>
              </button>
              <div className="absolute left-0 mt-[-10px] hidden w-36 sm:w-40 rounded-lg bg-white shadow-md group-hover:block z-10">
                <Link href="/products" className="block px-3 py-2 hover:bg-gray-50">
                  All Cars
                </Link>
                <Link href="/products?type=suv" className="block px-3 py-2 hover:bg-gray-50">
                  SUV
                </Link>
                <Link href="/products?type=coupe" className="block px-3 py-2 hover:bg-gray-50">
                  Coupe
                </Link>
              </div>
            </div>
            <Link href="/trade-in" className="hover:text-blue-600">Trade-in</Link>
            <Link href="/promo" className="hover:text-blue-600">Promo</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact us</Link>
          </div>

          {/* Right - Location & Auth (Desktop) */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 text-xs sm:text-sm">
            <span className="flex items-center text-gray-600">
              <img
                src="/images/locate.png"
                alt="Location"
                className="h-3 sm:h-4 mr-1"
              />
              South Tangerang
            </span>
            {user ? (
              <>
                <span className="text-gray-700">{userName}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-500 px-2 sm:px-3 py-1 text-white hover:bg-red-600 text-xs sm:text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-600">Login</Link>
                <Link href="/register" className="hover:text-blue-600 ml-2">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1"
            >
              <img
                src={mobileOpen ? "/images/close.png" : "/images/more.png"}
                alt="Menu"
                className="h-4 sm:h-5 w-4 sm:w-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-3 sm:px-4 py-3 space-y-3 text-sm sm:text-base font-medium">
            <div>
              <p className="font-semibold">Buy car</p>
              <div className="ml-4 space-y-2">
                <Link href="/products" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">
                  All Cars
                </Link>
                <Link href="/products?type=suv" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">
                  SUV
                </Link>
                <Link href="/products?type=coupe" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">
                  Coupe
                </Link>
              </div>
            </div>
            <Link href="/trade-in" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">
              Trade-in
            </Link>
            <Link href="/promo" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">
              Promo
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block hover:text-blue-600">
              Contact us
            </Link>
            <div className="pt-3 border-t">
              <span className="flex items-center text-gray-600 mb-2">
                <img
                  src="/images/locate.png"
                  alt="Location"
                  className="h-3 sm:h-4 mr-1"
                />
                South Tangerang
              </span>
              {user ? (
                <>
                  <span className="text-gray-700 block mb-2">{userName}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block hover:text-blue-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block hover:text-blue-600"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
