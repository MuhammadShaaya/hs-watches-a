import ProductForm from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Add New Product</h1>
      <p className="mt-1 font-body text-sm text-black/50">Create a new watch listing with unlimited images.</p>
      <div className="mt-6 max-w-4xl">
        <ProductForm />
      </div>
    </div>
  );
}
