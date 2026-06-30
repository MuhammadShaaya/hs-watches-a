import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/hero";
import CollectionsStrip from "@/components/home/collections-strip";
import PromoBanner from "@/components/home/promo-banner";
import Testimonials from "@/components/home/testimonials";
import InstagramGallery from "@/components/home/instagram-gallery";
import ProductGrid from "@/components/product/product-grid";
import SectionHeading from "@/components/ui/section-heading";
import { PRODUCTS } from "@/lib/data/products";

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.newArrival).slice(0, 4);
  const flashSale = PRODUCTS.filter((p) => p.salePrice).slice(0, 4);

  return (
    <>
      <Hero />
      <PromoBanner />

      <section className="bg-surface-bg py-20">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Curated Selection" title="Featured Timepieces" align="left" />
            <Link href="/shop" className="flex items-center gap-1.5 font-body text-sm font-semibold text-gold-dark hover:text-gold">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <CollectionsStrip />

      <section className="bg-surface-bg py-20">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Most Loved" title="Best Sellers" align="left" />
            <Link href="/shop?filter=bestseller" className="flex items-center gap-1.5 font-body text-sm font-semibold text-gold-dark hover:text-gold">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* Flash sale luxury banner */}
      <section className="relative overflow-hidden bg-black-sheen py-20">
        <div className="container relative z-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold">Limited Time</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Flash Sale — Up to 15% Off</h2>
              <p className="mt-3 font-body text-sm text-white/50">Offer ends when current stock sells through. No restocks at this price.</p>
            </div>
            <Link href="/shop?sale=true" className="btn-luxury-gold">
              Shop the Sale <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid products={flashSale} />
        </div>
      </section>

      <section className="bg-surface-bg py-20">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Just Landed" title="New Arrivals" align="left" />
            <Link href="/shop?filter=new" className="flex items-center gap-1.5 font-body text-sm font-semibold text-gold-dark hover:text-gold">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      <Testimonials />
      <InstagramGallery />
    </>
  );
}
