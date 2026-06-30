"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";
import { findUserByEmail } from "@/lib/data/users";

interface AuthState {
  currentUser: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  loginAsAdmin: () => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,

      login: (email, password) => {
        const user = findUserByEmail(email);
        if (!user) return { success: false, message: "No account found with that email address." };
        if (user.blocked) return { success: false, message: "This account has been suspended. Contact support." };
        if (user.password !== password) return { success: false, message: "Incorrect password. Please try again." };
        set({ currentUser: user });
        return { success: true, message: `Welcome back, ${user.name.split(" ")[0]}!` };
      },

      loginAsAdmin: () => {
        const admin = findUserByEmail("admin@hswatches.com");
        if (admin) set({ currentUser: admin });
      },

      logout: () => set({ currentUser: null }),

      register: (name, email, password) => {
        const existing = findUserByEmail(email);
        if (existing) return { success: false, message: "An account with this email already exists." };
        const newUser: User = {
          id: `u-${Date.now()}`,
          name,
          email,
          password,
          role: "customer",
          avatar: `https://picsum.photos/seed/${Date.now()}/200/200`,
          addresses: [],
          wishlist: [],
          createdAt: new Date().toISOString(),
          blocked: false,
        };
        set({ currentUser: newUser });
        return { success: true, message: `Welcome to H&S Watches, ${name.split(" ")[0]}!` };
      },
    }),
    { name: "hs-watches-auth" }
  )
);
