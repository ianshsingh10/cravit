"use client";

import React from "react";
// [IMPROVED] New icons for the new, benefit-driven features
import { Clock, PackageCheck, Ticket, Users } from "lucide-react";
import { motion } from "framer-motion";

// --- [IMPROVED] Feature Data ---
// The features are now more compelling and benefit-focused
const features = [
  {
    icon: <Clock size={32} className="text-orange-500" />,
    title: "Skip the Queue",
    description: "Pre-order your meals and pick them up instantly. No more waiting between classes.",
  },
  {
    icon: <PackageCheck size={32} className="text-orange-500" />,
    title: "Live Order Tracking",
    description: "Know exactly when your food is accepted, being prepared, and ready for pickup.",
  },
  {
    icon: <Ticket size={32} className="text-orange-500" />,
    title: "Exclusive Deals",
    description: "Get student-only discounts and special combos from your favorite canteens.",
  },
  {
    icon: <Users size={32} className="text-orange-500" />,
    title: "Real Student Reviews",
    description: "See what's good (and what's not) with honest, verified reviews from other students.",
  },
];

// --- Animation Variants (Unchanged) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// --- Main FeaturedSection Component [IMPROVED] ---
export default function FeaturedSection() {
  return (
    <section id="features" className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Subtle background dot pattern */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(theme(colors.gray.100)_1px,transparent_1px)] dark:bg-[radial-gradient(theme(colors.gray.800)_1px,transparent_1px)] [background-size:32px_32px] opacity-40"
        aria-hidden="true"
      />
      
      {/* Content container, now relative to sit above the pattern */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* [IMPROVED] Title changed to be more active */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Your Campus Food, Simplified
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need for a faster, smarter, and cheaper food experience at VIT.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-2xl bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Glowing border effect */}
              <div 
                className="absolute -inset-1.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-lg"
                aria-hidden="true"
              />
              
              {/* Card content remains relative on top */}
              <div className="relative z-10 text-center p-8">
                {/* [IMPROVED] Icon background has a subtle gradient and hover effect */}
                <div 
                  className="flex justify-center items-center h-16 w-16 bg-gradient-to-br from-orange-100 to-white dark:from-orange-900/30 dark:to-gray-800/20 rounded-full mx-auto mb-6 border-4 border-white dark:border-gray-700 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}