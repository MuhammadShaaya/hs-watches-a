import { Suspense } from "react";
import CheckoutSuccessClient from "@/components/checkout/checkout-success-client";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container py-32 text-center font-body text-black/40">Loading...</div>}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
