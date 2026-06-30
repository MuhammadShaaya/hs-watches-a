"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-black-sheen">
      <div className="absolute inset-0">
        <Image
          src="/test.jpg"
          alt="H&S Watches — Meridian Automatic Chronograph on a dark marble surface"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/70 to-transparent" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="eyebrow text-gold">Est. 2019 — Hand-Finished in Small Batches</p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Time, <span className="gold-text italic">Refined.</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-white/65 sm:text-lg">
            Every H&amp;S timepiece is engineered to outlive a generation — hand-finished movements,
            sapphire crystal, and a 5-year warranty on every watch we make.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-luxury-gold">
              Shop the Collection <ArrowRight size={16} />
            </Link>
            <Link href="/shop?sale=true" className="btn-luxury-outline !border-white/25 !text-white hover:!border-gold">
              See Current Offers
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-body text-[10px] uppercase tracking-luxe text-white/40">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
