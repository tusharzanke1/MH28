import { cn } from "@/lib/utils";

export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700",
      className
    )}
    {...props}
  />
);
