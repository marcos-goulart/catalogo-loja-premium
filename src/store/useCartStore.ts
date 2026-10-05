import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const quantityToAdd = item.quantity ?? 1;
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.id === item.id && i.size === item.size && i.color === item.color
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const currentItem = updatedItems[existingIndex];
            if (currentItem) {
              updatedItems[existingIndex] = {
                ...currentItem,
                quantity: currentItem.quantity + quantityToAdd,
              };
            }
            return { items: updatedItems };
          }

          const newItem: CartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            size: item.size,
            color: item.color,
            image: item.image,
            quantity: quantityToAdd,
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      removeItem: (id, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.size === size && i.color === color)
          ),
        }));
      },

      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size, color);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "catalogo-cart-storage",
    }
  )
);
