"use client";

import Link from "next/link";
import { DollarSign, ShoppingCart, Users, Package, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import StatCard from "@/components/admin/stat-card";
import StatusBadge from "@/components/ui/status-badge";
import { useAdminStore } from "@/store/admin-store";
import { formatCurrency, formatDateShort } from "@/lib/format";

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38500 },
  { month: "Mar", revenue: 51200 },
  { month: "Apr", revenue: 47800 },
  { month: "May", revenue: 62300 },
  { month: "Jun", revenue: 58900 },
];

const CATEGORY_DATA = [
  { name: "Classic", value: 5 },
  { name: "Sport", value: 4 },
  { name: "Chronograph", value: 2 },
  { name: "Smart Luxury", value: 1 },
  { name: "Limited Edition", value: 4 },
];

const COLORS = ["#D4AF37", "#B8860B", "#0D0D0D", "#C0C0C0", "#1A1A1A"];

export default function AdminDashboardPage() {
  const orders = useAdminStore((s) => s.orders);
  const products = useAdminStore((s) => s.products);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 0);
  const totalOrders = orders.length;
  const lowStock = products.filter((p) => p.stock <= 5);
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
          <p className="mt-1 font-body text-sm text-black/50">Welcome back. Here&apos;s how H&amp;S Watches is performing.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} change="12.4%" icon={DollarSign} />
        <StatCard label="Total Orders" value={String(totalOrders)} change="8.1%" icon={ShoppingCart} />
        <StatCard label="Total Customers" value="6" change="4.2%" icon={Users} />
        <StatCard label="Active Products" value={String(products.filter((p) => p.status === "Active").length)} change="2 new" icon={Package} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-luxury border border-surface-border bg-white p-5 lg:col-span-2">
          <p className="font-display text-base font-semibold">Revenue Overview</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECECEC" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
                <YAxis tick={{ fontSize: 12 }} stroke="#999" tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Area type="monotone" dataKey="revenue" stroke="#B8860B" fill="url(#goldFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-luxury border border-surface-border bg-white p-5">
          <p className="font-display text-base font-semibold">Products by Collection</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_DATA} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {CATEGORY_DATA.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-luxury border border-surface-border bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="font-display text-base font-semibold">Recent Orders</p>
            <Link href="/admin/orders" className="flex items-center gap-1 font-body text-xs font-semibold text-gold-dark hover:text-gold">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-surface-border text-left">
                  <th className="pb-2 font-body text-xs font-semibold text-black/45">Order</th>
                  <th className="pb-2 font-body text-xs font-semibold text-black/45">Date</th>
                  <th className="pb-2 font-body text-xs font-semibold text-black/45">Total</th>
                  <th className="pb-2 font-body text-xs font-semibold text-black/45">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-surface-border last:border-0">
                    <td className="py-3 font-body text-sm font-semibold">{o.id}</td>
                    <td className="py-3 font-body text-sm text-black/55">{formatDateShort(o.createdAt)}</td>
                    <td className="py-3 font-body text-sm">{formatCurrency(o.total)}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-luxury border border-surface-border bg-white p-5">
          <p className="font-display text-base font-semibold">Low Stock Alerts</p>
          <div className="mt-4 space-y-3">
            {lowStock.length === 0 ? (
              <p className="font-body text-sm text-black/40">All products well stocked.</p>
            ) : (
              lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg bg-error/5 px-3 py-2.5">
                  <span className="font-body text-xs font-medium">{p.name}</span>
                  <span className="font-body text-xs font-bold text-error">{p.stock} left</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
