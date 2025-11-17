"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Star,
  Package,
  Bike,
  ChefHat,
  Receipt,
} from "lucide-react";
import { ReviewModal } from "./ReviewModal";

// Helper to get status config
const getStatusConfig = (status) => {
  const config = {
    Delivered: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    Preparing: { icon: ChefHat, color: "text-orange-600", bg: "bg-orange-100" },
    Accepted: { icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-100" },
    "Out for Delivery": { icon: Bike, color: "text-purple-600", bg: "bg-purple-100" },
    Pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
    Cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
    Refunded: { icon: RefreshCw, color: "text-gray-600", bg: "bg-gray-100" },
  };
  return config[status] || { icon: Clock, color: "text-gray-600", bg: "bg-gray-100" };
};

const OrderTracker = ({ statusHistory }) => {
  return (
    <div className="relative pl-2">
      {/* Vertical Line */}
      <div className="absolute left-[1.35rem] top-2 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-700" />

      <div className="space-y-6 relative">
        {statusHistory.map((historyItem, index) => {
          const isLast = index === statusHistory.length - 1;
          const { icon: Icon, color, bg } = getStatusConfig(historyItem.status);

          return (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="flex items-start gap-4 relative z-10"
            >
              {/* Icon Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border-2 border-white dark:border-gray-800 ${isLast ? `${bg} ${color} ring-2 ring-offset-2 ring-orange-100 dark:ring-offset-gray-900` : "bg-white dark:bg-gray-700 text-gray-400"
                  }`}
              >
                <Icon size={isLast ? 18 : 16} className={isLast ? "animate-pulse" : ""} />
              </div>

              {/* Text Content */}
              <div className="flex-1 pt-1">
                <p className={`font-semibold text-sm ${isLast ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                  {historyItem.status}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-mono">
                  {new Date(historyItem.timestamp).toLocaleString("en-IN", {
                    month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
                  })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const OrderDetailsModal = ({ order, onClose, onCancelOrder, onSubmit, isActionLoading }) => {
  const [reviewItem, setReviewItem] = useState(null);

  const { subtotal, parcelCharges } = useMemo(() => {
    if (!order) return { subtotal: 0, parcelCharges: 0 };
    let subtotal = 0;
    let parcelCharges = 0;
    order.items.forEach((item) => {
      subtotal += item.price * item.quantity;
      if (item.service === "parcel") {
        parcelCharges += 10 * item.quantity;
      }
    });
    return { subtotal, parcelCharges };
  }, [order]);

  if (!order) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center p-4 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* --- Header --- */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20 shrink-0">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Order Details
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold border border-orange-100 dark:border-orange-800">
                    #{order.orderNumber}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  From <span className="font-semibold text-gray-800 dark:text-gray-200">{order.sellerId?.name}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* --- Scrollable Content (Scrollbar Hidden) --- */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

            {/* 1. Tracker Section */}
            <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
              <OrderTracker statusHistory={order.statusHistory} />
            </div>

            {/* 2. Items List */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Package size={16} /> Order Items
              </h3>
              <div className="space-y-5">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 group pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 mt-0.5 shrink-0">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{item.itemName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-1">{item.service} Service</p>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col justify-between sm:items-end items-center gap-2 pl-9 sm:pl-0">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Rating Button - ALWAYS VISIBLE */}
                      {order.status === 'Delivered' && (
                        <button
                          onClick={() => setReviewItem(item)}
                          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Star size={12} className="fill-blue-600 dark:fill-blue-400" />
                          {item.foodRating ? "Rated" : "Rate Item"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Bill Details (Receipt Style) */}
            <div className="relative pt-4">
              <div className="absolute top-1 left-0 right-0 h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDIwIDEwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCAxMEw1IDBMMTAgMTBMMTUgMEwyMCAxMFowIiBmaWxsPSIjZjNmNGY2IiAvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDIwIDEwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCAxMEw1IDBMMTAgMTBMMTUgMEwyMCAxMFowIiBmaWxsPSIjMWYyOTM3IiAvPjwvc3ZnPg==')] bg-repeat-x opacity-100"></div>

              <div className="bg-gray-100 dark:bg-gray-800/60 p-5 rounded-b-2xl rounded-t-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Receipt size={16} /> Bill Details
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Item Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Parcel Charges</span>
                    <span>₹{parcelCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Platform & UPI Fee</span>
                    <span>₹{order.upiCharges.toFixed(2)}</span>
                  </div>

                  <div className="my-3 border-t border-dashed border-gray-300 dark:border-gray-600"></div>

                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900 dark:text-white">Grand Total</span>
                    <span className="text-lg font-black text-gray-900 dark:text-white">₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Footer Actions --- */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex gap-3 shrink-0">

            {['Pending', 'Accepted'].includes(order.status) && (
              <button
                onClick={() => onCancelOrder(order._id)}
                disabled={isActionLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isActionLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Cancel Order'}
              </button>
            )}

            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-gray-900/50 transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {reviewItem && (
          <ReviewModal
            item={reviewItem}
            orderId={order._id}
            onClose={() => setReviewItem(null)}
            onSubmit={onSubmit}
            isActionLoading={isActionLoading}
          />
        )}
      </AnimatePresence>
    </>
  );
};