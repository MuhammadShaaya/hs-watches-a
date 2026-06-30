import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types";

const STYLES: Record<OrderStatus, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  Packed: "bg-violet-100 text-violet-700 border-violet-200",
  Shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Delivered: "bg-green-100 text-green-700 border-green-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
  Returned: "bg-gray-200 text-gray-700 border-gray-300",
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        STYLES[status]
      )}
    >
      {status}
    </span>
  );
}
