"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, Clock, XCircle, RefreshCw, Star,} from "lucide-react";
import { StatusIndicator } from "./StatusIndicator";
import { ReviewModal } from "./ReviewModal";

export const OrderDetailsModal = ({ order, onClose, onCancelOrder, onReviewSubmit, isActionLoading }) => {
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

  const OrderTracker = ({ statusHistory }) => {
    const getStatusTimelineIcon = (status) => {
      const config = {
        Delivered: {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          bg: "bg-green-500/20",
        },
        Preparing: {
          icon: <Clock className="w-4 h-4 text-yellow-500" />,
          bg: "bg-yellow-500/20",
        },
        Accepted: {
          icon: <Clock className="w-4 h-4 text-yellow-500" />,
          bg: "bg-yellow-500/20",
        },
        "Out for Delivery": {
          icon: <Clock className="w-4 h-4 text-yellow-500" />,
          bg: "bg-yellow-500/20",
        },
        Pending: {
          icon: <Clock className="w-4 h-4 text-blue-500" />,
          bg: "bg-blue-500/20",
        },
        Cancelled: {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          bg: "bg-red-500/20",
        },
        Refunded: {
          icon: <RefreshCw className="w-4 h-4 text-gray-500" />,
          bg: "bg-gray-500/20",
        },
      };
      return (
        config[status] || {
          icon: <Clock className="w-4 h-4 text-gray-500" />,
          bg: "bg-gray-500/20",
        }
      );
    };

    return (
      <div>
        <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300 mb-3">
          Order Tracker
        </h3>
        <div className="space-y-4">
          {statusHistory.map((historyItem, index) => {
            const timelineIcon = getStatusTimelineIcon(historyItem.status);
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${timelineIcon.bg}`}
                  >
                    {timelineIcon.icon}
                  </div>
                  {index < statusHistory.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700"></div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {historyItem.status}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(historyItem.timestamp).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!order) return null;

  return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg"
                >
                    <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Details</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">#{order.orderNumber}</p>
                        </div>
                        <StatusIndicator status={order.status} />
                    </div>
                    <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto scrollbar-hide [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <OrderTracker statusHistory={order.statusHistory} />
                        <div className="space-y-2">
                            <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300">Items from {order.sellerId?.name}</h3>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-sm pb-2 border-b border-gray-100 dark:border-gray-700">
                                    <div>
                                        <span className="text-gray-700 dark:text-gray-300">{item.quantity} x {item.itemName}</span>
                                        <span className="text-gray-500 dark:text-gray-400"> ({item.service})</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-gray-800 dark:text-gray-200">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        {order.status === 'Delivered' && (
                                            <button onClick={() => setReviewItem(item)} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 font-semibold rounded-md hover:bg-blue-200">
                                                <Star size={12} /> Rate
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 space-y-2">
                            <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300">Price Details</h3>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Parcel Charges</span><span>₹{parcelCharges.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>Platform & UPI Fee</span><span>₹{order.upiCharges.toFixed(2)}</span></div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t dark:border-gray-700 mt-2"><span>Grand Total</span><span>₹{order.totalAmount.toFixed(2)}</span></div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center rounded-b-2xl">
                        {['Pending', 'Accepted'].includes(order.status) && (
                            <button onClick={() => onCancelOrder(order._id)} disabled={isActionLoading} className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center gap-2 disabled:opacity-50">
                                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : 'Cancel Order'}
                            </button>
                        )}
                        <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm ml-auto">Close</button>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"><X size={20}/></button>
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {reviewItem && (
                    <ReviewModal
                        item={reviewItem}
                        onClose={() => setReviewItem(null)}
                        onReviewSubmit={onReviewSubmit}
                    />
                )}
            </AnimatePresence>
        </>
    );
};