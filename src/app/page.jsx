"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, UtensilsCrossed, Star, BookOpen, LogIn, LogOut, User, Phone, Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import { useRouter } from "next/navigation";


// --- DUMMY DATA (Keep as is) ---
const features = [
  {
    icon: <Search size={32} className="text-orange-500" />,
    title: "Browse Canteens",
    description: "Explore all food outlets and canteens across the VIT campus.",
  },
  {
    icon: <BookOpen size={32} className="text-orange-500" />,
    title: "View Digital Menus",
    description: "Access up-to-date menus from your favorite spots anytime.",
  },
  {
    icon: <Star size={32} className="text-orange-500" />,
    title: "Read & Write Reviews",
    description: "Share your experience and see what others are saying.",
  },
  {
    icon: <UtensilsCrossed size={32} className="text-orange-500" />,
    title: "Pre-order Meals",
    description: "Skip the queue by ordering your food in advance.",
  },
];

const testimonials = [
  {
    quote: "craVIT is a lifesaver! I can check menus and decide what to eat before even leaving my room. The reviews are super helpful too.",
    author: "Priya S.",
    class: "B.Tech CSE, 2nd Year",
  },
  {
    quote: "Finally, a single place to see all the food options at VIT. The pre-order feature saves me so much time between classes.",
    author: "Rohan M.",
    class: "M.Tech Mech, 1st Year",
  },
  {
    quote: "As a faculty member, finding a quick and good meal is crucial. craVIT makes it incredibly easy. Highly recommended!",
    author: "Dr. Anjali Verma",
    class: "Professor, SCOPE",
  },
];

const outlets = [
  { name: "Mayuri (AB1)", image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri" },
  { name: "Mayuri (AB2)", image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri" },
  { name: "Mayuri (Canteen)", image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri" },
  { name: "Bistro by Safal", image: "https://placehold.co/400x300/E6F4FF/333333?text=Bistro" },
  { name: "Safal (Canteen)", image: "https://placehold.co/400x300/E6F4FF/333333?text=Safal" },
  { name: "AB Dakshin", image: "https://placehold.co/400x300/FFE6E6/333333?text=Dakshin" },
  { name: "UB (UnderBelly)", image: "https://placehold.co/400x300/F0E6FF/333333?text=UB" },
];


// --- UPDATED DYNAMIC HEADER COMPONENT ---
const DynamicHeader = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/user/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // Set user to null if not found
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
      await fetch('/api/user/logout', { method: 'POST' });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setDropdownOpen(false);
      window.location.href = '/'; // Force a full page reload to clear all state
    }
  };

  const getInitials = (email) => {
    if (!email) return '';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 min-h-[84px]">
          <a href="/" aria-label="Home">
            <Image
              src="/cravit-logo.jpg"
              alt="craVIT Logo"
              width={50}
              height={50}
              className='rounded-full'
              priority
            />
          </a>

          {isLoading ? (
            <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user ? (
            // --- Logged-in View ---
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                className="w-11 h-11 bg-orange-500 text-white flex items-center justify-center rounded-full font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {getInitials(user.email)}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="px-4 py-3 text-sm text-gray-700 border-b">
                    <p className="font-semibold truncate">{user.name || 'User'}</p>
                    <p className="truncate text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
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
                <a href="/login" className="text-gray-600 font-semibold hover:text-orange-500 transition-colors">
                  Login
                </a>
                <a href="/register" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 transition-colors duration-300">
                  Register
                </a>
              </div>
              <div className="sm:hidden flex items-center gap-2">
                <a href="/login" className="text-gray-600 p-2 rounded-full hover:bg-gray-100">
                  <LogIn size={22} />
                </a>
                <a href="/register" className="bg-orange-500 text-white font-bold py-2 px-3 rounded-full text-sm">
                  Register
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};


export default function CraVitLandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <DynamicHeader />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white px-4">
          <Image
            src="https://placehold.co/1200x800/FF5722/FFFFFF?text=Campus+Food+Life"
            alt="Students enjoying food on campus"
            fill
            className="object-cover brightness-50"
            priority
            unoptimized={true}
          />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Fuel Your Cravings at VIT!
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-md">
              Your one-stop portal for all things food on campus. Browse, review, and order with ease.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#features" className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105 shadow-lg">
                Start Exploring
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How craVIT Helps You</h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Everything you need for a hassle-free food experience.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center">
                  <div className="flex justify-center items-center h-16 w-16 bg-orange-100 rounded-full mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Participating Outlets Section */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Partner Outlets</h2>
              <p className="mt-3 text-lg text-gray-600">Your favorite canteens, all in one place.</p>
            </div>
            <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 sm:space-x-0">
              {outlets.map((outlet) => (
                <div key={outlet.name} className="flex-shrink-0 w-64 sm:w-auto bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="relative h-40 w-full">
                    <Image
                      src={outlet.image}
                      alt={`Image of ${outlet.name}`}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">{outlet.name}</h3>
                  </div>
                </div>
              ))}
            </div>
            <style jsx>{`
                    .overflow-x-auto::-webkit-scrollbar {
                        height: 8px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 10px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-thumb {
                        background: #e0e0e0;
                        border-radius: 10px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                        background: #cccccc;
                    }
                `}</style>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Users Say</h2>
              <p className="mt-3 text-lg text-gray-600">Real stories from students and staff at VIT.</p>
            </div>
            <div className="flex overflow-x-auto space-x-8 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-8 sm:space-x-0">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[85vw] sm:w-auto bg-gray-50 p-8 rounded-xl shadow-sm">
                  <Star className="text-yellow-400 mb-4" fill="currentColor" />
                  <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>
                  <div className="mt-4">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <Image
                src="/cravit-logo.jpg"
                alt="craVIT Logo"
                width={120}
                height={40}
                className="mb-4 mx-auto md:mx-0"
              />
              <p className="text-gray-400">The easiest way to discover and enjoy food at VIT. Join our community and never miss out!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><Mail size={16} /><a href="mailto:sp.cravit@gmail.com">support@cravit.com</a></li>
                <li className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"><Phone size={16} /><a href="tel:+911234567890">+91 123 456 7890</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24} /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} craVIT. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
