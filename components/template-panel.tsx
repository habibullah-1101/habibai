"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/templates";

export function TemplatePanel({
  onSelectTemplate,
}: {
  onSelectTemplate: (templatePrompt: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <Button type="button" onClick={() => setOpen((previous) => !previous)}>
        Templates
      </Button>

      {open ? (
        <div className="absolute left-0 top-full z-10 mt-2 max-h-64 w-56 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-md border bg-background p-1 shadow-md">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              className="block w-full rounded-sm px-2 py-1 text-left text-sm hover:bg-muted"
              onClick={() => {
                onSelectTemplate(template.prompt);
                setOpen(false);
              }}
            >
              {template.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
