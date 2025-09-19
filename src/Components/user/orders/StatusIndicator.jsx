"use client";

import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";

export const StatusIndicator = ({ status }) => {
    const statusConfig = {
        Delivered: { icon: <CheckCircle className="w-4 h-4 text-green-500" />, color: 'text-green-600 dark:text-green-400' },
        Preparing: { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        Accepted: { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        'Out for Delivery': { icon: <Clock className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400' },
        Pending: { icon: <Clock className="w-4 h-4 text-blue-500" />, color: 'text-blue-600 dark:text-blue-400' },
        Cancelled: { icon: <XCircle className="w-4 h-4 text-red-500" />, color: 'text-red-600 dark:text-red-400' },
        Refunded: { icon: <RefreshCw className="w-4 h-4 text-green-500" />, color: 'text-gray-600 dark:text-green-400' },
        Default: { icon: <Clock className="w-4 h-4 text-gray-500" />, color: 'text-gray-600 dark:text-gray-400' }
    };
    const { icon, color } = statusConfig[status] || statusConfig.Default;
    return (
        <div className={`flex items-center gap-2 text-sm font-semibold ${color}`}>
            {icon}
            <span>{status}</span>
        </div>
    );
};