"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  AlertTriangle,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Receipt,
  CheckCircle,
  X,
  Package
} from "lucide-react";
import { useRouter } from "next/navigation";
import useCartStore from "@/Components/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom Toast Component ---
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-24 left-4 right-4 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[300px] z-[100] p-4 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
                type === 'error' 
                ? 'bg-red-50/90 border-red-100 text-red-700 dark:bg-red-900/90 dark:border-red-800 dark:text-red-100' 
                : 'bg-gray-900/90 border-gray-800 text-white dark:bg-white/90 dark:text-gray-900'
            }`}
        >
            {type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle size={20} className="text-green-500" />}
            <span className="font-semibold text-sm flex-1">{message}</span>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full"><X size={16}/></button>
        </motion.div>
    );
};

// --- Cart Item Component ---
const CartItemRow = ({ item, onUpdate, onRequestRemove, onServiceChange, isUpdating }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-100 dark:border-gray-700 shadow-sm"
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
          <Image
            src={item.itemId?.image || "https://placehold.co/200x200/F0F0F0/333333?text=Food"}
            alt={item.itemName}
            fill
            className="object-cover"
            unoptimized={true}
          />
        </div>

        <div className="flex-grow flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start gap-1">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-tight line-clamp-2">
                {item.itemName}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                {item.sellerName || "Restaurant"}
              </p>
            </div>
            <p className="font-extrabold text-sm sm:text-lg text-gray-900 dark:text-white whitespace-nowrap">
              ₹{item.price * item.quantity}
            </p>
          </div>

          <div className="flex items-end justify-between gap-2 mt-2">
            <div className="flex bg-gray-100 dark:bg-gray-900/50 rounded-lg p-0.5">
               <button
                  onClick={() => onServiceChange(item._id, "dine-in")}
                  disabled={isUpdating}
                  className={`flex items-center justify-center px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                    item.service === "dine-in"
                      ? "bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Dine-in
                </button>
                <button
                  onClick={() => onServiceChange(item._id, "parcel")}
                  disabled={isUpdating}
                  className={`flex items-center justify-center px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                    item.service === "parcel"
                      ? "bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Parcel
                </button>
            </div>

            <div className="flex items-center gap-2">
               <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg h-8 sm:h-9">
                  <button
                    onClick={() => onUpdate(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1 || isUpdating}
                    className="w-8 h-full flex items-center justify-center text-gray-500 active:text-orange-600 disabled:opacity-30 active:bg-gray-50 dark:active:bg-gray-800 rounded-l-lg transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-5 text-center text-xs font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdate(item._id, item.quantity + 1)}
                    disabled={isUpdating}
                    className="w-8 h-full flex items-center justify-center text-gray-500 active:text-orange-600 disabled:opacity-30 active:bg-gray-50 dark:active:bg-gray-800 rounded-r-lg transition-colors"
                  >
                    <Plus size={14} />
                  </button>
               </div>
               
               <button
                  onClick={() => onRequestRemove(item._id)}
                  disabled={isUpdating}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 active:bg-red-100 dark:bg-red-900/10 dark:text-red-400 transition-colors"
               >
                  <Trash2 size={14} />
               </button>
            </div>
          </div>
        </div>
      </div>
      
      {item.service === "parcel" && (
         <div className="mt-2 pt-1.5 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-center text-[10px] sm:text-xs">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
               <Package size={10}/> Parcel charges applied
            </span>
            <span className="font-medium text-gray-900 dark:text-white">+ ₹{10 * item.quantity}</span>
         </div>
      )}
    </motion.div>
  );
};

const SummaryRow = ({ label, value, isTotal = false }) => (
  <div className={`flex justify-between items-center ${isTotal ? 'pt-3 mt-3 border-t border-dashed border-gray-300 dark:border-gray-600' : 'py-1'}`}>
    <span className={`${isTotal ? 'text-base font-bold text-gray-900 dark:text-white' : 'text-sm text-gray-500 dark:text-gray-400'}`}>
      {label}
    </span>
    <span className={`${isTotal ? 'text-base font-black text-gray-900 dark:text-white' : 'text-sm font-medium text-gray-900 dark:text-gray-200'}`}>
      {value}
    </span>
  </div>
);

// --- Main Page ---
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Delete Modal State
  const [itemToDelete, setItemToDelete] = useState(null);

  const router = useRouter();
  const { fetchCount } = useCartStore();

  const showToast = (message, type = 'success') => {
      setToast({ message, type });
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/cart");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Could not fetch cart.");
        }
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity }),
      });
      if (!res.ok) throw new Error("Failed");
      const updatedItem = await res.json();
      setCartItems((prev) => prev.map((item) => item._id === cartItemId ? updatedItem : item));
    } catch (err) { 
        showToast("Failed to update quantity", "error"); 
    } finally { setIsUpdating(false); }
  };

  const handleServiceChange = async (cartItemId, service) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, service }),
      });
      if (!res.ok) throw new Error("Failed");
      const updatedItem = await res.json();
      setCartItems((prev) => prev.map((item) => item._id === cartItemId ? updatedItem : item));
    } catch (err) { 
        showToast("Failed to update service", "error"); 
    } finally { setIsUpdating(false); }
  };

  // 1. Trigger Confirmation
  const requestRemoveItem = (cartItemId) => {
    setItemToDelete(cartItemId);
  };

  // 2. Actual Delete Logic
  const confirmRemoveItem = async () => {
    if (!itemToDelete) return;
    
    setIsUpdating(true);
    setItemToDelete(null);

    try {
      const res = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: itemToDelete }),
      });
      if (!res.ok) throw new Error("Failed");
      setCartItems((prev) => prev.filter((item) => item._id !== itemToDelete));
      fetchCount();
      showToast("Item removed from cart", "success");
    } catch (err) { 
        showToast("Failed to remove item", "error"); 
    } finally { 
      setIsUpdating(false); 
    }
  };

  const { subtotal, parcelCharges, upiCharges, grandTotal, totalItems } = useMemo(() => {
    let sub = 0; let parcel = 0; let count = 0;
    cartItems.forEach((item) => {
      sub += item.price * item.quantity;
      count += item.quantity;
      if (item.service === "parcel") parcel += 10 * item.quantity;
    });
    const totalBeforeFees = sub + parcel;
    const grand = totalBeforeFees / 0.965; 
    const fees = grand - totalBeforeFees;
    return { subtotal: sub, parcelCharges: parcel, upiCharges: fees, grandTotal: grand, totalItems: count };
  }, [cartItems]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/orders/create", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order.");
      
      fetchCount(); 
      setCartItems([]); 
      
      const options = {
        key: data.key_id, 
        amount: data.order.amount, 
        currency: "INR", 
        name: "Cravit", 
        description: "Food Order", 
        image: "/cravit-logo.jpg", 
        order_id: data.order.id,
        handler: async function (response) { 
            showToast("Order Placed Successfully!", "success");
            router.push("/user/dashboard"); 
        },
        theme: { color: "#F97316" },
        modal: { ondismiss: function() { router.push("/user/dashboard"); } }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) { 
        showToast(err.message || "Checkout Failed", "error"); 
        setIsCheckingOut(false); 
        if(cartItems.length > 0) router.refresh(); 
    }
  };

  if (isLoading) return <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950"><Loader2 className="w-8 h-8 animate-spin text-orange-500"/></div>;
  
  if (error) return <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 bg-white dark:bg-gray-950"><AlertTriangle size={32} className="text-red-500 mb-2"/><p className="text-gray-500">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-32 sm:pb-20 relative">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
           <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
             <ShoppingCart className="text-orange-500 w-5 h-5"/> 
             Cart 
             {cartItems.length > 0 && <span className="text-xs font-medium text-gray-500 dark:text-gray-400">({totalItems} items)</span>}
           </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* Left: Items List */}
            <div className="flex-1">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItemRow
                    key={item._id}
                    item={item}
                    onUpdate={handleUpdateQuantity}
                    onRequestRemove={requestRemoveItem}
                    onServiceChange={handleServiceChange}
                    isUpdating={isUpdating}
                  />
                ))}
              </AnimatePresence>

              {/* Mobile: Bill Details */}
              <div className="lg:hidden mt-6 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                 <h2 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Receipt size={16}/> Bill Details
                 </h2>
                 <SummaryRow label="Item Total" value={`₹${subtotal.toFixed(2)}`} />
                 <SummaryRow label="Parcel Charges" value={`₹${parcelCharges.toFixed(2)}`} />
                 <SummaryRow label="Taxes & Fees" value={`₹${upiCharges.toFixed(2)}`} />
                 <div className="pt-3 mt-3 border-t border-dashed border-gray-300 dark:border-gray-700 flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">To Pay</span>
                    <span className="font-black text-lg text-gray-900 dark:text-white">₹{grandTotal.toFixed(2)}</span>
                 </div>
              </div>
            </div>

            {/* Desktop: Sticky Sidebar */}
            <div className="hidden lg:block w-[380px] sticky top-24 h-fit">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Receipt size={18}/> Bill Details</h2>
                <SummaryRow label="Item Total" value={`₹${subtotal.toFixed(2)}`} />
                <SummaryRow label="Parcel Charges" value={`₹${parcelCharges.toFixed(2)}`} />
                <SummaryRow label="Platform & Taxes" value={`₹${upiCharges.toFixed(2)}`} />
                <SummaryRow label="Grand Total" value={`₹${grandTotal.toFixed(2)}`} isTotal />
                
                <button onClick={handleCheckout} disabled={isCheckingOut || isUpdating} className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                  {isCheckingOut ? <Loader2 className="animate-spin" /> : <>Proceed to Pay <ArrowRight size={18} /></>}
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
               <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">Go ahead and explore our menu to add delicious food.</p>
            <Link href="/search" className="bg-orange-600 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-orange-500/30 active:scale-95 transition-transform">
              Browse Food
            </Link>
          </div>
        )}
      </div>

      {/* --- MOBILE STICKY BOTTOM BAR --- */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 px-5 lg:hidden z-30 pb-safe"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }} 
          >
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Total</span>
                <span className="text-xl font-black text-gray-900 dark:text-white">₹{grandTotal.toFixed(0)}</span>
                <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">View Detailed Bill</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut || isUpdating}
                className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold text-base shadow-lg shadow-orange-500/30 flex items-center gap-2 disabled:opacity-70 active:scale-95 transition-transform"
              >
                {isCheckingOut ? <Loader2 className="w-5 h-5 animate-spin"/> : <>Pay <ArrowRight size={18}/></>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {itemToDelete && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-xs w-full p-6 text-center border border-gray-100 dark:border-gray-800"
                >
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                        <Trash2 size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Remove Item?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Are you sure you want to remove this item from your cart?
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setItemToDelete(null)}
                            className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmRemoveItem}
                            className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
                        >
                            Remove
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* --- CUSTOM TOAST --- */}
      <AnimatePresence>
          {toast && (
              <Toast 
                  message={toast.message} 
                  type={toast.type} 
                  onClose={() => setToast(null)} 
              />
          )}
      </AnimatePresence>

    </div>
  );
}