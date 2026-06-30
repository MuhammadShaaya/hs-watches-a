import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Stars({
  rating,
  count,
  size = 14,
  className,
}: {
  rating: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(rating) ? "fill-gold text-gold" : "fill-transparent text-black/20"}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="font-body text-xs text-black/50">({count})</span>
      )}
    </div>
  );
}
