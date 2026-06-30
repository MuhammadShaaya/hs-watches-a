import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  change,
  positive = true,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-luxury border border-surface-border bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-luxury-black text-gold">
          <Icon size={18} />
        </div>
        {change && (
          <span className={cn("font-body text-xs font-semibold", positive ? "text-success" : "text-error")}>
            {positive ? "+" : ""}{change}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold">{value}</p>
      <p className="font-body text-xs text-black/50">{label}</p>
    </div>
  );
}
