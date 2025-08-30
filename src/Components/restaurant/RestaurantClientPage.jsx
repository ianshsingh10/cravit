"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    RestaurantHero, 
    CategoryTabs, 
    MenuItemCard, 
    ItemDetailModal, 
    FloatingCartButton 
} from "@/Components/restaurant/RestaurantUI";

export default function RestaurantClientPage({ data }) {
    const [cart, setCart] = useState([]);
    const [activeCategory, setActiveCategory] = useState(Object.keys(data.menu)[0]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAddToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem => 
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(cartItem => 
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                );
            }
            return prevCart.filter(cartItem => cartItem.id !== item.id);
        });
    };
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <RestaurantHero {...data} />
            <CategoryTabs 
                categories={Object.keys(data.menu)}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {data.menu[activeCategory].map(item => (
                            <MenuItemCard 
                                key={item.id} 
                                item={item} 
                                onClick={setSelectedItem}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </main>

            <ItemDetailModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                item={selectedItem}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                cartItem={cart.find(cartItem => cartItem.id === selectedItem?.id)}
            />

            <FloatingCartButton cart={cart} />
        </div>
    );
}
