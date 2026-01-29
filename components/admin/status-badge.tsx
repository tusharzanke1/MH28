import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PLACED: "bg-blue-50 text-blue-700",
  PAID: "bg-green-50 text-green-700",
  PACKED: "bg-amber-50 text-amber-700",
  SHIPPED: "bg-purple-50 text-purple-700",
  DELIVERED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
  RETURNED: "bg-gray-100 text-gray-700",
};

export const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
      statusStyles[status] ?? "bg-gray-100 text-gray-700"
    )}
  >
    {status}
  </span>
);
