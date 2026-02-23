"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/templates";

export function TemplatePanel({
  onSelectTemplate,
}: {
  onSelectTemplate: (templateId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <Button type="button" onClick={() => setOpen((previous) => !previous)}>
        Templates
      </Button>

      {open ? (
        <div className="absolute left-0 z-10 mt-2 w-56 rounded-md border bg-background p-1 shadow-md">
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
