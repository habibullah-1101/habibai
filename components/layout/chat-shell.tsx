import type { ReactNode } from "react";

export function ChatShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex">
      <aside className="w-[260px] h-full bg-[var(--surface)] border-r border-[color:var(--border)] flex flex-col">
        <div className="h-14 shrink-0 px-3 flex items-center justify-between border-b border-[color:var(--border)]">
          <span className="text-sm font-medium text-[var(--text)]">Habib AI</span>
          <div className="rounded-[var(--r-md)] border border-[color:var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs text-[var(--text)]">
            New chat
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          <div className="rounded-[var(--r-md)] px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)]">Chat placeholder 1</div>
          <div className="rounded-[var(--r-md)] px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)]">Chat placeholder 2</div>
          <div className="rounded-[var(--r-md)] px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)]">Chat placeholder 3</div>
          <div className="rounded-[var(--r-md)] px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)]">Chat placeholder 4</div>
          <div className="rounded-[var(--r-md)] px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)]">Chat placeholder 5</div>
          <div className="rounded-[var(--r-md)] px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)]">Chat placeholder 6</div>
          <div className="rounded-[var(--r-md)] px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)]">Chat placeholder 7</div>
        </div>

        <div className="h-16 shrink-0 border-t border-[color:var(--border)] px-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[var(--surface-2)] border border-[color:var(--border)]" />
          <span className="text-sm text-[var(--text)]">Habib</span>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[var(--bg)]">
        <div className="h-14 shrink-0 border-b border-[color:var(--border)]" />
        <div className="flex-1 overflow-y-auto">{children}</div>
        <div className="h-20 shrink-0 border-t border-[color:var(--border)]" />
      </main>
    </div>
  );
}
