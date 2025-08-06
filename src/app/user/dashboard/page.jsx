"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, ShoppingBag, Star, Settings, Loader2, AlertTriangle } from "lucide-react";

// --- DUMMY DATA (Replace with API calls) ---
const dummyOrders = [
    { id: '1', date: '2024-08-01', status: 'Delivered', total: 150, items: 'Samosa, Coffee' },
    { id: '2', date: '2024-08-03', status: 'Preparing', total: 250, items: 'Masala Dosa, Tea' },
    { id: '3', date: '2024-08-05', status: 'Cancelled', total: 80, items: 'Pani Puri' },
];

const dummyReviews = [
    { id: '1', itemName: 'Masala Dosa', rating: 5, comment: 'Absolutely delicious! Best dosa on campus.' },
    { id: '2', itemName: 'Coffee', rating: 4, comment: 'Good and strong, perfect for late-night studies.' },
];

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Preparing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }
    
    if (error) {
         return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 text-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
                  <p className="text-gray-600 mt-2">{error}</p>
                  <a href="/user/login" className="mt-6 inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors">
                      Go to Login
                  </a>
              </div>
          </div>
      );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'User'}!</h1>
                    <p className="text-gray-500 mt-1">Here's a summary of your activity on craVIT.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content: Orders and Reviews */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Order History Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <ShoppingBag className="w-6 h-6 text-orange-500" />
                                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                            </div>
                            <div className="space-y-4">
                                {dummyOrders.map(order => (
                                    <div key={order.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                        <div>
                                            <p className="font-semibold text-gray-800">{order.items}</p>
                                            <p className="text-sm text-gray-500">{order.date} - ₹{order.total}</p>
                                        </div>
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* My Reviews Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                             <div className="flex items-center gap-3 mb-4">
                                <Star className="w-6 h-6 text-orange-500" />
                                <h2 className="text-xl font-bold text-gray-800">Your Reviews</h2>
                            </div>
                            <div className="space-y-4">
                                {dummyReviews.map(review => (
                                    <div key={review.id} className="p-4 border rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <p className="font-semibold text-gray-800">{review.itemName}</p>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Profile Settings */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <Settings className="w-6 h-6 text-orange-500" />
                                <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                                    <p className="text-gray-800 font-semibold">{user?.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                    <p className="text-gray-800 font-semibold">{user?.email}</p>
                                </div>
                                <button className="w-full mt-2 bg-orange-100 text-orange-600 font-bold py-2 px-4 rounded-lg hover:bg-orange-200 transition-colors">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
