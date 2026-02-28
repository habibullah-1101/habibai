"use client";

import { Button } from "@/components/ui/button";
import { SidebarDrawer } from "@/components/sidebar-drawer";
import { cn } from "@/lib/utils";
import { SIDEBAR_RAIL_ITEMS } from "@/lib/sidebar-items";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [active, setActive] = useState<string>("chatgpt");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setDrawerOpen(true)}
        className="fixed left-4 top-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/90 shadow-border-small backdrop-blur-sm md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-16 flex-col items-center gap-2 border-r bg-background/90 py-4 backdrop-blur-sm md:flex">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          title="Open menu"
          onClick={() => setDrawerOpen(true)}
          className="mb-1 h-10 w-10 rounded-xl"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {SIDEBAR_RAIL_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={item.label}
              title={item.label}
              onClick={() => setActive(item.id)}
              className={cn(
                "h-10 w-10 rounded-xl",
                active === item.id && "bg-muted text-foreground shadow-border-small",
              )}
            >
              <Icon className="h-5 w-5" />
            </Button>
          );
        })}
      </aside>

      <SidebarDrawer
        activeId={active}
        onSelectItem={setActive}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
