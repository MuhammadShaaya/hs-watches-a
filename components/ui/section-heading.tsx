import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", light && "text-gold")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-semibold sm:text-4xl",
          light ? "text-white" : "text-luxury-black"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 font-body text-sm leading-relaxed sm:text-base",
            align === "center" && "mx-auto max-w-xl",
            light ? "text-white/55" : "text-black/55"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
