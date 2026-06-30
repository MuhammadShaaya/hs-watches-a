"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Printer } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminStore } from "@/store/admin-store";
import StatusBadge from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/format";
import { OrderStatus } from "@/types";

const ALL_STATUSES: OrderStatus[] = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled", "Returned"];

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orders = useAdminStore((s) => s.orders);
  const updateOrderStatus = useAdminStore((s) => s.updateOrderStatus);
  const order = orders.find((o) => o.id === params.id);

  if (!order) return <p className="font-body text-sm text-black/50">Order not found.</p>;

  function handleStatusChange(newStatus: OrderStatus) {
    updateOrderStatus(order!.id, newStatus);
    toast.success(`Order status updated to "${newStatus}"`);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">{order.id}</h1>
          <p className="mt-1 font-body text-sm text-black/50">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-btn border border-surface-border px-4 py-2.5 font-body text-xs font-semibold hover:border-gold">
            <Printer size={14} /> Print Invoice
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-luxury border border-surface-border bg-white p-6">
            <p className="font-display text-base font-semibold">Items</p>
            <div className="mt-4 space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-surface-bg">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold">{item.name}</p>
                    <p className="font-body text-xs text-black/45">
                      {item.selectedColor} {item.selectedStrap && `· ${item.selectedStrap}`} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="font-body text-sm font-semibold">{formatCurrency(item.unitPrice * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-luxury border border-surface-border bg-white p-6">
            <p className="font-display text-base font-semibold">Order Timeline</p>
            <div className="mt-4 space-y-3">
              {order.timeline.map((t, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-surface-border pb-3 last:border-0">
                  <StatusBadge status={t.status} />
                  <span className="font-body text-xs text-black/45">{formatDate(t.date)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-luxury border border-surface-border bg-white p-6">
            <p className="font-display text-base font-semibold">Update Status</p>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
              className="input-luxury mt-3"
            >
              {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="rounded-luxury border border-surface-border bg-white p-6">
            <p className="font-display text-base font-semibold">Customer</p>
            <p className="mt-3 font-body text-sm text-black/65">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.phone}<br />
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
            </p>
          </div>

          <div className="rounded-luxury border border-surface-border bg-white p-6">
            <p className="font-display text-base font-semibold">Payment Summary</p>
            <div className="mt-3 space-y-2 font-body text-sm">
              <div className="flex justify-between text-black/60"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatCurrency(order.discount)}</span></div>}
              <div className="flex justify-between text-black/60"><span>Tax</span><span>{formatCurrency(order.tax)}</span></div>
              <div className="flex justify-between border-t border-surface-border pt-2 font-semibold"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
              <p className="pt-1 font-body text-xs text-black/40">Payment Method: Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
