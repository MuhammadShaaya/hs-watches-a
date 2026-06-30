"use client";

import { useState } from "react";
import { Package, Tag, Star, Bell } from "lucide-react";
import AccountLayout from "@/components/account/account-layout";
import { formatDateShort } from "@/lib/format";

const NOTIFS = [
  { id: "1", type: "order", message: "Your order ORD-10002 has shipped", date: new Date(Date.now() - 2 * 86400000).toISOString(), read: false },
  { id: "2", type: "promo", message: "VIP20 — 20% off Limited Edition pieces this week only", date: new Date(Date.now() - 5 * 86400000).toISOString(), read: true },
  { id: "3", type: "review", message: "We'd love your review on the Meridian Automatic Chronograph", date: new Date(Date.now() - 8 * 86400000).toISOString(), read: true },
  { id: "4", type: "order", message: "Your order ORD-10001 was delivered", date: new Date(Date.now() - 38 * 86400000).toISOString(), read: true },
];

const ICONS: Record<string, typeof Package> = { order: Package, promo: Tag, review: Star };

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFS);

  return (
    <AccountLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Notifications</h1>
          <p className="mt-1 font-body text-sm text-black/50">Stay updated on orders, promotions, and reviews.</p>
        </div>
        <button onClick={() => setNotifs(notifs.map((n) => ({ ...n, read: true })))} className="font-body text-xs font-semibold text-gold-dark hover:text-gold">
          Mark all as read
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {notifs.map((n) => {
          const Icon = ICONS[n.type] ?? Bell;
          return (
            <div
              key={n.id}
              className={`flex items-start gap-3 rounded-luxury border p-4 ${n.read ? "border-surface-border bg-white" : "border-gold/30 bg-gold/5"}`}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-luxury-black text-gold">
                <Icon size={15} />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm">{n.message}</p>
                <p className="mt-1 font-body text-xs text-black/40">{formatDateShort(n.date)}</p>
              </div>
              {!n.read && <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold" />}
            </div>
          );
        })}
      </div>
    </AccountLayout>
  );
}
