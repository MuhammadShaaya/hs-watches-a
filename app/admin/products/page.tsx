"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Trash2, Pencil, Download, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminStore } from "@/store/admin-store";
import { formatCurrency } from "@/lib/format";

export default function AdminProductsPage() {
  const products = useAdminStore((s) => s.products);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);
  const bulkDeleteProducts = useAdminStore((s) => s.bulkDeleteProducts);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = !search.trim() || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [products, search, statusFilter]);

  function toggleSelect(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((i) => i !== id) : [...s, id]));
  }

  function toggleSelectAll() {
    setSelected(selected.length === filtered.length ? [] : filtered.map((p) => p.id));
  }

  function handleBulkDelete() {
    if (selected.length === 0) return;
    bulkDeleteProducts(selected);
    toast.success(`${selected.length} product(s) deleted`);
    setSelected([]);
  }

  function handleDelete(id: string, name: string) {
    deleteProduct(id);
    toast.success(`"${name}" deleted`);
  }

  function handleExport() {
    const csv = [
      ["SKU", "Name", "Collection", "Price", "Stock", "Status"].join(","),
      ...filtered.map((p) => [p.sku, `"${p.name}"`, p.collection, p.price, p.stock, p.status].join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hs-watches-products.csv";
    a.click();
    toast.success("Products exported to CSV");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Products</h1>
          <p className="mt-1 font-body text-sm text-black/50">{products.length} total products</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 rounded-btn border border-surface-border px-4 py-2.5 font-body text-xs font-semibold hover:border-gold">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => toast.success("Bulk import dialog would open here")} className="flex items-center gap-2 rounded-btn border border-surface-border px-4 py-2.5 font-body text-xs font-semibold hover:border-gold">
            <Upload size={14} /> Import
          </button>
          <Link href="/admin/products/new" className="flex items-center gap-2 rounded-btn bg-luxury-black px-4 py-2.5 font-body text-xs font-semibold text-white">
            <Plus size={14} /> Add Product
          </Link>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or SKU..." className="input-luxury pl-9" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-luxury !w-auto">
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
        </select>
        {selected.length > 0 && (
          <button onClick={handleBulkDelete} className="flex items-center gap-2 rounded-btn border border-error/30 px-4 py-2.5 font-body text-xs font-semibold text-error hover:bg-error/5">
            <Trash2 size={14} /> Delete {selected.length} selected
          </button>
        )}
      </div>

      <div className="mt-5 overflow-x-auto rounded-luxury border border-surface-border bg-white">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-surface-border text-left">
              <th className="p-4">
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="accent-gold-dark" />
              </th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Product</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">SKU</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Collection</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Price</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Stock</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Status</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const mainImage = p.images.find((i) => i.isMain) ?? p.images[0];
              return (
                <tr key={p.id} className="border-b border-surface-border last:border-0 hover:bg-surface-bg">
                  <td className="p-4">
                    <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} className="accent-gold-dark" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-surface-bg">
                        <Image src={mainImage.url} alt={p.name} fill className="object-cover" />
                      </div>
                      <span className="font-body text-sm font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-body text-xs text-black/55">{p.sku}</td>
                  <td className="p-4 font-body text-sm text-black/65">{p.collection}</td>
                  <td className="p-4 font-body text-sm font-semibold">{formatCurrency(p.salePrice ?? p.price)}</td>
                  <td className="p-4">
                    <span className={`font-body text-sm font-semibold ${p.stock <= 5 ? "text-error" : "text-black/70"}`}>{p.stock}</span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-1 font-body text-xs font-semibold ${p.status === "Active" ? "bg-success/10 text-success" : "bg-black/5 text-black/50"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/products/${p.id}`} className="text-black/45 hover:text-gold-dark">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.name)} className="text-black/45 hover:text-error">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-10 text-center font-body text-sm text-black/40">No products match your filters.</p>}
      </div>
    </div>
  );
}
