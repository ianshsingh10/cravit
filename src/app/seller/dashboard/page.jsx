"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <button
          onClick={() => router.push("/seller/add-item")}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          ➕ Add Item
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No items added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={item.image}
                alt={item.itemName}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{item.itemName}</h2>
              <p className="text-gray-600 mb-1">₹ {item.price}</p>
              <p className="text-sm text-gray-500">Seller: {item.sellerName}</p>
              <p className="text-sm text-yellow-500">⭐ {item.stars.toFixed(1)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
