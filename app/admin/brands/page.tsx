"use client";

import { useState } from "react";
import { Plus, Trash2, Tag } from "lucide-react";
import toast from "react-hot-toast";
import { BRANDS as INITIAL_BRANDS } from "@/lib/data/misc";
import { Brand } from "@/types";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [name, setName] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBrands([...brands, { id: `b-${Date.now()}`, name, slug: name.toLowerCase().replace(/\s+/g, "-"), productCount: 0 }]);
    setName("");
    toast.success("Brand added");
  }

  function handleDelete(id: string) {
    setBrands(brands.filter((b) => b.id !== id));
    toast.success("Brand deleted");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Brands</h1>
      <p className="mt-1 font-body text-sm text-black/50">Manage brands carried in your catalog.</p>

      <form onSubmit={handleAdd} className="mt-6 flex max-w-md gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New brand name" className="input-luxury" />
        <button type="submit" className="flex items-center gap-2 rounded-btn bg-luxury-black px-4 py-3 font-body text-xs font-semibold text-white">
          <Plus size={14} /> Add
        </button>
      </form>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-luxury border border-surface-border bg-white p-4">
            <div className="flex items-center gap-3">
              <Tag size={16} className="text-gold-dark" />
              <div>
                <p className="font-display text-sm font-semibold">{b.name}</p>
                <p className="font-body text-xs text-black/45">{b.productCount} products</p>
              </div>
            </div>
            <button onClick={() => handleDelete(b.id)} className="text-black/35 hover:text-error">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
