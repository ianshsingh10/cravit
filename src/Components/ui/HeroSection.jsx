"use circuit";

import { useState, useEffect } from "react";
import { Search, Wheat, Coffee, Carrot, Soup, Cookie, Utensils, Drumstick } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const restaurantImages = [
  "https://res.cloudinary.com/dt8txihg4/image/upload/v1758022157/bistro-img_vshkxz.jpg",
  "https://res.cloudinary.com/dt8txihg4/image/upload/v1758022158/mayuri-img_tkkcy1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:AN9GcRc7GfpEgNqDseVwgcCuX9dYa6XqKIELFSakw&s",
];

const suggestions = {
  morning: [
    { text: "Idli", icon: <Soup size={18} /> },
    { text: "Dosa", icon: <Wheat size={18} /> },
    { text: "Tea", icon: <Coffee size={18} /> },
  ],
  lunch: [
    { text: "Biryani", icon: <Soup size={18} /> },
    { text: "Fried Rice", icon: <Carrot size={18} /> },
    { text: "Noodles", icon: <Soup size={18} /> },
  ],
  evening: [
    { text: "Samosa", icon: <Cookie size={18} /> },
    { text: "Coffee", icon: <Coffee size={18} /> },
    { text: "Sandwich", icon: <Utensils size={18} /> },
  ],
  dinner: [
    { text: "Chicken", icon: <Drumstick size={18} /> },
    { text: "Paneer", icon: <Soup size={18} /> },
    { text: "Naan", icon: <Wheat size={18} /> },
  ],
};

const getSuggestions = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return suggestions.morning;
  } else if (currentHour >= 12 && currentHour < 16) {
    return suggestions.lunch;
  } else if (currentHour >= 16 && currentHour < 19) {
    return suggestions.evening;
  } else {
    return suggestions.dinner;
  }
};

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
        <img
          src={restaurantImages[activeIndex]}
          alt="Restaurant background"
          className="object-cover w-full h-full"
          style={{ objectFit: 'cover' }}
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
            i === activeIndex ? "w-6 bg-white" : "bg-white/50 hover:bg-white"
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
};

const CategoryChip = ({ text, icon, delay, onClick }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/20 transition-all"
    onClick={onClick}
  >
    {icon}
    {text}
  </motion.button>
);

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCurrentSuggestions(getSuggestions());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % restaurantImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (query) => {
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(searchQuery);
    }
  };

  const handleChipClick = (categoryText) => {
    setSearchQuery(categoryText);
    handleSearchSubmit(categoryText);
  };

  return (
    <section className="relative h-[calc(100vh-72px)] flex items-center justify-center text-center text-white px-4 overflow-hidden">
      <BackgroundCarousel activeIndex={index} />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

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

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-8 w-full max-w-xl"
        >
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type="text"
              placeholder="Search for Samosa, Coffee, or Mayuri..."
              className="w-full pl-14 pr-6 py-4 text-black bg-white rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {currentSuggestions.map((suggestion, i) => (
            <CategoryChip
              key={suggestion.text}
              text={suggestion.text}
              icon={suggestion.icon}
              delay={0.6 + i * 0.1}
              onClick={() => handleChipClick(suggestion.text)}
            />
          ))}
        </div>
      </div>

      <CarouselDots
        images={restaurantImages}
        activeIndex={index}
        setIndex={setIndex}
      />
    </section>
  );
}