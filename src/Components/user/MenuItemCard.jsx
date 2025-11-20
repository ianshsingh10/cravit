"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { AddToCartModal } from "@/Components/user/AddToCartModal";

export const MenuItemCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* --- CARD TRIGGER --- */}
      <motion.div 
        layoutId={`card-${item._id}`}
        className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full active:scale-[0.98] transition-transform duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Area */}
        <div className="relative w-full h-36 sm:h-44 bg-gray-100 dark:bg-gray-800">
          <Image
            src={item.image || "https://placehold.co/600x400"}
            alt={item.itemName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Rating Badge */}
          {item.rating > 0 && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 dark:bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md shadow-sm z-10">
               <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
               <span className="text-[10px] font-bold text-gray-900 dark:text-white">{item.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <div className="flex-1 mb-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
              {item.itemName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
               {item.category}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100 dark:border-gray-800">
            <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white">₹{item.price}</span>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
              aria-label="Add to cart"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- REUSABLE MODAL --- */}
      <AddToCartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={item} 
      />
    </>
  );
};