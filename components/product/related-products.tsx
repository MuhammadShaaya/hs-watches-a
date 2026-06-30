"use client";

import { Product } from "@/types";
import { useRecentlyViewedStore } from "@/store/wishlist-store";
import { getProductById } from "@/lib/data/products";
import ProductCard from "./product-card";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-semibold">You May Also Like</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const ids = useRecentlyViewedStore((s) => s.productIds);
  const products = ids.map(getProductById).filter((p): p is Product => !!p && p.id !== excludeId).slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-semibold">Recently Viewed</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
