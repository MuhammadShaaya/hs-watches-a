import { Truck, Info } from "lucide-react";
import AccountLayout from "@/components/account/account-layout";

export default function PaymentMethodsPage() {
  return (
    <AccountLayout>
      <h1 className="font-display text-2xl font-semibold">Payment Methods</h1>
      <p className="mt-1 font-body text-sm text-black/50">H&amp;S Watches currently supports Cash on Delivery only.</p>

      <div className="mt-6 flex items-center gap-4 rounded-luxury border-2 border-gold bg-gold/5 p-6">
        <Truck size={28} className="text-gold-dark" />
        <div>
          <p className="font-display text-base font-semibold">Cash on Delivery (COD)</p>
          <p className="mt-1 font-body text-sm text-black/55">Pay in cash at your doorstep when your order is delivered.</p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-luxury border border-surface-border bg-surface-bg p-4">
        <Info size={16} className="mt-0.5 flex-shrink-0 text-black/40" />
        <p className="font-body text-xs text-black/55">
          We do not currently store or process card payments. All orders are confirmed via Cash on Delivery to keep checkout simple and secure.
        </p>
      </div>
    </AccountLayout>
  );
}
