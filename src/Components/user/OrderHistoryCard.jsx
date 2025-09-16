"use client";

import { useState, useEffect, useMemo } from "react";
import { ShoppingBag, CheckCircle, XCircle, Clock, ArrowRight, RefreshCw, X } from "lucide-react";
import { DashboardCard } from "@/Components/ui/DashboardCard";
import { AnimatePresence, motion } from "framer-motion";

// A simple skeleton component for the loading state
const OrderSkeleton = () => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-1.5"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
        </div>
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
);

// A sub-component for showing a status with a corresponding icon and color
const StatusIndicator = ({ status }) => {
    const statusConfig = {
        Delivered: { icon: <CheckCircle className="w-4 h-4 text-green-500" />, color: 'text-green-600 dark:text-green-400' },
        Preparing: { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        Accepted: { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        'Out for Delivery': { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        Pending: { icon: <Clock className="w-4 h-4 text-blue-500" />, color: 'text-blue-600 dark:text-blue-400' },
        Cancelled: { icon: <XCircle className="w-4 h-4 text-red-500" />, color: 'text-red-600 dark:text-red-400' },
        Default: { icon: <Clock className="w-4 h-4 text-gray-500" />, color: 'text-gray-600 dark:text-gray-400' }
    };

    const { icon, color } = statusConfig[status] || statusConfig.Default;

    return (
        <div className={`flex items-center gap-2 text-sm font-semibold ${color}`}>
            {icon}
            <span>{status}</span>
        </div>
    );
};

// A dedicated modal component for showing order details
const OrderDetailsModal = ({ order, onClose }) => {
    // Re-calculate the price breakup for the selected order
    const { subtotal, parcelCharges } = useMemo(() => {
        if (!order) return { subtotal: 0, parcelCharges: 0, upiCharges: 0 };

        let subtotal = 0;
        let parcelCharges = 0;

        order.items.forEach(item => {
            subtotal += item.price * item.quantity;
            if (item.service === 'parcel') {
                parcelCharges += 10 * item.quantity;
            }
        });
        

        return { subtotal, parcelCharges };
    }, [order]);

    if (!order) return null;

    return (
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
                
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Item List */}
                    <div className="space-y-2">
                        <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300">Items from {order.sellerId?.name}</h3>
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm pb-2 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-gray-700 dark:text-gray-300">{item.quantity} x {item.itemName} ({item.service})</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price Breakup */}
                    <div className="pt-4 space-y-2">
                         <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300">Price Details</h3>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                            <span>Parcel Charges</span>
                            <span>₹{parcelCharges.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                            <span>UPI Charges</span>
                            <span>₹{order.upiCharges.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t dark:border-gray-700 mt-2">
                            <span>Grand Total</span>
                            <span>₹{(order.totalAmount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 text-right rounded-b-2xl">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const OrderHistoryCard = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/orders/my-orders');
                if (!res.ok) throw new Error('Failed to fetch orders.');
                const data = await res.json();
                setOrders(data.orders || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleOpenDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="space-y-3"><OrderSkeleton /><OrderSkeleton /><OrderSkeleton /></div>;
        }
        if (error) {
            return <p className="text-red-500 text-center py-8">{error}</p>;
        }
        if (orders.length === 0) {
            return <p className="text-gray-500 dark:text-gray-400 text-center py-8">You haven't placed any orders yet.</p>;
        }

        return (
            <div className="space-y-3">
                {orders.map(order => (
                    <div key={order._id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-gray-800 dark:text-gray-100">
                                    {order.sellerId?.name || 'Restaurant'}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                    {order.items.map(item => item.itemName).join(', ')}
                                </p>
                                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-1">
                                    ₹{order.totalAmount.toFixed(2)}
                                </p>
                            </div>
                            <StatusIndicator status={order.status} />
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                           <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                               ID: {order.orderNumber}
                           </p>
                           <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
                                    <RefreshCw size={12} /> Re-Order
                                </button>
                                <button onClick={() => handleOpenDetails(order)} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition">
                                    View Details <ArrowRight size={12} />
                                </button>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <DashboardCard icon={<ShoppingBag className="w-6 h-6 text-orange-500" />} title="Recent Orders">
                {renderContent()}
            </DashboardCard>

            <AnimatePresence>
                {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={handleCloseDetails} />}
            </AnimatePresence>
        </>
    );
};