"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ShoppingBag,
    ArrowRight,
    Loader2,
    Star,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Clock
} from "lucide-react";

import { OrderDetailsModal } from "./OrderDetailsModal";
import { ReviewModal } from "./ReviewModal";
import { StatusIndicator } from "./StatusIndicator";
import { OrderSkeleton } from "./OrderSkeleton";
import useCartStore from "@/Components/stores/cartStore";
import { useRouter } from "next/navigation";

// --- Components ---

const DashboardCard = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm text-orange-500">
                {icon}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                {title}
            </h2>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
    </div>
);

const StarDisplay = ({ rating = 0, onRate, onClick }) => {
    return (
        <div className={`flex items-center gap-1 ${onClick ? 'cursor-pointer group' : ''}`} onClick={onClick}>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <Star
                        key={index}
                        size={16}
                        className={`transition-colors duration-200 ${starValue <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200 dark:text-gray-700 group-hover:text-gray-300"
                            }`}
                    />
                );
            })}
        </div>
    );
};

const ITEMS_PER_PAGE = 3;

export const OrderHistoryCard = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for Modals
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedReviewItem, setSelectedReviewItem] = useState(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const router = useRouter();
    const { fetchCount: updateCartCount } = useCartStore();

    useEffect(() => {
        const fetchAllOrders = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/orders/my-orders");
                if (!res.ok) throw new Error("Failed to fetch orders.");
                const data = await res.json();

                // Debug: Check console to see if 'image' field exists in response
                console.log("Fetched Orders:", data.orders);

                const sortedOrders = (data.orders || []).sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders);
            } catch (err) {
                console.error("Fetch error:", err.message);
                setError("Failed to fetch orders.");
                setOrders([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllOrders();
    }, []);

    const ordersToDisplay = showAll ? orders : orders.slice(0, ITEMS_PER_PAGE);

    const handleOpenDetails = (order) => setSelectedOrder(order);
    const handleCloseDetails = () => setSelectedOrder(null);

    const handleReOrder = async (orderId) => {
        setIsActionLoading(true);
        try {
            const res = await fetch("/api/cart/reorder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId })
            });
            const result = await res.json();
            if (result.message) alert(result.message);
            if (!res.ok) throw new Error(result.error || "Failed to re-order.");
            await updateCartCount();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (!confirm("Are you sure you want to cancel this order?")) return;
        setIsActionLoading(true);
        try {
            const res = await fetch("/api/orders/cancel", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId })
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to cancel order.");
            setOrders((currentOrders) =>
                currentOrders.map((o) => (o._id === orderId ? result.order : o))
            );
            handleCloseDetails();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleReviewSubmit = async ({ itemId, orderId, rating, comment, isUpdate }) => {
        setIsActionLoading(true);

        const method = isUpdate ? "PUT" : "POST";

        try {
            const res = await fetch("/api/items/review", {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itemId, orderId, rating, comment })
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || "Failed to submit review.");
            }

            alert(isUpdate ? "Review updated successfully!" : "Thank you for your review!");

            setOrders((currentOrders) =>
                currentOrders.map((o) => {
                    if (o._id !== orderId) return o;
                    return {
                        ...o,
                        items: o.items.map((i) =>
                            (i.itemId === itemId || i._id === itemId)
                                ? { ...i, foodRating: rating, review: comment }
                                : i
                        )
                    };
                })
            );
        } catch (err) {
            alert(`Review Error: ${err.message}`);
            throw err; // Re-throw so the modal knows it failed
        } finally {
            setIsActionLoading(false);
        }
    };

    const formatOrderDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const renderContent = () => {
        if (isLoading) return <OrderSkeleton count={ITEMS_PER_PAGE} />;
        if (error) return <p className="text-red-500 text-sm text-center py-6 bg-red-50 rounded-lg">{error}</p>;
        if (orders.length === 0) return <p className="text-gray-500 text-sm text-center py-10">No past orders found.</p>;

        return (
            <motion.div layout className="space-y-5">
                <AnimatePresence initial={false}>
                    {ordersToDisplay.map((order) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            key={order._id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden"
                        >
                            {/* Card Header */}
                            <div className="p-5 pb-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={
                                                    order.sellerId?.image ||
                                                    `https://placehold.co/100x100/f97316/white?text=${order.sellerId?.name?.[0] || "R"}`
                                                }
                                                alt={order.sellerId?.name || "Restaurant"}
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-gray-100 dark:border-gray-600 shadow-sm bg-gray-100"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://placehold.co/100x100/f97316/white?text=${order.sellerId?.name?.[0] || "R"}`;
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg leading-tight mt-2">
                                                {order.sellerId?.name || "Restaurant Name"}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                <Clock size={12} />
                                                <span>{formatOrderDate(order.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <StatusIndicator status={order.status} />
                                </div>
                            </div>

                            {/* Items Summary */}
                            <div className="px-5 pb-4">
                                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 space-y-2">
                                    {order.items.slice(0, 2).map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm">
                                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-600">
                                                {item.quantity}
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-200 truncate font-medium">
                                                {item.itemName}
                                            </span>
                                        </div>
                                    ))}
                                    {order.items.length > 2 && (
                                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 pl-9">
                                            + {order.items.length - 2} more items
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Rating Section */}
                            {order.status === "Delivered" && order.items[0] && (
                                <div className="px-5 pb-3">
                                    <div className="flex items-center justify-between bg-orange-50/50 dark:bg-orange-900/10 rounded-lg px-3 py-2">
                                        <span className="text-xs font-medium text-orange-800 dark:text-orange-300">
                                            Your Rating
                                        </span>
                                        <StarDisplay
                                            rating={order.items[0].foodRating || 0}
                                            onClick={() => setSelectedReviewItem({ order, item: order.items[0] })}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 border-t border-gray-100 dark:border-gray-700 divide-x divide-gray-100 dark:divide-gray-700">
                                <button
                                    onClick={() => handleOpenDetails(order)}
                                    className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    View Details
                                </button>
                                {order.status === "Delivered" ? (
                                    <button
                                        onClick={() => handleReOrder(order._id)}
                                        disabled={isActionLoading}
                                        className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors disabled:opacity-50"
                                    >
                                        {isActionLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                Reorder <ArrowRight size={16} />
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-center py-3 text-sm font-medium text-gray-400 cursor-not-allowed bg-gray-50 dark:bg-gray-800">
                                        In Progress
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <>
            <DashboardCard icon={<ShoppingBag size={20} />} title="Past Orders">
                {renderContent()}

                {orders.length > ITEMS_PER_PAGE && (
                    <motion.div layout className="mt-6 pt-2">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300"
                        >
                            {showAll ? "Show Less" : `View All Orders (${orders.length})`}
                            {showAll ? (
                                <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                            ) : (
                                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                            )}
                        </button>
                    </motion.div>
                )}
            </DashboardCard>

            <AnimatePresence>
                {selectedOrder && (
                    <OrderDetailsModal
                        order={selectedOrder}
                        onClose={handleCloseDetails}
                        onCancelOrder={handleCancelOrder}
                        onSubmit={handleReviewSubmit}
                        isActionLoading={isActionLoading}
                    />
                )}

                {selectedReviewItem && (
                    <ReviewModal
                        item={selectedReviewItem.item}
                        orderId={selectedReviewItem.order._id}
                        onClose={() => setSelectedReviewItem(null)}
                        onSubmit={handleReviewSubmit}
                        isActionLoading={isActionLoading}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default OrderHistoryCard;