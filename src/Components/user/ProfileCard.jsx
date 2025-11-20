"use client";
import { Settings, Mail, Phone, User, Edit2, ChevronRight } from "lucide-react";
import { DashboardCard } from "@/Components/ui/DashboardCard";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const ProfileCard = ({ user }) => {
    const router = useRouter();

    // Helper to get initials
    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    return (
        <DashboardCard 
            icon={<Settings className="w-6 h-6 text-orange-500" />} 
            title="Profile Settings" 
            delay={0.4}
        >
            <div className="space-y-6">
                {/* 1. Profile Header / Avatar */}
                <div className="flex flex-col items-center justify-center pt-2 pb-4">
                    <div className="relative group">
                        {/* Avatar Circle with Gradient Border */}
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-orange-100 to-orange-500 dark:from-orange-900 dark:to-orange-600">
                            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                {user?.image ? (
                                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold text-orange-500 dark:text-orange-400">
                                        {getInitials(user?.name)}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Edit Icon Badge */}
                        <button 
                            onClick={() => router.push('/user/profile')}
                            className="absolute bottom-0 right-0 p-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                            <Edit2 size={14} />
                        </button>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
                        {user?.name || "User"}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md mt-1">
                        Customer
                    </span>
                </div>

                {/* 2. Info Details */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-orange-200 dark:hover:border-orange-900/50">
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500">
                            <Mail size={18} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Email Address</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate" title={user?.email}>
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 transition-colors hover:border-orange-200 dark:hover:border-orange-900/50">
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500">
                            <Phone size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Phone Number</p>
                            <p className={`text-sm font-semibold ${user?.phoneNo ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 italic'}`}>
                                {user?.phoneNo || 'Not provided'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Action Button */}
                <button 
                    onClick={() => router.push('/user/profile')}
                    className="group w-full flex items-center justify-between p-1 pl-4 pr-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300"
                >
                    <span className="font-semibold text-sm">Manage Profile Details</span>
                    <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm group-hover:translate-x-0.5 transition-transform">
                        <ChevronRight size={16} className="text-orange-500" />
                    </div>
                </button>
            </div>
        </DashboardCard>
    );
};