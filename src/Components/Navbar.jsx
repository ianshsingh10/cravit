"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { LogIn, LogOut, LayoutDashboard, UserCog } from "lucide-react"; // Import UserCog icon
import { useRouter } from "next/navigation";

export default function DynamicHeader() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/user/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setDropdownOpen(false);
      window.location.href = "/";
    }
  };

  const handleDashboardClick = () => {
    setDropdownOpen(false);
    if (user?.role === 'seller') {
      router.push("/seller/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  };

  const getInitials = (email) => {
    if (!email) return "";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 min-h-[84px]">
          <Link href="/" aria-label="Home">
            <Image
              src="/cravit-logo.jpg"
              alt="craVIT Logo"
              width={50}
              height={50}
              className="rounded-full"
              priority
            />
          </Link>

          {isLoading ? (
            <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user ? (
            // --- Logged-in View ---
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                className="cursor-pointer w-11 h-11 bg-orange-500 text-white flex items-center justify-center rounded-full font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {getInitials(user.email)}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="px-4 py-3 text-sm text-gray-700 border-b">
                    <p className="font-semibold truncate">
                      {user.name || "User"}
                    </p>
                    <p className="truncate text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={handleDashboardClick}
                    className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </button>
                  
                  {/* --- NEW: Edit Profile Button --- */}
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push("/user/profile");
                    }}
                    className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <UserCog size={16} />
                    Edit Profile
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // --- Logged-out View ---
            <>
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  href="/user/login"
                  className="text-gray-600 font-semibold hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/user/register"
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
              <div className="sm:hidden flex items-center gap-2">
                <Link
                  href="/user/login"
                  className="text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <LogIn size={22} />
                </Link>
                <Link
                  href="/user/register"
                  className="bg-orange-500 text-white font-bold py-2 px-3 rounded-full text-sm"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
