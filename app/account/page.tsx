"use client";

import Link from "next/link";
import { Package, Heart, MapPin, ArrowRight } from "lucide-react";
import AccountLayout from "@/components/account/account-layout";
import StatusBadge from "@/components/ui/status-badge";
import { useAuthStore } from "@/store/auth-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { ORDERS } from "@/lib/data/orders";
import { formatCurrency, formatDateShort } from "@/lib/format";

export default function AccountDashboardPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const wishlistCount = useWishlistStore((s) => s.productIds.length);

  if (!currentUser) return <AccountLayout><></></AccountLayout>;

  const myOrders = ORDERS.filter((o) => o.userId === currentUser.id);
  const recentOrders = myOrders.slice(0, 3);

  return (
    <AccountLayout>
      <h1 className="font-display text-2xl font-semibold">Welcome back, {currentUser.name.split(" ")[0]}</h1>
      <p className="mt-1 font-body text-sm text-black/50">Here&apos;s a snapshot of your account.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card-luxury p-5">
          <Package size={20} className="text-gold-dark" />
          <p className="mt-3 font-display text-2xl font-bold">{myOrders.length}</p>
          <p className="font-body text-xs text-black/50">Total Orders</p>
        </div>
        <div className="card-luxury p-5">
          <Heart size={20} className="text-gold-dark" />
          <p className="mt-3 font-display text-2xl font-bold">{wishlistCount}</p>
          <p className="font-body text-xs text-black/50">Wishlist Items</p>
        </div>
        <div className="card-luxury p-5">
          <MapPin size={20} className="text-gold-dark" />
          <p className="mt-3 font-display text-2xl font-bold">{currentUser.addresses.length}</p>
          <p className="font-body text-xs text-black/50">Saved Addresses</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Recent Orders</h2>
        <Link href="/account/orders" className="flex items-center gap-1 font-body text-sm font-semibold text-gold-dark hover:text-gold">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {recentOrders.length === 0 ? (
          <p className="rounded-luxury border border-dashed border-surface-border p-6 text-center font-body text-sm text-black/45">
            No orders yet. <Link href="/shop" className="text-gold-dark underline">Start shopping</Link>
          </p>
        ) : (
          recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between rounded-luxury border border-surface-border bg-white p-4 transition hover:shadow-luxury-sm"
            >
              <div>
                <p className="font-display text-sm font-semibold">{order.id}</p>
                <p className="font-body text-xs text-black/45">{formatDateShort(order.createdAt)} · {order.items.length} item(s)</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-sm font-semibold">{formatCurrency(order.total)}</span>
                <StatusBadge status={order.status} />
              </div>
            </Link>
          ))
        )}
      </div>
    </AccountLayout>
  );
}
