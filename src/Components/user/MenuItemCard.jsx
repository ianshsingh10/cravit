"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Plus, Minus, X, Loader2, Star, 
  ShoppingBag, Utensils, Check, AlertCircle 
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useCartStore from '@/Components/stores/cartStore';

export const MenuItemCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("Dine-in");
  const { fetchCount } = useCartStore();

  // Prevent body scroll when modal is open (Critical for mobile)
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setQuantity(1);
    setOrderType("Dine-in");
    setStatus({ loading: false, error: null, success: null });
    setIsModalOpen(true);
  };

  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const basePrice = item.price * quantity;
  const parcelCharge = orderType === "Parcel" ? 10 * quantity : 0;
  const totalPrice = basePrice + parcelCharge;

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
      if (!res.ok) throw new Error(result.error || "Failed to add.");
      
      setStatus({ loading: false, error: null, success: true });
      fetchCount(); 
      
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus(prev => ({ ...prev, success: null }));
      }, 1200);

    } catch (error) {
      setStatus({ loading: false, error: error.message, success: null });
    }
  };

  return (
    <>
      {/* --- CARD COMPONENT --- */}
      <motion.div 
        layoutId={`card-${item._id}`}
        className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full transition-all active:scale-[0.98] duration-200"
      >
        {/* Image Section */}
        <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={item.image || "https://placehold.co/600x400"}
            alt={item.itemName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
             <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-black/80 backdrop-blur-md text-gray-800 dark:text-gray-200 rounded-md shadow-sm">
               {item.category}
             </span>
          </div>
          
          {/* Rating */}
          {item.rating > 0 && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/10">
               <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
               <span className="text-[10px] font-bold text-white">{item.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-1 mb-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
              {item.itemName}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-200 dark:border-gray-800">
            <span className="text-lg font-black text-gray-900 dark:text-white">₹{item.price}</span>
            
            <button
              onClick={handleOpenModal}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 active:bg-orange-500 active:text-white transition-colors"
            >
              <Plus size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- MOBILE-FIRST MODAL (BOTTOM SHEET) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer / Modal */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }} // Start from bottom
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Mobile Drag Handle */}
              <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
              </div>

              {/* Close Button (Desktop mostly, but good fallback) */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Header Image */}
              <div className="relative h-32 sm:h-40 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={item.image || "https://placehold.co/600x400"}
                  alt={item.itemName}
                  fill
                  className="object-cover opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
              </div>

              <div className="px-5 pb-6 -mt-6 relative">
                {/* Item Info */}
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight mb-1">
                    {item.itemName}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Base price: ₹{item.price}
                  </p>
                </div>

                {/* BIG Quantity Controls */}
                <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <span className="font-bold text-gray-700 dark:text-gray-300 pl-2">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity === 1}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 disabled:opacity-30 shadow-sm active:scale-90 transition-transform"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-8 text-center font-bold text-xl text-gray-900 dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-500 text-white shadow-orange-500/30 shadow-sm active:scale-90 transition-transform"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Service Selection */}
                <div className="mb-8">
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 ml-1">Service Option</span>
                  <div className="grid grid-cols-2 gap-3">
                    <ServiceOption 
                      active={orderType === "Dine-in"} 
                      onClick={() => setOrderType("Dine-in")}
                      icon={<Utensils size={20} />}
                      label="Dine-in"
                    />
                    <ServiceOption 
                      active={orderType === "Parcel"} 
                      onClick={() => setOrderType("Parcel")}
                      icon={<ShoppingBag size={20} />}
                      label="Parcel"
                      subLabel="+ ₹10/item"
                    />
                  </div>
                </div>

                {/* Sticky-ish Action Button */}
                <div className="pt-2 pb-4 sm:pb-0">
                   <AnimatePresence mode="wait">
                      {status.loading ? (
                        <LoadingBtn />
                      ) : status.success ? (
                        <SuccessBtn />
                      ) : (
                        <button
                          onClick={handleConfirmAddToCart}
                          className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-between px-6"
                        >
                          <span>Add to Order</span>
                          <span className="bg-white/20 dark:bg-black/10 px-3 py-1 rounded-lg text-base">₹{totalPrice}</span>
                        </button>
                      )}
                   </AnimatePresence>
                   
                   {status.error && (
                     <motion.p 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                       className="text-red-500 text-center text-sm mt-3 font-medium flex items-center justify-center gap-1"
                     >
                       <AlertCircle size={16} /> {status.error}
                     </motion.p>
                   )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Sub Components ---

const ServiceOption = ({ active, onClick, icon, label, subLabel }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200 h-24
      ${active 
        ? "border-orange-500 bg-orange-50 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300" 
        : "border-transparent bg-gray-50 dark:bg-gray-800 text-gray-500"}
    `}
  >
    <div className={`mb-1 ${active ? "scale-110 transition-transform" : ""}`}>
      {icon}
    </div>
    <span className="text-sm font-bold">
      {label}
    </span>
    {subLabel && <span className="text-[10px] opacity-80">{subLabel}</span>}
  </button>
);

const LoadingBtn = () => (
  <div className="w-full bg-gray-100 dark:bg-gray-800 h-14 rounded-2xl flex items-center justify-center text-gray-400 font-medium">
    <Loader2 className="animate-spin mr-2" /> Adding to cart...
  </div>
);

const SuccessBtn = () => (
  <div className="w-full bg-green-500 text-white h-14 rounded-2xl flex items-center justify-center font-bold gap-2 shadow-lg shadow-green-500/30">
    <Check size={24} strokeWidth={3} /> Added Successfully
  </div>
);