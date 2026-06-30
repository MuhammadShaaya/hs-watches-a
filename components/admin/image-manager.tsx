"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Link2, Star, Trash2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";
import { ProductImage } from "@/types";

export default function ImageManager({
  images,
  onChange,
}: {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}) {
  const [urlInput, setUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addImagesFromFiles(files: FileList) {
    const newImages: ProductImage[] = Array.from(files).map((file, i) => ({
      id: `img-${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      alt: file.name,
      isMain: images.length === 0 && i === 0,
      order: images.length + i,
    }));
    onChange([...images, ...newImages]);
    toast.success(`${files.length} image(s) uploaded`);
  }

  function addImageFromUrl() {
    if (!urlInput.trim()) return;
    const newImage: ProductImage = {
      id: `img-${Date.now()}`,
      url: urlInput.trim(),
      alt: "Product image",
      isMain: images.length === 0,
      order: images.length,
    };
    onChange([...images, newImage]);
    setUrlInput("");
    toast.success("Image added from URL");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addImagesFromFiles(e.dataTransfer.files);
  }

  function setMain(id: string) {
    onChange(images.map((img) => ({ ...img, isMain: img.id === id })));
  }

  function removeImage(id: string) {
    const wasMain = images.find((i) => i.id === id)?.isMain;
    const next = images.filter((i) => i.id !== id);
    if (wasMain && next.length > 0) next[0].isMain = true;
    onChange(next);
  }

  function handleReorderDrop(targetIndex: number) {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const next = [...images];
    const [moved] = next.splice(draggedIndex, 1);
    next.splice(targetIndex, 0, moved);
    onChange(next.map((img, i) => ({ ...img, order: i })));
    setDraggedIndex(null);
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-luxury border-2 border-dashed p-8 text-center transition ${
          dragActive ? "border-gold bg-gold/5" : "border-surface-border hover:border-gold/50"
        }`}
      >
        <Upload size={24} className="text-gold-dark" />
        <p className="font-body text-sm font-semibold">Drag &amp; drop images here, or click to browse</p>
        <p className="font-body text-xs text-black/40">Supports JPG, PNG, WEBP, AVIF — unlimited images per product</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && addImagesFromFiles(e.target.files)}
        />
      </div>

      <div className="mt-3 flex gap-2">
        <div className="relative flex-1">
          <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Or paste an image URL..."
            className="input-luxury pl-9"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageFromUrl())}
          />
        </div>
        <button type="button" onClick={addImageFromUrl} className="rounded-btn border border-surface-border px-4 font-body text-xs font-semibold hover:border-gold">
          Add URL
        </button>
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {[...images].sort((a, b) => a.order - b.order).map((img, index) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleReorderDrop(index)}
              className="group relative aspect-square cursor-move overflow-hidden rounded-xl border border-surface-border"
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />
              <div className="absolute left-1 top-1 text-white opacity-0 transition group-hover:opacity-100">
                <GripVertical size={14} />
              </div>
              {img.isMain && (
                <span className="absolute left-1 top-1 rounded-full bg-gold px-1.5 py-0.5 font-body text-[9px] font-bold text-luxury-black">MAIN</span>
              )}
              <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 transition group-hover:opacity-100">
                {!img.isMain && (
                  <button type="button" onClick={() => setMain(img.id)} className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90" title="Set as main">
                    <Star size={11} />
                  </button>
                )}
                <button type="button" onClick={() => removeImage(img.id)} className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-error" title="Delete">
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
