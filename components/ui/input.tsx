import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
