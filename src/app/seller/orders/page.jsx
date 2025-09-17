"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertTriangle, Package, CheckCircle, Clock, XCircle } from 'lucide-react';

const StatusIndicator = ({ status }) => {
    const statusConfig = {
        Delivered: { icon: <CheckCircle className="w-4 h-4 text-green-500" />, color: 'text-green-600 dark:text-green-400' },
        Preparing: { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        Accepted: { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        'Out for Delivery': { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        Pending: { icon: <Clock className="w-4 h-4 text-blue-500" />, color: 'text-blue-600 dark:text-blue-400' },
        Cancelled: { icon: <XCircle className="w-4 h-4 text-red-500" />, color: 'text-red-600 dark:text-red-400' },
        Refunded: { icon: <CheckCircle className="w-4 h-4 text-green-500" />, color: 'text-green-600 dark:text-green-400' },

    };
    const { icon, color } = statusConfig[status] || {};
    return (
        <div className={`flex items-center gap-2 text-sm font-semibold ${color}`}>
            {icon}<span>{status}</span>
        </div>
    );
};

// A sub-component for a single order card
const SellerOrderCard = ({ order, onStatusChange, isUpdating }) => {
    const validStatuses = ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'];
    const isOrderUpdating = isUpdating === order._id;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg text-gray-800 dark:text-white">Order #{order.orderNumber}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <StatusIndicator status={order.status} />
            </div>
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 space-y-2">
                {order.items.map(item => (
                    <div key={item.itemId} className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{item.quantity} x {item.itemName}</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">₹{item.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Customer:</p>
                    <p className="text-gray-800 dark:text-white">{order.userId?.name || 'N/A'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.userId?.email || 'No email'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total:</p>
                    <p className="text-xl font-bold text-orange-600 dark:text-orange-400">₹{order.totalAmount.toFixed(2)}</p>
                </div>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label htmlFor={`status-${order._id}`} className="text-sm font-semibold text-gray-600 dark:text-gray-300 block mb-2">Update Status:</label>
                <div className="flex items-center gap-2">
                    <select
                        id={`status-${order._id}`}
                        value={order.status}
                        onChange={(e) => onStatusChange(order._id, e.target.value)}
                        disabled={isOrderUpdating}
                        className="flex-grow bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
                    >
                        {validStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    {isOrderUpdating && <Loader2 className="animate-spin text-orange-500" />}
                </div>
            </div>
        </div>
    );
};


export default function SellerOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isUpdating, setIsUpdating] = useState(null); // Will hold the ID of the order being updated

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/orders/seller');
                if (!res.ok) throw new Error("Could not fetch your orders.");
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
            setOrders(currentOrders => currentOrders.map(o => o._id === orderId ? updatedOrder : o));
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(null);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center"><Loader2 className="w-12 h-12 animate-spin text-orange-500" /></div>;
    }
    if (error) {
        return <div className="min-h-screen flex justify-center items-center text-red-500"><AlertTriangle className="mr-2" /> {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8">Received Orders</h1>
                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map(order => (
                           <SellerOrderCard 
                                key={order._id}
                                order={order}
                                onStatusChange={handleStatusChange}
                                isUpdating={isUpdating}
                           />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <Package className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto" />
                        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">No orders yet</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">When a customer places an order, it will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}