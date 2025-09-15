"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, X, Loader2 } from 'lucide-react'; // Import Loader2 icon
import { AnimatePresence, motion } from "framer-motion";

export const MenuItemCard = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [orderType, setOrderType] = useState('Dine-in');
    const [isAdding, setIsAdding] = useState(false); // State for button loading

    const basePrice = item.price * quantity;
    const parcelCharge = orderType === 'Parcel' ? 10 * quantity : 0;
    const totalPrice = basePrice + parcelCharge;

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setQuantity(1);
        setOrderType('Dine-in');
    };

    // ✅ This function now calls the backend API
    const handleConfirmAddToCart = async () => {
        setIsAdding(true);
        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    itemId: item._id,
                    quantity: quantity,
                    service: orderType.toLowerCase() // 'Dine-in' -> 'dine-in'
                })
            });

            const result = await res.json();

            if (!res.ok) {
                // Show error message from the backend
                alert(`Error: ${result.error || 'Could not add item to cart.'}`);
            } else {
                alert(`${quantity} x ${item.itemName} (${orderType}) added successfully!`);
                handleCloseModal();
            }

        } catch (error) {
            console.error("Failed to add item to cart:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <>
            {/* ... Item Card JSX (no changes here) ... */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative w-full h-32 sm:h-40">
                    <Image
                        src={item.image || "https://placehold.co/400x300/F0F0F0/333333?text=Item"}
                        alt={item.itemName}
                        fill
                        className="object-cover"
                        unoptimized={true}
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-md sm:text-lg font-bold text-gray-800 dark:text-gray-100 truncate">{item.itemName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                    <div className="flex flex-row justify-between items-center mt-4 pt-2">
                        <p className="text-lg sm:text-xl font-black text-orange-600">₹{item.price}</p>
                        <button 
                            onClick={handleOpenModal}
                            className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300"
                            aria-label={`Add ${item.itemName} to cart`}
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex justify-center items-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm m-4 p-6 flex flex-col gap-5"
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* ... Modal content JSX (no changes here) ... */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.itemName}</h2>
                                <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">₹{item.price}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Quantity</h3>
                                <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition" disabled={quantity === 1}>
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center text-lg font-bold">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Service Option</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => setOrderType('Dine-in')}
                                        className={`py-3 px-4 rounded-lg font-bold text-center transition ${orderType === 'Dine-in' ? 'bg-orange-500 text-white ring-2 ring-orange-600' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    >
                                        Dine-in
                                    </button>
                                    <button 
                                        onClick={() => setOrderType('Parcel')}
                                        className={`py-3 px-4 rounded-lg font-bold text-center transition ${orderType === 'Parcel' ? 'bg-orange-500 text-white ring-2 ring-orange-600' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    >
                                        Parcel
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {orderType === 'Parcel' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: '12px' }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            className="text-sm text-center text-green-600 dark:text-green-400 font-semibold overflow-hidden"
                                        >
                                            + ₹{parcelCharge} parcel charges applied
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button 
                                onClick={handleConfirmAddToCart}
                                disabled={isAdding} // Disable button while loading
                                className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl text-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-orange-400 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {isAdding ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    `Add ${quantity} to Cart (₹${totalPrice})`
                                )}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};