"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/components/auth/auth-layout";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const loginAsAdmin = useAuthStore((s) => s.loginAsAdmin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        toast.success(result.message);
        router.push("/account");
      } else {
        toast.error(result.message);
      }
    }, 400);
  }

  function handleAdminDemo() {
    loginAsAdmin();
    toast.success("Logged in as Admin");
    router.push("/admin");
  }

  function handleGoogleLogin() {
    toast.success("Google sign-in would open here (OAuth handled by backend)");
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to track orders, manage your wishlist, and more.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-body text-xs font-semibold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="input-luxury mt-1.5"
            placeholder="you@example.com"
          />
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
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-body text-xs">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-gold-dark" />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-body text-xs font-semibold text-gold-dark hover:text-gold">
            Forgot password?
          </Link>
        </div>
        <button type="submit" disabled={loading} className="btn-luxury-primary w-full">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-surface-border" />
        <span className="font-body text-xs text-black/40">OR</span>
        <div className="h-px flex-1 bg-surface-border" />
      </div>

      <button onClick={handleGoogleLogin} className="btn-luxury-outline w-full">
        Continue with Google
      </button>

      <p className="mt-6 text-center font-body text-sm text-black/55">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-gold-dark hover:text-gold">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
