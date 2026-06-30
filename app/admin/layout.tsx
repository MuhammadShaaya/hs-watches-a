"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminTopbar from "@/components/admin/admin-topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentUser = useAuthStore((s) => s.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "manager")) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "manager")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-bg">
        <p className="font-body text-sm text-black/40">Checking admin access...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-bg">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">
        <AdminTopbar />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
