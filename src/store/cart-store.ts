'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/types/database';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Getters
  getTotalCount: () => number;
  getSubtotal: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (newItem, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.variantId === newItem.variantId
          );

          if (existingItemIndex > -1) {
            const currentItem = state.items[existingItemIndex];
            const updatedQuantity = Math.min(
              currentItem.quantity + quantity,
              currentItem.maxStock
            );

            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...currentItem,
              quantity: updatedQuantity,
            };

            return { items: updatedItems, isCartOpen: true };
          }

          // New variant item
          const cartItem: CartItem = {
            ...newItem,
            quantity: Math.min(quantity, newItem.maxStock),
          };

          return { items: [...state.items, cartItem], isCartOpen: true };
        });
      },

      removeItem: (variantId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.variantId !== variantId),
            };
          }

          const updatedItems = state.items.map((item) => {
            if (item.variantId === variantId) {
              return {
                ...item,
                quantity: Math.min(quantity, item.maxStock),
              };
            }
            return item;
          });

          return { items: updatedItems };
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        // Free standard shipping on orders over $150
        return subtotal >= 150 ? 0 : 15;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingFee();
      },
    }),
    {
      name: 'sneaker-vault-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
