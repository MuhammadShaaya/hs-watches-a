"use client";

import { Package, Boxes, Star, Settings as SettingsIcon } from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import { formatDateShort } from "@/lib/format";

const ICONS = { order: Package, stock: Boxes, review: Star, system: SettingsIcon };

export default function AdminNotificationsPage() {
  const notifications = useAdminStore((s) => s.notifications);
  const markRead = useAdminStore((s) => s.markNotificationRead);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Notifications</h1>
      <p className="mt-1 font-body text-sm text-black/50">System-wide alerts for orders, stock, and reviews.</p>

      <div className="mt-6 space-y-2">
        {notifications.map((n) => {
          const Icon = ICONS[n.type];
          return (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`flex w-full items-start gap-3 rounded-luxury border p-4 text-left ${n.read ? "border-surface-border bg-white" : "border-gold/30 bg-gold/5"}`}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-luxury-black text-gold">
                <Icon size={15} />
              </div>
              <div>
                <p className="font-body text-sm">{n.message}</p>
                <p className="mt-1 font-body text-xs text-black/40">{formatDateShort(n.date)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
