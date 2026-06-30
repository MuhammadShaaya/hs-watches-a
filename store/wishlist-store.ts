"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  productIds: string[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  remove: (productId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: ["p1", "p6"],
      toggle: (productId) => {
        set((state) =>
          state.productIds.includes(productId)
            ? { productIds: state.productIds.filter((id) => id !== productId) }
            : { productIds: [...state.productIds, productId] }
        );
      },
      isWishlisted: (productId) => get().productIds.includes(productId),
      remove: (productId) => set((state) => ({ productIds: state.productIds.filter((id) => id !== productId) })),
    }),
    { name: "hs-watches-wishlist" }
  )
);

interface CompareState {
  productIds: string[];
  toggle: (productId: string) => void;
  isComparing: (productId: string) => boolean;
  clear: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) => {
        set((state) => {
          if (state.productIds.includes(productId)) {
            return { productIds: state.productIds.filter((id) => id !== productId) };
          }
          if (state.productIds.length >= 4) return state;
          return { productIds: [...state.productIds, productId] };
        });
      },
      isComparing: (productId) => get().productIds.includes(productId),
      clear: () => set({ productIds: [] }),
    }),
    { name: "hs-watches-compare" }
  )
);

interface RecentlyViewedState {
  productIds: string[];
  add: (productId: string) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      productIds: [],
      add: (productId) => {
        set((state) => {
          const filtered = state.productIds.filter((id) => id !== productId);
          return { productIds: [productId, ...filtered].slice(0, 8) };
        });
      },
    }),
    { name: "hs-watches-recently-viewed" }
  )
);
