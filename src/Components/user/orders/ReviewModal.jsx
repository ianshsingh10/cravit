"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Loader2 } from "lucide-react";

export const ReviewModal = ({ item, onClose, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Please select a star rating.");
            return;
        }
        setIsSubmitting(true);
        try {
            await onReviewSubmit({ itemId: item.itemId, rating, comment });
            onClose();
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6"
            >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                    Rate "{item.itemName}"
                </h2>
                
                <div className="my-6 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className="cursor-pointer transition-colors duration-200"
                            size={40}
                            color={(hoverRating || rating) >= star ? '#f59e0b' : '#9ca3af'}
                            fill={(hoverRating || rating) >= star ? '#f59e0b' : 'none'}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
                
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Optional: Add a public comment..."
                    rows="3"
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500 transition"
                />

                <div className="flex justify-end gap-3 mt-6">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting} 
                        className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-orange-400 flex items-center gap-2 transition-colors"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin"/>}
                        Submit Rating
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};