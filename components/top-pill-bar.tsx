import type { ReactNode } from "react";

export type TopPillBarProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export function TopPillBar({ left, center, right }: TopPillBarProps) {
  return (
    <div className="relative mx-auto flex h-12 w-full max-w-3xl items-center justify-between rounded-full border border-border/70 bg-background/90 px-2.5 shadow-border-small backdrop-blur-sm md:px-3">
      <div className="z-10 flex min-w-0 flex-1 items-center gap-2">{left}</div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="pointer-events-auto">{center}</div>
      </div>
      <div className="z-10 flex min-w-0 flex-1 items-center justify-end gap-2">{right}</div>
    </div>
  );
}
