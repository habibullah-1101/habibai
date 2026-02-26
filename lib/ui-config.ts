import {
  Database,
  LayoutGrid,
  Paperclip,
  PlusIcon,
  Send,
  User,
  type LucideIcon,
} from "lucide-react";

export type SidebarItemConfig = {
  id: string;
  icon: LucideIcon;
  label: string;
};

export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  { id: "home", icon: LayoutGrid, label: "Home" },
  { id: "templates", icon: Database, label: "Templates" },
  { id: "profile", icon: User, label: "Profile" },
];

export type TopbarButtonConfig = {
  id: string;
  type: "button" | "theme-toggle";
  icon?: LucideIcon;
  label: string;
  title: string;
};

export const DEFAULT_TOPBAR_BUTTONS: TopbarButtonConfig[] = [
  {
    id: "new-chat",
    type: "button",
    icon: PlusIcon,
    label: "Start new chat",
    title: "Start new chat",
  },
  {
    id: "theme-toggle",
    type: "theme-toggle",
    label: "Toggle theme",
    title: "Toggle theme",
  },
];

export type ComposerActionConfig = {
  id: string;
  icon: LucideIcon;
  label: string;
};

export const DEFAULT_COMPOSER_LEFT_ACTIONS: ComposerActionConfig[] = [
  { id: "attach", icon: Paperclip, label: "Attach" },
];

export const DEFAULT_COMPOSER_RIGHT_ACTIONS: ComposerActionConfig[] = [
  { id: "send", icon: Send, label: "Send" },
];
