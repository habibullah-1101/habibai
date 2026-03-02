import type { ReactNode } from "react";

export function ChatShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="w-[260px] bg-[var(--surface)] border-r border-[color:var(--border)]" />

      <main className="flex-1 flex flex-col bg-[var(--bg)]">
        <div className="h-14 border-b border-[color:var(--border)]" />
        <div className="flex-1">{children}</div>
        <div className="h-20 border-t border-[color:var(--border)]" />
      </main>
    </div>
  );
}
