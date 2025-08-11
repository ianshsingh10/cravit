"use client";

import React from "react";
import { Search, UtensilsCrossed, Star, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Search size={32} className="text-orange-500" />,
    title: "Browse Canteens",
    description: "Explore all food outlets and canteens across the VIT campus.",
  },
  {
    icon: <BookOpen size={32} className="text-orange-500" />,
    title: "View Digital Menus",
    description: "Access up-to-date menus from your favorite spots anytime.",
  },
  {
    icon: <Star size={32} className="text-orange-500" />,
    title: "Read & Write Reviews",
    description: "Share your experience and see what others are saying.",
  },
  {
    icon: <UtensilsCrossed size={32} className="text-orange-500" />,
    title: "Pre-order Meals",
    description: "Skip the queue by ordering your food in advance.",
  },
];

export default function FeaturedSection() {
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

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            How craVIT Helps You
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need for a hassle-free food experience.
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
              className="group relative p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
                <div className="absolute -inset-px bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                    <div className="flex justify-center items-center h-16 w-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mx-auto mb-6 border-4 border-white dark:border-gray-700 transition-all duration-300 group-hover:scale-110">
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
