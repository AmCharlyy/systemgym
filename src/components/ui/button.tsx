import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "black";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-bold uppercase transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none",
          {
            "bg-[#ff0000] text-white hover:bg-[#e60000]": variant === "default",
            "bg-black text-white hover:bg-gray-900": variant === "black",
            "bg-white text-black hover:bg-gray-100": variant === "outline",
            "border-transparent bg-transparent text-black shadow-none hover:bg-gray-100 active:translate-x-0 active:translate-y-0": variant === "ghost",
            "h-14 px-4 py-2 text-base": size === "default",
            "h-10 rounded-md px-3": size === "sm",
            "h-16 px-8 text-lg": size === "lg",
            "h-12 w-12 p-2": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
