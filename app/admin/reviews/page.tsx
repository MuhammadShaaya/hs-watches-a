"use client";

import { useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminStore } from "@/store/admin-store";
import Stars from "@/components/ui/stars";
import { formatDateShort } from "@/lib/format";

interface ReviewRow {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export default function AdminReviewsPage() {
  const products = useAdminStore((s) => s.products);

  const initialReviews: ReviewRow[] = products.flatMap((p) =>
    p.reviews.slice(0, 1).map((r) => ({
      id: r.id,
      productName: p.name,
      customerName: r.customerName,
      rating: r.rating,
      comment: r.comment,
      date: r.date,
      status: "approved" as const,
    }))
  );
  initialReviews.push({
    id: "pending-1",
    productName: "Vantage Smart Luxury",
    customerName: "Priya Patel",
    rating: 2,
    comment: "Battery life is shorter than advertised in cold weather. Otherwise nice build quality.",
    date: new Date().toISOString(),
    status: "pending",
  });

  const [reviews, setReviews] = useState<ReviewRow[]>(initialReviews);

  function updateStatus(id: string, status: ReviewRow["status"]) {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Review ${status}`);
  }

  function handleDelete(id: string) {
    setReviews(reviews.filter((r) => r.id !== id));
    toast.success("Review deleted");
  }

  const pending = reviews.filter((r) => r.status === "pending");
  const others = reviews.filter((r) => r.status !== "pending");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Reviews</h1>
      <p className="mt-1 font-body text-sm text-black/50">Moderate customer reviews across all products.</p>

      {pending.length > 0 && (
        <div className="mt-6">
          <p className="font-display text-base font-semibold text-amber-600">Pending Approval ({pending.length})</p>
          <div className="mt-3 space-y-3">
            {pending.map((r) => (
              <div key={r.id} className="rounded-luxury border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm font-semibold">{r.productName}</p>
                    <p className="font-body text-xs text-black/45">{r.customerName} · {formatDateShort(r.date)}</p>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="mt-2 font-body text-sm text-black/65">{r.comment}</p>
                <div className="mt-3 flex gap-3">
                  <button onClick={() => updateStatus(r.id, "approved")} className="flex items-center gap-1.5 rounded-btn bg-success px-3 py-1.5 font-body text-xs font-semibold text-white">
                    <Check size={12} /> Approve
                  </button>
                  <button onClick={() => updateStatus(r.id, "rejected")} className="flex items-center gap-1.5 rounded-btn border border-error/30 px-3 py-1.5 font-body text-xs font-semibold text-error">
                    <X size={12} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="font-display text-base font-semibold">All Reviews</p>
        <div className="mt-3 space-y-2">
          {others.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-luxury border border-surface-border bg-white p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display text-sm font-semibold">{r.productName}</p>
                  <span className={`rounded-full px-2 py-0.5 font-body text-[10px] font-semibold ${r.status === "approved" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                    {r.status}
                  </span>
                </div>
                <p className="mt-1 font-body text-xs text-black/45">{r.customerName} · {formatDateShort(r.date)}</p>
                <Stars rating={r.rating} className="mt-1" />
              </div>
              <button onClick={() => handleDelete(r.id)} className="text-black/35 hover:text-error"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
