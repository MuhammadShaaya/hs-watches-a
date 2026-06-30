import { Product } from "@/types";
import ProductCard from "./product-card";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-luxury border border-dashed border-surface-border py-20 text-center">
        <p className="font-display text-xl text-black/60">No watches match these filters</p>
        <p className="mt-2 font-body text-sm text-black/40">Try adjusting your search or filters</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
