"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Plus, Minus, X, Loader2, ShoppingBag, Utensils, Check, Info, AlertTriangle 
} from "lucide-react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import useCartStore from "@/Components/stores/cartStore";
import { useRouter } from "next/navigation";

export const AddToCartModal = ({ isOpen, onClose, item, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("Dine-in");
  const [status, setStatus] = useState({ loading: false, error: null, success: null });
  const { fetchCount } = useCartStore();
  const router = useRouter();
  const dragControls = useDragControls();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setOrderType("Dine-in");
      setStatus({ loading: false, error: null, success: null });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!item) return null;

  const basePrice = item.price || 0;
  const packagingRate = 10; 
  const packagingCharge = orderType === "Parcel" ? packagingRate * quantity : 0;
  const totalPrice = (basePrice * quantity) + packagingCharge;

  const handleConfirm = async () => {
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

      if (res.status === 401) {
         setStatus({ loading: false, error: "LOGIN_REQUIRED", success: null });
         return;
      }

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to add.");
      
      setStatus({ loading: false, error: null, success: true });
      fetchCount(); 
      if (onSuccess) onSuccess();
      setTimeout(() => { onClose(); }, 1200);

    } catch (error) {
       setStatus({ loading: false, error: error.message, success: null });
    }
  };

  const handleLoginRedirect = () => { onClose(); router.push('/user/login'); };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-center items-end sm:items-center pointer-events-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Sheet */}
          <motion.div
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(e, { offset, velocity }) => {
               if (offset.y > 100 || velocity.y > 500) onClose();
            }}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-950 rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} 
          >
            
            {/* --- 3. THE DRAG HANDLE AREA --- */}
            <div 
                onPointerDown={(e) => dragControls.start(e)}
                className="absolute top-0 left-0 right-0 h-12 z-40 flex justify-center pt-4 cursor-grab active:cursor-grabbing touch-none"
            >
                {/* Visual Handle Bar */}
                <div className="w-16 h-1.5 bg-white/80 dark:bg-gray-700/80 rounded-full shadow-sm backdrop-blur-md" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-gray-500 dark:text-gray-300 shadow-sm hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 pb-32 scrollbar-hide bg-white dark:bg-gray-950">
              
              {/* Hero Image */}
              <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={item.image || "https://placehold.co/600x400"}
                  alt={item.itemName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent opacity-90" />
              </div>

              <div className="px-6 relative -mt-12">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-1">
                  {item.itemName}
                </h2>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">₹{item.price}</span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                    Freshly prepared {item.category.toLowerCase()}. Made with high-quality ingredients and served hot.
                </p>

                {/* Service Toggle */}
                <div className="bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl flex mb-6">
                  {["Dine-in", "Parcel"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        orderType === type 
                          ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5" 
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      {type === "Dine-in" ? <Utensils size={16}/> : <ShoppingBag size={16}/>}
                      {type}
                    </button>
                  ))}
                </div>

                {/* Parcel Info */}
                <AnimatePresence>
                  {orderType === "Parcel" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mb-6"
                    >
                      <div className="flex gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
                        <Info className="text-orange-500 shrink-0 mt-0.5" size={18} />
                        <p className="text-xs text-orange-800 dark:text-orange-200">
                          A packaging fee of <strong>₹{packagingRate}</strong> applies per item.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 p-4 pb-8 sm:pb-4 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
              
              {/* Login Required State */}
              {status.error === "LOGIN_REQUIRED" ? (
                 <div className="flex flex-col gap-3 items-center w-full">
                    <p className="text-sm text-red-500 font-medium flex items-center gap-2">
                        <AlertTriangle size={16} /> Please login to add items
                    </p>
                    <button 
                        onClick={handleLoginRedirect}
                        className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                    >
                        Login Now
                    </button>
                 </div>
              ) : (
                  <div className="flex items-stretch gap-3 h-14">
                    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 rounded-2xl px-1 min-w-[130px]">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-full flex items-center justify-center text-gray-500 disabled:opacity-30 active:scale-90 transition-transform hover:text-gray-900 dark:hover:text-white"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="text-lg font-bold text-gray-900 dark:text-white w-6 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-full flex items-center justify-center text-gray-900 dark:text-white active:scale-90 transition-transform hover:text-orange-600"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <div className="flex-1 relative">
                      <AnimatePresence mode="wait">
                        {status.loading ? (
                          <motion.div 
                            key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="w-full h-full bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center"
                          >
                            <Loader2 className="animate-spin text-white dark:text-black" />
                          </motion.div>
                        ) : status.success ? (
                          <motion.div 
                            key="success" initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                            className="w-full h-full bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold gap-2"
                          >
                            <Check size={20} strokeWidth={3} /> Added
                          </motion.div>
                        ) : (
                          <motion.button
                            key="add"
                            onClick={handleConfirm}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-full bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-base shadow-lg flex flex-col items-center justify-center leading-none hover:shadow-xl transition-shadow"
                          >
                            <span className="text-xs opacity-80 mb-1">Add Item</span>
                            <span>₹{totalPrice}</span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
              )}
              
              {status.error && status.error !== "LOGIN_REQUIRED" && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-center text-xs font-bold mt-2 absolute -top-6 left-0 right-0"
                >
                  {status.error}
                </motion.p>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};