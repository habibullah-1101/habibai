import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function CardBase({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[var(--surface)] border border-[var(--border)] rounded-[var(--r-lg)] p-4",
        className
      )}
      {...props}
    />
  )
}
