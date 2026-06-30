"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, X, ShoppingBag, Tag } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore, getLineProduct, lineUnitPrice, computeOrderTotals } from "@/store/cart-store";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const couponCode = useCartStore((s) => s.couponCode);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const subtotal = useCartStore((s) => s.subtotal());

  const [promoInput, setPromoInput] = useState("");

  if (lines.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center gap-5 py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-bg">
          <ShoppingBag size={32} className="text-black/30" />
        </div>
        <h1 className="font-display text-2xl font-semibold">Your bag is empty</h1>
        <p className="font-body text-sm text-black/50">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className="btn-luxury-primary">Start Shopping</Link>
      </div>
    );
  }

  const totals = computeOrderTotals(subtotal, couponCode);

  function handlePromo() {
    const result = applyCoupon(promoInput);
    if (result.success) {
      toast.success(result.message);
      setPromoInput("");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Shopping Bag</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {lines.map((line) => {
            const product = getLineProduct(line.productId);
            if (!product) return null;
            const unit = lineUnitPrice(line, product);
            const mainImage = product.images.find((i) => i.isMain) ?? product.images[0];

            return (
              <div
                key={`${line.productId}-${line.selectedColor}-${line.selectedStrap}`}
                className="flex gap-4 rounded-luxury border border-surface-border bg-white p-4"
              >
                <Link href={`/product/${product.slug}`} className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-surface-bg sm:h-32 sm:w-28">
                  <Image src={mainImage.url} alt={mainImage.alt} fill className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/product/${product.slug}`} className="font-display text-base font-medium hover:text-gold-dark">
                        {product.name}
                      </Link>
                      <p className="mt-1 font-body text-xs text-black/45">
                        {line.selectedColor} {line.selectedStrap && `· ${line.selectedStrap} strap`}
                      </p>
                      <p className="mt-1 font-body text-sm font-semibold">{formatCurrency(unit)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(line.productId, line.selectedColor, line.selectedStrap)}
                      className="text-black/30 hover:text-error"
                      aria-label="Remove item"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-btn border border-surface-border">
                      <button
                        onClick={() => updateQuantity(line.productId, line.quantity - 1, line.selectedColor, line.selectedStrap)}
                        className="p-2"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center font-body text-sm">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.productId, line.quantity + 1, line.selectedColor, line.selectedStrap)}
                        className="p-2"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="font-display text-base font-semibold">{formatCurrency(unit * line.quantity)}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <Link href="/shop" className="inline-flex font-body text-sm font-semibold text-gold-dark hover:text-gold">
            ← Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-luxury border border-surface-border bg-white p-6">
          <h2 className="font-display text-lg font-semibold">Order Summary</h2>

          <div className="mt-4 flex gap-2">
            <input
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code (try WELCOME10)"
              className="input-luxury flex-1 !py-2.5 text-sm"
            />
            <button onClick={handlePromo} className="rounded-btn border border-luxury-black/15 px-3 hover:border-gold">
              <Tag size={16} />
            </button>
          </div>
          {couponCode && (
            <div className="mt-2 flex items-center justify-between rounded-lg bg-success/10 px-3 py-2">
              <span className="font-body text-xs font-semibold text-success">{couponCode} applied</span>
              <button onClick={() => { removeCoupon(); toast.success("Coupon removed"); }} className="text-xs text-success underline">
                Remove
              </button>
            </div>
          )}

          <div className="mt-5 space-y-2.5 border-t border-surface-border pt-5 font-body text-sm">
            <div className="flex justify-between text-black/60">
              <span>Subtotal</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-{formatCurrency(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-black/60">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <div className="flex justify-between text-black/60">
              <span>Estimated Tax</span>
              <span>{formatCurrency(totals.tax)}</span>
            </div>
            <div className="flex justify-between border-t border-surface-border pt-3 font-display text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>

          <button onClick={() => router.push("/checkout")} className="btn-luxury-primary mt-6 w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
