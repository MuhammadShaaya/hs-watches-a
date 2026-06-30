"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Product, ProductImage } from "@/types";
import { useAdminStore } from "@/store/admin-store";
import { slugify, generateSku } from "@/lib/format";
import ImageManager from "@/components/admin/image-manager";

const COLLECTIONS = ["Classic", "Sport", "Chronograph", "Smart Luxury", "Limited Edition"];
const MOVEMENTS = ["Automatic", "Quartz", "Manual Wind", "Smart"];
const MATERIALS = ["Stainless Steel", "Titanium", "Rose Gold", "Yellow Gold", "Ceramic"];
const GENDERS = ["Men", "Women", "Unisex"];

export default function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const addProduct = useAdminStore((s) => s.addProduct);
  const updateProduct = useAdminStore((s) => s.updateProduct);

  const [images, setImages] = useState<ProductImage[]>(initial?.images ?? []);
  const [name, setName] = useState(initial?.name ?? "");
  const [collection, setCollection] = useState<string>(initial?.collection ?? "Classic");
  const [gender, setGender] = useState<string>(initial?.gender ?? "Men");
  const [movement, setMovement] = useState<string>(initial?.movement ?? "Automatic");
  const [caseMaterial, setCaseMaterial] = useState<string>(initial?.caseMaterial ?? "Stainless Steel");
  const [caseSize, setCaseSize] = useState(initial?.caseSize ?? "40mm");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [salePrice, setSalePrice] = useState(initial?.salePrice ?? undefined);
  const [stock, setStock] = useState(initial?.stock ?? 0);
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [warranty, setWarranty] = useState(initial?.warranty ?? "5-Year International Warranty");
  const [status, setStatus] = useState<"Active" | "Draft">(initial?.status ?? "Draft");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [trending, setTrending] = useState(initial?.trending ?? false);
  const [newArrival, setNewArrival] = useState(initial?.newArrival ?? false);
  const [bestSeller, setBestSeller] = useState(initial?.bestSeller ?? false);
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (images.length === 0) {
      toast.error("Please add at least one product image");
      return;
    }

    const payload: Product = {
      id: initial?.id ?? `p-${Date.now()}`,
      slug: initial?.slug ?? slugify(name),
      sku: initial?.sku ?? generateSku(),
      barcode: initial?.barcode ?? String(Date.now()),
      name,
      brandName: "H&S Watches",
      collection: collection as Product["collection"],
      gender: gender as Product["gender"],
      movement: movement as Product["movement"],
      caseMaterial: caseMaterial as Product["caseMaterial"],
      caseSize,
      strapOptions: initial?.strapOptions ?? [{ id: "strap-leather", label: "Leather" }],
      colorOptions: initial?.colorOptions ?? [{ id: "color-black", label: "Onyx Black", hex: "#0D0D0D" }],
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : undefined,
      currency: "USD",
      stock: Number(stock),
      weightGrams: initial?.weightGrams ?? 120,
      dimensions: initial?.dimensions ?? `${caseSize} case`,
      shortDescription,
      description,
      specifications: initial?.specifications ?? [
        { label: "Case Material", value: caseMaterial },
        { label: "Case Diameter", value: caseSize },
        { label: "Movement", value: movement },
      ],
      warranty,
      images,
      featured,
      trending,
      newArrival,
      bestSeller,
      status,
      rating: initial?.rating ?? 0,
      reviewCount: initial?.reviewCount ?? 0,
      reviews: initial?.reviews ?? [],
      tags: initial?.tags ?? [collection.toLowerCase()],
      seoTitle: seoTitle || `${name} | H&S Watches`,
      seoDescription: seoDescription || shortDescription,
      seoKeywords: initial?.seoKeywords ?? [collection.toLowerCase(), "luxury watch"],
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    };

    if (initial) {
      updateProduct(initial.id, payload);
      toast.success("Product updated successfully");
    } else {
      addProduct(payload);
      toast.success("Product created successfully");
    }
    router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-luxury border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg font-semibold">Product Images</h2>
        <p className="mt-1 font-body text-xs text-black/45">Upload from your computer or paste image URLs. Drag to reorder. Set any image as the main thumbnail.</p>
        <div className="mt-4">
          <ImageManager images={images} onChange={setImages} />
        </div>
      </div>

      <div className="rounded-luxury border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg font-semibold">Basic Information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="font-body text-xs font-semibold">Product Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="input-luxury mt-1.5" />
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Collection</label>
            <select value={collection} onChange={(e) => setCollection(e.target.value)} className="input-luxury mt-1.5">
              {COLLECTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-luxury mt-1.5">
              {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Movement</label>
            <select value={movement} onChange={(e) => setMovement(e.target.value)} className="input-luxury mt-1.5">
              {MOVEMENTS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Case Material</label>
            <select value={caseMaterial} onChange={(e) => setCaseMaterial(e.target.value)} className="input-luxury mt-1.5">
              {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Case Size</label>
            <input value={caseSize} onChange={(e) => setCaseSize(e.target.value)} className="input-luxury mt-1.5" placeholder="e.g. 42mm" />
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Warranty</label>
            <input value={warranty} onChange={(e) => setWarranty(e.target.value)} className="input-luxury mt-1.5" />
          </div>
        </div>
      </div>

      <div className="rounded-luxury border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg font-semibold">Pricing &amp; Inventory</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="font-body text-xs font-semibold">Price (USD)</label>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required min={0} step="0.01" className="input-luxury mt-1.5" />
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Sale Price (optional)</label>
            <input type="number" value={salePrice ?? ""} onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)} min={0} step="0.01" className="input-luxury mt-1.5" />
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Stock Quantity</label>
            <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required min={0} className="input-luxury mt-1.5" />
          </div>
        </div>
      </div>

      <div className="rounded-luxury border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg font-semibold">Description</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="font-body text-xs font-semibold">Short Description</label>
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={2} className="input-luxury mt-1.5" />
          </div>
          <div>
            <label className="font-body text-xs font-semibold">Full Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="input-luxury mt-1.5" />
          </div>
        </div>
      </div>

      <div className="rounded-luxury border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg font-semibold">Flags &amp; Status</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Featured", checked: featured, set: setFeatured },
            { label: "Trending", checked: trending, set: setTrending },
            { label: "New Arrival", checked: newArrival, set: setNewArrival },
            { label: "Best Seller", checked: bestSeller, set: setBestSeller },
          ].map((f) => (
            <label key={f.label} className="flex items-center gap-2 rounded-btn border border-surface-border p-3 font-body text-sm">
              <input type="checkbox" checked={f.checked} onChange={(e) => f.set(e.target.checked)} className="accent-gold-dark" />
              {f.label}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <label className="font-body text-xs font-semibold">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as "Active" | "Draft")} className="input-luxury mt-1.5 max-w-xs">
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
          </select>
        </div>
      </div>

      <div className="rounded-luxury border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg font-semibold">SEO</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="font-body text-xs font-semibold">SEO Title</label>
            <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="input-luxury mt-1.5" placeholder={`${name || "Product"} | H&S Watches`} />
          </div>
          <div>
            <label className="font-body text-xs font-semibold">SEO Description</label>
            <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} className="input-luxury mt-1.5" />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="btn-luxury-primary">{initial ? "Save Changes" : "Create Product"}</button>
        <button type="button" onClick={() => router.push("/admin/products")} className="btn-luxury-outline">Cancel</button>
      </div>
    </form>
  );
}
