"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import Stars from "@/components/ui/stars";

export default function ProductListRow({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const mainImage = product.images.find((i) => i.isMain) ?? product.images[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex gap-5 rounded-luxury border border-surface-border bg-white p-4 transition hover:shadow-luxury-sm sm:p-5"
    >
      <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-surface-bg sm:h-40 sm:w-32">
        <Image src={mainImage.url} alt={mainImage.alt} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="font-body text-[11px] uppercase tracking-luxe text-black/40">{product.collection}</p>
          <h3 className="mt-1 font-display text-lg font-medium">{product.name}</h3>
          <p className="mt-1 line-clamp-2 font-body text-sm text-black/55">{product.shortDescription}</p>
          <div className="mt-2"><Stars rating={product.rating} count={product.reviewCount} /></div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold">{formatCurrency(product.salePrice ?? product.price)}</span>
            {product.salePrice && <span className="font-body text-sm text-black/35 line-through">{formatCurrency(product.price)}</span>}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({ productId: product.id, quantity: 1, selectedColor: product.colorOptions[0]?.label, selectedStrap: product.strapOptions[0]?.label });
              toast.success(`${product.name} added to bag`);
            }}
            className="rounded-btn border border-luxury-black/15 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide hover:border-gold hover:bg-luxury-black hover:text-white"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </Link>
  );
}
