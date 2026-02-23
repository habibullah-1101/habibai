"use client";

import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/templates";

export function TemplatePanel({
  onSelectTemplate,
}: {
  onSelectTemplate: (templateId: string) => void;
}) {
  return (
    <Button onClick={() => onSelectTemplate(TEMPLATES[0]?.prompt ?? "")}>
      Templates
    </Button>
  );
}
