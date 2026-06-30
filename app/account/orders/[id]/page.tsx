"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { Download, CheckCircle2 } from "lucide-react";
import AccountLayout from "@/components/account/account-layout";
import StatusBadge from "@/components/ui/status-badge";
import { ORDERS } from "@/lib/data/orders";
import { formatCurrency, formatDate } from "@/lib/format";
import { OrderStatus } from "@/types";

const STAGES: OrderStatus[] = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const order = ORDERS.find((o) => o.id === params.id);

  if (!order) {
    return (
      <AccountLayout>
        <p className="font-body text-sm text-black/50">Order not found.</p>
      </AccountLayout>
    );
  }

  const currentStageIndex = STAGES.indexOf(order.status);
  const isTerminalAlt = order.status === "Cancelled" || order.status === "Returned";

  return (
    <AccountLayout>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">{order.id}</h1>
          <p className="mt-1 font-body text-sm text-black/50">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-btn border border-surface-border px-4 py-2.5 font-body text-xs font-semibold hover:border-gold"
          >
            <Download size={14} /> Invoice
          </button>
        </div>
      </div>

      {/* Tracking timeline */}
      {!isTerminalAlt && (
        <div className="mt-8 rounded-luxury border border-surface-border bg-white p-6">
          <p className="font-display text-base font-semibold">Order Tracking</p>
          <div className="mt-6 flex items-center justify-between">
            {STAGES.map((stage, i) => (
              <div key={stage} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <div className={`h-px flex-1 ${i === 0 ? "opacity-0" : i <= currentStageIndex ? "bg-gold" : "bg-surface-border"}`} />
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      i <= currentStageIndex ? "bg-gold text-luxury-black" : "border border-surface-border text-black/30"
                    }`}
                  >
                    {i <= currentStageIndex ? <CheckCircle2 size={16} /> : <span className="font-body text-xs">{i + 1}</span>}
                  </div>
                  <div className={`h-px flex-1 ${i === STAGES.length - 1 ? "opacity-0" : i < currentStageIndex ? "bg-gold" : "bg-surface-border"}`} />
                </div>
                <span className="mt-2 text-center font-body text-[11px] text-black/55">{stage}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isTerminalAlt && (
        <div className="mt-8 rounded-luxury border border-error/20 bg-error/5 p-5">
          <p className="font-body text-sm font-semibold text-error">This order was {order.status.toLowerCase()}.</p>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
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

        <div className="space-y-6">
          <div className="rounded-luxury border border-surface-border bg-white p-6">
            <p className="font-display text-base font-semibold">Shipping Address</p>
            <p className="mt-3 font-body text-sm text-black/65">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}<br />
              {order.shippingAddress.phone}
            </p>
          </div>

          <div className="rounded-luxury border border-surface-border bg-white p-6">
            <p className="font-display text-base font-semibold">Payment Summary</p>
            <div className="mt-3 space-y-2 font-body text-sm">
              <div className="flex justify-between text-black/60"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatCurrency(order.discount)}</span></div>}
              <div className="flex justify-between text-black/60"><span>Tax</span><span>{formatCurrency(order.tax)}</span></div>
              <div className="flex justify-between text-black/60"><span>Shipping</span><span className="text-success">Free</span></div>
              <div className="flex justify-between border-t border-surface-border pt-2 font-semibold"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
              <p className="pt-2 font-body text-xs text-black/40">Payment Method: Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
