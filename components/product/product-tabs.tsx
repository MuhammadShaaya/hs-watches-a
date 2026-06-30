"use client";

import { useState } from "react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import Stars from "@/components/ui/stars";
import { ThumbsUp, BadgeCheck } from "lucide-react";

const TABS = ["Description", "Specifications", "Shipping & Returns", "Reviews"] as const;

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<typeof TABS[number]>("Description");

  const ratingBuckets = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => Math.round(r.rating) === star).length;
    const pct = product.reviews.length ? Math.round((count / product.reviews.length) * 100) : 0;
    return { star, count, pct };
  });

  return (
    <section className="mt-16">
      <div className="flex gap-8 overflow-x-auto border-b border-surface-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "whitespace-nowrap border-b-2 px-1 py-4 font-body text-sm font-semibold transition",
              active === tab ? "border-gold text-luxury-black" : "border-transparent text-black/40 hover:text-black/70"
            )}
          >
            {tab} {tab === "Reviews" && `(${product.reviewCount})`}
          </button>
        ))}
      </div>

      <div className="py-10">
        {active === "Description" && (
          <div className="max-w-3xl font-body text-sm leading-relaxed text-black/70 sm:text-base">
            <p>{product.description}</p>
          </div>
        )}

        {active === "Specifications" && (
          <div className="max-w-2xl divide-y divide-surface-border">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="flex justify-between py-3">
                <span className="font-body text-sm text-black/50">{spec.label}</span>
                <span className="font-body text-sm font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {active === "Shipping & Returns" && (
          <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
            <div>
              <p className="font-display text-base font-semibold">Shipping</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-black/60">
                Complimentary fully-insured worldwide shipping on every order. Most orders are processed within 1-2 business days and arrive within 3-7 business days depending on destination.
              </p>
            </div>
            <div>
              <p className="font-display text-base font-semibold">Returns</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-black/60">
                30-day no-questions-asked returns on unworn pieces in original packaging with all tags and authentication documents intact.
              </p>
            </div>
            <div>
              <p className="font-display text-base font-semibold">Warranty</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-black/60">{product.warranty}, covering manufacturing defects in materials and movement.</p>
            </div>
            <div>
              <p className="font-display text-base font-semibold">Authentication</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-black/60">
                Every watch ships with a signed certificate of authenticity and a unique serial number registered to your name.
              </p>
            </div>
          </div>
        )}

        {active === "Reviews" && (
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold">{product.rating}</span>
                <Stars rating={product.rating} size={18} />
              </div>
              <p className="mt-1 font-body text-xs text-black/45">Based on {product.reviewCount} reviews</p>
              <div className="mt-5 space-y-2">
                {ratingBuckets.map((b) => (
                  <div key={b.star} className="flex items-center gap-2">
                    <span className="w-10 font-body text-xs text-black/50">{b.star}★</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-border">
                      <div className="h-full rounded-full bg-gold" style={{ width: `${b.pct}%` }} />
                    </div>
                    <span className="w-8 text-right font-body text-xs text-black/40">{b.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {product.reviews.map((r) => (
                <div key={r.id} className="border-b border-surface-border pb-6 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-sm font-semibold">{r.customerName}</p>
                      {r.verifiedPurchase && (
                        <span className="flex items-center gap-1 font-body text-[11px] text-success">
                          <BadgeCheck size={12} /> Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="font-body text-xs text-black/40">{formatDate(r.date)}</span>
                  </div>
                  <Stars rating={r.rating} className="mt-1.5" />
                  <p className="mt-2 font-display text-sm font-semibold">{r.title}</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-black/60">{r.comment}</p>
                  <button className="mt-2 flex items-center gap-1.5 font-body text-xs text-black/40 hover:text-black/70">
                    <ThumbsUp size={12} /> Helpful ({r.helpfulCount})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
