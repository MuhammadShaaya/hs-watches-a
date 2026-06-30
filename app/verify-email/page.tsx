"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/components/auth/auth-layout";
import { useAuthStore } from "@/store/auth-store";

export default function VerifyEmailPage() {
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.currentUser);

  function handleVerify() {
    toast.success("Email verified successfully!");
    router.push("/account");
  }

  return (
    <AuthLayout title="Verify Your Email" subtitle="One last step before you get started.">
      <div className="rounded-luxury border border-surface-border bg-surface-bg p-6 text-center">
        <MailCheck className="mx-auto text-gold-dark" size={32} />
        <p className="mt-3 font-display text-base font-semibold">Check your inbox</p>
        <p className="mt-1 font-body text-sm text-black/55">
          We sent a verification link to {currentUser?.email ?? "your email address"}. Click the link to verify your account.
        </p>
        <button onClick={handleVerify} className="btn-luxury-primary mt-5 w-full">
          I&apos;ve Verified My Email
        </button>
        <button className="mt-3 font-body text-xs font-semibold text-gold-dark hover:text-gold">
          Resend verification email
        </button>
      </div>
      <p className="mt-6 text-center font-body text-sm text-black/55">
        <Link href="/account" className="font-semibold text-gold-dark hover:text-gold">
          Skip for now →
        </Link>
      </p>
    </AuthLayout>
  );
}
