"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AccountLayout from "@/components/account/account-layout";

export default function ChangePasswordPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (next.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (next !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    toast.success("Password changed successfully");
    setCurrent("");
    setNext("");
    setConfirm("");
  }

  return (
    <AccountLayout>
      <h1 className="font-display text-2xl font-semibold">Change Password</h1>
      <p className="mt-1 font-body text-sm text-black/50">Update your account password.</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4 rounded-luxury border border-surface-border bg-white p-6">
        <div>
          <label className="font-body text-xs font-semibold">Current Password</label>
          <input value={current} onChange={(e) => setCurrent(e.target.value)} type="password" required className="input-luxury mt-1.5" />
        </div>
        <div>
          <label className="font-body text-xs font-semibold">New Password</label>
          <input value={next} onChange={(e) => setNext(e.target.value)} type="password" required className="input-luxury mt-1.5" />
        </div>
        <div>
          <label className="font-body text-xs font-semibold">Confirm New Password</label>
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" required className="input-luxury mt-1.5" />
        </div>
        <button type="submit" className="btn-luxury-primary">Update Password</button>
      </form>
    </AccountLayout>
  );
}
