"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Package, CircleDollarSign, UploadCloud, AlertTriangle, CheckCircle, Loader2, PlusCircle, MoreVertical, Edit, Trash2, X } from 'lucide-react';

// Reusable Modal Component
const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

// Main Component
export default function SellerDashboard() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // State for modals
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null); // For editing or deleting
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

    // Fetch user and initial items
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
                        setError(data.user ? "Access Denied. Only sellers can manage items." : "You must be logged in to access this page.");
                        router.push('/login');
                    }
                } else {
                    setError("Failed to verify user session. Please log in again.");
                    router.push('/login');
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
                fetchItems(); // Refresh the list
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

    // Loading state while checking authentication
    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Manage Your Items</h1>
                        <p className="text-gray-500 mt-1">Add, edit, or remove your menu items here.</p>
                    </div>
                    <button onClick={handleOpenAddModal} className="flex items-center gap-2 bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 transition-colors">
                        <PlusCircle size={20} />
                        <span>Add New Item</span>
                    </button>
                </div>
                
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><AlertTriangle size={18}/> {error}</p>}
                {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><CheckCircle size={18}/> {success}</p>}

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                         {[...Array(4)].map((_, i) => <ItemCardSkeleton key={i} />)}
                    </div>
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items.map(item => (
                            <ItemCard key={item._id} item={item} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <Package className="w-16 h-16 text-gray-300 mx-auto" />
                        <h3 className="mt-4 text-xl font-medium text-gray-900">No items found</h3>
                        <p className="mt-2 text-sm text-gray-500">You haven't added any items yet. Click the button to get started!</p>
                    </div>
                )}
            </div>

            <AddEditItemModal
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                item={currentItem}
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

// Sub-component for a single item card
const ItemCard = ({ item, onEdit, onDelete }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group">
            <div className="relative w-full h-40">
                <Image src={item.image || 'https://placehold.co/400x300/F0F0F0/333333?text=Item'} alt={item.itemName} fill className="object-cover" unoptimized={true}/>
                <div className="absolute top-2 right-2">
                    <button onClick={() => setMenuOpen(!isMenuOpen)} onBlur={() => setTimeout(() => setMenuOpen(false), 150)} className="p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white">
                        <MoreVertical size={20} className="text-gray-600" />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 ring-1 ring-black/5 z-10">
                            <button onClick={() => { onEdit(item); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => { onDelete(item); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-gray-800 truncate">{item.itemName}</h2>
                <p className="text-xl font-black text-orange-600 mt-auto pt-2">₹{item.price}</p>
            </div>
        </div>
    );
};

// Skeleton Loader Component
const ItemCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-40 bg-gray-200"></div>
        <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mt-4"></div>
        </div>
    </div>
);


// Sub-component for the Add/Edit Modal
const AddEditItemModal = ({ isOpen, onClose, item, onSuccess, onError }) => {
    const [form, setForm] = useState({ itemName: "", price: "", image: null });
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (item) {
            setForm({ itemName: item.itemName, price: item.price, image: null });
            setImagePreview(item.image);
        } else {
            setForm({ itemName: "", price: "", image: null });
            setImagePreview(null);
        }
    }, [item, isOpen]);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleImageChange = (e) => processFile(e.target.files[0]);
    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files[0]); };

    const handleRemoveImage = () => {
        setForm(prev => ({ ...prev, image: null }));
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        onError("");

        const data = new FormData();
        data.append("itemName", form.itemName);
        data.append("price", form.price);
        if (form.image) {
            data.append("image", form.image);
        }

        const url = item ? '/api/items/edit' : '/api/items/upload';
        const method = item ? 'PUT' : 'POST';
        if(item) {
            data.append("itemId", item._id);
        }

        try {
            const res = await fetch(url, { method, body: data });
            const result = await res.json();
            if (res.ok) {
                onSuccess();
            } else {
                onError(result.error || "An error occurred.");
            }
        } catch (err) {
            onError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{item ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input name="itemName" value={form.itemName} placeholder="Item Name" className="pl-10 text-black border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400" onChange={handleChange} required />
                </div>
                <div className="relative">
                    <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input name="price" type="number" value={form.price} placeholder="Price (in INR)" className="pl-10 text-black border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400" onChange={handleChange} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <div className="relative group mx-auto w-24 h-24">
                                    <Image src={imagePreview} alt="Preview" width={100} height={100} className="w-full h-full object-cover rounded-md" unoptimized={true}/>
                                    <button type="button" onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />}
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor="file-upload-modal" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500"><span>Upload a file</span><input id="file-upload-modal" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} ref={fileInputRef} /></label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 disabled:bg-orange-300">
                        {isLoading ? <Loader2 className="animate-spin" size={20}/> : item ? "Save Changes" : "Add Item"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// Sub-component for the Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, item, isLoading }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Delete Item</h2>
                <p className="text-gray-600 mt-2">Are you sure you want to delete <span className="font-semibold">{item?.itemName}</span>? This action cannot be undone.</p>
                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={onConfirm} disabled={isLoading} className="flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 disabled:bg-red-300">
                        {isLoading ? <Loader2 className="animate-spin" size={20}/> : "Delete"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
