import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.38),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.18),transparent_42%)] before:opacity-90 before:content-[''] after:absolute after:inset-x-4 after:top-0 after:h-px after:bg-white/70 after:content-['']",
  {
    variants: {
      variant: {
        terracotta:
          "system-button hover:brightness-110",
        accent:
          "accent-button hover:brightness-110",
        glass: "glass-panel text-primary hover:bg-white/60",
        subtle: "bg-primary/10 text-primary hover:bg-primary/15",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-sm",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "terracotta",
      size: "md",
    },
  },
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean;
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(liquidButtonVariants({ variant, size }), className)} {...props}>
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </Comp>
    );
  },
);
LiquidButton.displayName = "LiquidButton";

export { LiquidButton };
