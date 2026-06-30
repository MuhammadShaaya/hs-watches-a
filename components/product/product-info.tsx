"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Scale, Share2, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { formatCurrency, discountPercent } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore, useCompareStore } from "@/store/wishlist-store";
import Stars from "@/components/ui/stars";
import { cn } from "@/lib/utils";

export default function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const [color, setColor] = useState(product.colorOptions[0]?.label);
  const [strap, setStrap] = useState(product.strapOptions[0]?.label);
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isComparing = useCompareStore((s) => s.isComparing(product.id));
  const toggleCompare = useCompareStore((s) => s.toggle);

  const discount = discountPercent(product.price, product.salePrice);
  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const strapDelta = product.strapOptions.find((s) => s.label === strap)?.priceDelta ?? 0;
  const unitPrice = (product.salePrice ?? product.price) + strapDelta;

  function handleAddToCart() {
    addItem({ productId: product.id, quantity: qty, selectedColor: color, selectedStrap: strap });
    toast.success(`${qty} × ${product.name} added to bag`);
  }

  function handleBuyNow() {
    addItem({ productId: product.id, quantity: qty, selectedColor: color, selectedStrap: strap });
    router.push("/checkout");
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard");
    }
  }

  return (
    <div>
      <p className="font-body text-xs uppercase tracking-luxe text-black/40">
        {product.collection} &nbsp;/&nbsp; {product.gender}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">{product.name}</h1>

      <div className="mt-3 flex items-center gap-3">
        <Stars rating={product.rating} count={product.reviewCount} size={16} />
        <span className="font-body text-xs text-black/40">SKU: {product.sku}</span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-3xl font-bold">{formatCurrency(unitPrice)}</span>
        {product.salePrice && (
          <>
            <span className="font-body text-lg text-black/35 line-through">{formatCurrency(product.price + strapDelta)}</span>
            <span className="rounded-full bg-error/10 px-2.5 py-1 font-body text-xs font-bold text-error">{discount}% OFF</span>
          </>
        )}
      </div>

      <p className="mt-5 font-body text-sm leading-relaxed text-black/65">{product.shortDescription}</p>

      <div className="mt-5">
        {outOfStock ? (
          <p className="font-body text-sm font-semibold text-error">Out of Stock</p>
        ) : lowStock ? (
          <p className="font-body text-sm font-semibold text-amber-600">Only {product.stock} left in stock — order soon</p>
        ) : (
          <p className="font-body text-sm font-semibold text-success">In Stock: {product.stock} units available</p>
        )}
      </div>

      {/* Color selector */}
      <div className="mt-6">
        <p className="font-body text-sm font-semibold">Color: <span className="font-normal text-black/60">{color}</span></p>
        <div className="mt-2.5 flex gap-2.5">
          {product.colorOptions.map((c) => (
            <button
              key={c.id}
              onClick={() => setColor(c.label)}
              className={cn(
                "h-9 w-9 rounded-full border-2 transition",
                color === c.label ? "border-gold scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: c.hex }}
              aria-label={c.label}
              title={c.label}
            />
          ))}
        </div>
      </div>

      {/* Strap selector */}
      <div className="mt-5">
        <p className="font-body text-sm font-semibold">Strap</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {product.strapOptions.map((s) => (
            <button
              key={s.id}
              onClick={() => setStrap(s.label)}
              className={cn(
                "rounded-full border px-4 py-2 font-body text-xs font-medium transition",
                strap === s.label ? "border-gold bg-gold/10 text-gold-dark" : "border-surface-border text-black/60 hover:border-black/30"
              )}
            >
              {s.label} {s.priceDelta ? `(+${formatCurrency(s.priceDelta)})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Case size (informational) */}
      <div className="mt-5">
        <p className="font-body text-sm font-semibold">Case Size: <span className="font-normal text-black/60">{product.caseSize}</span></p>
      </div>

      {/* Quantity + actions */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-btn border border-surface-border">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3" aria-label="Decrease quantity">
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-body text-sm font-semibold">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="p-3" aria-label="Increase quantity">
            <Plus size={14} />
          </button>
        </div>
        <button onClick={handleAddToCart} disabled={outOfStock} className="btn-luxury-primary flex-1 sm:flex-none">
          Add to Bag
        </button>
        <button onClick={handleBuyNow} disabled={outOfStock} className="btn-luxury-gold flex-1 sm:flex-none">
          Buy Now
        </button>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <button
          onClick={() => {
            toggleWishlist(product.id);
            toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="flex items-center gap-1.5 font-body text-sm text-black/60 hover:text-gold-dark"
        >
          <Heart size={16} className={isWishlisted ? "fill-gold text-gold" : ""} /> Wishlist
        </button>
        <button
          onClick={() => {
            toggleCompare(product.id);
            toast.success(isComparing ? "Removed from comparison" : "Added to comparison");
          }}
          className="flex items-center gap-1.5 font-body text-sm text-black/60 hover:text-gold-dark"
        >
          <Scale size={16} /> Compare
        </button>
        <button onClick={handleShare} className="flex items-center gap-1.5 font-body text-sm text-black/60 hover:text-gold-dark">
          <Share2 size={16} /> Share
        </button>
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {product.tags.map((t) => (
          <span key={t} className="rounded-full bg-surface-bg px-3 py-1 font-body text-[11px] capitalize text-black/50">
            {t}
          </span>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-8 grid grid-cols-3 gap-3 border-t border-surface-border pt-6">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Truck size={18} className="text-gold" />
          <span className="font-body text-[11px] text-black/55">Free Shipping</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <ShieldCheck size={18} className="text-gold" />
          <span className="font-body text-[11px] text-black/55">{product.warranty}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <RotateCcw size={18} className="text-gold" />
          <span className="font-body text-[11px] text-black/55">30-Day Returns</span>
        </div>
      </div>
    </div>
  );
}
