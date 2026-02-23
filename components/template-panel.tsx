"use client";

import { Button } from "@/components/ui/button";

export function TemplatePanel({
  onSelectTemplate,
}: {
  onSelectTemplate: (templateId: string) => void;
}) {
  return <Button>Templates</Button>;
}
