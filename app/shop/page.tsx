import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/product/shop-client";

export const metadata: Metadata = {
  title: "Shop All Watches",
  description: "Browse the full H&S Watches collection — automatic chronographs, divers, dress watches, and limited editions.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center font-body text-black/40">Loading collection...</div>}>
      <ShopClient />
    </Suspense>
  );
}
