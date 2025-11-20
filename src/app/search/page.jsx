"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Loader2, AlertTriangle, Soup, Search, Star, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { AddToCartModal } from "@/Components/user/AddToCartModal";

// --- 1. Image Component ---
const Image = ({ src, alt, fill, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`} style={fill ? { position: 'absolute', inset: 0 } : {}}>
      {!isLoaded && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />}
      <img 
        src={src} alt={alt} 
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${fill ? 'object-cover w-full h-full' : ''}`}
        onLoad={() => setIsLoaded(true)}
        {...props} 
      />
    </div>
  );
};

// --- 2. Card Component ---
const SearchItemCard = ({ item, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onSelect(item)}
      className="group relative bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-row sm:flex-col min-h-[100px] sm:h-full active:scale-[0.98] transition-all duration-200 cursor-pointer"
    >
      {/* Image */}
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

      {/* Content */}
      <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-between relative min-w-0">
        <div className="mb-2">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
            {item.itemName}
          </h3>
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
          <button className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center">
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. Main Page ---
export default function SearchAllPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Centralized Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Items
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

  // Filtering Logic
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

  const handleOpenModal = (item) => {
      setSelectedItem(item);
      setIsModalOpen(true);
  };

  if (isLoading) return <div className="min-h-screen flex justify-center items-center dark:bg-gray-950"><Loader2 className="w-10 h-10 text-orange-500 animate-spin" /></div>;
  if (error) return <div className="min-h-screen flex flex-col justify-center items-center text-center dark:bg-gray-950"><AlertTriangle size={32} className="text-red-500 mb-2"/><p className="text-gray-500">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-20 relative">
      
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-4 py-2 shadow-sm">
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
             <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-500">
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
                <SearchItemCard key={item._id} item={item} onSelect={handleOpenModal} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <Search className="w-8 h-8 text-gray-400 mb-2" />
               <p className="text-sm text-gray-500">No matches found</p>
            </div>
          )
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-center">
               <Soup className="w-12 h-12 text-gray-300 mb-4" />
               <p className="text-sm text-gray-500">No items available.</p>
           </div>
        )}
      </div>

      {/* --- SHARED MODAL INSTANCE --- */}
      <AddToCartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={selectedItem} 
      />

    </div>
  );
}