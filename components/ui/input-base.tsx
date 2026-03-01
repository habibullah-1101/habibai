import type { ComponentProps } from "react"

export function InputBase({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={[
        "rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--surface)] px-[0.8rem] py-[0.6rem] text-[var(--text)]",
        "focus:outline-2 focus:outline-[var(--ring)] focus:outline-offset-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
}
