"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, AlertTriangle, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useRouter } from "next/navigation";

const CartItemRow = ({ item, onUpdate, onRemove, onServiceChange, isUpdating }) => {
    return (
        <div className="flex items-center flex-wrap gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <Image 
                src={item.itemId?.image || "https://placehold.co/100x100/F0F0F0/333333?text=Item"} 
                alt={item.itemName} 
                width={80} 
                height={80} 
                className="rounded-lg object-cover"
                unoptimized={true}
            />
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.itemName}</h3>
                <p className="font-bold text-orange-600 dark:text-orange-400">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                    <button 
                        onClick={() => onServiceChange(item._id, 'dine-in')}
                        disabled={isUpdating}
                        className={`text-xs font-bold py-1 px-3 rounded-full transition-colors ${
                            item.service === 'dine-in' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'
                        }`}
                    >
                        Dine-in
                    </button>
                    <button 
                        onClick={() => onServiceChange(item._id, 'parcel')}
                        disabled={isUpdating}
                        className={`text-xs font-bold py-1 px-3 rounded-full transition-colors ${
                            item.service === 'parcel' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'
                        }`}
                    >
                        Parcel
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                    <button 
                        onClick={() => onUpdate(item._id, item.quantity - 1)} 
                        disabled={item.quantity <= 1 || isUpdating} 
                        className="p-1.5 rounded-full disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button 
                        onClick={() => onUpdate(item._id, item.quantity + 1)} 
                        disabled={isUpdating} 
                        className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <button 
                    onClick={() => onRemove(item._id)} 
                    disabled={isUpdating} 
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                    aria-label="Remove item"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState("");
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        const fetchCartItems = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/cart');
                if (!res.ok) throw new Error("Could not fetch your cart. Please try again.");
                const data = await res.json();
                setCartItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const handleUpdateQuantity = async (cartItemId, quantity) => {
        if (quantity < 1) return;
        setIsUpdating(true);
        try {
            const res = await fetch('/api/cart/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItemId, quantity }),
            });
            if (!res.ok) throw new Error("Failed to update quantity");
            const updatedItem = await res.json();
            setCartItems(currentItems => currentItems.map(item => item._id === cartItemId ? updatedItem : item));
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleServiceChange = async (cartItemId, service) => {
        setIsUpdating(true);
        try {
            const res = await fetch('/api/cart/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItemId, service }),
            });
            if (!res.ok) throw new Error("Failed to update service type");
            const updatedItem = await res.json();
            setCartItems(currentItems => currentItems.map(item => item._id === cartItemId ? updatedItem : item));
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        if (!confirm("Are you sure you want to remove this item?")) return;
        setIsUpdating(true);
        try {
            const res = await fetch('/api/cart/remove', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItemId }),
            });
            if (!res.ok) throw new Error("Failed to remove item");
            setCartItems(currentItems => currentItems.filter(item => item._id !== cartItemId));
            fetchCount(); // Update header count
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(false);
        }
    };
    
    const { subtotal, parcelCharges, upiCharges, grandTotal } = useMemo(() => {
        let subtotal = 0;
        let parcelCharges = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
            if (item.service === 'parcel') {
                parcelCharges += 10 * item.quantity;
            }
        });

        const totalBeforeFees = subtotal + parcelCharges;
        const grandTotal = totalBeforeFees / 0.96; 
        const upiCharges = grandTotal - totalBeforeFees;
        
        return { subtotal, parcelCharges, upiCharges, grandTotal };
    }, [cartItems]);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const res = await fetch('/api/orders/create', { method: 'POST' });
            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.error || "Checkout failed. Please try again.");
            }
            alert("Your order has been placed successfully!");
            setCartItems([]);
            fetchCount(); // Reset header count to 0
            router.push('/user/dashboard'); 
        } catch (err) {
            alert(err.message);
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center"><Loader2 className="w-12 h-12 animate-spin text-orange-500" /></div>;
    }
    if (error) {
        return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center text-red-500"><AlertTriangle className="mr-2" /> <p>{error}</p></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8">Your Cart</h1>
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                            {cartItems.map(item => (
                                <CartItemRow 
                                    key={item._id} 
                                    item={item} 
                                    onUpdate={handleUpdateQuantity} 
                                    onRemove={handleRemoveItem}
                                    onServiceChange={handleServiceChange}
                                    isUpdating={isUpdating}
                                />
                            ))}
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Order Summary</h2>
                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                    <span>Parcel Charges</span>
                                    <span>₹{parcelCharges.toFixed(2)}</span>
                                </div>
                                {/* ✅ Added UPI Charges display */}
                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                    <span>UPI Charges</span>
                                    <span>₹{upiCharges.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                    <span>Grand Total</span>
                                    <span>₹{grandTotal.toFixed(2)}</span>
                                </div>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl text-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg disabled:bg-orange-400 disabled:cursor-not-allowed flex justify-center items-center"
                                >
                                    {isCheckingOut ? <Loader2 className="animate-spin" /> : 'Proceed to Checkout'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <ShoppingCart className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto" />
                        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/" className="mt-6 inline-block bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-orange-600 transition-all">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}