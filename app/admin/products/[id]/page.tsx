"use client";

import { useParams } from "next/navigation";
import { useAdminStore } from "@/store/admin-store";
import ProductForm from "@/components/admin/product-form";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const products = useAdminStore((s) => s.products);
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <p className="font-body text-sm text-black/50">Product not found.</p>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Product</h1>
      <p className="mt-1 font-body text-sm text-black/50">{product.name}</p>
      <div className="mt-6 max-w-4xl">
        <ProductForm initial={product} />
      </div>
    </div>
  );
}
