"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/types";

export default function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const sorted = [...images].sort((a, b) => a.order - b.order);
  const active = sorted[activeIndex];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  return (
    <div className="flex gap-4">
      <div className="hidden flex-col gap-3 sm:flex">
        {sorted.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition",
              i === activeIndex ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={img.url} alt={img.alt} fill className="object-cover" />
          </button>
        ))}
      </div>

      <div className="flex-1">
        <div
          className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-luxury bg-surface-bg"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={active.url}
            alt={active.alt}
            fill
            priority
            className="object-cover transition-transform duration-200"
            style={zoomed ? { transform: "scale(1.8)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
          />
          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-luxury-black opacity-0 transition group-hover:opacity-100">
            <ZoomIn size={16} />
          </div>
          <button
            onClick={() => setActiveIndex((activeIndex - 1 + sorted.length) % sorted.length)}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 transition group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setActiveIndex((activeIndex + 1) % sorted.length)}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 transition group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 font-body text-[10px] text-white">
            {activeIndex + 1} / {sorted.length}
          </span>
        </div>

        <div className="mt-3 flex gap-2 sm:hidden">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2",
                i === activeIndex ? "border-gold" : "border-transparent opacity-60"
              )}
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" />
            </button>
          ))}
        </div>

        <p className="mt-3 text-center font-body text-[11px] text-black/40 sm:hidden">
          360° preview available — rotate gallery to view all angles
        </p>
      </div>
    </div>
  );
}
