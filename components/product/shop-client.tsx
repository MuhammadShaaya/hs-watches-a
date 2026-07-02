"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Grid2x2, List, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "@/components/product/product-grid";
import FilterSidebar, { ShopFilters } from "@/components/product/filter-sidebar";
import ProductListRow from "@/components/product/product-list-row";
import { Product } from "@/types";

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadProducts() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setProducts(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadProducts();
}, []);

type SortKey = "newest" | "price-asc" | "price-desc" | "rating" | "popular";

const PAGE_SIZE = 12;

export default function ShopClient() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const [filters, setFilters] = useState<ShopFilters>({
    collections: [],
    genders: [],
    movements: [],
    materials: [],
    minPrice: 0,
    maxPrice: 40000,
    minRating: 0,
  });

  useEffect(() => {
    const collectionParam = searchParams.get("collection");
    if (collectionParam) {
      const label = collectionParam
        .split("-")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" ");
      setFilters((f) => ({ ...f, collections: [label] }));
    }
    const searchParam = searchParams.get("search");
    if (searchParam) setSearch(searchParam);
  }, [searchParams]);

  const filterPreset = searchParams.get("filter");
  const salePreset = searchParams.get("sale");

  const filtered = useMemo(() => {
    let list: Product[] = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.caseMaterial.toLowerCase().includes(q)
      );
    }

    if (filterPreset === "bestseller") list = list.filter((p) => p.bestSeller);
    if (filterPreset === "new") list = list.filter((p) => p.newArrival);
    if (salePreset === "true") list = list.filter((p) => p.salePrice);

    if (filters.collections.length) list = list.filter((p) => filters.collections.includes(p.collection));
    if (filters.genders.length) list = list.filter((p) => filters.genders.includes(p.gender));
    if (filters.movements.length) list = list.filter((p) => filters.movements.includes(p.movement));
    if (filters.materials.length) list = list.filter((p) => filters.materials.includes(p.caseMaterial));
    if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating);
    list = list.filter((p) => {
      const price = p.salePrice ?? p.price;
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [search, filters, sort, filterPreset, salePreset]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(0, page * PAGE_SIZE);

  if (loading) {
  return (
    <div className="container py-20 text-center">
      Loading watches...
    </div>
  );
}
  
  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">All Watches</h1>
        <p className="font-body text-sm text-black/50">{filtered.length} timepieces found</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, material, collection..."
            className="input-luxury max-w-xs"
          />
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-btn border border-surface-border px-4 py-3 font-body text-sm lg:hidden"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="input-luxury !w-auto !py-2.5"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
          <div className="flex rounded-btn border border-surface-border">
            <button
              onClick={() => setView("grid")}
              className={`p-2.5 ${view === "grid" ? "bg-luxury-black text-white" : "text-black/50"}`}
              aria-label="Grid view"
            >
              <Grid2x2 size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2.5 ${view === "list" ? "bg-luxury-black text-white" : "text-black/50"}`}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        <div className="flex-1">
          {view === "grid" ? (
            <ProductGrid products={pageItems} />
          ) : (
            <div className="flex flex-col gap-4">
              {pageItems.map((p) => (
                <ProductListRow key={p.id} product={p} />
              ))}
            </div>
          )}

          {page < totalPages && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setPage((p) => p + 1)} className="btn-luxury-outline">
                Load More Watches
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] bg-black/50 lg:hidden" onClick={() => setMobileFiltersOpen(false)}>
          <div
            className="absolute inset-y-0 left-0 w-80 overflow-y-auto bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex justify-end">
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
}
