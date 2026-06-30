"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { getProductById } from "@/lib/data/products";
import { formatCurrency } from "@/lib/format";
import { Product } from "@/types";
import Stars from "@/components/ui/stars";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const remove = useWishlistStore((s) => s.remove);
  const addItem = useCartStore((s) => s.addItem);

  const products = productIds.map(getProductById).filter((p): p is Product => !!p);

  if (products.length === 0) {
    return (
      <div className="container flex flex-col items-center gap-4 py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-bg">
          <Heart size={32} className="text-black/30" />
        </div>
        <h1 className="font-display text-2xl font-semibold">Your wishlist is empty</h1>
        <p className="font-body text-sm text-black/50">Save the watches you love and come back to them anytime.</p>
        <Link href="/shop" className="btn-luxury-primary">Browse Watches</Link>
      </div>
    );
  }

  function handleMoveToCart(product: Product) {
    addItem({ productId: product.id, quantity: 1, selectedColor: product.colorOptions[0]?.label, selectedStrap: product.strapOptions[0]?.label });
    remove(product.id);
    toast.success(`${product.name} moved to bag`);
  }

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">My Wishlist</h1>
      <p className="mt-1 font-body text-sm text-black/50">{products.length} saved item(s)</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const mainImage = product.images.find((i) => i.isMain) ?? product.images[0];
          return (
            <div key={product.id} className="relative flex gap-4 rounded-luxury border border-surface-border bg-white p-4">
              <button onClick={() => { remove(product.id); toast.success("Removed from wishlist"); }} className="absolute right-3 top-3 text-black/30 hover:text-error">
                <X size={16} />
              </button>
              <Link href={`/product/${product.slug}`} className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-surface-bg">
                <Image src={mainImage.url} alt={mainImage.alt} fill className="object-cover" />
              </Link>
              <div className="flex-1">
                <Link href={`/product/${product.slug}`} className="font-display text-sm font-medium hover:text-gold-dark">{product.name}</Link>
                <div className="mt-1"><Stars rating={product.rating} size={12} /></div>
                <p className="mt-1 font-display text-base font-semibold">{formatCurrency(product.salePrice ?? product.price)}</p>
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="mt-2 flex items-center gap-1.5 rounded-btn border border-luxury-black/15 px-3 py-1.5 font-body text-xs font-semibold hover:border-gold hover:bg-luxury-black hover:text-white"
                >
                  <ShoppingBag size={12} /> Move to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
