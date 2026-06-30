"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/auth/auth-layout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email and we'll send you a reset link.">
      {sent ? (
        <div className="rounded-luxury border border-success/20 bg-success/5 p-6 text-center">
          <CheckCircle2 className="mx-auto text-success" size={32} />
          <p className="mt-3 font-display text-base font-semibold">Check your inbox</p>
          <p className="mt-1 font-body text-sm text-black/55">
            If an account exists for {email}, we&apos;ve sent password reset instructions.
          </p>
          <Link href="/reset-password" className="mt-4 inline-block font-body text-sm font-semibold text-gold-dark hover:text-gold">
            Continue to reset password →
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs font-semibold">Email</label>
            <div className="relative mt-1.5">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="input-luxury pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <button type="submit" className="btn-luxury-primary w-full">
            Send Reset Link
          </button>
        </form>
      )}
      <p className="mt-6 text-center font-body text-sm text-black/55">
        Remembered your password?{" "}
        <Link href="/login" className="font-semibold text-gold-dark hover:text-gold">
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
}
