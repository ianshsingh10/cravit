"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const restaurantImages = [
    "https://placehold.co/1600x900/f87171/ffffff?text=Mayuri",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7GfpEgNqDseVwgcCuX9dYa6XqKIELFSakw&s",
    "https://placehold.co/1600x900/60a5fa/ffffff?text=Bistro+by+Safal",
    "https://placehold.co/1600x900/34d399/ffffff?text=AB+Dakshin",
];

const BackgroundCarousel = ({ activeIndex }) => {
    return (
        <AnimatePresence>
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
            >
                <Image
                    src={restaurantImages[activeIndex]}
                    alt="Restaurant background"
                    fill
                    className="object-cover"
                    priority
                    unoptimized={true}
                />
            </motion.div>
        </AnimatePresence>
    );
};

const CarouselDots = ({ images, activeIndex, setIndex }) => {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {images.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                />
            ))}
        </div>
    );
};


export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % restaurantImages.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[calc(100vh-72px)] flex items-center justify-center text-center text-white px-4 overflow-hidden">
      {/* Background Image Carousel */}
      <BackgroundCarousel activeIndex={index} />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg"
        >
          Fuel Your Cravings at craVIT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-light text-gray-200 drop-shadow-md"
        >
          The fastest way to pre-order food from every canteen on campus.
        </motion.p>

        {/* Interactive Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-5 w-full max-w-xl"
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
            <input
              type="text"
              placeholder="Search for Samosa, Coffee, or Mayuri..."
              className="w-full pl-14 pr-6 py-4 text-black bg-white rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all duration-300"
            />
          </div>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-6"
        >
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <CarouselDots images={restaurantImages} activeIndex={index} setIndex={setIndex} />
    </section>
  );
}
