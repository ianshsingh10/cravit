"use client";
import { motion } from "framer-motion";

export const DashboardCard = ({ icon, title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/50"
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                {icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
        </div>
        {children}
    </motion.div>
);