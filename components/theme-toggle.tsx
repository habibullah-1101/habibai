"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={mounted ? () => setTheme(theme === "dark" ? "light" : "dark") : undefined}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="h-9 w-9 rounded-full border border-border/60 bg-muted/35 hover:bg-muted/60"
    >
      {mounted && theme !== "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}
