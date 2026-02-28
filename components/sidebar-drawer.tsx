"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SIDEBAR_MENU_ITEMS,
  SIDEBAR_PRIMARY_PROJECT_ICON,
  SIDEBAR_PROFILE,
  SIDEBAR_PROJECTS,
} from "@/lib/sidebar-items";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarDrawerProps = {
  activeId: string;
  onSelectItem: (id: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SidebarDrawer({
  activeId,
  onSelectItem,
  open,
  onOpenChange,
}: SidebarDrawerProps) {
  const ProjectIcon = SIDEBAR_PRIMARY_PROJECT_ICON;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[320px] max-w-[85vw] flex-col border-r border-border/70 bg-background/95 p-4 shadow-2xl outline-none backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-sm font-semibold tracking-tight text-foreground/90">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Close menu">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="h-10 rounded-xl pl-9" />
          </div>

          <div className="space-y-1">
            {SIDEBAR_MENU_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectItem(item.id);
                    onOpenChange(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted/70",
                    activeId === item.id && "bg-muted text-foreground shadow-border-small",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex-1 overflow-y-auto rounded-xl border border-border/60 bg-muted/20 p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Projects</p>
            <div className="space-y-1.5">
              {SIDEBAR_PROJECTS.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-foreground/90 transition-colors hover:bg-muted/70"
                >
                  <ProjectIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{project.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border/70 bg-muted/20 p-3">
            <p className="text-sm font-medium">{SIDEBAR_PROFILE.name}</p>
            <p className="text-xs text-muted-foreground">{SIDEBAR_PROFILE.email}</p>
            <p className="mt-1 text-xs font-medium text-foreground/80">Plan: {SIDEBAR_PROFILE.tier}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
