"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const ZONES = [
  { id: "z1", name: "United States", rate: 0, days: "3-5 business days" },
  { id: "z2", name: "Canada", rate: 0, days: "5-8 business days" },
  { id: "z3", name: "Europe", rate: 0, days: "6-10 business days" },
  { id: "z4", name: "Rest of World", rate: 0, days: "8-14 business days" },
];

export default function AdminShippingPage() {
  const [zones, setZones] = useState(ZONES);
  const [freeThreshold, setFreeThreshold] = useState(0);

  function handleSave() {
    toast.success("Shipping settings saved");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Shipping</h1>
      <p className="mt-1 font-body text-sm text-black/50">Manage shipping zones and delivery estimates.</p>

      <div className="mt-6 rounded-luxury border border-surface-border bg-white p-6">
        <p className="font-display text-base font-semibold">Free Shipping Threshold</p>
        <p className="mt-1 font-body text-xs text-black/45">Currently free on all orders, store-wide.</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-body text-sm">$</span>
          <input type="number" value={freeThreshold} onChange={(e) => setFreeThreshold(Number(e.target.value))} className="input-luxury max-w-[140px]" />
        </div>
      </div>

      <div className="mt-6 rounded-luxury border border-surface-border bg-white p-6">
        <p className="font-display text-base font-semibold">Shipping Zones</p>
        <div className="mt-4 space-y-3">
          {zones.map((z) => (
            <div key={z.id} className="grid grid-cols-3 items-center gap-3 rounded-btn border border-surface-border p-4">
              <span className="font-body text-sm font-semibold">{z.name}</span>
              <span className="font-body text-sm text-black/55">{z.days}</span>
              <span className="text-right font-body text-sm text-success">Free</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="btn-luxury-primary mt-6">Save Settings</button>
    </div>
  );
}
