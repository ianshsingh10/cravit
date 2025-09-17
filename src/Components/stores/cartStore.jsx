import { create } from 'zustand';

const useCartStore = create((set) => ({
  count: 0,
  
  fetchCount: async () => {
    try {
      const res = await fetch('/api/cart/count');
      if (res.ok) {
        const data = await res.json();
        set({ count: data.count });
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      set({ count: 0 });
    }
  },
}));

export default useCartStore;