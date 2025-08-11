"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Package, CircleDollarSign, UploadCloud, Loader2, X } from 'lucide-react';
import { Modal } from "@/Components/ui/Modal";

export const AddEditItemModal = ({ isOpen, onClose, item, user, onSuccess, onError }) => {
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
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        onError("");

        const data = new FormData();
        data.append("itemName", form.itemName);
        data.append("price", form.price);
        if (form.image) data.append("image", form.image);
        
        const url = item ? '/api/items/edit' : '/api/items/upload';
        const method = item ? 'PUT' : 'POST';
        
        if (item) {
            data.append("itemId", item._id);
        } else {
            data.append("sellerId", user._id);
            data.append("sellerName", user.name);
        }

        try {
            const res = await fetch(url, { method, body: data });
            const result = await res.json();
            if (res.ok) onSuccess();
            else onError(result.error || "An error occurred.");
        } catch (err) {
            onError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{item ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input name="itemName" value={form.itemName} placeholder="Item Name" className="pl-10 text-black dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500" onChange={handleChange} required />
                </div>
                <div className="relative">
                    <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input name="price" type="number" value={form.price} placeholder="Price (in INR)" className="pl-10 text-black dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500" onChange={handleChange} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item Image</label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${isDragging ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-300 dark:border-gray-600'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <div className="relative group mx-auto w-24 h-24">
                                    <Image src={imagePreview} alt="Preview" width={100} height={100} className="w-full h-full object-cover rounded-md" unoptimized={true}/>
                                    <button type="button" onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />}
                            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                <label htmlFor="file-upload-modal" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-orange-600 hover:text-orange-500"><span>Upload a file</span><input id="file-upload-modal" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} ref={fileInputRef} /></label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                    <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 disabled:bg-orange-400">
                        {isLoading ? <Loader2 className="animate-spin" size={20}/> : item ? "Save Changes" : "Add Item"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};