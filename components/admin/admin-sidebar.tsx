"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderTree,
  Tag,
  Users,
  Star,
  Ticket,
  Boxes,
  CreditCard,
  Truck,
  Newspaper,
  UserCog,
  BarChart3,
  Settings,
  Image as ImageIcon,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/reports", label: "Reports", icon: BarChart3 },
    ],
  },
  {
    title: "Catalog",
    items: [
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/categories", label: "Categories", icon: FolderTree },
      { href: "/admin/brands", label: "Brands", icon: Tag },
      { href: "/admin/media", label: "Media Library", icon: ImageIcon },
      { href: "/admin/inventory", label: "Inventory", icon: Boxes },
    ],
  },
  {
    title: "Sales",
    items: [
      { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
      { href: "/admin/coupons", label: "Coupons", icon: Ticket },
      { href: "/admin/payments", label: "Payments", icon: CreditCard },
      { href: "/admin/shipping", label: "Shipping", icon: Truck },
    ],
  },
  {
    title: "People",
    items: [
      { href: "/admin/customers", label: "Customers", icon: Users },
      { href: "/admin/reviews", label: "Reviews", icon: Star },
      { href: "/admin/staff", label: "Staff", icon: UserCog },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/blog", label: "Blog", icon: Newspaper },
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    title: "System",
    items: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-luxury-black lg:flex">
      <div className="flex h-20 items-center gap-2 border-b border-white/10 px-6">
        <span className="font-display text-xl font-bold text-white">H&amp;S</span>
        <span className="font-display text-xl font-light tracking-[0.25em] text-gold">ADMIN</span>
      </div>
      <nav className="flex-1 px-4 py-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="px-3 font-body text-[10px] font-semibold uppercase tracking-luxe text-white/30">{section.title}</p>
            <div className="mt-2 flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition",
                      active ? "bg-gold/15 font-semibold text-gold" : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon size={16} /> {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
