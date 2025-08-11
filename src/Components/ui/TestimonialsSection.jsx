"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { quote: "craVIT is a lifesaver! I can check menus and decide what to eat before even leaving my room. The reviews are super helpful too.", author: "Priya S.", class: "B.Tech CSE, 2nd Year" },
  { quote: "Finally, a single place to see all the food options at VIT. The pre-order feature saves me so much time between classes.", author: "Rohan M.", class: "M.Tech Mech, 1st Year" },
  { quote: "As a faculty member, finding a quick and good meal is crucial. craVIT makes it incredibly easy. Highly recommended!", author: "Dr. Anjali Verma", class: "Professor, SCOPE" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
            {/* You might want to host this texture locally or use a different method */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    What Our Users Say
                </h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                    Real stories from students and staff at VIT.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50"
                    >
                        <Star className="text-yellow-400 mb-6" size={28} fill="currentColor" />
                        <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
                            "{testimonial.quote}"
                        </blockquote>
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="font-bold text-gray-900 dark:text-white">
                                {testimonial.author}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.class}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
