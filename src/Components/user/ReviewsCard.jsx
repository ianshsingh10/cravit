"use client";
import { Star } from "lucide-react";
import { DashboardCard } from "@/components/ui/DashboardCard";

const dummyReviews = [
    { id: '1', itemName: 'Masala Dosa', rating: 5, comment: 'Absolutely delicious! Best dosa on campus.' },
    { id: '2', itemName: 'Coffee', rating: 4, comment: 'Good and strong, perfect for late-night studies.' },
];

export const ReviewsCard = () => (
    <DashboardCard icon={<Star className="w-6 h-6 text-orange-500" />} title="Your Reviews" delay={0.2}>
        <div className="space-y-4">
            {dummyReviews.map(review => (
                <div key={review.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 border dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start">
                        <p className="font-semibold text-gray-800 dark:text-gray-100">{review.itemName}</p>
                        <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">"{review.comment}"</p>
                </div>
            ))}
        </div>
    </DashboardCard>
);