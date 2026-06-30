import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, PRODUCTS } from "@/lib/data/products";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ProductGallery from "@/components/product/product-gallery";
import ProductInfo from "@/components/product/product-info";
import ProductTabs from "@/components/product/product-tabs";
import { RelatedProducts, RecentlyViewed } from "@/components/product/related-products";
import TrackRecentlyViewed from "@/components/product/track-recently-viewed";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.seoKeywords,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="container py-8">
      <TrackRecentlyViewed productId={product.id} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: product.collection, href: `/shop?collection=${product.collection.toLowerCase().replace(/\s+/g, "-")}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />
      <RelatedProducts products={related} />
      <RecentlyViewed excludeId={product.id} />
    </div>
  );
}
