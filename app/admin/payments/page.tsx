"use client";

import { Truck, Ban } from "lucide-react";
import toast from "react-hot-toast";

const DISABLED_GATEWAYS = ["Stripe", "PayPal", "Razorpay", "Apple Pay", "Google Pay"];

export default function AdminPaymentsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Payments</h1>
      <p className="mt-1 font-body text-sm text-black/50">H&amp;S Watches operates exclusively on Cash on Delivery.</p>

      <div className="mt-6 flex items-center gap-4 rounded-luxury border-2 border-gold bg-gold/5 p-6">
        <Truck size={28} className="text-gold-dark" />
        <div className="flex-1">
          <p className="font-display text-base font-semibold">Cash on Delivery (COD)</p>
          <p className="mt-1 font-body text-sm text-black/55">Active store-wide. Customers pay in cash upon delivery — no online payment processing required.</p>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1 font-body text-xs font-semibold text-success">Enabled</span>
      </div>

      <div className="mt-6 rounded-luxury border border-surface-border bg-white p-6">
        <p className="font-display text-base font-semibold">Other Gateways</p>
        <p className="mt-1 font-body text-xs text-black/45">Disabled by design — this store intentionally does not integrate online payment processors.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {DISABLED_GATEWAYS.map((g) => (
            <div key={g} className="flex items-center justify-between rounded-btn border border-surface-border p-4">
              <span className="font-body text-sm text-black/50">{g}</span>
              <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-black/35">
                <Ban size={13} /> Disabled
              </span>
            </div>
          ))}
        </div>
        <button onClick={() => toast.error("Online gateways are intentionally disabled for this store")} className="mt-4 font-body text-xs text-black/30">
          Why can&apos;t I enable these?
        </button>
      </div>
    </div>
  );
}
