"use client";

export const OrderSkeleton = () => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-1.5"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
        </div>
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
);