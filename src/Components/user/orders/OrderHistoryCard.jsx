"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, RefreshCw, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { DashboardCard } from "@/Components/ui/DashboardCard";
import { AnimatePresence } from "framer-motion";
import useCartStore from '@/Components/stores/cartStore';
import { OrderDetailsModal } from "./OrderDetailsModal";
import { StatusIndicator } from "./StatusIndicator";
import { OrderSkeleton } from "./OrderSkeleton";

export const OrderHistoryCard = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const router = useRouter();
    const { fetchCount: updateCartCount } = useCartStore();

    useEffect(() => {
        const fetchAllOrders = async () => {
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
        fetchAllOrders();
    }, []);

    const ordersToDisplay = showAll ? orders : orders.slice(0, 5);

    const handleOpenDetails = (order) => setSelectedOrder(order);
    const handleCloseDetails = () => setSelectedOrder(null);
    
    const handleReOrder = async (orderId) => {
        setIsActionLoading(true);
        try {
            const res = await fetch('/api/cart/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId })
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Failed to re-order.');
            
            alert(result.message);
            await updateCartCount();
            router.push('/cart');
        } catch (err) {
            alert(err.message);
        } finally {
            setIsActionLoading(false);
        }
    };
    
    const handleCancelOrder = async (orderId) => {
        if (!confirm("Are you sure you want to cancel this order? This cannot be undone.")) return;
        setIsActionLoading(true);
        try {
            const res = await fetch('/api/orders/cancel', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId })
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Failed to cancel order.');

            setOrders(currentOrders => currentOrders.map(o => o._id === orderId ? result.order : o));
            handleCloseDetails();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsActionLoading(false);
        }
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
                {ordersToDisplay.map(order => (
                    <div key={order._id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-gray-800 dark:text-gray-100">{order.sellerId?.name || 'Restaurant'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{order.items.map(item => item.itemName).join(', ')}</p>
                                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-1">₹{order.totalAmount.toFixed(2)}</p>
                            </div>
                            <StatusIndicator status={order.status} />
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex-wrap gap-2">
                           <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">ID: {order.orderNumber}</p>
                           <div className="flex items-center gap-4">
                                <button onClick={() => handleReOrder(order._id)} disabled={isActionLoading} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition disabled:opacity-50">
                                    {isActionLoading ? <Loader2 className="w-3 h-3 animate-spin"/> : <RefreshCw size={12} />} Re-Order
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
            <DashboardCard icon={<ShoppingBag className="w-6 h-6 text-orange-500" />} title="Order History">
                {renderContent()}
                {orders.length > 5 && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <button 
                            onClick={() => setShowAll(!showAll)}
                            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition"
                        >
                            {showAll ? 'Show Less' : 'Show All Orders'}
                            {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                    </div>
                )}
            </DashboardCard>
            <AnimatePresence>
                {selectedOrder && 
                    <OrderDetailsModal 
                        order={selectedOrder} 
                        onClose={handleCloseDetails}
                        onCancelOrder={handleCancelOrder}
                        isActionLoading={isActionLoading}
                    />}
            </AnimatePresence>
        </>
    );
};