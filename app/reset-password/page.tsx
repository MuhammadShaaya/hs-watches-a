"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthLayout from "@/components/auth/auth-layout";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    toast.success("Password reset successfully. Please sign in.");
    router.push("/login");
  }

  return (
    <AuthLayout title="Reset Password" subtitle="Choose a new password for your account.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-body text-xs font-semibold">New Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="input-luxury mt-1.5" placeholder="At least 6 characters" />
        </div>
        <div>
          <label className="font-body text-xs font-semibold">Confirm New Password</label>
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" required className="input-luxury mt-1.5" placeholder="Re-enter password" />
        </div>
        <button type="submit" className="btn-luxury-primary w-full">
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}
