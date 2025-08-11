"use client";
import { ShoppingBag } from "lucide-react";
import { DashboardCard } from "@/Components/ui/DashboardCard";

const dummyOrders = [
    { id: '1', date: '2024-08-01', status: 'Delivered', total: 150, items: 'Samosa, Coffee' },
    { id: '2', date: '2024-08-03', status: 'Preparing', total: 250, items: 'Masala Dosa, Tea' },
    { id: '3', date: '2024-08-05', status: 'Cancelled', total: 80, items: 'Pani Puri' },
];

export const OrderHistoryCard = () => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'Preparing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <DashboardCard icon={<ShoppingBag className="w-6 h-6 text-orange-500" />} title="Recent Orders">
            <div className="space-y-4">
                {dummyOrders.map(order => (
                    <div key={order.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 border dark:border-gray-700 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100">{order.items}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.date} - ₹{order.total}</p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};