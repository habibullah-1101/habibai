import type { ComponentProps } from "react"

export function ButtonBase({ className, type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={[
        "rounded-[var(--r-md)] bg-[var(--accent)] px-4 py-[0.6rem] text-[var(--bg)]",
        "transition-opacity hover:opacity-90",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
}
