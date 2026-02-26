"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/lib/ui-config";
import { useState } from "react";

export function Sidebar() {
  const [active, setActive] = useState<string>("home");

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-16 flex-col items-center gap-2 border-r bg-background/90 py-4 backdrop-blur-sm">
      {SIDEBAR_ITEMS.map((item) => {
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
  );
}
