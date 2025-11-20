"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
    Package, Loader2, Plus, AlertTriangle, 
    CheckCircle2, Search, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

import { ItemCard, ItemCardSkeleton } from "@/Components/seller/ItemCard";
import { AddEditItemModal } from "@/Components/seller/AddEditItemModal";
import { DeleteConfirmationModal } from "@/Components/seller/DeleteConfirmationModal";

// --- Sub-Component: Stats Card ---
const StatsCard = ({ title, value, icon: Icon, color, borderColor }) => (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-2xl border ${borderColor} shadow-sm flex items-center gap-4`}>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
    </div>
);

export default function SellerDashboard() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    
    const [notification, setNotification] = useState(null); 
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    
    const router = useRouter();

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/items/my-items');
            if (res.ok) {
                const data = await res.json();
                setItems(data.items || []);
            } else {
                showNotification("error", "Failed to fetch items.");
            }
        } catch (err) {
            showNotification("error", "Connection error.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            setIsAuthLoading(true);
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user && data.user.role === "seller") {
                        setUser(data.user);
                        await fetchItems();
                    } else {
                        router.push('/user/login');
                    }
                } else {
                    router.push('/user/login');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsAuthLoading(false);
            }
        };
        init();
    }, [fetchItems, router]);

    // --- HELPER: Define what "Available" means ---
    // Inverting logic: If your DB has 'isAvailable: false' (or undefined) for active items
    const isItemActive = (item) => !item.isAvailable; 

    const handleToggleAvailability = async (itemToToggle) => {
        const previousItems = [...items];
        // Optimistic Update
        setItems(current => current.map(item => 
            item._id === itemToToggle._id ? { ...item, isAvailable: !item.isAvailable } : item
        ));

        try {
            const res = await fetch(`/api/items/availability`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: itemToToggle._id }),
            });

            if (!res.ok) throw new Error("Failed");
            
            const updatedItem = await res.json();
            setItems(current => current.map(item => 
                item._id === updatedItem._id ? updatedItem : item
            ));
            
            // Notification logic using the inverted helper
            const isActiveNow = isItemActive(updatedItem);
            showNotification("success", `Item marked as ${isActiveNow ? 'Available' : 'Sold Out'}`);

        } catch (err) {
            setItems(previousItems);
            showNotification("error", "Failed to update status.");
        }
    };

    // --- Corrected Stats Calculation ---
    const stats = useMemo(() => {
        return {
            total: items.length,
            // Available = !isAvailable (Active)
            availableCount: items.filter(i => isItemActive(i)).length, 
            // Sold Out = isAvailable (Inactive)
            soldOutCount: items.filter(i => !isItemActive(i)).length 
        };
    }, [items]);

    // --- Corrected Filtering ---
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Logic flipped here too
            if (activeTab === 'available') return matchesSearch && isItemActive(item);
            if (activeTab === 'sold-out') return matchesSearch && !isItemActive(item);
            
            return matchesSearch;
        });
    }, [items, searchQuery, activeTab]);

    const handleDeleteItem = async () => {
        if (!currentItem) return;
        try {
            const res = await fetch('/api/items/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: currentItem._id }),
            });
            if (res.ok) {
                showNotification("success", "Item deleted successfully.");
                fetchItems();
            } else {
                showNotification("error", "Failed to delete item.");
            }
        } catch (err) {
            showNotification("error", "Error deleting item.");
        } finally {
            setDeleteModalOpen(false);
            setCurrentItem(null);
        }
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Seller Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your menu items.</p>
                    </div>
                    <button 
                        onClick={() => { setCurrentItem(null); setAddEditModalOpen(true); }} 
                        className="flex items-center justify-center gap-2 bg-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        <span>Add Item</span>
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatsCard 
                        title="Total Items" 
                        value={stats.total} 
                        icon={Package} 
                        color="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        borderColor="border-blue-100 dark:border-blue-900/30" 
                    />
                    <StatsCard 
                        title="Available (Ticked)" 
                        value={stats.availableCount} 
                        icon={CheckCircle2} 
                        color="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        borderColor="border-green-100 dark:border-green-900/30"
                    />
                    <StatsCard 
                        title="Sold Out" 
                        value={stats.soldOutCount} 
                        icon={AlertCircle} 
                        color="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        borderColor="border-red-100 dark:border-red-900/30"
                    />
                </div>

                {/* Search & Tabs */}
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-full lg:w-auto">
                        {['all', 'available', 'sold-out'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                                    activeTab === tab 
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                            >
                                {tab.replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search items..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        />
                    </div>
                </div>
                
                {/* Content */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                         {[...Array(4)].map((_, i) => <ItemCardSkeleton key={i} />)}
                    </div>
                ) : items.length > 0 ? (
                    filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map(item => (
                                <ItemCard 
                                    key={item._id} 
                                    item={item} 
                                    onEdit={(itm) => { setCurrentItem(itm); setAddEditModalOpen(true); }} 
                                    onDelete={(itm) => { setCurrentItem(itm); setDeleteModalOpen(true); }}
                                    onToggleAvailability={handleToggleAvailability}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                            <Search className="w-12 h-12 text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">No items found.</p>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-gray-900 rounded-3xl shadow-sm">
                        <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-6 text-orange-500">
                            <Package size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">No items yet</h3>
                        <button onClick={() => setAddEditModalOpen(true)} className="text-orange-600 font-bold hover:underline mt-2">Create first item</button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {notification && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-medium ${
                            notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}
                    >
                        {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <AddEditItemModal
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                item={currentItem}
                user={user}
                onSuccess={() => { setAddEditModalOpen(false); fetchItems(); showNotification("success", currentItem ? "Item updated!" : "Item added!"); }}
                onError={(err) => showNotification("error", err)}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteItem}
                item={currentItem}
                isLoading={isLoading}
            />
        </div>
    );
}