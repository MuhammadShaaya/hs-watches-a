"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Printer } from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import StatusBadge from "@/components/ui/status-badge";
import { formatCurrency, formatDateShort } from "@/lib/format";
import { OrderStatus } from "@/types";

const STATUSES: (OrderStatus | "All")[] = ["All", "Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled", "Returned"];

export default function AdminOrdersPage() {
  const orders = useAdminStore((s) => s.orders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "All">("All");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch = !search.trim() || o.id.toLowerCase().includes(search.toLowerCase()) || o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "All" || o.status === status;
      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Orders</h1>
      <p className="mt-1 font-body text-sm text-black/50">{orders.length} total orders</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID or customer..." className="input-luxury pl-9" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus | "All")} className="input-luxury !w-auto">
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-5 overflow-x-auto rounded-luxury border border-surface-border bg-white">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-surface-border text-left">
              <th className="p-4 font-body text-xs font-semibold text-black/45">Order ID</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Customer</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Date</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Items</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Total</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Status</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-surface-border last:border-0 hover:bg-surface-bg">
                <td className="p-4 font-body text-sm font-semibold">{o.id}</td>
                <td className="p-4 font-body text-sm">{o.shippingAddress.fullName}</td>
                <td className="p-4 font-body text-sm text-black/55">{formatDateShort(o.createdAt)}</td>
                <td className="p-4 font-body text-sm text-black/55">{o.items.length}</td>
                <td className="p-4 font-body text-sm font-semibold">{formatCurrency(o.total)}</td>
                <td className="p-4"><StatusBadge status={o.status} /></td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-body text-xs font-semibold text-gold-dark hover:text-gold">
                      View
                    </Link>
                    <button onClick={() => window.print()} className="text-black/40 hover:text-black/70">
                      <Printer size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-10 text-center font-body text-sm text-black/40">No orders match your filters.</p>}
      </div>
    </div>
  );
}
