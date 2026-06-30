"use client";

import { useState } from "react";
import { Plus, Trash2, FolderTree } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminStore } from "@/store/admin-store";

export default function AdminCategoriesPage() {
  const categories = useAdminStore((s) => s.categories);
  const addCategory = useAdminStore((s) => s.addCategory);
  const deleteCategory = useAdminStore((s) => s.deleteCategory);
  const [name, setName] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const result = addCategory(name.trim());
    if (result.success) {
      toast.success(result.message);
      setName("");
    } else {
      toast.error(result.message);
    }
  }

  function handleDelete(id: string) {
    const result = deleteCategory(id);
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Categories</h1>
      <p className="mt-1 font-body text-sm text-black/50">Organize watches by collection category.</p>

      <form onSubmit={handleAdd} className="mt-6 flex max-w-md gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" className="input-luxury" />
        <button type="submit" className="flex items-center gap-2 rounded-btn bg-luxury-black px-4 py-3 font-body text-xs font-semibold text-white">
          <Plus size={14} /> Add
        </button>
      </form>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-luxury border border-surface-border bg-white p-4">
            <div className="flex items-center gap-3">
              <FolderTree size={16} className="text-gold-dark" />
              <div>
                <p className="font-display text-sm font-semibold">{c.name}</p>
                <p className="font-body text-xs text-black/45">{c.productCount} products</p>
              </div>
            </div>
            <button onClick={() => handleDelete(c.id)} className="text-black/35 hover:text-error">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
