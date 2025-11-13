import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#007BFF] to-[#6F00FF] text-white shadow-[0_0_12px_rgba(111,0,255,0.4)] hover:from-[#008CFF] hover:to-[#7A00FF] hover:shadow-[0_0_20px_rgba(111,0,255,0.6)] transition-all duration-300",
        
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 focus-visible:ring-red-500/30 shadow-[0_0_12px_rgba(255,0,0,0.4)]",

        outline:
          "border border-[#007BFF]/40 text-[#007BFF] hover:bg-[#007BFF]/10 hover:shadow-[0_0_15px_rgba(111,0,255,0.3)] dark:border-[#6F00FF]/50 dark:text-[#7A5FFF] dark:hover:bg-[#6F00FF]/10 transition-all duration-300",

        secondary:
          "bg-[#1A1A40]/80 text-white hover:bg-[#2A2A6F]/80 shadow-[0_0_15px_rgba(111,0,255,0.3)]",

        ghost:
          "text-[#007BFF] hover:bg-[#007BFF]/10 hover:text-white hover:shadow-[0_0_15px_rgba(111,0,255,0.4)] transition-all duration-300",

        link:
          "text-[#007BFF] underline-offset-4 hover:underline hover:text-[#6F00FF] transition-colors duration-200",
      },

      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
