"use client";

import Link from "next/link";
import AccountLayout from "@/components/account/account-layout";
import StatusBadge from "@/components/ui/status-badge";
import { useAuthStore } from "@/store/auth-store";
import { ORDERS } from "@/lib/data/orders";
import { formatCurrency, formatDateShort } from "@/lib/format";

export default function OrdersPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  if (!currentUser) return <AccountLayout><></></AccountLayout>;

  const myOrders = ORDERS.filter((o) => o.userId === currentUser.id);

  return (
    <AccountLayout>
      <h1 className="font-display text-2xl font-semibold">Order History</h1>
      <p className="mt-1 font-body text-sm text-black/50">Track and review your past orders.</p>

      <div className="mt-6 space-y-3">
        {myOrders.length === 0 ? (
          <p className="rounded-luxury border border-dashed border-surface-border p-10 text-center font-body text-sm text-black/45">
            You haven&apos;t placed any orders yet.
          </p>
        ) : (
          myOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex flex-col gap-3 rounded-luxury border border-surface-border bg-white p-5 transition hover:shadow-luxury-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-display text-base font-semibold">{order.id}</p>
                <p className="mt-1 font-body text-xs text-black/45">
                  Placed {formatDateShort(order.createdAt)} · {order.items.length} item(s)
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-base font-semibold">{formatCurrency(order.total)}</span>
                <StatusBadge status={order.status} />
              </div>
            </Link>
          ))
        )}
      </div>
    </AccountLayout>
  );
}
