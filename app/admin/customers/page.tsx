"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Ban, CheckCircle2, Trash2, Eye, X } from "lucide-react";
import toast from "react-hot-toast";
import { USERS } from "@/lib/data/users";
import { ORDERS } from "@/lib/data/orders";
import { formatCurrency, formatDateShort } from "@/lib/format";
import { User } from "@/types";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<User[]>(USERS.filter((u) => u.role === "customer"));
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<User | null>(null);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  function handleToggleBlock(id: string, name: string, blocked: boolean) {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, blocked: !blocked } : c)));
    toast.success(!blocked ? `${name} has been blocked` : `${name} has been unblocked`);
  }

  function handleDelete(id: string, name: string) {
    setCustomers(customers.filter((c) => c.id !== id));
    toast.success(`${name} deleted`);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Customers</h1>
      <p className="mt-1 font-body text-sm text-black/50">{customers.length} registered customers</p>

      <div className="mt-6 relative max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..." className="input-luxury pl-9" />
      </div>

      <div className="mt-5 overflow-x-auto rounded-luxury border border-surface-border bg-white">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-surface-border text-left">
              <th className="p-4 font-body text-xs font-semibold text-black/45">Customer</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Email</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Joined</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Status</th>
              <th className="p-4 font-body text-xs font-semibold text-black/45">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-surface-border last:border-0">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full bg-surface-bg">
                      {c.avatar && <Image src={c.avatar} alt={c.name} fill className="object-cover" />}
                    </div>
                    <span className="font-body text-sm font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="p-4 font-body text-sm text-black/55">{c.email}</td>
                <td className="p-4 font-body text-sm text-black/55">{formatDateShort(c.createdAt)}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2.5 py-1 font-body text-xs font-semibold ${c.blocked ? "bg-error/10 text-error" : "bg-success/10 text-success"}`}>
                    {c.blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setViewing(c)} className="text-black/40 hover:text-gold-dark"><Eye size={15} /></button>
                    <button onClick={() => handleToggleBlock(c.id, c.name, c.blocked)} className="text-black/40 hover:text-amber-600">
                      {c.blocked ? <CheckCircle2 size={15} /> : <Ban size={15} />}
                    </button>
                    <button onClick={() => handleDelete(c.id, c.name)} className="text-black/40 hover:text-error"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewing(null)}>
          <div className="w-full max-w-lg rounded-luxury bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">{viewing.name}</h2>
              <button onClick={() => setViewing(null)}><X size={18} /></button>
            </div>
            <p className="mt-1 font-body text-sm text-black/55">{viewing.email} · {viewing.phone}</p>

            <p className="mt-5 font-display text-sm font-semibold">Purchase History</p>
            <div className="mt-2 space-y-2">
              {ORDERS.filter((o) => o.userId === viewing.id).length === 0 ? (
                <p className="font-body text-sm text-black/40">No orders yet.</p>
              ) : (
                ORDERS.filter((o) => o.userId === viewing.id).map((o) => (
                  <div key={o.id} className="flex justify-between rounded-lg bg-surface-bg px-3 py-2 font-body text-sm">
                    <span>{o.id}</span>
                    <span className="font-semibold">{formatCurrency(o.total)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
