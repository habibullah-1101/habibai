import { Globe, LayoutTemplate, Paperclip, Sparkles, type LucideIcon } from "lucide-react";

import { PRESETS } from "@/lib/presets";
import { TEMPLATES } from "@/lib/templates";

export type ToolsMenuPanel = "root" | "presets" | "templates";

export type ToolMenuItemConfig = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  panel: ToolsMenuPanel;
  action: "attach" | "panel" | "insert" | "select-preset" | "select-template";
  targetPanel?: ToolsMenuPanel;
  inputPrefix?: string;
  presetId?: string;
  templatePrompt?: string;
  closeOnSelect?: boolean;
};

export const TOOLS_MENU_TITLES: Record<ToolsMenuPanel, string> = {
  root: "Tools",
  presets: "Presets",
  templates: "Templates",
};

const ROOT_TOOLS: ToolMenuItemConfig[] = [
  {
    id: "attach-file",
    label: "Attach file",
    description: "Add a file to your next message.",
    icon: Paperclip,
    panel: "root",
    action: "attach",
    closeOnSelect: true,
  },
  {
    id: "web-search",
    label: "Search",
    description: "Use online sources for up-to-date answers.",
    icon: Globe,
    panel: "root",
    action: "insert",
    inputPrefix: "Search the web for ",
    closeOnSelect: true,
  },
  {
    id: "presets",
    label: "Presets",
    description: "Switch assistant behavior presets.",
    icon: Sparkles,
    panel: "root",
    action: "panel",
    targetPanel: "presets",
  },
  {
    id: "templates",
    label: "Templates",
    description: "Start from a prompt template.",
    icon: LayoutTemplate,
    panel: "root",
    action: "panel",
    targetPanel: "templates",
  },
];

const PRESET_TOOLS: ToolMenuItemConfig[] = PRESETS.map((preset) => ({
  id: `preset-${preset.id}`,
  label: preset.label,
  description: preset.description,
  icon: Sparkles,
  panel: "presets",
  action: "select-preset",
  presetId: preset.id,
  closeOnSelect: true,
}));

const TEMPLATE_TOOLS: ToolMenuItemConfig[] = TEMPLATES.map((template) => ({
  id: `template-${template.id}`,
  label: template.title,
  description: "Fill input with this template.",
  icon: LayoutTemplate,
  panel: "templates",
  action: "select-template",
  templatePrompt: template.prompt,
  closeOnSelect: true,
}));

export const TOOLS_MENU: ToolMenuItemConfig[] = [
  ...ROOT_TOOLS,
  ...PRESET_TOOLS,
  ...TEMPLATE_TOOLS,
];
