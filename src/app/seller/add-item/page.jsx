"use client";

import { useState, useEffect } from "react";

export default function AddItemPage() {
  const [form, setForm] = useState({
    itemName: "",
    price: "",
    image: null,
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch user info from session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        if (data?.user?.role === "seller") {
          setUser(data.user);
        } else {
          setMessage("Only sellers can add items.");
        }
      } catch (err) {
        console.error("Failed to load user info", err);
        setMessage("Failed to load user info.");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("You must be logged in as a seller.");
      return;
    }

    const data = new FormData();
    data.append("itemName", form.itemName);
    data.append("price", form.price);
    data.append("image", form.image);
    data.append("sellerId", user.id);
    data.append("sellerName", user.name);

    const res = await fetch("/api/items/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setMessage(result.message || result.error);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="itemName" placeholder="Item Name" className="input" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" className="input" onChange={handleChange} required />
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload Item</button>
        </form>
      )}
    </div>
  );
}
