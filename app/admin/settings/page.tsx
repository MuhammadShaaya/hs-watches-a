"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { SITE_SETTINGS } from "@/lib/data/misc";

const TABS = ["General", "Branding", "SMTP", "Taxes", "Social Links", "SEO"] as const;

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("General");

  function handleSave() {
    toast.success("Settings saved successfully");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Settings</h1>
      <p className="mt-1 font-body text-sm text-black/50">Configure store-wide preferences.</p>

      <div className="mt-6 flex gap-6 overflow-x-auto border-b border-surface-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "whitespace-nowrap border-b-2 px-1 py-3 font-body text-sm font-semibold",
              tab === t ? "border-gold text-luxury-black" : "border-transparent text-black/40"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-2xl rounded-luxury border border-surface-border bg-white p-6">
        {tab === "General" && (
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-semibold">Store Name</label>
              <input defaultValue={SITE_SETTINGS.storeName} className="input-luxury mt-1.5" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold">Tagline</label>
              <input defaultValue={SITE_SETTINGS.tagline} className="input-luxury mt-1.5" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold">Contact Email</label>
              <input defaultValue={SITE_SETTINGS.contactEmail} className="input-luxury mt-1.5" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold">Contact Phone</label>
              <input defaultValue={SITE_SETTINGS.contactPhone} className="input-luxury mt-1.5" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold">Store Address</label>
              <textarea defaultValue={SITE_SETTINGS.address} rows={2} className="input-luxury mt-1.5" />
            </div>
          </div>
        )}

        {tab === "Branding" && (
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-semibold">Logo</label>
              <div className="mt-1.5 flex h-24 w-24 items-center justify-center rounded-luxury border-2 border-dashed border-surface-border font-display text-sm text-black/40">
                H&amp;S
              </div>
            </div>
            <div>
              <label className="font-body text-xs font-semibold">Favicon</label>
              <div className="mt-1.5 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-surface-border font-display text-xs text-black/40">
                H
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Primary Black", hex: "#0D0D0D" },
                { name: "Accent Gold", hex: "#D4AF37" },
                { name: "Dark Gold", hex: "#B8860B" },
              ].map((c) => (
                <div key={c.name}>
                  <div className="h-12 rounded-lg" style={{ backgroundColor: c.hex }} />
                  <p className="mt-1 font-body text-xs text-black/55">{c.name}</p>
                  <p className="font-body text-[11px] text-black/35">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "SMTP" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-semibold">SMTP Host</label>
                <input placeholder="smtp.gmail.com" className="input-luxury mt-1.5" />
              </div>
              <div>
                <label className="font-body text-xs font-semibold">SMTP Port</label>
                <input placeholder="587" className="input-luxury mt-1.5" />
              </div>
              <div>
                <label className="font-body text-xs font-semibold">Username</label>
                <input placeholder="noreply@hswatches.com" className="input-luxury mt-1.5" />
              </div>
              <div>
                <label className="font-body text-xs font-semibold">Password</label>
                <input type="password" placeholder="••••••••" className="input-luxury mt-1.5" />
              </div>
            </div>
            <p className="font-body text-xs text-black/40">Used for order confirmations and account verification emails via Nodemailer.</p>
          </div>
        )}

        {tab === "Taxes" && (
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-semibold">Default Tax Rate (%)</label>
              <input defaultValue={SITE_SETTINGS.taxRate * 100} type="number" className="input-luxury mt-1.5 max-w-[160px]" />
            </div>
            <p className="font-body text-xs text-black/40">Applied automatically at checkout to the order subtotal after discounts.</p>
          </div>
        )}

        {tab === "Social Links" && (
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-semibold">Instagram</label>
              <input defaultValue={SITE_SETTINGS.socialLinks.instagram} className="input-luxury mt-1.5" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold">Facebook</label>
              <input defaultValue={SITE_SETTINGS.socialLinks.facebook} className="input-luxury mt-1.5" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold">Pinterest</label>
              <input defaultValue={SITE_SETTINGS.socialLinks.pinterest} className="input-luxury mt-1.5" />
            </div>
          </div>
        )}

        {tab === "SEO" && (
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-semibold">Default Meta Title</label>
              <input defaultValue="H&S Watches | Luxury Timepieces, Timeless Craftsmanship" className="input-luxury mt-1.5" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold">Default Meta Description</label>
              <textarea rows={3} defaultValue="H&S Watches — luxury Swiss-style timepieces, hand-finished and built to last generations." className="input-luxury mt-1.5" />
            </div>
          </div>
        )}

        <button onClick={handleSave} className="btn-luxury-primary mt-6">Save Settings</button>
      </div>
    </div>
  );
}
