"use client";
import { Settings } from "lucide-react";
import { DashboardCard } from "@/Components/ui/DashboardCard";
import { useRouter } from "next/navigation";

export const ProfileCard = ({ user }) => {
    const router = useRouter();

    return (
        <DashboardCard icon={<Settings className="w-6 h-6 text-orange-500" />} title="Profile Settings" delay={0.4}>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                    <p className="text-gray-800 dark:text-gray-100 font-semibold">{user?.name}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                    <p className="text-gray-800 dark:text-gray-100 font-semibold">{user?.email}</p>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                    <p className="text-gray-800 dark:text-gray-100 font-semibold">{user?.phoneNo || 'Not provided'}</p>
                </div>
                <button 
                    onClick={() => router.push('/user/profile')}
                    className="w-full mt-2 bg-orange-100 text-orange-600 font-bold py-2.5 px-4 rounded-lg hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50 transition-colors"
                >
                    Edit Profile
                </button>
            </div>
        </DashboardCard>
    );
};
