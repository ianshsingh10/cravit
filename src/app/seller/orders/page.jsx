"use client";

import { useState, useEffect, useMemo } from "react";
import { 
    Loader2, AlertTriangle, Package, CheckCircle2, Clock, 
    XCircle, ChevronDown, ChevronUp, Filter, Utensils, Bike 
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// --- Status Config Helper ---
const getStatusConfig = (status) => {
    const config = {
        Pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
        Accepted: { icon: Utensils, color: "text-blue-600", bg: "bg-blue-100" },
        Preparing: { icon: Utensils, color: "text-orange-600", bg: "bg-orange-100" },
        'Out for Delivery': { icon: Bike, color: "text-purple-600", bg: "bg-purple-100" },
        Delivered: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
        Cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
        Refunded: { icon: XCircle, color: "text-gray-600", bg: "bg-gray-100" },
    };
    return config[status] || { icon: Clock, color: "text-gray-500", bg: "bg-gray-100" };
};

// --- Mobile-First Order Card ---
const SellerOrderCard = ({ order, onStatusChange, isUpdating }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { icon: StatusIcon, color, bg } = getStatusConfig(order.status);
    
    // Determine next logical action for quick buttons
    const getNextAction = () => {
        if (order.status === 'Pending') return 'Accepted';
        if (order.status === 'Accepted') return 'Preparing';
        if (order.status === 'Preparing') return 'Out for Delivery';
        if (order.status === 'Out for Delivery') return 'Delivered';
        return null;
    };
    const nextAction = getNextAction();

    return (
        <motion.div 
            layout
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
            {/* Header (Always Visible) */}
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-4 flex justify-between items-start gap-3 cursor-pointer active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
            >
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">#{order.orderNumber}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base truncate">
                        {order.userId?.name || "Guest User"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {order.items.length} items • ₹{order.totalAmount.toFixed(0)}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-5">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${bg} ${color}`}>
                        <StatusIcon size={14} />
                        <span>{order.status}</span>
                    </div>
                    <ChevronDown size={18} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50"
                    >
                        <div className="p-4 space-y-4">
                            {/* Item List */}
                            <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <div className="flex gap-2">
                                            <span className="font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-1.5 rounded border border-gray-200 dark:border-gray-600 h-fit">
                                                {item.quantity}x
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">{item.itemName}</span>
                                        </div>
                                        <span className="text-gray-500 text-xs whitespace-nowrap">{item.service || 'Dine-in'}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="pt-3 border-t border-dashed border-gray-200 dark:border-gray-700">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Update Status</p>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Quick Action Button (Primary) */}
                                    {nextAction && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onStatusChange(order._id, nextAction); }}
                                            disabled={isUpdating === order._id}
                                            className="col-span-2 flex items-center justify-center gap-2 bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                                        >
                                            {isUpdating === order._id ? <Loader2 className="animate-spin" size={18}/> : `Mark as ${nextAction}`}
                                        </button>
                                    )}

                                    {/* Secondary Actions - Dropdown or specific buttons based on state */}
                                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); if(confirm("Cancel Order?")) onStatusChange(order._id, 'Cancelled'); }}
                                            disabled={isUpdating === order._id}
                                            className="col-span-2 py-3 rounded-xl font-bold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function SellerOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isUpdating, setIsUpdating] = useState(null);
    const [filter, setFilter] = useState("Active"); // 'All', 'Active', 'Completed'

    // Fetch Orders
    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/orders/seller');
                if (!res.ok) throw new Error("Could not fetch your orders.");
                const data = await res.json();
                // Sort by date desc
                const sorted = (data.orders || []).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sorted);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
        
        // Optional: Poll for new orders every 30s
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);
    }, []);

    // Filter Logic
    const filteredOrders = useMemo(() => {
        if (filter === 'All') return orders;
        if (filter === 'Completed') return orders.filter(o => ['Delivered', 'Cancelled', 'Refunded'].includes(o.status));
        // Active includes Pending, Accepted, Preparing, Out for Delivery
        return orders.filter(o => !['Delivered', 'Cancelled', 'Refunded'].includes(o.status));
    }, [orders, filter]);

    const handleStatusChange = async (orderId, status) => {
        setIsUpdating(orderId);
        try {
            const res = await fetch('/api/orders/update-status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status }),
            });
            if (!res.ok) throw new Error("Failed to update status.");
            const updatedOrder = await res.json();
            setOrders(current => current.map(o => o._id === orderId ? updatedOrder : o));
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(null);
        }
    };

    if (isLoading) return <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-950"><Loader2 className="w-10 h-10 animate-spin text-orange-500" /></div>;
    
    if (error) return <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center"><AlertTriangle className="text-red-500 mb-2" size={32}/> <p className="text-gray-600">{error}</p></div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
            
            {/* Sticky Header & Filters */}
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4 shadow-sm">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">Incoming Orders</h1>
                        <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full">
                            {filteredOrders.length}
                        </span>
                    </div>
                    
                    {/* Scrollable Filter Tabs */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {['Active', 'Pending', 'Completed', 'All'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                    filter === tab 
                                    ? "bg-gray-900 dark:bg-white text-white dark:text-black shadow-md" 
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                }`}
                            >
                                {tab === 'Active' ? 'In Progress' : tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                {filteredOrders.length > 0 ? (
                    <AnimatePresence initial={false}>
                        {filteredOrders.map(order => (
                            <SellerOrderCard 
                                key={order._id}
                                order={order}
                                onStatusChange={handleStatusChange}
                                isUpdating={isUpdating}
                            />
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                        <Package size={48} className="text-gray-400 mb-4" />
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">No orders found</h3>
                        <p className="text-sm text-gray-500">Current filter: {filter}</p>
                    </div>
                )}
            </div>
        </div>
    );
}