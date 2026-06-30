"use client";

import { AlertTriangle } from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import { formatDateShort } from "@/lib/format";

const MOCK_LOGS = [
  { id: "l1", productName: "Coastline Quartz Diver", change: -2, reason: "Order ORD-10004", date: new Date(Date.now() - 86400000).toISOString() },
  { id: "l2", productName: "Monarch Tourbillon", change: -1, reason: "Order ORD-09988", date: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: "l3", productName: "Ironclad Field Watch", change: 20, reason: "Restock from supplier", date: new Date(Date.now() - 6 * 86400000).toISOString() },
  { id: "l4", productName: "Aria Mother-of-Pearl", change: -3, reason: "Orders ORD-09950 to ORD-09952", date: new Date(Date.now() - 9 * 86400000).toISOString() },
];

export default function AdminInventoryPage() {
  const products = useAdminStore((s) => s.products);
  const lowStock = products.filter((p) => p.stock <= 5).sort((a, b) => a.stock - b.stock);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Inventory</h1>
      <p className="mt-1 font-body text-sm text-black/50">Monitor stock levels and recent inventory changes.</p>

      <div className="mt-6 rounded-luxury border border-error/20 bg-error/5 p-5">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-error" />
          <p className="font-display text-base font-semibold text-error">Low Stock Alerts ({lowStock.length})</p>
        </div>
        <div className="mt-4 space-y-2">
          {lowStock.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg bg-white px-4 py-3">
              <span className="font-body text-sm font-medium">{p.name}</span>
              <span className="font-body text-sm font-bold text-error">{p.stock} units left</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-luxury border border-surface-border bg-white p-6">
        <p className="font-display text-base font-semibold">Stock History</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-surface-border text-left">
                <th className="pb-2 font-body text-xs font-semibold text-black/45">Product</th>
                <th className="pb-2 font-body text-xs font-semibold text-black/45">Change</th>
                <th className="pb-2 font-body text-xs font-semibold text-black/45">Reason</th>
                <th className="pb-2 font-body text-xs font-semibold text-black/45">Date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LOGS.map((log) => (
                <tr key={log.id} className="border-b border-surface-border last:border-0">
                  <td className="py-3 font-body text-sm">{log.productName}</td>
                  <td className={`py-3 font-body text-sm font-semibold ${log.change > 0 ? "text-success" : "text-error"}`}>
                    {log.change > 0 ? "+" : ""}{log.change}
                  </td>
                  <td className="py-3 font-body text-sm text-black/55">{log.reason}</td>
                  <td className="py-3 font-body text-xs text-black/40">{formatDateShort(log.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
