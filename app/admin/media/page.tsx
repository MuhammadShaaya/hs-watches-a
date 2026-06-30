"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { Upload, Search, Grid2x2, List, Trash2, Link2, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminStore } from "@/store/admin-store";

interface MediaItem {
  id: string;
  url: string;
  name: string;
  size: string;
  uploadedAt: string;
}

function buildInitialMedia(): MediaItem[] {
  const seeds = ["meridian-automatic-chronograph-1", "calibre-noir-dress-watch-1", "abyssal-diver-300-1", "aria-mother-of-pearl-1", "vantage-smart-luxury-1", "obsidian-limited-edition-1"];
  return seeds.map((s, i) => ({
    id: `media-${i}`,
    url: `https://picsum.photos/seed/${s}/600/600`,
    name: `${s}.jpg`,
    size: `${(Math.random() * 2 + 0.4).toFixed(1)} MB`,
    uploadedAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(buildInitialMedia());
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => media.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())), [media, search]);

  function handleUpload(files: FileList) {
    const newItems: MediaItem[] = Array.from(files).map((file, i) => ({
      id: `media-${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString(),
    }));
    setMedia([...newItems, ...media]);
    toast.success(`${files.length} image(s) uploaded and optimized`);
  }

  function handleUrlAdd() {
    if (!urlInput.trim()) return;
    setMedia([{ id: `media-${Date.now()}`, url: urlInput.trim(), name: "external-image.jpg", size: "—", uploadedAt: new Date().toISOString() }, ...media]);
    setUrlInput("");
    toast.success("Image added from URL");
  }

  function handleDelete(id: string) {
    setMedia(media.filter((m) => m.id !== id));
    toast.success("Image deleted");
  }

  function handleCopyUrl(url: string) {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Media Library</h1>
      <p className="mt-1 font-body text-sm text-black/50">{media.length} images stored — reuse across any product listing.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files); }}
          className="flex cursor-pointer items-center justify-center gap-3 rounded-luxury border-2 border-dashed border-surface-border p-6 text-center hover:border-gold/50"
        >
          <Upload size={20} className="text-gold-dark" />
          <p className="font-body text-sm">Drag &amp; drop, or click to bulk upload images</p>
          <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && handleUpload(e.target.files)} />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
            <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Paste image URL" className="input-luxury pl-9" />
          </div>
          <button onClick={handleUrlAdd} className="rounded-btn border border-surface-border px-4 font-body text-xs font-semibold hover:border-gold">Add</button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="relative max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search images..." className="input-luxury pl-9" />
        </div>
        <div className="flex rounded-btn border border-surface-border">
          <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-luxury-black text-white" : "text-black/50"}`}><Grid2x2 size={15} /></button>
          <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-luxury-black text-white" : "text-black/50"}`}><List size={15} /></button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {filtered.map((m) => (
            <div key={m.id} className="group relative aspect-square overflow-hidden rounded-xl border border-surface-border">
              <Image src={m.url} alt={m.name} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                <div className="flex w-full justify-between">
                  <button onClick={() => handleCopyUrl(m.url)} className="rounded-full bg-white/90 p-1.5"><Copy size={11} /></button>
                  <button onClick={() => handleDelete(m.id)} className="rounded-full bg-white/90 p-1.5 text-error"><Trash2 size={11} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-luxury border border-surface-border bg-white">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-surface-border text-left">
                <th className="p-3 font-body text-xs font-semibold text-black/45">Preview</th>
                <th className="p-3 font-body text-xs font-semibold text-black/45">Name</th>
                <th className="p-3 font-body text-xs font-semibold text-black/45">Size</th>
                <th className="p-3 font-body text-xs font-semibold text-black/45"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-surface-border last:border-0">
                  <td className="p-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg"><Image src={m.url} alt={m.name} fill className="object-cover" unoptimized /></div>
                  </td>
                  <td className="p-3 font-body text-sm">{m.name}</td>
                  <td className="p-3 font-body text-xs text-black/50">{m.size}</td>
                  <td className="p-3">
                    <div className="flex gap-3">
                      <button onClick={() => handleCopyUrl(m.url)} className="text-black/40 hover:text-gold-dark"><Copy size={14} /></button>
                      <button onClick={() => handleDelete(m.id)} className="text-black/40 hover:text-error"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
