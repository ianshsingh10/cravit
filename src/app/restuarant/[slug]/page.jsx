"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Plus, Minus, ShoppingCart, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DUMMY DATA ---
// In a real app, you would fetch this data based on the page's slug/ID.
const restaurantData = {
  name: "Mayuri (AB1)",
  cuisine: "South Indian, North Indian, Snacks",
  rating: 4.5,
  image: "https://placehold.co/1600x900/f87171/ffffff?text=Mayuri",
  menu: {
    "Bestsellers": [
      { id: 1, name: "Masala Dosa", price: 80, description: "Crispy rice crepe with a savory potato filling.", image: "https://placehold.co/400x300/fecaca/991b1b?text=Dosa" },
      { id: 2, name: "Samosa (2 pcs)", price: 30, description: "Fried pastry with a savory filling of spiced potatoes.", image: "https://placehold.co/400x300/fed7aa/9a3412?text=Samosa" },
    ],
    "South Indian": [
      { id: 3, name: "Idli Sambar", price: 60, description: "Steamed rice cakes served with lentil-based vegetable stew.", image: "https://placehold.co/400x300/a5f3fc/155e75?text=Idli" },
      { id: 4, name: "Vada", price: 40, description: "Savory fried fritter made from Vigna mungo.", image: "https://placehold.co/400x300/d8b4fe/581c87?text=Vada" },
    ],
    "Beverages": [
      { id: 5, name: "Filter Coffee", price: 25, description: "Classic South Indian drip coffee.", image: "https://placehold.co/400x300/fde68a/854d0e?text=Coffee" },
      { id: 6, name: "Masala Chai", price: 20, description: "Spiced milk tea.", image: "https://placehold.co/400x300/fbcfe8/9d266f?text=Chai" },
    ]
  }
};


// --- UI Components ---

const RestaurantHero = ({ name, cuisine, rating, image }) => (
    <div className="relative h-64 md:h-80 w-full">
        <Image src={image} alt={name} fill className="object-cover" unoptimized={true} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold drop-shadow-lg"
            >
                {name}
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4 mt-2"
            >
                <p className="text-sm md:text-base text-gray-200">{cuisine}</p>
                <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span className="font-bold">{rating}</span>
                </div>
            </motion.div>
        </div>
    </div>
);

const MenuItemCard = ({ item, onAddToCart, onRemoveFromCart, cartItem }) => {
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700/50"
        >
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                <p className="text-lg font-black text-orange-600 mt-3">₹{item.price}</p>
            </div>
            <div className="flex-shrink-0 w-28 h-28 relative">
                <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl" unoptimized={true} />
                <div className="absolute -bottom-3 right-1/2 translate-x-1/2">
                    {quantity > 0 ? (
                        <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full border dark:border-gray-600">
                             <button onClick={() => onRemoveFromCart(item)} className="p-2 text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-l-full transition-colors">
                                <Minus size={16} />
                            </button>
                            <span className="px-3 font-bold text-gray-800 dark:text-gray-100">{quantity}</span>
                            <button onClick={() => onAddToCart(item)} className="p-2 text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-r-full transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => onAddToCart(item)}
                            className="bg-white dark:bg-gray-700 text-orange-500 font-bold py-2 px-4 rounded-full shadow-lg border dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-orange-900/50 transition-all transform hover:scale-105"
                        >
                            Add
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const FloatingCartButton = ({ cart }) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (totalItems === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-lg"
            >
                <div className="bg-orange-500 text-white font-bold p-4 rounded-xl shadow-2xl flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ShoppingCart size={20} />
                        <span>{totalItems} Item{totalItems > 1 ? 's' : ''}</span>
                    </div>
                    <span>View Cart - ₹{totalPrice}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};


// --- Main Page Component ---

export default function RestaurantPage() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem => 
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(cartItem => 
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                );
            }
            return prevCart.filter(cartItem => cartItem.id !== item.id);
        });
    };
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <RestaurantHero {...restaurantData} />
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {Object.entries(restaurantData.menu).map(([category, items]) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {items.map(item => (
                                <MenuItemCard 
                                    key={item.id} 
                                    item={item} 
                                    onAddToCart={handleAddToCart}
                                    onRemoveFromCart={handleRemoveFromCart}
                                    cartItem={cart.find(cartItem => cartItem.id === item.id)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            <FloatingCartButton cart={cart} />
        </div>
    );
}
