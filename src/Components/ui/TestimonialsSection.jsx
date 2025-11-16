"use client";

import React from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

// --- Testimonial Data (Unchanged) ---
const testimonials = [
  {
    quote: "craVIT is a lifesaver! I can check menus and decide what to eat before even leaving my room. The reviews are super helpful.",
    author: "Priya S.",
    title: "Student",
    avatar: "PS"
  },
  {
    quote: "The pre-order feature saves me so much time between classes. I just grab my food and go. 10/10.",
    author: "Rohan M.",
    title: "Student",
    avatar: "RM"
  },
  {
    quote: "As a faculty member, finding a quick and good meal is crucial. craVIT makes it incredibly easy. Highly recommended.",
    author: "Dr. Anjali V.",
    title: "Faculty",
    avatar: "AV"
  },
  {
    quote: "The live order tracking is surprisingly accurate. I just walk in, grab my order, and go. Fantastic app.",
    author: "Karan P.",
    title: "Student",
    avatar: "KP"
  }
];

// --- Animation Variants (Unchanged) ---
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay: i * 0.2 
    }
  })
};

// --- Main TestimonialsSection Component [IMPROVED] ---
export default function TestimonialsSection() {
  return (
    // [IMPROVED] Changed section background for better contrast
    <section className="py-24 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      
      {/* [IMPROVED] Tweaked dot pattern colors for new background */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(theme(colors.gray.200)_1px,transparent_1px)] dark:bg-[radial-gradient(theme(colors.gray.800)_1px,transparent_1px)] [background-size:32px_32px] opacity-40"
        aria-hidden="true"
      />
      
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

        {/* --- [IMPROVED] Horizontal Scroll on Mobile, 4-col Grid on Desktop --- */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              custom={index}
              // [IMPROVED] Frosted glass card background
              className="group relative flex-shrink-0 w-[85vw] sm:w-96 md:w-auto rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 overflow-hidden"
            >
              {/* Glowing border effect */}
              <div 
                className="absolute -inset-1.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg"
                aria-hidden="true"
              />
              
              {/* Card content */}
              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* [IMPROVED] Quote icon colors for better contrast */}
                <Quote className="text-orange-300 dark:text-orange-800" size={48} fill="currentColor" />
                
                {/* [IMPROVED] Quote text colors */}
                <blockquote className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed italic my-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* [IMPROVED] Border color */}
                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                  {/* Avatar initial */}
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    {/* [IMPROVED] Author text colors */}
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}