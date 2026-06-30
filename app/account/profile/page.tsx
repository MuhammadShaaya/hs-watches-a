"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AccountLayout from "@/components/account/account-layout";
import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const [name, setName] = useState(currentUser?.name ?? "");
  const [phone, setPhone] = useState(currentUser?.phone ?? "");

  if (!currentUser) return <AccountLayout><></></AccountLayout>;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Profile updated successfully");
  }

  return (
    <AccountLayout>
      <h1 className="font-display text-2xl font-semibold">Profile</h1>
      <p className="mt-1 font-body text-sm text-black/50">Manage your personal information.</p>

      <form onSubmit={handleSave} className="mt-6 max-w-lg space-y-4 rounded-luxury border border-surface-border bg-white p-6">
        <div>
          <label className="font-body text-xs font-semibold">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input-luxury mt-1.5" />
        </div>
        <div>
          <label className="font-body text-xs font-semibold">Email</label>
          <input value={currentUser.email} disabled className="input-luxury mt-1.5 opacity-60" />
        </div>
        <div>
          <label className="font-body text-xs font-semibold">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-luxury mt-1.5" />
        </div>
        <button type="submit" className="btn-luxury-primary">Save Changes</button>
      </form>
    </AccountLayout>
  );
}
