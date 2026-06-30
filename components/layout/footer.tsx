"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { SITE_SETTINGS } from "@/lib/data/misc";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  if (pathname?.startsWith("/admin")) return null;

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're on the list. Welcome to the inner circle.");
    setEmail("");
  }

  return (
    <footer className="bg-luxury-black text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="container flex flex-col items-center gap-6 py-16 text-center">
          <p className="eyebrow text-gold">Join the inner circle</p>
          <h3 className="font-display text-3xl font-semibold sm:text-4xl">
            Be first to know about new releases
          </h3>
          <p className="max-w-md font-body text-sm text-white/50">
            Limited editions sell out within hours of release. Subscribers get 48-hour early access.
          </p>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your.email@example.com"
              className="flex-1 rounded-btn border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
            />
            <button type="submit" className="btn-luxury-gold whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <span className="font-display text-2xl font-bold">H&amp;S</span>
          <span className="ml-2 font-display text-2xl font-light tracking-[0.3em] text-gold">WATCHES</span>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/50">
            Hand-finished luxury timepieces, engineered without compromise. Every H&amp;S watch is built to be worn for generations.
          </p>
          <div className="mt-6 flex gap-4">
            <a href={SITE_SETTINGS.socialLinks.instagram} aria-label="Instagram" className="rounded-full border border-white/15 p-2 transition hover:border-gold hover:text-gold">
              <Instagram size={16} />
            </a>
            <a href={SITE_SETTINGS.socialLinks.facebook} aria-label="Facebook" className="rounded-full border border-white/15 p-2 transition hover:border-gold hover:text-gold">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-gold">Shop</p>
          <ul className="mt-4 space-y-2.5 font-body text-sm text-white/60">
            <li><Link href="/shop" className="hover:text-white">All Watches</Link></li>
            <li><Link href="/shop?collection=classic" className="hover:text-white">Classic</Link></li>
            <li><Link href="/shop?collection=sport" className="hover:text-white">Sport</Link></li>
            <li><Link href="/shop?collection=limited-edition" className="hover:text-white">Limited Edition</Link></li>
            <li><Link href="/compare" className="hover:text-white">Compare Watches</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-gold">Support</p>
          <ul className="mt-4 space-y-2.5 font-body text-sm text-white/60">
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/contact#faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/account/orders" className="hover:text-white">Order Tracking</Link></li>
            <li><Link href="/about#warranty" className="hover:text-white">Warranty</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-gold">Contact</p>
          <ul className="mt-4 space-y-3 font-body text-sm text-white/60">
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 flex-shrink-0 text-gold" /> {SITE_SETTINGS.address}</li>
            <li className="flex items-center gap-2"><Phone size={15} className="text-gold" /> {SITE_SETTINGS.contactPhone}</li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-gold" /> {SITE_SETTINGS.contactEmail}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 font-body text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} H&amp;S Watches. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-white">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
