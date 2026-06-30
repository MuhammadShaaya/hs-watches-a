"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";
import { SITE_SETTINGS } from "@/lib/data/misc";

const COLLECTIONS = [
  { name: "Classic", slug: "classic", desc: "Timeless dress watches for every occasion" },
  { name: "Sport", slug: "sport", desc: "Built for movement, rated for the elements" },
  { name: "Chronograph", slug: "chronograph", desc: "Precision stopwatch complications" },
  { name: "Smart Luxury", slug: "smart-luxury", desc: "Hybrid intelligence, traditional craft" },
  { name: "Limited Edition", slug: "limited-edition", desc: "Rare pieces, individually numbered" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const currentUser = useAuthStore((s) => s.currentUser);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) return null;

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-luxury-black/95 backdrop-blur-md shadow-luxury-sm" : "bg-luxury-black"
      )}
    >
      {/* Top announcement strip */}
      <div className="hidden border-b border-white/10 bg-black md:block">
        <div className="container flex h-9 items-center justify-center">
          <p className="font-body text-xs tracking-luxe text-gold/90">
            COMPLIMENTARY WORLDWIDE SHIPPING &nbsp;•&nbsp; CASH ON DELIVERY AVAILABLE &nbsp;•&nbsp; LIFETIME AUTHENTICATION GUARANTEE
          </p>
        </div>
      </div>

      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex flex-shrink-0 items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-wide text-white">
            H&amp;S
          </span>
          <span className="hidden font-display text-2xl font-light tracking-[0.3em] text-gold sm:inline">
            WATCHES
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="font-body text-sm font-medium tracking-wide text-white/90 transition hover:text-gold">
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button className="flex items-center gap-1 font-body text-sm font-medium tracking-wide text-white/90 transition hover:text-gold">
              Collections <ChevronDown size={14} />
            </button>
            {megaOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4">
                <div className="grid grid-cols-2 gap-1 rounded-luxury border border-white/10 bg-luxury-black p-4 shadow-luxury-lg">
                  {COLLECTIONS.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop?collection=${c.slug}`}
                      className="rounded-xl p-3 transition hover:bg-white/5"
                    >
                      <p className="font-display text-base text-white">{c.name}</p>
                      <p className="mt-1 font-body text-xs text-white/50">{c.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/shop" className="font-body text-sm font-medium tracking-wide text-white/90 transition hover:text-gold">
            Shop All
          </Link>
          <Link href="/about" className="font-body text-sm font-medium tracking-wide text-white/90 transition hover:text-gold">
            About
          </Link>
          <Link href="/blog" className="font-body text-sm font-medium tracking-wide text-white/90 transition hover:text-gold">
            Journal
          </Link>
          <Link href="/contact" className="font-body text-sm font-medium tracking-wide text-white/90 transition hover:text-gold">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-white/90 transition hover:text-gold"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <Link href="/wishlist" className="relative text-white/90 transition hover:text-gold" aria-label="Wishlist">
            <Heart size={20} />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-luxury-black">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative text-white/90 transition hover:text-gold" aria-label="Cart">
            <ShoppingBag size={20} />
            {mounted && itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-luxury-black">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href={currentUser ? "/account" : "/login"}
            className="hidden text-white/90 transition hover:text-gold sm:block"
            aria-label="Account"
          >
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full border-t border-white/10 bg-luxury-black/98 backdrop-blur-md">
          <div className="container py-6">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-4">
              <Search size={20} className="text-gold" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search watches, collections, materials..."
                className="flex-1 bg-transparent font-display text-xl text-white placeholder:text-white/30 focus:outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-white/60 hover:text-white">
                <X size={22} />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="font-body text-xs text-white/40">Trending:</span>
              {["Chronograph", "Diver", "Limited Edition", "GMT"].map((t) => (
                <button
                  key={t}
                  onClick={() => router.push(`/shop?search=${t}`)}
                  className="rounded-full border border-white/10 px-3 py-1 font-body text-xs text-white/70 hover:border-gold hover:text-gold"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-luxury-black md:hidden">
          <div className="container flex h-20 items-center justify-between">
            <Link href="/" className="font-display text-2xl font-bold text-white">
              H&amp;S
            </Link>
            <button onClick={() => setMobileOpen(false)} className="text-white" aria-label="Close menu">
              <X size={26} />
            </button>
          </div>
          <nav className="container mt-4 flex flex-col gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop All" },
              ...COLLECTIONS.map((c) => ({ href: `/shop?collection=${c.slug}`, label: c.name })),
              { href: "/about", label: "About" },
              { href: "/blog", label: "Journal" },
              { href: "/contact", label: "Contact" },
              { href: currentUser ? "/account" : "/login", label: currentUser ? "My Account" : "Login / Sign Up" },
            ].map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="border-b border-white/10 py-4 font-display text-xl text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="container mt-6 font-body text-xs tracking-luxe text-gold/70">
            {SITE_SETTINGS.tagline.toUpperCase()}
          </p>
        </div>
      )}
    </header>
  );
}
