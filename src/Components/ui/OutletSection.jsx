"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MenuItemCard } from "@/Components/user/MenuItemCard"; 

const OutletSectionSkeleton = () => (
    <div className="space-y-12">
        {[...Array(2)].map((_, i) => (
            <div key={i}>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, j) => (
                        <div key={j} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                            <div className="h-40 w-full bg-gray-200 dark:bg-gray-700"></div>
                            <div className="p-4">
                                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);


export default function OutletSection() {
    const [outlets, setOutlets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOutlets = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/outlets');
                if (!res.ok) throw new Error("Failed to load outlets");
                const data = await res.json();
                setOutlets(data.filter(outlet => outlet.items && outlet.items.length > 0));
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOutlets();
    }, []);

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Featured Items
                    </h2>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                        A taste of what our partner outlets have to offer.
                    </p>
                </motion.div>
                
                {isLoading ? (
                    <OutletSectionSkeleton />
                ) : (
                    <div className="space-y-16">
                        {outlets.map((outlet) => (
                            <div key={outlet._id}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {outlet.name}
                                    </h3>
                                    <Link 
                                        href={`/seller/${outlet.name.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-all"
                                    >
                                        View All Items <ArrowRight size={14} />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {outlet.items.map(item => (
                                        <MenuItemCard key={item._id} item={item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}