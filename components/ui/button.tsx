import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition",
        variant === "default" &&
          "bg-brand-600 text-white hover:bg-brand-700",
        variant === "outline" &&
          "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
        variant === "ghost" && "text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}
);
Button.displayName = "Button";
