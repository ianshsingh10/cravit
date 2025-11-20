"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { AlertTriangle, Soup, Search, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItemCard } from "@/Components/user/MenuItemCard";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useCartStore from "@/Components/stores/cartStore"; 

const slugify = (text) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

const SellerSkeleton = () => (
  <div className="w-full min-h-screen animate-pulse bg-white dark:bg-gray-950">
    <div className="h-64 md:h-80 bg-gray-200 dark:bg-gray-800 w-full" />
    <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
      <div className="h-10 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4" />
      <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-lg" />
    </div>
    <div className="mt-24 container mx-auto px-4">
      <div className="flex gap-4 overflow-hidden mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-full flex-shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

const ParallaxHeader = ({ seller }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={seller.image || "https://placehold.co/1600x900/f0f0f0/333?text=Restaurant"}
          alt={seller.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-xl"
            >
              {seller.name}
            </motion.h1>
            <p className="text-gray-200 text-lg mt-2 font-medium drop-shadow-md">
               {seller.cuisine}
            </p>
          </div>

          {seller.rating && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
              <div className="flex flex-col items-center leading-none">
                <span className="text-2xl font-bold text-white">{seller.rating.toFixed(1)}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill={i < Math.floor(seller.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <div className="w-[1px] h-8 bg-white/20 mx-2" />
              <div className="text-xs text-gray-300">
                <p>1K+</p>
                <p>Ratings</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const CategoryNav = ({ categories, activeCategory, onCategoryClick, searchQuery, setSearchQuery }) => {
  const navRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!activeCategory || !navRef.current) return;
    const activeBtn = document.getElementById(`nav-btn-${activeCategory}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeCategory]);

  const checkScrollability = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  const scroll = (direction) => {
    navRef.current?.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: "smooth" });
  };

  useEffect(() => {
    const el = navRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      checkScrollability();
      return () => {
        el.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [checkScrollability, categories]);

  return (
    <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-64 lg:w-80 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-gray-500"
          />
        </div>

        <div className="relative w-full overflow-hidden group">
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 flex items-center">
              <button onClick={() => scroll('left')} className="hidden md:flex p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform">
                <ChevronLeft size={16} />
              </button>
            </div>
          )}

          <div
            ref={navRef}
            className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth px-1 py-1"
          >
            {categories.map(category => (
              <button
                key={category.slug}
                id={`nav-btn-${category.slug}`}
                onClick={() => onCategoryClick(category.slug)}
                className={`
                  relative px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300
                  ${activeCategory === category.slug
                    ? "text-white bg-gray-900 dark:bg-white dark:text-gray-900 shadow-lg transform scale-105"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>

          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 flex items-center justify-end">
              <button onClick={() => scroll('right')} className="hidden md:flex p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FloatingCartButton = () => {
  const { count } = useCartStore(); 
  if (count === 0) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-4 right-4 z-40 md:left-auto md:right-8 md:w-auto"
    >
      <button 
        onClick={() => window.location.href = '/cart'}
        className="w-full md:w-96 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between group transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 px-3 py-1 rounded-lg font-bold text-sm backdrop-blur-sm">
            {count} ITEMS
          </div>
        </div>
        <div className="flex items-center gap-2 font-bold text-lg">
          View Cart <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
        </div>
      </button>
    </motion.div>
  );
};

export default function SellerPage() {
  const params = useParams();
  const slug = params.slug;

  const [seller, setSeller] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!slug) return;

    const fetchSellerData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/seller/${slug}/items`);
        if (res.status === 404) throw new Error("Restaurant not found.");
        if (!res.ok) throw new Error("Failed to fetch data.");
        const data = await res.json();

        setSeller(data.seller);
        setItems(data.items || []);

        if (data.items?.length > 0) {
          const uniqueCategories = [...new Set(data.items.map(item => item.category))];
          const categoryObjects = uniqueCategories.map(name => ({
            name: name,
            slug: slugify(name)
          }));
          setCategories(categoryObjects);
          if (!activeCategory) setActiveCategory(categoryObjects[0]?.slug || "");
        } else {
          setCategories([]);
          setActiveCategory("");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSellerData();
  }, [slug]);

  const filteredItems = useMemo(() =>
    items.filter(item =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  [items, searchQuery]);

  const groupedItems = useMemo(() => {
    return categories.reduce((acc, category) => {
      const itemsInCategory = filteredItems.filter(item => item.category === category.name);
      if (itemsInCategory.length > 0) {
        acc[category.slug] = { name: category.name, items: itemsInCategory };
      }
      return acc;
    }, {});
  }, [categories, filteredItems]);

  const visibleCategories = useMemo(() => Object.keys(groupedItems), [groupedItems]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        
        if (visibleEntry) {
          setActiveCategory(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-140px 0px -70% 0px",
        threshold: 0, 
      }
    );

    observerRef.current = observer;

    visibleCategories.forEach((slug) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleCategories, groupedItems]);

  const handleCategoryClick = useCallback((categorySlug) => {
    const el = document.getElementById(categorySlug);
    if (el) {
      isClickScrolling.current = true;
      setActiveCategory(categorySlug);

      const offset = 140; 
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 800); 
    }
  }, []);

  if (isLoading) return <SellerSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center p-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
             <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Restaurant Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
          <button onClick={() => window.history.back()} className="mt-6 text-orange-600 font-bold hover:underline">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
      {seller && <ParallaxHeader seller={seller} />}

      {categories.length > 0 && (
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length > 0 ? (
          visibleCategories.length > 0 ? (
            <div className="space-y-12">
              {visibleCategories.map(slug => (
                <section key={slug} id={slug} className="scroll-mt-36">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                      {groupedItems[slug].name}
                    </h2>
                    <div className="h-[1px] flex-grow bg-gray-200 dark:bg-gray-800" />
                    <span className="text-sm font-medium text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full">
                      {groupedItems[slug].items.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                    {groupedItems[slug].items.map(item => (
                      <MenuItemCard key={item._id} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">No matches found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search for "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-orange-600 font-semibold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-900 rounded-3xl shadow-sm">
            <Soup className="w-20 h-20 text-orange-200 dark:text-orange-900/30 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Menu Coming Soon</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              The restaurant is currently updating their menu. Please check back later for delicious options.
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        <FloatingCartButton />
      </AnimatePresence>
    </div>
  );
}