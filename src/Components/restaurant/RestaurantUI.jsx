"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Star, Plus, Minus, ShoppingCart, X, Utensils, Info, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export const RestaurantHero = ({ name, cuisine, rating, image }) => {
    return (
        <div 
            className="relative h-72 md:h-80 w-full overflow-hidden"
        >
            <motion.div 
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            >
                <Image src={image} alt={name} fill className="object-cover" unoptimized={true} priority />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl"
                >
                    {name}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-4 mt-3"
                >
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <Utensils size={14} />
                        <span className="text-sm font-medium">{cuisine}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <Star size={14} className="text-yellow-400" fill="currentColor" />
                        <span className="text-sm font-bold">{rating}</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

/**
 * Improved category tabs with a clearer active state indicator and mouse wheel scrolling.
 */
export const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
    const navRef = useRef(null);

    useEffect(() => {
        const nav = navRef.current;
        if (nav) {
            const handleWheel = (e) => {
                // If the user scrolls vertically, we prevent the page from scrolling and
                // instead scroll the nav element horizontally.
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    nav.scrollLeft += e.deltaY;
                }
            };
            nav.addEventListener('wheel', handleWheel);
            return () => nav.removeEventListener('wheel', handleWheel);
        }
    }, []);

    return (
        <div className="sticky top-[72px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg z-20 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav ref={navRef} className="flex space-x-2 md:space-x-4 overflow-x-auto py-3 hide-scrollbar">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className="relative flex-shrink-0 px-4 py-2 font-semibold text-sm rounded-lg transition-colors duration-300 focus:outline-none"
                        >
                            <span className={`transition-colors ${activeCategory === category ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}>
                                {category}
                            </span>
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeCategoryIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </nav>
                <style jsx>{`
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
            </div>
        </div>
    );
};


/**
 * A more engaging menu item card with a clear call-to-action and stock status.
 */
export const MenuItemCard = ({ item, onClick }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`flex items-start gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50 ${!item.inStock ? 'opacity-60' : ''}`}
    >
        <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 relative">
            <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl" unoptimized={true} />
             {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                    <span className="text-white font-bold text-sm">Out of Stock</span>
                </div>
            )}
        </div>
        <div className="flex-grow">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{item.name}</h3>
            {item.inStock ? (
                <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-green-600 dark:text-green-400">
                    <CheckCircle2 size={16} />
                    <span>In Stock</span>
                </div>
            ) : (
                <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-red-600 dark:text-red-400">
                    <XCircle size={16} />
                    <span>Out of Stock</span>
                </div>
            )}
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-3">₹{item.price}</p>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
             <button 
                onClick={(e) => { e.stopPropagation(); onClick(item); }}
                className="mt-auto p-2 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 rounded-full hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                aria-label={`Add ${item.name} to cart`}
                disabled={!item.inStock}
            >
                <Plus size={20} />
            </button>
        </div>
    </motion.div>
);

/**
 * A refined modal with better layout and clearer actions, showing stock status.
 */
export const ItemDetailModal = ({ item, isOpen, onClose, onAddToCart, onRemoveFromCart, cartItem }) => {
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="relative h-60 w-full">
                            <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized={true} />
                            <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-white/60 backdrop-blur-md rounded-full hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <X size={20} className="text-gray-800" />
                            </button>
                        </div>
                        <div className="p-6">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{item.name}</h2>
                            <div className="mt-6 flex justify-between items-center">
                                <p className="text-3xl font-bold text-orange-500">₹{item.price}</p>
                                {item.inStock ? (
                                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 shadow-inner rounded-full border dark:border-gray-600">
                                        <button onClick={() => onRemoveFromCart(item)} className="p-3 text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-l-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={quantity === 0}>
                                            <Minus size={18} />
                                        </button>
                                        <span className="px-5 font-bold text-lg text-gray-800 dark:text-gray-100 w-16 text-center">{quantity}</span>
                                        <button onClick={() => onAddToCart(item)} className="p-3 text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-r-full transition-colors">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 font-bold rounded-lg text-sm">
                                        Currently Unavailable
                                    </div>
                                )}
                            </div>
                        </div>
                        {quantity > 0 && item.inStock && (
                             <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="p-4 bg-orange-500 text-white font-bold text-center">
                                Added to Cart!
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/**
 * A more informative floating cart button.
 */
export const FloatingCartButton = ({ cart, onClick }) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (totalItems === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-md"
            >
                <button onClick={onClick} className="w-full bg-orange-500 text-white font-bold p-4 rounded-xl shadow-2xl flex justify-between items-center transform hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <ShoppingCart size={24} />
                            <span className="absolute -top-1 -right-2 bg-white text-orange-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        </div>
                        <span className="text-lg">View Cart</span>
                    </div>
                    <span className="text-lg">₹{totalPrice}</span>
                </button>
            </motion.div>
        </AnimatePresence>
    );
};
