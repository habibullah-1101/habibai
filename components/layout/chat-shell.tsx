import type { ReactNode } from "react";

export function ChatShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex">
      <div className="w-[260px] h-full overflow-y-auto bg-[var(--surface)] border-r border-[color:var(--border)]" />

      <main className="flex-1 flex flex-col overflow-hidden bg-[var(--bg)]">
        <div className="h-14 shrink-0 border-b border-[color:var(--border)]" />
        <div className="flex-1 overflow-y-auto">{children}</div>
        <div className="h-20 shrink-0 border-t border-[color:var(--border)]" />
      </main>
    </div>
  );
}
