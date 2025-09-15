"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, AlertTriangle, Soup, Search } from 'lucide-react'; // Import Search icon
import { MenuItemCard } from "@/Components/user/MenuItemCard"; 

export default function SellerPage() {
    const params = useParams();
    const slug = params.slug;

    const [seller, setSeller] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!slug) return;

        const fetchSellerData = async () => {
            setIsLoading(true);
            setError("");
            try {
                const res = await fetch(`/api/seller/${slug}/items`);

                if (res.status === 404) {
                    throw new Error("Restaurant not found.");
                }
                if (!res.ok) {
                    throw new Error("Failed to fetch data for this restaurant.");
                }
                
                const data = await res.json();
                setSeller(data.seller);
                setItems(data.items || []);

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSellerData();
    }, [slug]);

    const filteredItems = items.filter(item =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center text-red-600 dark:text-red-400">
                <AlertTriangle size={48} className="mb-4" />
                <h2 className="text-2xl font-bold mb-2">Oops!</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {seller && (
                    <div className="mb-12 text-center">
                        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{seller.name}</h1>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Explore the delicious menu below.</p>
                    </div>
                )}
                
                {/* ✅ 3. Add the search bar UI (only shows if there are items) */}
                {items.length > 0 && (
                    <div className="mb-8 max-w-lg mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search this menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>
                )}

                {/* ✅ 4. Update rendering logic for search results */}
                {items.length > 0 ? (
                    filteredItems.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {filteredItems.map(item => (
                                <MenuItemCard key={item._id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-gray-800/50 rounded-2xl">
                            <Search className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
                            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">No Dishes Found</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No menu items match your search for "{searchQuery}".</p>
                        </div>
                    )
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-gray-800/50 rounded-2xl">
                        <Soup className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
                        <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">Menu Coming Soon</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">This restaurant hasn't added any items to their menu yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}