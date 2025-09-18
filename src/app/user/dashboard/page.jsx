"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { OrderHistoryCard } from "@/Components/user/orders//OrderHistoryCard";
import { ReviewsCard } from "@/Components/user/ReviewsCard";
import { ProfileCard } from "@/Components/user/ProfileCard";

export default function UserDashboard() {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            setIsAuthLoading(true);
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setUser(data.user);
                    } else {
                        setError("You must be logged in to view your dashboard.");
                        router.push('/user/login');
                    }
                } else {
                    setError("Failed to verify your session. Please log in again.");
                    router.push('/user/login');
                }
            } catch (err) {
                setError("An error occurred. Please try again later.");
            } finally {
                setIsAuthLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }
    
    if (error) {
         return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 text-center">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Access Denied</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{error}</p>
                  <a href="/user/login" className="mt-6 inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors">
                      Go to Login
                  </a>
              </div>
          </div>
      );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome, {user?.name || 'User'}!</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Here's a summary of your activity on craVIT.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <OrderHistoryCard />
                    </div>
                    <div className="lg:col-span-1  space-y-8">
                        <ProfileCard user={user} />
                        <ReviewsCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
