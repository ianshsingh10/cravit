"use client";
import { useState } from "react";
import Image from 'next/image';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

export const ItemCard = ({ item, onEdit, onDelete }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="relative w-full h-32 sm:h-40">
                <Image src={item.image || 'https://placehold.co/400x300/F0F0F0/333333?text=Item'} alt={item.itemName} fill className="object-cover" unoptimized={true}/>
                <div className="absolute top-2 right-2">
                    <button onClick={() => setMenuOpen(!isMenuOpen)} onBlur={() => setTimeout(() => setMenuOpen(false), 150)} className="p-2 rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70">
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
                                <button onClick={() => { onEdit(item); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2">
                                    <Edit size={14} /> Edit
                                </button>
                                <button onClick={() => { onDelete(item); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 truncate">{item.itemName}</h2>
                <p className="text-lg sm:text-xl font-black text-orange-600 mt-auto pt-2">₹{item.price}</p>
            </div>
        </div>
    );
};

export const ItemCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-32 sm:h-40 bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-4">
            <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-7 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-4"></div>
        </div>
    </div>
);