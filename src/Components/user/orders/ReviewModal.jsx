"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Loader2, X, MessageSquare, ThumbsUp } from "lucide-react";

// Rating configurations for dynamic feedback
const RATING_CONFIG = {
    1: { label: "Terrible", emoji: "😠", color: "text-red-500" },
    2: { label: "Bad", emoji: "😞", color: "text-orange-500" },
    3: { label: "Okay", emoji: "😐", color: "text-yellow-500" },
    4: { label: "Good", emoji: "😊", color: "text-lime-500" },
    5: { label: "Excellent", emoji: "🤩", color: "text-green-500" },
};

export const ReviewModal = ({ item, orderId, onClose, onSubmit, isActionLoading }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    const currentRating = hoverRating || rating;
    const feedback = RATING_CONFIG[currentRating] || { label: "Rate this item", emoji: "👋", color: "text-gray-400" };

    const handleSubmit = async () => {
        if (rating === 0) return;
        try {
            await onSubmit({
                itemId: item.itemId || item._id,
                orderId,
                rating,
                comment
            });
            onClose();
        } catch (error) {
            console.error("Review submission failed, modal stays open.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex justify-center items-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {/* Header Section */}
                <div className="pt-8 pb-4 px-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                        <ThumbsUp size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        How was the food?
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {item.itemName}
                    </p>
                </div>

                {/* Rating Section */}
                <div className="px-6 pb-2">
                    <div className="flex justify-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                                key={star}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.85 }}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="p-1 focus:outline-none"
                            >
                                <Star
                                    size={36}
                                    className={`transition-all duration-200 ${(hoverRating || rating) >= star
                                            ? "fill-orange-400 text-orange-400 drop-shadow-sm"
                                            : "text-gray-200 dark:text-gray-700"
                                        }`}
                                />
                            </motion.button>
                        ))}
                    </div>

                    {/* Dynamic Label Animation */}
                    <div className="h-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentRating}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.15 }}
                                className={`flex items-center gap-2 font-bold text-lg ${feedback.color}`}
                            >
                                <span>{feedback.emoji}</span>
                                <span>{feedback.label}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="p-6 pt-2">
                    <div className="relative">
                        <div className="absolute top-3 left-3 text-gray-400">
                            <MessageSquare size={16} />
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us what you liked or what we can improve..."
                            rows={4}
                            maxLength={200}
                            className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none resize-none transition-all"
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                            {comment.length}/200
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0 || isActionLoading}
                        className="flex-1 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30 disabled:shadow-none disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
                    >
                        {isActionLoading ? <Loader2 className="animate-spin" size={18} /> : "Submit Review"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};