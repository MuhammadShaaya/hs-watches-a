"use client";

import { useState } from "react";
import { Plus, Trash2, Ticket } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminStore } from "@/store/admin-store";
import { formatDateShort } from "@/lib/format";

export default function AdminCouponsPage() {
  const coupons = useAdminStore((s) => s.coupons);
  const addCoupon = useAdminStore((s) => s.addCoupon);
  const updateCoupon = useAdminStore((s) => s.updateCoupon);
  const deleteCoupon = useAdminStore((s) => s.deleteCoupon);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", type: "percentage" as "percentage" | "fixed", value: 10, expiry: "", usageLimit: 100 });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.code.trim()) return;
    addCoupon({
      id: `co-${Date.now()}`,
      code: form.code.toUpperCase(),
      type: form.type,
      value: form.value,
      expiry: form.expiry || "2026-12-31",
      usageLimit: form.usageLimit,
      usedCount: 0,
      active: true,
    });
    toast.success(`Coupon "${form.code.toUpperCase()}" created`);
    setShowForm(false);
    setForm({ code: "", type: "percentage", value: 10, expiry: "", usageLimit: 100 });
  }

  function handleToggleActive(id: string, active: boolean) {
    updateCoupon(id, { active: !active });
    toast.success(!active ? "Coupon activated" : "Coupon deactivated");
  }

  function handleDelete(id: string, code: string) {
    deleteCoupon(id);
    toast.success(`Coupon "${code}" deleted`);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Coupons</h1>
          <p className="mt-1 font-body text-sm text-black/50">Manage discount codes and promotions.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-btn bg-luxury-black px-4 py-2.5 font-body text-xs font-semibold text-white">
          <Plus size={14} /> New Coupon
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mt-6 grid gap-4 rounded-luxury border border-surface-border bg-white p-6 sm:grid-cols-4">
          <input required placeholder="CODE" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="input-luxury uppercase" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "percentage" | "fixed" })} className="input-luxury">
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
          <input required type="number" placeholder="Value" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} className="input-luxury" />
          <input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="input-luxury" />
          <input type="number" placeholder="Usage Limit" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })} className="input-luxury" />
          <button type="submit" className="btn-luxury-primary sm:col-span-4">Create Coupon</button>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-luxury border border-surface-border bg-white">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-surface-border text-left">
              <th className="p-4 font-body text-xs font-semibold text-black/45">Code</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Discount</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Usage</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Expires</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Status</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45"></th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b border-surface-border last:border-0">
                <td className="p-4">
                  <span className="flex items-center gap-2 font-display text-sm font-bold"><Ticket size={14} className="text-gold-dark" /> {c.code}</span>
                </td>
                <td className="p-4 font-body text-sm">{c.type === "percentage" ? `${c.value}%` : `$${c.value}`} off</td>
                <td className="p-4 font-body text-sm text-black/55">{c.usedCount} / {c.usageLimit}</td>
                <td className="p-4 font-body text-sm text-black/55">{formatDateShort(c.expiry)}</td>
                <td className="p-4">
                  <button onClick={() => handleToggleActive(c.id, c.active)} className={`rounded-full px-2.5 py-1 font-body text-xs font-semibold ${c.active ? "bg-success/10 text-success" : "bg-black/5 text-black/50"}`}>
                    {c.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-4">
                  <button onClick={() => handleDelete(c.id, c.code)} className="text-black/40 hover:text-error"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
