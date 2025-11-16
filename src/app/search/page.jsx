"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Loader2, AlertTriangle, Soup, Search, Star, ShoppingCart, Plus } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
// Import the cart store
import useCartStore from "@/Components/stores/cartStore";

const Image = ({ src, alt, fill, className, priority, ...props }) => {
  const style = fill 
    ? { objectFit: "cover", position: "absolute", height: "100%", width: "100%", inset: 0 }
    : {};
  return <img src={src} alt={alt} className={className} style={style} {...props} />;
};

const SearchItemCard = ({ item, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = async () => {
    setIsAdding(true);
    try {
      // Call the async function from props
      // The parent (SearchAllPage) will handle notifications
      await onAddToCart(item); 
    } catch (error) {
      console.error("Failed to add item:", error);
      // Parent component will show the error notification
    }
    // Don't set isAdding(false) here, the parent notification
    // timeout will handle the visual state.
    // Let's reset it after a short delay to allow notification to show
    setTimeout(() => setIsAdding(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div 
        className="absolute -inset-1.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg"
        aria-hidden="true"
      />
      
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="relative w-full h-32 sm:h-40">
          <Image
            src={
              item.image ||
              "https://placehold.co/400x300/F0F0F0/333333?text=Item"
            }
            alt={item.itemName}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-md sm:text-lg font-bold text-gray-800 dark:text-gray-100 break-words">
                {item.itemName}
              </h3>
              <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                {item.sellerName}
              </p>
            </div>
            {item.numReviews > 0 && (
              <div className="flex-shrink-0 flex items-center gap-1.5 ml-2">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                  {item.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between items-center mt-4 pt-2 flex-grow">
            <p className="text-lg sm:text-xl font-black text-gray-900 dark:text-gray-200">
              ₹{item.price}
            </p>
            {/* Changed <a> to <button> and added onClick */}
            <button
              onClick={handleClick}
              disabled={isAdding}
              className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 p-2 rounded-full transition-all duration-300
                         group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110
                         dark:group-hover:bg-orange-500 dark:group-hover:text-white
                         disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Add ${item.itemName} to cart`}
            >
              {/* Icon swap logic with loader */}
              {isAdding ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <ShoppingCart size={20} className="group-hover:hidden block transition-all" />
                  <Plus size={20} className="hidden group-hover:block transition-all" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function SearchAllPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  // Get the fetchCount action from the store
  const { fetchCount } = useCartStore();

  useEffect(() => {
    const fetchAllItems = async () => {
      setIsLoading(true);
      setError("");
      try {
        // Simulating API call
        const res = await fetch(`/api/items`);
        if (!res.ok) {
          throw new Error("Failed to fetch items.");
        }
        const data = await res.json();
        setItems(data.items || []);
        
        /* REMOVED MOCK DATA
        // Mock data since /api/items doesn't exist in this context
        const mockData = [
            { _id: '1', itemName: 'Masala Dosa', category: 'South Indian', sellerName: 'Anna\'s Cafe', price: 80, rating: 4.5, numReviews: 120, image: 'https://placehold.co/400x300/f4a261/ffffff?text=Masala+Dosa' },
            { _id: '2', itemName: 'Chole Bhature', category: 'North Indian', sellerName: 'Punjabi Tadka', price: 120, rating: 4.7, numReviews: 200, image: 'https://placehold.co/400x300/e76f51/ffffff?text=Chole+Bhature' },
            { _id: '3', itemName: 'Veg Biryani', category: 'Main Course', sellerName: 'Anna\'s Cafe', price: 150, rating: 4.2, numReviews: 80, image: 'https://placehold.co/400x300/2a9d8f/ffffff?text=Veg+Biryani' },
            { _id: '4', itemName: 'Paneer Tikka', category: 'Starters', sellerName: 'Punjabi Tadka', price: 180, rating: 4.6, numReviews: 150, image: 'https://placehold.co/400x300/264653/ffffff?text=Paneer+Tikka' },
        ];
        await new Promise(res => setTimeout(res, 1000)); // Simulate network delay
        setItems(mockData);
        */

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
// ... (fetchAllItems function is unchanged) ...  <-- THIS COMMENT WAS REMOVED

    fetchAllItems();

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryFromUrl = urlParams.get('q');
      if (queryFromUrl) {
        setSearchQuery(decodeURIComponent(queryFromUrl));
      }
    }
  }, []);

  const filteredItems = useMemo(() => 
    items.filter(item =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) // <-- It's right here!
    ).sort((a, b) => a.price - b.price),
    [items, searchQuery]
  );

  const handleAddToCart = async (item) => {
    // Clear previous notification
    setNotification({ message: '', type: 'success' });

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: item._id, // Assuming item._id is the MongoDB ObjectId
          itemName: item.itemName,
          price: item.price,
          quantity: 1,
          // ---
          // IMPORTANT: Your schema REQUIRES a 'service' field ('dine-in' or 'parcel').
          // I am DEFAULTING to 'dine-in'. You will need to add UI
          // (like two buttons, or a select) to let the user choose.
          // ---
          service: 'dine-in', 
          sellerName: item.sellerName,
          // userId is assumed to be handled by your backend API route (from a session/cookie)
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add item to cart.');
      }

      // --- THIS IS THE FIX ---
      // After a successful API call, tell the store to update its count.
      fetchCount();
      // ---------------------

      // Show success notification
      setNotification({ message: `${item.itemName} added to cart!`, type: 'success' });

    } catch (error) {
      console.error(error);
      // Show error notification
      setNotification({ message: error.message || 'Could not add item.', type: 'error' });
    }

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: '', type: 'success' });
    }, 3000);
  };

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
      {/* Notification Popup */}
      <AnimatePresence>
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            // Updated to be dynamic based on notification type
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 text-white px-6 py-3 rounded-full shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="absolute inset-0 bg-[radial-gradient(theme(colors.gray.100)_1px,transparent_1px)] dark:bg-[radial-gradient(theme(colors.gray.800)_1px,transparent_1px)] [background-size:32px_32px] opacity-40"
        aria-hidden="true"
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Search All Items</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Compare prices and find your favorite food from all canteens.
          </p>
        </motion.div>

        <div className="relative w-full max-w-2xl mx-auto mb-12">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
          <input
            type="text"
            placeholder="Search for any item, category, or restaurant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
          />
        </div>

        {items.length > 0 ? (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredItems.map(item => (
                // Pass the handler to the card
                <SearchItemCard key={item._id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl">
              <Search className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">No Dishes Found</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                No items match your search for "{searchQuery}".
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl">
            <Soup className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">No Items Found</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              There are no items available from any restaurant right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}