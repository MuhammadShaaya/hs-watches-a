"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine, Product } from "@/types";
import { PRODUCTS } from "@/lib/data/products";
import { SITE_SETTINGS } from "@/lib/data/misc";

interface CartState {
  lines: CartLine[];
  couponCode: string | null;
  addItem: (line: CartLine) => void;
  removeItem: (productId: string, selectedColor?: string, selectedStrap?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedStrap?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

function lineKey(productId: string, selectedColor?: string, selectedStrap?: string) {
  return `${productId}__${selectedColor ?? ""}__${selectedStrap ?? ""}`;
}

export function getLineProduct(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}

export function lineUnitPrice(line: CartLine, product: Product) {
  const base = product.salePrice ?? product.price;
  const strapDelta = product.strapOptions.find((s) => s.label === line.selectedStrap)?.priceDelta ?? 0;
  return base + strapDelta;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      couponCode: null,

      addItem: (line) => {
        set((state) => {
          const key = lineKey(line.productId, line.selectedColor, line.selectedStrap);
          const existing = state.lines.find(
            (l) => lineKey(l.productId, l.selectedColor, l.selectedStrap) === key
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                lineKey(l.productId, l.selectedColor, l.selectedStrap) === key
                  ? { ...l, quantity: l.quantity + line.quantity }
                  : l
              ),
            };
          }
          return { lines: [...state.lines, line] };
        });
      },

      removeItem: (productId, selectedColor, selectedStrap) => {
        const key = lineKey(productId, selectedColor, selectedStrap);
        set((state) => ({
          lines: state.lines.filter(
            (l) => lineKey(l.productId, l.selectedColor, l.selectedStrap) !== key
          ),
        }));
      },

      updateQuantity: (productId, quantity, selectedColor, selectedStrap) => {
        const key = lineKey(productId, selectedColor, selectedStrap);
        set((state) => ({
          lines: state.lines
            .map((l) =>
              lineKey(l.productId, l.selectedColor, l.selectedStrap) === key
                ? { ...l, quantity: Math.max(0, quantity) }
                : l
            )
            .filter((l) => l.quantity > 0),
        }));
      },

      clearCart: () => set({ lines: [], couponCode: null }),

      applyCoupon: (code) => {
        const upper = code.trim().toUpperCase();
        const valid: Record<string, true> = { WELCOME10: true, SAVE250: true, VIP20: true };
        if (!valid[upper]) {
          return { success: false, message: "This coupon code is invalid or has expired." };
        }
        set({ couponCode: upper });
        return { success: true, message: `Coupon "${upper}" applied successfully.` };
      },

      removeCoupon: () => set({ couponCode: null }),

      itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),

      subtotal: () => {
        return get().lines.reduce((sum, l) => {
          const product = getLineProduct(l.productId);
          if (!product) return sum;
          return sum + lineUnitPrice(l, product) * l.quantity;
        }, 0);
      },
    }),
    { name: "hs-watches-cart" }
  )
);

export function computeCouponDiscount(code: string | null, subtotal: number) {
  if (!code) return 0;
  if (code === "WELCOME10") return Math.round(subtotal * 0.1 * 100) / 100;
  if (code === "VIP20") return Math.round(subtotal * 0.2 * 100) / 100;
  if (code === "SAVE250") return Math.min(250, subtotal);
  return 0;
}

export function computeOrderTotals(subtotal: number, couponCode: string | null) {
  const discount = computeCouponDiscount(couponCode, subtotal);
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * SITE_SETTINGS.taxRate * 100) / 100;
  const shipping = 0; // free shipping store-wide
  const total = Math.round((taxable + tax + shipping) * 100) / 100;
  return { subtotal, discount, tax, shipping, total };
}
