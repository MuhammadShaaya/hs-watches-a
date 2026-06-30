"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Truck } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore, getLineProduct, lineUnitPrice, computeOrderTotals } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency, generateOrderId } from "@/lib/format";
import { Order, OrderItem } from "@/types";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  street: z.string().min(4, "Street address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "State / province is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const couponCode = useCartStore((s) => s.couponCode);
  const clearCart = useCartStore((s) => s.clearCart);
  const currentUser = useAuthStore((s) => s.currentUser);

  const [placing, setPlacing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: currentUser
      ? {
          fullName: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone ?? "",
          street: currentUser.addresses[0]?.street ?? "",
          city: currentUser.addresses[0]?.city ?? "",
          province: currentUser.addresses[0]?.province ?? "",
          postalCode: currentUser.addresses[0]?.postalCode ?? "",
        }
      : undefined,
  });

  if (lines.length === 0) {
    return (
      <div className="container flex flex-col items-center gap-4 py-32 text-center">
        <h1 className="font-display text-2xl font-semibold">Your bag is empty</h1>
        <p className="font-body text-sm text-black/50">Add a watch to your bag before checking out.</p>
        <a href="/shop" className="btn-luxury-primary">Shop Now</a>
      </div>
    );
  }

  const totals = computeOrderTotals(subtotal, couponCode);

  function onSubmit(values: FormValues) {
    setPlacing(true);

    const items: OrderItem[] = lines
      .map((line) => {
        const product = getLineProduct(line.productId);
        if (!product) return null;
        const mainImage = product.images.find((i) => i.isMain) ?? product.images[0];
        return {
          productId: product.id,
          name: product.name,
          image: mainImage.url,
          unitPrice: lineUnitPrice(line, product),
          quantity: line.quantity,
          selectedColor: line.selectedColor,
          selectedStrap: line.selectedStrap,
        } as OrderItem;
      })
      .filter((i): i is OrderItem => !!i);

    const orderId = generateOrderId();
    const now = new Date().toISOString();
    const estDelivery = new Date(Date.now() + 5 * 86400000).toISOString();

    const order: Order = {
      id: orderId,
      userId: currentUser?.id ?? "guest",
      items,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
      status: "Pending",
      paymentMethod: "COD",
      shippingAddress: {
        id: `addr-${Date.now()}`,
        fullName: values.fullName,
        phone: values.phone,
        street: values.street,
        city: values.city,
        province: values.province,
        postalCode: values.postalCode,
        country: "United States",
        isDefault: false,
      },
      orderNotes: values.notes,
      estimatedDelivery: estDelivery,
      createdAt: now,
      updatedAt: now,
      timeline: [{ status: "Pending", date: now }],
    };

    // Persist order to local admin store (in lieu of a live API call)
    try {
      const raw = localStorage.getItem("hs-watches-admin");
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.state.orders = [order, ...(parsed.state.orders ?? [])];
        localStorage.setItem("hs-watches-admin", JSON.stringify(parsed));
      }
    } catch {
      // non-fatal — order still confirmed for this session
    }

    setTimeout(() => {
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/checkout/success?order=${orderId}`);
    }, 600);
  }

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="rounded-luxury border border-surface-border bg-white p-6">
            <h2 className="font-display text-lg font-semibold">Shipping Information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="font-body text-xs font-semibold">Full Name</label>
                <input {...register("fullName")} className="input-luxury mt-1.5" placeholder="Jane Appleseed" />
                {errors.fullName && <p className="mt-1 font-body text-xs text-error">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="font-body text-xs font-semibold">Email</label>
                <input {...register("email")} className="input-luxury mt-1.5" placeholder="jane@example.com" />
                {errors.email && <p className="mt-1 font-body text-xs text-error">{errors.email.message}</p>}
              </div>
              <div>
                <label className="font-body text-xs font-semibold">Phone</label>
                <input {...register("phone")} className="input-luxury mt-1.5" placeholder="+1 (555) 123-4567" />
                {errors.phone && <p className="mt-1 font-body text-xs text-error">{errors.phone.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="font-body text-xs font-semibold">Street Address</label>
                <input {...register("street")} className="input-luxury mt-1.5" placeholder="123 Fifth Avenue, Apt 4" />
                {errors.street && <p className="mt-1 font-body text-xs text-error">{errors.street.message}</p>}
              </div>
              <div>
                <label className="font-body text-xs font-semibold">City</label>
                <input {...register("city")} className="input-luxury mt-1.5" placeholder="New York" />
                {errors.city && <p className="mt-1 font-body text-xs text-error">{errors.city.message}</p>}
              </div>
              <div>
                <label className="font-body text-xs font-semibold">State / Province</label>
                <input {...register("province")} className="input-luxury mt-1.5" placeholder="NY" />
                {errors.province && <p className="mt-1 font-body text-xs text-error">{errors.province.message}</p>}
              </div>
              <div>
                <label className="font-body text-xs font-semibold">Postal Code</label>
                <input {...register("postalCode")} className="input-luxury mt-1.5" placeholder="10010" />
                {errors.postalCode && <p className="mt-1 font-body text-xs text-error">{errors.postalCode.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="font-body text-xs font-semibold">Order Notes (optional)</label>
                <textarea {...register("notes")} className="input-luxury mt-1.5" rows={3} placeholder="Delivery instructions, gift message, etc." />
              </div>
            </div>
          </section>

          <section className="rounded-luxury border border-surface-border bg-white p-6">
            <h2 className="font-display text-lg font-semibold">Payment Method</h2>
            <div className="mt-4 flex items-center gap-3 rounded-btn border-2 border-gold bg-gold/5 p-4">
              <input type="radio" checked readOnly className="accent-gold-dark" />
              <div className="flex-1">
                <p className="font-body text-sm font-semibold">Cash on Delivery (COD)</p>
                <p className="font-body text-xs text-black/50">Pay in cash when your order arrives. No card details required.</p>
              </div>
              <Truck size={20} className="text-gold-dark" />
            </div>
            <p className="mt-3 flex items-center gap-1.5 font-body text-xs text-black/40">
              <Lock size={12} /> Your information is encrypted and used only to fulfill this order.
            </p>
          </section>
        </div>

        {/* Order summary sidebar */}
        <div className="h-fit space-y-5 rounded-luxury border border-surface-border bg-white p-6">
          <h2 className="font-display text-lg font-semibold">Order Summary</h2>
          <div className="space-y-3">
            {lines.map((line) => {
              const product = getLineProduct(line.productId);
              if (!product) return null;
              const mainImage = product.images.find((i) => i.isMain) ?? product.images[0];
              return (
                <div key={`${line.productId}-${line.selectedColor}`} className="flex gap-3">
                  <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-surface-bg">
                    <Image src={mainImage.url} alt={product.name} fill className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-luxury-black text-[10px] text-white">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-xs font-semibold leading-tight">{product.name}</p>
                    <p className="font-body text-[11px] text-black/45">{line.selectedColor}</p>
                  </div>
                  <p className="font-body text-xs font-semibold">{formatCurrency(lineUnitPrice(line, product) * line.quantity)}</p>
                </div>
              );
            })}
          </div>
          <div className="space-y-2 border-t border-surface-border pt-4 font-body text-sm">
            <div className="flex justify-between text-black/60"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
            {totals.discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatCurrency(totals.discount)}</span></div>}
            <div className="flex justify-between text-black/60"><span>Shipping</span><span className="text-success">Free</span></div>
            <div className="flex justify-between text-black/60"><span>Tax</span><span>{formatCurrency(totals.tax)}</span></div>
            <div className="flex justify-between border-t border-surface-border pt-3 font-display text-lg font-semibold"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
          </div>
          <button type="submit" disabled={placing} className="btn-luxury-primary w-full">
            {placing ? "Placing Order..." : "Confirm & Place Order"}
          </button>
          <p className="text-center font-body text-[11px] text-black/40">Estimated delivery: 3-5 business days</p>
        </div>
      </form>
    </div>
  );
}
