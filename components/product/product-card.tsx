"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Scale, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { formatCurrency, discountPercent } from "@/lib/format";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import Stars from "@/components/ui/stars";
import { cn } from "@/lib/utils";

export default function ProductCard({ product, className }: { product: Product; className?: string }) {
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isComparing = useCompareStore((s) => s.isComparing(product.id));
  const toggleCompare = useCompareStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);

  const mainImage = product.images.find((i) => i.isMain) ?? product.images[0];
  const discount = discountPercent(product.price, product.salePrice);
  const outOfStock = product.stock === 0;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem({
      productId: product.id,
      quantity: 1,
      selectedColor: product.colorOptions[0]?.label,
      selectedStrap: product.strapOptions[0]?.label,
    });
    toast.success(`${product.name} added to bag`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  }

  function handleCompare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
    toast.success(isComparing ? "Removed from comparison" : "Added to comparison");
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-luxury border border-surface-border bg-white transition-all duration-300 ease-luxe hover:-translate-y-1 hover:shadow-luxury",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-bg">
        <Image
          src={mainImage.url}
          alt={mainImage.alt}
          fill
          className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-error px-2.5 py-1 font-body text-[10px] font-bold tracking-wide text-white">
              -{discount}%
            </span>
          )}
          {product.newArrival && (
            <span className="rounded-full bg-luxury-black px-2.5 py-1 font-body text-[10px] font-bold tracking-wide text-gold">
              NEW
            </span>
          )}
          {product.collection === "Limited Edition" && (
            <span className="rounded-full bg-gold-gradient-soft px-2.5 py-1 font-body text-[10px] font-bold tracking-wide text-luxury-black">
              LIMITED
            </span>
          )}
        </div>

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/55">
            <span className="rounded-full border border-white/40 px-4 py-1.5 font-body text-xs font-semibold tracking-wide text-white">
              OUT OF STOCK
            </span>
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={handleWishlist}
            aria-label="Add to wishlist"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-luxury-sm transition hover:bg-gold hover:text-white",
              isWishlisted && "bg-gold text-white"
            )}
          >
            <Heart size={15} className={isWishlisted ? "fill-current" : ""} />
          </button>
          <button
            onClick={handleCompare}
            aria-label="Compare"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-luxury-sm transition hover:bg-gold hover:text-white",
              isComparing && "bg-gold text-white"
            )}
          >
            <Scale size={15} />
          </button>
          <Link
            href={`/product/${product.slug}`}
            aria-label="Quick view"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-luxury-sm transition hover:bg-gold hover:text-white"
          >
            <Eye size={15} />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <p className="font-body text-[11px] uppercase tracking-luxe text-black/40">{product.collection}</p>
        <h3 className="mt-1 line-clamp-2 font-display text-base font-medium leading-snug text-luxury-black">
          {product.name}
        </h3>
        <div className="mt-2">
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-luxury-black">
            {formatCurrency(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="font-body text-sm text-black/35 line-through">{formatCurrency(product.price)}</span>
          )}
        </div>
        <button
          onClick={handleQuickAdd}
          disabled={outOfStock}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-btn border border-luxury-black/15 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-luxury-black transition-all duration-300 hover:border-gold hover:bg-luxury-black hover:text-white disabled:opacity-40"
        >
          <ShoppingBag size={14} />
          {outOfStock ? "Unavailable" : "Add to Bag"}
        </button>
      </div>
    </Link>
  );
}
