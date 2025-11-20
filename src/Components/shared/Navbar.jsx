"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LogOut,
  LayoutDashboard,
  UserCog,
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
  Package,
  Store,
  ChevronRight,
  MapPin
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@/Components/stores/useUser";
import useCartStore from "@/Components/stores/cartStore";

// --- HOOKS ---
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

// --- COMPONENTS ---

const CartButton = ({ count }) => (
  <Link 
    href="/cart" 
    className="relative p-2.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/20 transition-all active:scale-95"
    aria-label="Cart"
  >
    <ShoppingCart size={22} />
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-gray-950 shadow-sm"
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  </Link>
);

const ProfileAvatar = ({ user, size = 40 }) => (
  <div className="relative shrink-0">
    <Image
      src={user.image || `https://ui-avatars.com/api/?name=${user.name || "User"}&background=FF5722&color=fff&bold=true`}
      alt="Profile"
      width={size}
      height={size}
      className="rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
    />
  </div>
);

// --- MOBILE MENU (Refined Greeting Logic) ---

const MobileMenu = ({ user, isOpen, onClose, onSignOut, cartCount, sellers, isLoading }) => {
  const router = useRouter();
  const [expandRestaurants, setExpandRestaurants] = useState(true);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  // --- DYNAMIC GREETING LOGIC ---
  const getGreeting = () => {
    if (!user) return "Sign in to start ordering";
    if (user.role === 'seller') return "Manage your restaurant";
    return "Ready to order delicious food?";
  };

  const MenuItem = ({ href, onClick, icon: Icon, label, badge, isDestructive }) => (
    <Link
      href={href}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all active:scale-[0.98] border border-transparent ${
        isDestructive 
          ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" 
          : "bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 hover:border-gray-200 dark:hover:border-gray-700"
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon size={20} className={isDestructive ? "text-red-500" : "text-gray-500 dark:text-gray-400"} />
        <span className="font-semibold text-[15px]">{label}</span>
      </div>
      {badge ? (
        <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-sm shadow-orange-200">{badge}</span>
      ) : !isDestructive && (
        <ChevronRight size={16} className="text-gray-300" />
      )}
    </Link>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white dark:bg-gray-950 shadow-2xl z-50 flex flex-col h-full md:hidden"
          >
            {/* 1. Header Area */}
            <div className="px-6 pt-8 pb-6">
              <div className="flex justify-between items-center mb-6">
                 {/* Branding or User Greeting */}
                 <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight truncate max-w-[200px]">
                      {user ? `Hi, ${user.name.split(' ')[0]}` : "Welcome!"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {getGreeting()}
                    </p>
                 </div>
                 <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <X size={20} />
                 </button>
              </div>

              {/* Auth Buttons - STACKED VERTICALLY (Fixed) */}
              {!user && (
                <div className="flex flex-col gap-3">
                  <Link href="/user/register" onClick={onClose} className="w-full py-3.5 rounded-xl bg-orange-500 text-white font-bold text-center shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-transform">
                    Create Account
                  </Link>
                  <Link href="/user/login" onClick={onClose} className="w-full py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold text-center hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98] transition-all">
                    Login
                  </Link>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-6">
              {user && (
                <>
                  {/* Main Navigation */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Menu</p>
                    
                    {user.role === 'user' && (
                      <MenuItem href="/cart" onClick={onClose} icon={ShoppingCart} label="My Cart" badge={cartCount > 0 ? cartCount : null} />
                    )}
                    
                    <MenuItem href={user.role === "seller" ? "/seller/dashboard" : "/user/dashboard"} onClick={onClose} icon={LayoutDashboard} label="Dashboard" />
                    
                    {user.role === 'seller' && (
                       <MenuItem href="/seller/orders" onClick={onClose} icon={Package} label="Incoming Orders" />
                    )}
                    
                    <MenuItem href="/user/profile" onClick={onClose} icon={UserCog} label="Profile Settings" />
                  </div>

                  {user.role === 'user' && (
                    <div className="space-y-3">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Food</p>
                       <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                          <button 
                            onClick={() => setExpandRestaurants(!expandRestaurants)}
                            className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-900 active:bg-gray-50 dark:active:bg-gray-800"
                          >
                            <div className="flex items-center gap-4">
                              <Store size={20} className="text-orange-500"/>
                              <span className="font-semibold text-[15px] text-gray-800 dark:text-white">Restaurants</span>
                            </div>
                            <ChevronDown size={18} className={`text-gray-400 transition-transform ${expandRestaurants ? 'rotate-180' : ''}`}/>
                          </button>

                          <AnimatePresence>
                            {expandRestaurants && (
                              <motion.div 
                                initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                                className="overflow-hidden bg-gray-50 dark:bg-gray-800/30"
                              >
                                <div className="p-2 space-y-1">
                                  {isLoading ? (
                                    <div className="py-3 text-center text-sm text-gray-400">Loading places...</div>
                                  ) : sellers.length > 0 ? (
                                    sellers.map(seller => (
                                      <Link
                                        key={seller._id}
                                        href={`/seller/${seller.name.toLowerCase().replace(/\s+/g, "-")}`}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                                      >
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        {seller.name}
                                      </Link>
                                    ))
                                  ) : (
                                    <div className="py-3 text-center text-sm text-gray-400">No places open</div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                       </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {user && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 mt-auto">
                <button 
                  onClick={onSignOut}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-red-600 font-bold bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


const DesktopProfileMenu = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none">
        <ProfileAvatar user={user} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <p className="font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>
            <div className="p-2">
               <Link href={user.role === "seller" ? "/seller/dashboard" : "/user/dashboard"} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <LayoutDashboard size={18} className="text-gray-400"/> Dashboard
               </Link>
               <Link href="/user/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <UserCog size={18} className="text-gray-400"/> Profile Settings
               </Link>
            </div>
            <div className="p-2 border-t border-gray-100 dark:border-gray-800">
               <button onClick={onSignOut} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                  <LogOut size={18}/> Sign Out
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN HEADER COMPONENT ---

export default function DynamicHeader() {
  const { user, setUser, isLoading: isUserLoading } = useUser();
  const { count: cartCount, fetchCount } = useCartStore();
  
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [isSellerLoading, setIsSellerLoading] = useState(true);

  // Fetch Sellers
  useEffect(() => {
    if (user && user.role === 'user') {
      const fetchSellers = async () => {
        setIsSellerLoading(true);
        try {
          const res = await fetch("/api/seller");
          if (!res.ok) throw new Error();
          const data = await res.json();
          setSellers(data);
        } catch (e) { console.error(e); } 
        finally { setIsSellerLoading(false); }
      };
      fetchSellers();
      fetchCount();
    } else {
      setIsSellerLoading(false);
    }
  }, [user, fetchCount]);

  const handleSignOut = async () => {
    try { await fetch("/api/user/logout", { method: "POST" }); } 
    catch {} 
    finally {
      setUser(null);
      setMobileMenuOpen(false);
      window.location.href = "/";
    }
  };

  return (
    <>
      <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            
            {/* 1. Logo & Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <Image src="/cravit-logo.jpg" alt="craVIT" width={40} height={40} className="rounded-full shadow-sm group-hover:scale-105 transition-transform" priority/>
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:block">craVIT</span>
              </Link>
            </div>

            {/* 2. Right Side Actions */}
            <div className="flex items-center gap-3 md:gap-6">
              
              {/* Desktop Guest Links (Hidden on Mobile) */}
              {!isUserLoading && !user && (
                 <div className="hidden md:flex items-center gap-4">
                   <Link href="/user/login" className="font-bold text-gray-600 hover:text-orange-600 transition-colors">Login</Link>
                   <Link href="/user/register" className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-orange-200 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                     Get Started
                   </Link>
                 </div>
              )}

              {/* Authenticated Actions */}
              {!isUserLoading && user && (
                <>
                  {/* Cart (Visible on Mobile too) */}
                  {user.role === 'user' && <CartButton count={cartCount} />}
                  
                  {/* Desktop Profile */}
                  <div className="hidden md:block">
                     <DesktopProfileMenu user={user} onSignOut={handleSignOut} />
                  </div>
                </>
              )}

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 md:hidden text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Open Menu"
              >
                <Menu size={26} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        user={user}
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSignOut={handleSignOut}
        cartCount={cartCount}
        sellers={sellers}
        isLoading={isSellerLoading}
      />
    </>
  );
}