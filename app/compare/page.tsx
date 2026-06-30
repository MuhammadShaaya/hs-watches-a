"use client";

import Link from "next/link";
import Image from "next/image";
import { Scale, X } from "lucide-react";
import { useCompareStore } from "@/store/wishlist-store";
import { getProductById } from "@/lib/data/products";
import { formatCurrency } from "@/lib/format";
import { Product } from "@/types";
import Stars from "@/components/ui/stars";

const SPEC_ROWS: { label: string; get: (p: Product) => string }[] = [
  { label: "Price", get: (p) => formatCurrency(p.salePrice ?? p.price) },
  { label: "Collection", get: (p) => p.collection },
  { label: "Movement", get: (p) => p.movement },
  { label: "Case Material", get: (p) => p.caseMaterial },
  { label: "Case Size", get: (p) => p.caseSize },
  { label: "Water Resistance", get: (p) => p.specifications.find((s) => s.label === "Water Resistance")?.value ?? "—" },
  { label: "Power Reserve", get: (p) => p.specifications.find((s) => s.label === "Power Reserve")?.value ?? "—" },
  { label: "Warranty", get: (p) => p.warranty },
  { label: "Rating", get: (p) => `${p.rating} (${p.reviewCount})` },
];

export default function ComparePage() {
  const productIds = useCompareStore((s) => s.productIds);
  const toggle = useCompareStore((s) => s.toggle);
  const products = productIds.map(getProductById).filter((p): p is Product => !!p);

  if (products.length === 0) {
    return (
      <div className="container flex flex-col items-center gap-4 py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-bg">
          <Scale size={32} className="text-black/30" />
        </div>
        <h1 className="font-display text-2xl font-semibold">No watches to compare</h1>
        <p className="font-body text-sm text-black/50">Add up to 4 watches from the shop to compare specifications side by side.</p>
        <Link href="/shop" className="btn-luxury-primary">Browse Watches</Link>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Compare Watches</h1>
      <p className="mt-1 font-body text-sm text-black/50">{products.length} of 4 watches selected</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr>
              <th className="w-40"></th>
              {products.map((p) => {
                const mainImage = p.images.find((i) => i.isMain) ?? p.images[0];
                return (
                  <th key={p.id} className="px-4 pb-4 text-left">
                    <div className="relative">
                      <button onClick={() => toggle(p.id)} className="absolute -right-1 -top-1 z-10 rounded-full bg-white p-1 shadow-luxury-sm">
                        <X size={14} />
                      </button>
                      <Link href={`/product/${p.slug}`}>
                        <div className="relative aspect-square w-32 overflow-hidden rounded-luxury bg-surface-bg">
                          <Image src={mainImage.url} alt={mainImage.alt} fill className="object-cover" />
                        </div>
                        <p className="mt-2 font-display text-sm font-medium">{p.name}</p>
                        <Stars rating={p.rating} size={12} className="mt-1" />
                      </Link>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {SPEC_ROWS.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-surface-bg" : ""}>
                <td className="px-4 py-3 font-body text-xs font-semibold text-black/55">{row.label}</td>
                {products.map((p) => (
                  <td key={p.id} className="px-4 py-3 font-body text-sm">{row.get(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
