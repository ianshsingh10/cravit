"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
    Loader2, 
    AlertTriangle, 
    LogOut, 
    ShoppingBag, 
    CreditCard, 
    Clock 
} from "lucide-react";
import { motion } from "framer-motion";
import { OrderHistoryCard } from "@/Components/user/orders/OrderHistoryCard"; // Ensure path is correct
import { ProfileCard } from "@/Components/user/ProfileCard";

export default function UserDashboard() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]); // Store orders here
    const [isLoading, setIsLoading] = useState(true); // Unified loading state
    const [error, setError] = useState("");
    const [greeting, setGreeting] = useState("Welcome back");
    
    const router = useRouter();

    // --- 1. Calculate Stats based on orders ---
    const stats = useMemo(() => {
        if (!orders.length) return { active: 0, spent: 0, lastDate: "N/A" };

        // Active: Any status that isn't final (Delivered, Cancelled, Refunded)
        const activeCount = orders.filter(o => 
            ['Pending', 'Accepted', 'Preparing', 'Out for Delivery'].includes(o.status)
        ).length;

        // Total Spent: Sum of all non-cancelled orders
        const totalSpent = orders
            .filter(o => o.status !== 'Cancelled' && o.status !== 'Refunded')
            .reduce((acc, curr) => acc + curr.totalAmount, 0);

        // Last Order: Date of the most recent order (orders are sorted by date from API)
        const lastOrderDate = new Date(orders[0].createdAt).toLocaleDateString("en-IN", {
            day: "numeric", month: "short"
        });

        return { active: activeCount, spent: totalSpent, lastDate: lastOrderDate };
    }, [orders]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch User and Orders in parallel
                const [userRes, ordersRes] = await Promise.all([
                    fetch("/api/user/me"),
                    fetch("/api/orders/my-orders")
                ]);

                // Handle User
                if (userRes.ok) {
                    const userData = await userRes.json();
                    if (userData.user) setUser(userData.user);
                    else throw new Error("Session invalid");
                } else {
                    throw new Error("Failed to verify session");
                }

                // Handle Orders
                if (ordersRes.ok) {
                    const ordersData = await ordersRes.json();
                    // Sort orders desc by date just in case API didn't
                    const sortedOrders = (ordersData.orders || []).sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setOrders(sortedOrders);
                }

            } catch (err) {
                console.error(err);
                setError("Please log in to access your dashboard.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/user/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                    <p className="text-gray-500 text-sm font-medium animate-pulse">Loading your dashboard...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
         return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 text-center">
              <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100 dark:border-red-900/20"
              >
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">{error}</p>
                  <button onClick={() => router.push('/user/login')} className="mt-6 w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-orange-600 transition-transform active:scale-95">
                      Go to Login
                  </button>
              </motion.div>
          </div>
      );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {greeting}, <span className="text-orange-500">{user?.name?.split(' ')[0] || 'User'}</span>!
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                            Here's what's happening with your orders today.
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-sm font-medium shadow-sm"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </motion.div>

                {/* Quick Stats - NOW FUNCTIONAL */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500">
                            <ShoppingBag size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Active Orders</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.active}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-500">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Spent</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">₹{stats.spent.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3 col-span-2 md:col-span-1">
                        <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-500">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last Order</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.lastDate}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Pass orders down as props */}
                        <OrderHistoryCard 
                            initialOrders={orders} 
                            setOrders={setOrders} 
                        />
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1 sticky top-6"
                    >
                        <ProfileCard user={user} />
                        
                        <div className="mt-6 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-1">Need Help?</h3>
                            <p className="text-orange-50 text-sm mb-4 opacity-90">Having trouble with an order? We are here to help you.</p>
                            <button className="w-full py-2 bg-white text-orange-600 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}