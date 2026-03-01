import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ButtonProps = ComponentProps<"button"> & {
  variant?: string
  size?: string
}

export default function Button({ className, type = "button", ...props }: ButtonProps) {
  const { variant, size, ...buttonProps } = props
  void variant
  void size

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--r-md)] border border-transparent bg-[var(--accent)] px-[1rem] py-[0.6rem] text-[var(--bg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] hover:bg-[var(--accent-weak)] disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...buttonProps}
    />
  )
}
