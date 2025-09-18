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
  Building,
  ShoppingCart,
  Package,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useUser } from "@/Components/stores/useUser";
import useCartStore from '@/Components/stores/cartStore';


const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

const SellersDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const fetchSellers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/seller");
        if (!response.ok) throw new Error("Failed to fetch sellers");
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSellers();
  }, []);

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold text-gray-800 dark:text-gray-200"
      >
        <Building size={18} />
        <span>Restaurants</span>
        <ChevronDown
          size={20}
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-2 ring-1 ring-black/5 dark:ring-white/10 z-20"
          >
            {isLoading ? (
              <div className="px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400">Loading...</div>
            ) : sellers.length > 0 ? (
              sellers.map((seller) => (
                <Link
                  key={seller._id}
                  href={`/seller/${seller.name.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {seller.name}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400">No sellers found.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CartButton = ({ count }) => (
  <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <ShoppingCart size={24} className="text-gray-700 dark:text-gray-300"/>
    {count > 0 && (
      <AnimatePresence>
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white dark:ring-gray-900"
        >
          {count}
        </motion.span>
      </AnimatePresence>
    )}
  </Link>
);

const NavLink = ({ href, icon, children }) => (
    <Link href={href} className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold text-gray-800 dark:text-gray-200">
        {icon}
        <span>{children}</span>
    </Link>
);

const ProfileButton = React.forwardRef(({ user, isOpen, onClick }, ref) => (
  <button
    ref={ref}
    aria-haspopup="menu"
    aria-expanded={isOpen}
    onClick={onClick}
    className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <div className="relative">
      <Image
        src={user.image || `https://ui-avatars.com/api/?name=${user.name || user.email}&background=FF5722&color=fff&bold=true`}
        alt="User profile"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="absolute bottom-0.5 right-0.5 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
    </div>
  </button>
));
ProfileButton.displayName = "ProfileButton";

const MenuItem = ({ icon, children, onClick, isDestructive = false }) => (
  <button
    onClick={onClick}
    className={`flex w-full px-3 py-2.5 gap-3 text-sm items-center font-semibold transition rounded-lg ${
      isDestructive
        ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`}
    role="menuitem"
  >
    <span>{icon}</span>
    <span>{children}</span>
  </button>
);

const UserDropdownMenu = ({ user, onSignOut }) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 ring-1 ring-black/5 dark:ring-white/10 z-20"
      role="menu"
    >
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
        <Image
          src={user.image || `https://ui-avatars.com/api/?name=${user.name || user.email}&background=FF5722&color=fff&bold=true`}
          alt="User profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-bold text-gray-800 dark:text-gray-200 truncate">{user.name || "User"}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
        </div>
      </div>
      <div className="p-2">
        <MenuItem icon={<LayoutDashboard size={18} />} onClick={() => router.push(user?.role === "seller" ? "/seller/dashboard" : "/user/dashboard")}>
          Dashboard
        </MenuItem>
        {user?.role === 'seller' && (
            <MenuItem icon={<Package size={18} />} onClick={() => router.push("/seller/orders")}>
              Received Orders
            </MenuItem>
        )}
        <MenuItem icon={<UserCog size={18} />} onClick={() => router.push("/user/profile")}>
          Edit Profile
        </MenuItem>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-700 p-2">
        <MenuItem icon={<LogOut size={18} />} onClick={onSignOut} isDestructive>
          Sign Out
        </MenuItem>
      </div>
    </motion.div>
  );
};

const GuestActions = () => (
  <div className="flex items-center gap-2">
    <Link href="/user/login" className="text-gray-700 dark:text-gray-300 font-semibold px-4 py-2.5 hover:text-orange-600 dark:hover:text-orange-400 rounded-full transition-colors hidden sm:block">
      Login
    </Link>
    <Link href="/user/register" className="bg-orange-500 text-white font-bold px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
      Register
    </Link>
  </div>
);

const AuthSkeleton = () => (
  <div className="h-11 w-28 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
);

const MobileMenu = ({ user, isOpen, onClose, onSignOut, cartCount }) => {
  const router = useRouter();
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const fetchSellers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/seller");
        if (!response.ok) throw new Error("Failed to fetch sellers");
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSellers();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 shadow-2xl z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/" onClick={onClose}><Image src="/cravit-logo.jpg" alt="Logo" width={48} height={48} className="rounded-full"/></Link>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={24} className="text-gray-800 dark:text-gray-200" /></button>
            </div>
            {user?.role==="user" && (<div className="flex-grow overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase px-4 mb-2">Restaurants</h3>
              <div className="space-y-1">
                {isLoading ? (
                  <div className="px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400">Loading...</div>
                ) : sellers.length > 0 ? (
                  sellers.map((seller) => (
                    <Link key={seller._id} href={`/seller/${seller.name.toLowerCase().replace(/\s+/g, "-")}`} onClick={onClose} className="block px-4 py-2.5 text-md font-medium text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">{seller.name}</Link>
                  ))
                ) : (
                  <div className="px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400">No sellers found.</div>
                )}
              </div>
              </div>)}
            <div className="border-t dark:border-gray-700 pt-6 mt-6">
              {user ? (
                <div className="space-y-2">
                  {user.role === 'user' && (
                     <MenuItem icon={<div className="relative"><ShoppingCart size={18} />{cartCount > 0 && (<span className="absolute -top-1 -right-2 block h-4 w-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">{cartCount}</span>)}</div>} onClick={() => { onClose(); router.push("/cart"); }}>My Cart</MenuItem>
                  )}
                  {user.role === 'seller' && (
                     <MenuItem icon={<Package size={18} />} onClick={() => { onClose(); router.push("/seller/orders"); }}>Received Orders</MenuItem>
                  )}
                  <MenuItem icon={<LayoutDashboard size={18} />} onClick={() => { onClose(); router.push(user?.role === "seller" ? "/seller/dashboard" : "/user/dashboard"); }}>Dashboard</MenuItem>
                  <MenuItem icon={<UserCog size={18} />} onClick={() => { onClose(); router.push("/user/profile"); }}>Edit Profile</MenuItem>
                  <MenuItem icon={<LogOut size={18} />} onClick={onSignOut} isDestructive>Sign Out</MenuItem>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/user/login" onClick={onClose} className="text-center text-gray-700 dark:text-gray-200 font-semibold w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors border-2 border-gray-200 dark:border-gray-600">Login</Link>
                  <Link href="/user/register" onClick={onClose} className="text-center bg-orange-500 text-white font-bold w-full px-4 py-3 rounded-full hover:bg-orange-600 transition-all">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function DynamicHeader() {
  const { user, setUser, isLoading } = useUser();
  const { count: cartCount, fetchCount } = useCartStore();
  
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  useEffect(() => {
    if (user && user.role === 'user') {
      fetchCount();
    }
  }, [user, pathname, fetchCount]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/logout", { method: "POST" });
    } catch {} 
    finally {
      setUser(null);
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      window.location.href = "/";
    }
  };

  return (
    <>
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-30 border-b border-gray-200/80 dark:border-gray-700/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 min-h-[72px]">
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="Home">
                <Image src="/cravit-logo.jpg" alt="Logo" width={48} height={48} className="rounded-full shadow-sm" priority/>
              </Link>
              {user?.role === "user" && <SellersDropdown />}
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                {isLoading ? (
                  <AuthSkeleton />
                ) : user ? (
                  <>
                    {user.role === 'user' && <CartButton count={cartCount} />}
                    
                    {user.role === 'seller' && (
                        <NavLink href="/seller/orders" icon={<Package size={18} />}>
                            Received Orders
                        </NavLink>
                    )}

                    <div className="relative" ref={dropdownRef}>
                      <ProfileButton user={user} isOpen={isDropdownOpen} onClick={() => setDropdownOpen((v) => !v)}/>
                      <AnimatePresence>
                        {isDropdownOpen && (<UserDropdownMenu user={user} onSignOut={handleSignOut}/>)}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <GuestActions />
                )}
              </div>
              <button className="p-2 md:hidden -mr-2" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} className="text-gray-800 dark:text-gray-200" />
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
      />
    </>
  );
}