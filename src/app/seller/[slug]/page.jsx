"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { Loader2, AlertTriangle, Soup, Search, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItemCard } from "@/Components/user/MenuItemCard";
import { motion } from "framer-motion";
import Image from "next/image";

const slugify = (text) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

const RestaurantHeader = ({ seller }) => (
  <div className="relative h-64 md:h-80 w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
    <motion.div
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      <Image
        src={seller.image || "https://placehold.co/1600x900/f0f0f0/333?text=Restaurant"}
        alt={seller.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="absolute bottom-0 left-0 p-6 md:p-10"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">{seller.name}</h1>
      <div className="flex items-center gap-6 mt-3">
        <p className="text-lg text-gray-200 drop-shadow-md">
          {seller.cuisine || "Explore the delicious menu below."}
        </p>
        {seller.rating && (
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
            <span className="font-bold text-white text-lg">
              {seller.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  </div>
);

const CategoryNav = ({ categories, activeCategory, onCategoryClick, searchQuery, setSearchQuery }) => {
  const navRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = navRef.current;
    if (!el) return;

    const scrollable = el.scrollWidth > el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(scrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  const scrollLeft = () => {
    navRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    navRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    checkScrollability();

    const handleScroll = () => checkScrollability();
    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScrollability);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability]);

  return (
    <div className="sticky top-[72px] z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 category-nav">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 pt-4 pb-2">

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search this menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
          />
        </div>

        {/* Category Scroll */}
        <div className="relative flex items-center w-full">

          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-0 z-10 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Scrollable Categories */}
          <div
            ref={navRef}
            className="flex-grow flex items-center gap-2 pb-2 sm:pb-0 overflow-x-auto no-scrollbar scroll-smooth mx-10"
          >
            {categories.map(category => (
              <button
                key={category.slug}
                data-category-slug={category.slug}
                onClick={() => onCategoryClick(category.slug)}
                className={`py-2 px-4 rounded-full font-semibold text-sm whitespace-nowrap transition-colors 
                  ${activeCategory === category.slug
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-0 z-10 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

const CategorySection = React.memo(({ slug, name, items }) => {
  return (
    <section key={slug} id={slug}>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
        {name}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map(item => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
});
CategorySection.displayName = "CategorySection";

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

  const observerRef = useRef(null);
  const sectionRefs = useRef(new Map());
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!slug) return;

    const fetchSellerData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/seller/${slug}/items`);
        if (res.status === 404) throw new Error("Restaurant not found.");
        if (!res.ok) throw new Error("Failed to fetch data.");
        const data = await res.json();

        setSeller(data.seller);
        setItems(data.items || []);

        if (data.items && data.items.length > 0) {
          const uniqueCategories = [...new Set(data.items.map(item => item.category))];

          const categoryObjects = uniqueCategories.map(name => ({
            name: name,
            slug: slugify(name)
          }));

          setCategories(categoryObjects);

          // THE REAL FIX → only set initial activeCategory ONE time
          if (!activeCategory) {
            setActiveCategory(categoryObjects[0]?.slug || "");
          }
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
        acc[category.slug] = {
          name: category.name,
          items: itemsInCategory
        };
      }
      return acc;
    }, {});
  }, [categories, filteredItems]);

  const visibleCategories = useMemo(() => Object.keys(groupedItems), [groupedItems]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    let scrollTimeout;

    const handleScroll = () => {
      isScrollingRef.current = true;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 500); // user stopped scrolling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        // ignore while user is scrolling
        if (isScrollingRef.current) return;

        let visible = entries.find((e) => e.isIntersecting);
        if (!visible) return;

        setActiveCategory(visible.target.id);
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.15
      }
    );

    observerRef.current = observer;

    visibleCategories.forEach((slug) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleCategories]);

  const handleCategoryClick = useCallback((categorySlug) => {
    const el = document.getElementById(categorySlug);
    if (el) {
      isScrollingRef.current = true;
      const stickyNavHeight = document.querySelector('.category-nav')?.offsetHeight || 120;
      const y = el.getBoundingClientRect().top + window.scrollY - stickyNavHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveCategory(categorySlug);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center text-red-600 dark:text-red-400 p-4">
        <AlertTriangle size={48} className="mb-4" />
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative overflow-hidden">
      {seller && (
        <RestaurantHeader seller={seller} />
      )}

      {categories.length > 0 && (
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8">
        {items.length > 0 ? (
          visibleCategories.length > 0 ? (
            <div className="flex flex-col">
              {visibleCategories.map(slug => (
                <CategorySection
                  key={slug}
                  slug={slug}
                  name={groupedItems[slug].name}
                  items={groupedItems[slug].items}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl">
              <Search className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">No Dishes Found</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                No menu items match your search for "{searchQuery}".
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl">
            <Soup className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">Menu Coming Soon</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This restaurant hasn't added any items to their menu yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}