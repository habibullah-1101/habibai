import type { ReactNode } from "react";

export function ChatShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex">
      <aside className="w-[260px] h-full overflow-y-auto bg-[var(--surface)] border-r border-[color:var(--border)] flex flex-col">
        <div className="p-3 border-b border-[color:var(--border)] space-y-3">
          <h2 className="text-sm font-semibold tracking-wide text-[var(--text)]">Chats</h2>
          <button
            type="button"
            className="w-full px-3 py-2 text-sm text-left rounded-[var(--r-md)] border border-[color:var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface)] transition-colors duration-150 shadow-sm"
          >
            New chat
          </button>
        </div>

        <div className="flex-1 p-2 space-y-1">
          <div className="px-3 py-2 text-sm rounded-[var(--r-md)] cursor-pointer truncate transition-colors duration-150 hover:bg-[var(--surface-2)]">
            Product planning notes
          </div>
          <div className="px-3 py-2 text-sm rounded-[var(--r-md)] cursor-pointer truncate transition-colors duration-150 hover:bg-[var(--surface-2)]">
            Design feedback thread
          </div>
          <div className="px-3 py-2 text-sm rounded-[var(--r-md)] cursor-pointer truncate transition-colors duration-150 hover:bg-[var(--surface-2)]">
            Weekly standup recap
          </div>
        </div>

        <div className="p-3 border-t border-[color:var(--border)]">
          <div className="flex items-center gap-3 px-3 py-2 bg-[var(--surface-2)] rounded-[var(--r-md)] border border-[color:var(--border)]">
            <div className="h-7 w-7 rounded-[var(--r-sm)] bg-[var(--surface)] border border-[color:var(--border)]" />
            <span className="text-sm truncate">You</span>
          </div>
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
