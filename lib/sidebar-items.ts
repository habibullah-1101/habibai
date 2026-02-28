import {
  Bot,
  Boxes,
  Code2,
  FolderKanban,
  Image,
  type LucideIcon,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export type SidebarRailItem = {
  id: string;
  icon: LucideIcon;
  label: string;
};

export type SidebarMenuItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  description?: string;
};

export const SIDEBAR_RAIL_ITEMS: SidebarRailItem[] = [
  { id: "chatgpt", icon: MessageSquare, label: "ChatGPT" },
  { id: "images", icon: Image, label: "Images" },
  { id: "codex", icon: Code2, label: "Codex" },
  { id: "apps", icon: Boxes, label: "Apps" },
  { id: "gpts", icon: Sparkles, label: "GPTs" },
];

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: "chatgpt",
    icon: MessageSquare,
    label: "ChatGPT",
    description: "General chat and answers",
  },
  {
    id: "images",
    icon: Image,
    label: "Images",
    description: "Generate and edit visuals",
  },
  {
    id: "codex",
    icon: Code2,
    label: "Codex",
    description: "Coding and developer workflows",
  },
  {
    id: "apps",
    icon: Boxes,
    label: "Apps",
    description: "Connected app assistants",
  },
  {
    id: "gpts",
    icon: Bot,
    label: "GPTs",
    description: "Custom assistants",
  },
];

export const SIDEBAR_PROJECTS = [
  { id: "project-1", name: "Q1 Product Launch" },
  { id: "project-2", name: "Design Critique" },
  { id: "project-3", name: "Marketing Drafts" },
];

export const SIDEBAR_PROFILE = {
  name: "Habib",
  email: "habib@example.com",
  tier: "Pro",
};

export const SIDEBAR_PRIMARY_PROJECT_ICON = FolderKanban;
