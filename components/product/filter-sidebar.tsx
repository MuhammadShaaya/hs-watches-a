"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterGroup({ title, children, defaultOpen = true }: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-surface-border py-5">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between">
        <span className="font-display text-sm font-semibold">{title}</span>
        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="mt-4 space-y-2.5">{children}</div>}
    </div>
  );
}

export interface ShopFilters {
  collections: string[];
  genders: string[];
  movements: string[];
  materials: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

const COLLECTIONS = ["Classic", "Sport", "Chronograph", "Smart Luxury", "Limited Edition"];
const GENDERS = ["Men", "Women", "Unisex"];
const MOVEMENTS = ["Automatic", "Quartz", "Manual Wind", "Smart"];
const MATERIALS = ["Stainless Steel", "Titanium", "Rose Gold", "Yellow Gold", "Ceramic"];

export default function FilterSidebar({
  filters,
  setFilters,
}: {
  filters: ShopFilters;
  setFilters: (f: ShopFilters) => void;
}) {
  function toggleArrayValue(key: "collections" | "genders" | "movements" | "materials", value: string) {
    const current = filters[key];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setFilters({ ...filters, [key]: next });
  }

  function reset() {
    setFilters({ collections: [], genders: [], movements: [], materials: [], minPrice: 0, maxPrice: 40000, minRating: 0 });
  }

  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0">
      <div className="flex items-center justify-between pb-4">
        <p className="font-display text-lg font-semibold">Filters</p>
        <button onClick={reset} className="font-body text-xs font-semibold text-gold-dark hover:text-gold">
          Clear all
        </button>
      </div>

      <FilterGroup title="Collection">
        {COLLECTIONS.map((c) => (
          <label key={c} className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={filters.collections.includes(c)}
              onChange={() => toggleArrayValue("collections", c)}
              className="h-4 w-4 rounded border-surface-border accent-gold-dark"
            />
            <span className="font-body text-sm text-black/70">{c}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Price Range">
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
            className="input-luxury !py-2 text-xs"
            placeholder="Min"
          />
          <span className="text-black/30">—</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="input-luxury !py-2 text-xs"
            placeholder="Max"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Gender">
        {GENDERS.map((g) => (
          <label key={g} className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={filters.genders.includes(g)}
              onChange={() => toggleArrayValue("genders", g)}
              className="h-4 w-4 rounded border-surface-border accent-gold-dark"
            />
            <span className="font-body text-sm text-black/70">{g}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Movement" defaultOpen={false}>
        {MOVEMENTS.map((m) => (
          <label key={m} className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={filters.movements.includes(m)}
              onChange={() => toggleArrayValue("movements", m)}
              className="h-4 w-4 rounded border-surface-border accent-gold-dark"
            />
            <span className="font-body text-sm text-black/70">{m}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Case Material" defaultOpen={false}>
        {MATERIALS.map((m) => (
          <label key={m} className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={filters.materials.includes(m)}
              onChange={() => toggleArrayValue("materials", m)}
              className="h-4 w-4 rounded border-surface-border accent-gold-dark"
            />
            <span className="font-body text-sm text-black/70">{m}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Rating" defaultOpen={false}>
        {[4, 3, 2].map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-2.5">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === r}
              onChange={() => setFilters({ ...filters, minRating: r })}
              className="h-4 w-4 accent-gold-dark"
            />
            <span className="font-body text-sm text-black/70">{r}★ &amp; up</span>
          </label>
        ))}
      </FilterGroup>
    </aside>
  );
}
