import { Truck, ShieldCheck, RotateCcw, Gem } from "lucide-react";

export default function PromoBanner() {
  const items = [
    { icon: Truck, title: "Free Worldwide Shipping", desc: "On every order, every time" },
    { icon: ShieldCheck, title: "5-Year Warranty", desc: "Backed across our full range" },
    { icon: RotateCcw, title: "30-Day Returns", desc: "No questions asked" },
    { icon: Gem, title: "Lifetime Authentication", desc: "Verified provenance, always" },
  ];
  return (
    <section className="border-y border-surface-border bg-surface-bg py-12">
      <div className="container grid grid-cols-2 gap-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-luxury-black text-gold">
              <item.icon size={20} />
            </div>
            <div>
              <p className="font-display text-sm font-semibold">{item.title}</p>
              <p className="font-body text-xs text-black/50">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
