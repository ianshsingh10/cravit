"use client";

import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Package, CircleDollarSign, UploadCloud, AlertTriangle, CheckCircle, Loader2, X } from 'lucide-react';
import { redirect } from "next/dist/server/api-utils";

export default function AddItemPage() {
  const [form, setForm] = useState({
    itemName: "",
    price: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsAuthLoading(true);
      try {
        const res = await fetch("/api/user/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user && data.user.role === "seller") {
            setUser(data.user);
          } else if (data.user) {
             setError("Access Denied. Only sellers can add items.");
          } else {
             setError("You must be logged in to access this page.");
          }
        } else {
           setError("Failed to verify user session. Please log in again.");
        }
      } catch (err) {
        console.error("Failed to load user info", err);
        setError("An error occurred while fetching user data.");
      } finally {
        setIsAuthLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const processFile = (file) => {
      if (file && file.type.startsWith('image/')) {
          setForm((prev) => ({ ...prev, image: file }));
          setImagePreview(URL.createObjectURL(file));
      } else {
          setError("Please upload a valid image file (PNG, JPG, etc.).");
      }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
  };

  const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      processFile(file);
  };

  const handleRemoveImage = () => {
      setForm(prev => ({ ...prev, image: null }));
      setImagePreview(null);
      // Reset the file input so the same file can be re-selected
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.itemName || !form.price || !form.image) {
      setError("All fields, including an image, are required.");
      return;
    }
    
    setIsLoading(true);

    const data = new FormData();
    data.append("itemName", form.itemName);
    data.append("price", form.price);
    data.append("image", form.image);
    data.append("sellerId", user._id); // Assuming user object has _id
    data.append("sellerName", user.name); // Assuming user object has name

    try {
        const res = await fetch("/api/items/upload", {
            method: "POST",
            body: data,
        });
        redirect("/");
        const result = await res.json();
        if (res.ok) {
            setSuccess(result.message || "Item added successfully!");
            setForm({ itemName: "", price: "", image: null });
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            setError(result.error || "Failed to upload item.");
        }
    } catch (err) {
        setError("An unexpected error occurred during upload.");
    } finally {
        setIsLoading(false);
    }
  };
  
  if (isAuthLoading) {
      return (
          <div className="min-h-screen bg-gray-50 flex justify-center items-center">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          </div>
      );
  }

  if (!user) {
      return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 text-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
                  <p className="text-gray-600 mt-2">{error || "You do not have permission to view this page."}</p>
                  <a href="/" className="mt-6 inline-block bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors">
                      Go to Homepage
                  </a>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-165 bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-lg w-full mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Add a New Menu Item</h2>
          <p className="text-gray-500">Fill out the details to list a new product.</p>
        </div>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><AlertTriangle size={18}/> {error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><CheckCircle size={18}/> {success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input name="itemName" value={form.itemName} placeholder="Item Name (e.g., Samosa)" className="pl-10 text-black border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent transition" onChange={handleChange} required />
          </div>
          <div className="relative">
              <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input name="price" type="number" value={form.price} placeholder="Price (in INR)" className="pl-10 text-black border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent transition" onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
            <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                {imagePreview ? (
                    <div className="relative group mx-auto w-24 h-24">
                        <Image src={imagePreview} alt="Item preview" width={100} height={100} className="w-full h-full object-cover rounded-md" />
                        <button type="button" onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} ref={fileInputRef} required={!form.image} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-orange-500 text-white font-bold px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 disabled:bg-orange-300 disabled:cursor-not-allowed">
            {isLoading ? <><Loader2 className="animate-spin" size={20}/> Adding Item...</> : "Upload Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
