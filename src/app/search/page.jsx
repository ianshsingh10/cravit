"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation"; // Import router for redirection
import { Loader2, AlertTriangle, Soup, Search, Star, Plus, X, ShoppingCart, LogIn, User } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "@/Components/stores/cartStore";

// --- Enhanced Image Component ---
const Image = ({ src, alt, fill, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={fill ? { position: 'absolute', inset: 0 } : {}}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${fill ? 'object-cover w-full h-full' : ''}`}
        onLoad={() => setIsLoaded(true)}
        {...props} 
      />
    </div>
  );
};

// --- CARD COMPONENT ---
const SearchItemCard = ({ item, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation(); 
    setIsAdding(true);
    // Pass a callback to reset the loading state if the parent decides to stop (e.g., login required)
    await onAddToCart(item, () => setIsAdding(false));
    
    // If successful, we wait a bit then reset
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-row sm:flex-col min-h-[100px] sm:h-full active:scale-[0.99] transition-all duration-200"
    >
      {/* Image Area */}
      <div className="relative w-28 sm:w-full shrink-0 sm:aspect-[4/3] bg-gray-100 dark:bg-gray-800">
        <Image
          src={item.image || "https://placehold.co/400x300/F0F0F0/333333?text=Food"}
          alt={item.itemName}
          fill
        />
        {item.rating > 0 && (
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-0.5 bg-white/95 dark:bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold shadow-sm z-10">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-900 dark:text-white">{item.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-between relative min-w-0">
        <div className="mb-2">
          <div className="flex justify-between items-start gap-1">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 break-words">
              {item.itemName}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate max-w-[80px]">
              {item.sellerName}
            </span>
            <span className="text-[10px] text-gray-300 dark:text-gray-600">•</span>
            <span className="text-[10px] uppercase tracking-wide bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-500 font-semibold">
               {item.category}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white whitespace-nowrap">
            ₹{item.price}
          </span>
          <button
            onClick={handleClick}
            disabled={isAdding}
            className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors active:scale-90 shadow-sm"
            aria-label="Add to cart"
          >
            {isAdding ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Plus size={18} strokeWidth={3} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function SearchAllPage() {
  const router = useRouter(); // Initialize Router
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { fetchCount } = useCartStore();

  useEffect(() => {
    const fetchAllItems = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/items`);
        if (!res.ok) throw new Error("Failed to fetch items.");
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllItems();

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryFromUrl = urlParams.get('q');
      if (queryFromUrl) setSearchQuery(decodeURIComponent(queryFromUrl));
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter(item => {
      const nameWords = item.itemName.toLowerCase().split(/[\s-]+/);
      const categoryWords = item.category.toLowerCase().split(/[\s-]+/);
      const sellerWords = item.sellerName.toLowerCase().split(/[\s-]+/);
      return queryWords.every(qWord =>
        nameWords.some(n => n.includes(qWord)) ||
        categoryWords.some(c => c.includes(qWord)) ||
        sellerWords.some(s => s.includes(qWord))
      );
    }).sort((a, b) => a.price - b.price);
  }, [items, searchQuery]);

  const handleAddToCart = async (item, stopLoadingCallback) => {
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item._id,
          itemName: item.itemName,
          price: item.price,
          quantity: 1,
          service: 'dine-in',
          sellerName: item.sellerName,
        }),
      });

      if (res.status === 401) {
        if (stopLoadingCallback) stopLoadingCallback(); 
        setShowLoginPrompt(true);
        return;
      }

      if (!res.ok) throw new Error('Failed to add item.');

      fetchCount();
      setNotification({ message: `Added ${item.itemName}`, type: 'success' });
    } catch (error) {
      setNotification({ message: 'Error adding item', type: 'error' });
    }

    setTimeout(() => setNotification(null), 2000);
  };

  const handleLoginRedirect = () => {
    router.push('/user/login'); 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex justify-center items-center">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
           <AlertTriangle className="text-red-500" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Something went wrong</h2>
        <p className="text-gray-500 mt-2">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 text-orange-600 font-semibold">Try Again</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-20 relative">
      
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-4 py-2 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           <input
             type="text"
             placeholder="Search food..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-9 pr-9 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-gray-500"
           />
           {searchQuery && (
             <button 
               onClick={() => setSearchQuery('')}
               className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-500 hover:bg-gray-300"
             >
               <X size={12} />
             </button>
           )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {searchQuery ? "Search Results" : "All Items"}
          </h2>
          <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
            {filteredItems.length}
          </span>
        </div>

        {items.length > 0 ? (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredItems.map(item => (
                <SearchItemCard key={item._id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                 <Search className="w-6 h-6 text-gray-400" />
               </div>
               <h3 className="text-base font-bold text-gray-900 dark:text-white">No matches found</h3>
               <p className="text-xs text-gray-500 mt-1">Try searching for generic terms like "Rice" or "Drink"</p>
            </div>
          )
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-center">
               <Soup className="w-12 h-12 text-gray-300 mb-4" />
               <p className="text-sm text-gray-500">No items available right now.</p>
           </div>
        )}
      </div>

      {/* --- NEW LOGIN "BOTTOM SHEET" / MODAL --- */}
      <AnimatePresence>
        {showLoginPrompt && (
          <>
            {/* 1. Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginPrompt(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            
            {/* 2. The Sliding Sheet */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-gray-900 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] overflow-hidden max-w-md mx-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-2xl"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4 text-orange-500">
                  <User size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Login Required
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 px-4">
                  You need to log in to add items to your cart and place an order.
                </p>

                <div className="flex flex-col gap-3 w-full">
                  <button 
                    onClick={handleLoginRedirect}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <LogIn size={18} />
                    Log In Now
                  </button>
                  <button 
                    onClick={() => setShowLoginPrompt(false)}
                    className="w-full py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl font-bold text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Standard Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[320px] z-50"
          >
            <div className={`flex items-center justify-between px-4 py-3 rounded-xl shadow-2xl ${
              notification.type === 'success' ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'bg-red-500 text-white'
            }`}>
              <div className="flex items-center gap-3">
                {notification.type === 'success' ? <ShoppingCart size={18} /> : <AlertTriangle size={18} />}
                <span className="font-bold text-sm">{notification.message}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}