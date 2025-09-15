"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const ItemCard = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative w-full h-32 sm:h-40">
        <Image
          src={
            item.image || "https://placehold.co/400x300/F0F0F0/333333?text=Item"
          }
          alt={item.itemName}
          fill
          className="object-cover"
          unoptimized={true}
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="p-2 rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70"
          >
            <MoreVertical size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 ring-1 ring-black/5 dark:ring-white/10 z-10"
              >
                <button
                  onClick={() => {
                    onEdit(item);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(item);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
          {item.itemName}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">
          Category: {item.category}
        </p>
        <div className="flex flex-row flex-grow justify-between items-center mt-auto pt-2">
          <p className="text-lg sm:text-xl font-black text-orange-600">
            ₹{item.price}
          </p>

          <button
            type="button"
            onClick={() => onToggleAvailability(item)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
              item.availability ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span className="sr-only">Toggle Availability</span>
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                item.availability ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ItemCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-32 sm:h-40 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-7 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3"></div>
        </div>
      </div>
    </div>
);