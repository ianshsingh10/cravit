"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Package, Loader2, PlusCircle, AlertTriangle, CheckCircle } from 'lucide-react';

// Import the new components
import { ItemCard, ItemCardSkeleton } from "@/Components/seller/ItemCard";
import { AddEditItemModal } from "@/Components/seller/AddEditItemModal";
import { DeleteConfirmationModal } from "@/Components/seller/DeleteConfirmationModal";

export default function SellerDashboard() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const router = useRouter();

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const res = await fetch('/api/items/my-items');
            if (res.ok) {
                const data = await res.json();
                setItems(data.items || []);
            } else {
                setError("Failed to fetch your items.");
            }
        } catch (err) {
            setError("An error occurred while fetching items.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchUserAndItems = async () => {
            setIsAuthLoading(true);
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user && data.user.role === "seller") {
                        setUser(data.user);
                        await fetchItems();
                    } else {
                        setError(data.user ? "Access Denied. Only sellers can manage items." : "You must be logged in.");
                        router.push('/user/login');
                    }
                } else {
                    setError("Failed to verify user session.");
                    router.push('/user/login');
                }
            } catch (err) {
                setError("An error occurred while fetching user data.");
            } finally {
                setIsAuthLoading(false);
            }
        };
        fetchUserAndItems();
    }, [fetchItems, router]);

    const handleOpenAddModal = () => {
        setCurrentItem(null);
        setAddEditModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setCurrentItem(item);
        setAddEditModalOpen(true);
    };

    const handleOpenDeleteModal = (item) => {
        setCurrentItem(item);
        setDeleteModalOpen(true);
    };

    const handleDeleteItem = async () => {
        if (!currentItem) return;
        setIsLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch('/api/items/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: currentItem._id }),
            });
            const result = await res.json();
            if (res.ok) {
                setSuccess(result.message || "Item deleted successfully.");
                fetchItems();
            } else {
                setError(result.error || "Failed to delete item.");
            }
        } catch (err) {
            setError("An error occurred during deletion.");
        } finally {
            setIsLoading(false);
            setDeleteModalOpen(false);
            setCurrentItem(null);
        }
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mb-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Your Items</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Add, edit, or remove your menu items here.</p>
                    </div>
                    <button onClick={handleOpenAddModal} className="w-full md:w-auto flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3 px-5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <PlusCircle size={20} />
                        <span>Add New Item</span>
                    </button>
                </div>
                
                {error && <p className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><AlertTriangle size={18}/> {error}</p>}
                {success && <p className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><CheckCircle size={18}/> {success}</p>}

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                         {[...Array(8)].map((_, i) => <ItemCardSkeleton key={i} />)}
                    </div>
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {items.map(item => (
                            <ItemCard key={item._id} item={item} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
                        <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">No items found</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">You haven't added any items yet. Click the button to get started!</p>
                    </div>
                )}
            </div>

            <AddEditItemModal
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                item={currentItem}
                user={user}
                onSuccess={() => {
                    setAddEditModalOpen(false);
                    fetchItems();
                    setSuccess(currentItem ? "Item updated successfully!" : "Item added successfully!");
                }}
                onError={(err) => setError(err)}
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
