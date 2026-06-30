"use client";

import { useState } from "react";
import { Plus, Trash2, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { USERS } from "@/lib/data/users";

export default function AdminStaffPage() {
  const [staff, setStaff] = useState(USERS.filter((u) => u.role === "admin" || u.role === "manager"));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "manager" as "admin" | "manager" });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setStaff([...staff, { id: `staff-${Date.now()}`, name: form.name, email: form.email, password: "temp123", role: form.role, addresses: [], wishlist: [], createdAt: new Date().toISOString(), blocked: false }]);
    toast.success(`${form.name} added as ${form.role}`);
    setShowForm(false);
    setForm({ name: "", email: "", role: "manager" });
  }

  function handleRemove(id: string, name: string) {
    setStaff(staff.filter((s) => s.id !== id));
    toast.success(`${name} removed from staff`);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Staff</h1>
          <p className="mt-1 font-body text-sm text-black/50">Manage admin and manager access.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-btn bg-luxury-black px-4 py-2.5 font-body text-xs font-semibold text-white">
          <Plus size={14} /> Add Staff Member
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mt-6 grid gap-4 rounded-luxury border border-surface-border bg-white p-6 sm:grid-cols-3">
          <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-luxury" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-luxury" />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "admin" | "manager" })} className="input-luxury">
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn-luxury-primary sm:col-span-3">Add Staff Member</button>
        </form>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {staff.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-luxury border border-surface-border bg-white p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-sm font-semibold">{s.name}</p>
                <span className="flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 font-body text-[10px] font-semibold text-gold-dark">
                  <Shield size={9} /> {s.role}
                </span>
              </div>
              <p className="font-body text-xs text-black/45">{s.email}</p>
            </div>
            <button onClick={() => handleRemove(s.id, s.name)} className="text-black/35 hover:text-error"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
