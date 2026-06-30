"use client";

import Link from "next/link";
import { X } from "lucide-react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
} from "lucide-react";

const QUICK_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminMobileSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={onClose}>
      <div className="h-full w-72 bg-luxury-black p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-white">H&amp;S Admin</span>
          <button onClick={onClose} className="text-white">
            <X size={22} />
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {QUICK_NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-3 font-body text-sm text-white/70 hover:bg-white/5">
              <item.icon size={16} /> {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
