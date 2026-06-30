"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Lock,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/payment-methods", label: "Payment Methods", icon: CreditCard },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
  { href: "/account/change-password", label: "Change Password", icon: Lock },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  if (!currentUser) {
    return <div className="container py-32 text-center font-body text-black/40">Redirecting to login...</div>;
  }

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  }

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-luxury border border-surface-border bg-white p-5">
          <div className="flex items-center gap-3 border-b border-surface-border pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-luxury-black font-display text-sm font-semibold text-gold">
              {currentUser.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <p className="font-display text-sm font-semibold">{currentUser.name}</p>
              <p className="font-body text-xs text-black/45">{currentUser.email}</p>
            </div>
          </div>
          <nav className="mt-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-btn px-3 py-2.5 font-body text-sm transition",
                  pathname === item.href ? "bg-gold/10 font-semibold text-gold-dark" : "text-black/60 hover:bg-surface-bg"
                )}
              >
                <item.icon size={16} /> {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center gap-3 rounded-btn px-3 py-2.5 font-body text-sm text-error transition hover:bg-error/5"
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
