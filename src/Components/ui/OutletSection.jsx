"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const outlets = [
  { name: "Mayuri (AB1)", image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri" },
  { name: "Mayuri (AB2)", image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri" },
  { name: "Mayuri (Canteen)", image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri" },
  { name: "Bistro by Safal", image: "https://placehold.co/400x300/E6F4FF/333333?text=Bistro" },
  { name: "Safal (Canteen)", image: "https://placehold.co/400x300/E6F4FF/333333?text=Safal" },
  { name: "AB Dakshin", image: "https://placehold.co/400x300/FFE6E6/333333?text=Dakshin" },
  { name: "UB (UnderBelly)", image: "https://placehold.co/400x300/F0E6FF/333333?text=UB" },
];

export default function OutletSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Our Partner Outlets
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Your favorite canteens, all in one place.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {outlets.map((outlet, index) => (
             <motion.div
                key={outlet.name + index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={outlet.image}
                  alt={`Image of ${outlet.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {outlet.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
