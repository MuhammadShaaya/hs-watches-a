"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/components/auth/auth-layout";
import { useAuthStore } from "@/store/auth-store";

export default function SignupPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) {
      toast.error("Please agree to the Terms of Service to continue.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = register(name, email, password);
      setLoading(false);
      if (result.success) {
        toast.success(result.message);
        router.push("/verify-email");
      } else {
        toast.error(result.message);
      }
    }, 400);
  }

  function handleGoogleSignup() {
    toast.success("Google sign-up would open here (OAuth handled by backend)");
  }

  return (
    <AuthLayout title="Create Your Account" subtitle="Join H&S Watches for early access to limited releases.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-body text-xs font-semibold">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="input-luxury mt-1.5" placeholder="Jane Appleseed" />
        </div>
        <div>
          <label className="font-body text-xs font-semibold">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="input-luxury mt-1.5" placeholder="you@example.com" />
        </div>
        <div>
          <label className="font-body text-xs font-semibold">Password</label>
          <div className="relative mt-1.5">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
              className="input-luxury pr-10"
              placeholder="At least 6 characters"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <label className="flex items-start gap-2 font-body text-xs text-black/60">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-gold-dark" />
          I agree to the Terms of Service and Privacy Policy
        </label>
        <button type="submit" disabled={loading} className="btn-luxury-primary w-full">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-surface-border" />
        <span className="font-body text-xs text-black/40">OR</span>
        <div className="h-px flex-1 bg-surface-border" />
      </div>

      <button onClick={handleGoogleSignup} className="btn-luxury-outline w-full">
        Continue with Google
      </button>

      <p className="mt-6 text-center font-body text-sm text-black/55">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-gold-dark hover:text-gold">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
