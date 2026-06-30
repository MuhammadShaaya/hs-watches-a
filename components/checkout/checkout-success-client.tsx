"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Mail, MessageSquareText, Truck } from "lucide-react";

export default function CheckoutSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") ?? "ORD-00000";
  const estDate = new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container flex flex-col items-center py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2 size={40} className="text-success" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">Order Placed Successfully!</h1>
      <p className="mt-3 max-w-md font-body text-sm text-black/55">
        Thank you for your order. We&apos;ve received it and will begin preparing your timepiece for shipment.
      </p>

      <div className="mt-8 w-full max-w-sm rounded-luxury border border-surface-border bg-white p-6">
        <p className="font-body text-xs uppercase tracking-luxe text-black/40">Order Number</p>
        <p className="mt-1 font-display text-2xl font-bold text-gold-dark">{orderId}</p>
        <div className="mt-4 flex items-center justify-center gap-2 border-t border-surface-border pt-4 font-body text-sm text-black/60">
          <Truck size={16} className="text-gold" />
          Estimated delivery: <span className="font-semibold text-luxury-black">{estDate}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6 font-body text-xs text-black/45">
        <span className="flex items-center gap-1.5"><Mail size={14} /> Email confirmation sent</span>
        <span className="flex items-center gap-1.5"><MessageSquareText size={14} /> SMS confirmation sent</span>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/account/orders" className="btn-luxury-outline">Track Your Order</Link>
        <Link href="/shop" className="btn-luxury-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
