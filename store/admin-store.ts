"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, Order, OrderStatus, Category, Coupon, Notification } from "@/types";
import { PRODUCTS } from "@/lib/data/products";
import { ORDERS } from "@/lib/data/orders";
import { CATEGORIES, COUPONS } from "@/lib/data/misc";

interface AdminState {
  products: Product[];
  orders: Order[];
  categories: Category[];
  coupons: Coupon[];
  notifications: Notification[];

  addProduct: (product: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkDeleteProducts: (ids: string[]) => void;

  updateOrderStatus: (id: string, status: OrderStatus) => void;

  addCategory: (name: string) => { success: boolean; message: string };
  deleteCategory: (id: string) => { success: boolean; message: string };

  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (id: string, patch: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  markNotificationRead: (id: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      products: PRODUCTS,
      orders: ORDERS,
      categories: CATEGORIES,
      coupons: COUPONS,
      notifications: [
        { id: "n1", message: "New order ORD-10004 placed by guest checkout", type: "order", read: false, date: new Date(Date.now() - 86400000).toISOString() },
        { id: "n2", message: "Monarch Tourbillon stock is critically low (1 unit)", type: "stock", read: false, date: new Date(Date.now() - 2 * 86400000).toISOString() },
        { id: "n3", message: "New 5-star review on Meridian Automatic Chronograph", type: "review", read: true, date: new Date(Date.now() - 4 * 86400000).toISOString() },
      ],

      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),

      updateProduct: (id, patch) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),

      deleteProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

      bulkDeleteProducts: (ids) =>
        set((state) => ({ products: state.products.filter((p) => !ids.includes(p.id)) })),

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status,
                  updatedAt: new Date().toISOString(),
                  timeline: [...o.timeline, { status, date: new Date().toISOString() }],
                }
              : o
          ),
        })),

      addCategory: (name) => {
        const exists = get().categories.some((c) => c.name.toLowerCase() === name.toLowerCase());
        if (exists) return { success: false, message: "A category with this name already exists." };
        const cat: Category = {
          id: `c-${Date.now()}`,
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          productCount: 0,
        };
        set((state) => ({ categories: [...state.categories, cat] }));
        return { success: true, message: `Category "${name}" added.` };
      },

      deleteCategory: (id) => {
        const cat = get().categories.find((c) => c.id === id);
        if (cat && cat.productCount > 0) {
          return { success: false, message: `Cannot delete "${cat.name}" — it still has ${cat.productCount} products assigned.` };
        }
        set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }));
        return { success: true, message: "Category deleted." };
      },

      addCoupon: (coupon) => set((state) => ({ coupons: [coupon, ...state.coupons] })),
      updateCoupon: (id, patch) =>
        set((state) => ({ coupons: state.coupons.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      deleteCoupon: (id) => set((state) => ({ coupons: state.coupons.filter((c) => c.id !== id) })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
    }),
    { name: "hs-watches-admin" }
  )
);
