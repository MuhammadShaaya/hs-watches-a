"use client";

import { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";
import AccountLayout from "@/components/account/account-layout";
import { useAuthStore } from "@/store/auth-store";
import { Address } from "@/types";

export default function AddressesPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const [addresses, setAddresses] = useState<Address[]>(currentUser?.addresses ?? []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", street: "", city: "", province: "", postalCode: "" });

  if (!currentUser) return <AccountLayout><></></AccountLayout>;

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      ...form,
      country: "United States",
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddr]);
    setShowForm(false);
    setForm({ fullName: "", phone: "", street: "", city: "", province: "", postalCode: "" });
    toast.success("Address added");
  }

  function handleDelete(id: string) {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.success("Address removed");
  }

  function handleSetDefault(id: string) {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success("Default address updated");
  }

  return (
    <AccountLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Addresses</h1>
          <p className="mt-1 font-body text-sm text-black/50">Manage your shipping addresses.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-btn bg-luxury-black px-4 py-2.5 font-body text-xs font-semibold text-white">
          <Plus size={14} /> Add Address
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mt-6 grid gap-4 rounded-luxury border border-surface-border bg-white p-6 sm:grid-cols-2">
          <input required placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input-luxury" />
          <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-luxury" />
          <input required placeholder="Street Address" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="input-luxury sm:col-span-2" />
          <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-luxury" />
          <input required placeholder="State / Province" value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className="input-luxury" />
          <input required placeholder="Postal Code" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className="input-luxury" />
          <button type="submit" className="btn-luxury-primary sm:col-span-2">Save Address</button>
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <div key={addr.id} className="relative rounded-luxury border border-surface-border bg-white p-5">
            {addr.isDefault && (
              <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-1 font-body text-[10px] font-semibold text-gold-dark">
                <Star size={10} className="fill-gold-dark" /> Default
              </span>
            )}
            <p className="font-display text-sm font-semibold">{addr.fullName}</p>
            <p className="mt-2 font-body text-sm text-black/60">
              {addr.street}<br />{addr.city}, {addr.province} {addr.postalCode}<br />{addr.phone}
            </p>
            <div className="mt-4 flex gap-3">
              {!addr.isDefault && (
                <button onClick={() => handleSetDefault(addr.id)} className="font-body text-xs font-semibold text-gold-dark hover:text-gold">
                  Set as Default
                </button>
              )}
              <button onClick={() => handleDelete(addr.id)} className="flex items-center gap-1 font-body text-xs font-semibold text-error hover:underline">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
