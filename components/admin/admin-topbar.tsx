"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Menu, ExternalLink, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminStore } from "@/store/admin-store";
import { useAuthStore } from "@/store/auth-store";
import AdminMobileSidebar from "./admin-mobile-sidebar";

export default function AdminTopbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifications = useAdminStore((s) => s.notifications);
  const markRead = useAdminStore((s) => s.markNotificationRead);
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleLogout() {
    logout();
    toast.success("Logged out of admin panel");
    router.push("/");
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-surface-border bg-white px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden">
            <Menu size={22} />
          </button>
          <div className="hidden items-center gap-2 rounded-btn border border-surface-border px-3 py-2 sm:flex">
            <Search size={15} className="text-black/35" />
            <input placeholder="Search orders, products, customers..." className="w-64 bg-transparent font-body text-sm focus:outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 font-body text-xs font-semibold text-black/55 hover:text-gold-dark sm:flex">
            <ExternalLink size={14} /> View Store
          </a>
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative text-black/60 hover:text-gold-dark">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full z-40 mt-3 w-80 rounded-luxury border border-surface-border bg-white p-2 shadow-luxury-lg">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center font-body text-sm text-black/40">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`block w-full rounded-lg p-3 text-left font-body text-xs ${n.read ? "text-black/50" : "bg-gold/5 font-medium text-black"}`}
                    >
                      {n.message}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-luxury-black font-body text-xs font-semibold text-gold">
              {currentUser?.name.split(" ").map((n) => n[0]).slice(0, 2).join("") ?? "AD"}
            </div>
            <button onClick={handleLogout} className="text-black/40 hover:text-error" aria-label="Logout">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>
      {mobileOpen && <AdminMobileSidebar onClose={() => setMobileOpen(false)} />}
    </>
  );
}
