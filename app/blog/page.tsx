"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/misc";
import { formatDate } from "@/lib/format";

const CATEGORIES = ["All", "Horology", "Materials", "Care & Maintenance"];

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchSearch = !search.trim() || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  return (
    <div className="container py-14">
      <div className="text-center">
        <p className="eyebrow text-gold-dark">The Journal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">Horology, Craftsmanship &amp; Care</h1>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 font-body text-xs font-semibold ${
                category === c ? "border-gold bg-gold/10 text-gold-dark" : "border-surface-border text-black/55"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="input-luxury pl-9" />
        </div>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-luxury border border-surface-border bg-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="font-body text-[11px] uppercase tracking-luxe text-gold-dark">{post.category}</p>
              <h2 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-gold-dark">{post.title}</h2>
              <p className="mt-2 line-clamp-2 font-body text-sm text-black/55">{post.excerpt}</p>
              <p className="mt-3 font-body text-xs text-black/40">{post.author} · {formatDate(post.date)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
