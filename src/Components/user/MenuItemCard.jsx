"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, X, Loader2, Star, CheckCircle, AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useCartStore from '@/Components/stores/cartStore'; // Import the cart store

export const MenuItemCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("Dine-in");
  
  // [IMPROVED] Replaced isAdding state with a more robust status object
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: null,
  });

  const basePrice = item.price * quantity;
  const parcelCharge = orderType === "Parcel" ? 10 * quantity : 0;
  const totalPrice = basePrice + parcelCharge;

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset state after modal is fully closed
    setTimeout(() => {
      setQuantity(1);
      setOrderType("Dine-in");
      setStatus({ loading: false, error: null, success: null });
    }, 300); // 300ms matches exit animation
  };

  const handleConfirmAddToCart = async () => {
    setStatus({ loading: true, error: null, success: null });
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item._id,
          quantity: quantity,
          service: orderType.toLowerCase(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Could not add item to cart.");
      } else {
        // [IMPROVED] On success: show message, update global cart count, and auto-close
        setStatus({ loading: false, error: null, success: `${quantity} x ${item.itemName} added!` });
        
        // Update global cart store (this function exists in your DynamicHeader)
        useCartStore.getState().fetchCount(); 
        
        setTimeout(() => {
          handleCloseModal();
        }, 1500); // Auto-close modal after 1.5s
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // [IMPROVED] Show error message in modal
      setStatus({ loading: false, error: error.message, success: null });
    }
  };

  return (
    <>
      {/* [IMPROVED] Card Styling: Frosted glass and glow hover */}
      <div className="group relative rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Glowing border effect */}
        <div 
          className="absolute -inset-1.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg"
          aria-hidden="true"
        />
        
        {/* Card Content (relative to stay on top) */}
        <div className="relative z-10 flex flex-col flex-grow">
          <div className="relative w-full h-32 sm:h-40">
            <Image
              src={
                item.image ||
                "https://placehold.co/400x300/F0F0F0/333333?text=Item"
              }
              alt={item.itemName}
              fill
              className="object-cover"
              // [REMOVED] unoptimized={true} - We will add placehold.co to next.config.js
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-md sm:text-lg font-bold text-gray-800 dark:text-gray-100 break-words">
                  {item.itemName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.category}
                </p>
              </div>
              {item.numReviews > 0 && (
                <div className="flex-shrink-0 flex items-center gap-1.5 mt-1 ml-2">
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                    {item.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({item.numReviews})
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-row justify-between items-center mt-4 pt-2 flex-grow">
              <p className="text-lg sm:text-xl font-black text-orange-600 dark:text-orange-400">
                ₹{item.price}
              </p>
              <button
                onClick={handleOpenModal}
                className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 p-2 rounded-full transition-all duration-300
                           group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110
                           dark:group-hover:bg-orange-500 dark:group-hover:text-white"
                aria-label={`Add ${item.itemName} to cart`}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- [IMPROVED] Add to Cart Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              
              <div className="p-6 pt-12 flex flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.itemName}
                  </h2>
                  <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    ₹{item.price}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      disabled={quantity === 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-lg font-bold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Service Option
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setOrderType("Dine-in")}
                      className={`py-3 px-4 rounded-lg font-bold text-center transition ${
                        orderType === "Dine-in"
                          ? "bg-orange-500 text-white ring-2 ring-orange-600"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      Dine-in
                    </button>
                    <button
                      onClick={() => setOrderType("Parcel")}
                      className={`py-3 px-4 rounded-lg font-bold text-center transition ${
                        orderType === "Parcel"
                          ? "bg-orange-500 text-white ring-2 ring-orange-600"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      Parcel
                    </button>
                  </div>
                  <AnimatePresence>
                    {orderType === "Parcel" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          marginTop: "12px",
                        }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="text-sm text-center text-green-600 dark:text-green-400 font-semibold overflow-hidden"
                      >
                        + ₹{parcelCharge} parcel charges applied
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* [IMPROVED] Dynamic Add to Cart Button */}
                <div className="h-16">
                  <AnimatePresence mode="wait">
                    {status.loading ? (
                      <motion.div
                        key="loading"
                        className="w-full h-full flex justify-center items-center"
                      >
                        <Loader2 className="animate-spin text-orange-500" size={32} />
                      </motion.div>
                    ) : status.error ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full h-full flex flex-col justify-center items-center text-center"
                      >
                        <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                          <AlertTriangle size={18} />
                          <p className="font-semibold">{status.error}</p>
                        </div>
                        <button 
                          onClick={handleConfirmAddToCart} 
                          className="text-sm font-semibold text-orange-500 hover:underline mt-1"
                        >
                          Try Again
                        </button>
                      </motion.div>
                    ) : status.success ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full flex justify-center items-center gap-2 text-lg font-bold text-green-600"
                      >
                        <CheckCircle />
                        <span>Added!</span>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="add"
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={handleConfirmAddToCart}
                        className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl text-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-orange-400 disabled:cursor-not-allowed flex justify-center items-center"
                      >
                        {`Add ${quantity} to Cart (₹${totalPrice})`}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};