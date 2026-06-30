"use client";

import { Download } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import toast from "react-hot-toast";
import { useAdminStore } from "@/store/admin-store";
import { formatCurrency } from "@/lib/format";

const SALES_DATA = [
  { month: "Jan", sales: 28, revenue: 42000 },
  { month: "Feb", sales: 24, revenue: 38500 },
  { month: "Mar", sales: 33, revenue: 51200 },
  { month: "Apr", sales: 30, revenue: 47800 },
  { month: "May", sales: 39, revenue: 62300 },
  { month: "Jun", sales: 36, revenue: 58900 },
];

const CUSTOMER_GROWTH = [
  { month: "Jan", customers: 120 },
  { month: "Feb", customers: 145 },
  { month: "Mar", customers: 178 },
  { month: "Apr", customers: 201 },
  { month: "May", customers: 244 },
  { month: "Jun", customers: 289 },
];

export default function AdminReportsPage() {
  const products = useAdminStore((s) => s.products);
  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  function handleExport() {
    toast.success("Report exported as CSV");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Reports</h1>
          <p className="mt-1 font-body text-sm text-black/50">Revenue, orders, and customer analytics.</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 rounded-btn border border-surface-border px-4 py-2.5 font-body text-xs font-semibold hover:border-gold">
          <Download size={14} /> Export Report
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-luxury border border-surface-border bg-white p-5">
          <p className="font-display text-base font-semibold">Monthly Sales &amp; Revenue</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECECEC" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="sales" name="Units Sold" fill="#0D0D0D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-luxury border border-surface-border bg-white p-5">
          <p className="font-display text-base font-semibold">Customer Growth</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CUSTOMER_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECECEC" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-luxury border border-surface-border bg-white p-5">
        <p className="font-display text-base font-semibold">Top Products</p>
        <div className="mt-4 space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-gold-dark">#{i + 1}</span>
                <span className="font-body text-sm font-medium">{p.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-body text-xs text-black/50">{p.reviewCount} reviews</span>
                <span className="font-body text-sm font-semibold">{formatCurrency(p.salePrice ?? p.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
