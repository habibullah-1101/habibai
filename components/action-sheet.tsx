"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";

export type ActionSheetItem = {
  id: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  onClick: () => void;
  closeOnSelect?: boolean;
};

export type ActionSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ActionSheetItem[];
  title?: string;
  onBack?: () => void;
};

export function ActionSheet({
  open,
  onOpenChange,
  items,
  title = "Habib AI",
  onBack,
}: ActionSheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[70vh] flex-col rounded-t-3xl border border-border/70 bg-background/95 p-4 pb-6 shadow-2xl outline-none backdrop-blur-md sm:mx-auto sm:max-w-xl">
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-muted" />
          <div className="mb-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              {onBack ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-muted-foreground"
                  onClick={onBack}
                >
                  Back
                </Button>
              ) : null}
              <Dialog.Title className="text-sm font-semibold tracking-tight">{title}</Dialog.Title>
            </div>
          </div>
          <div className="space-y-1 overflow-y-auto pr-1">
            {items.map((item) => {
              const Icon = item.icon ?? Sparkles;

              return (
                <button
                  key={item.id}
                  type="button"
                  className="flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-muted/70"
                  onClick={() => {
                    item.onClick();
                    if (item.closeOnSelect ?? true) {
                      onOpenChange(false);
                    }
                  }}
                >
                  <span className="mt-0.5 rounded-xl border border-border/70 bg-muted/40 p-2">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{item.label}</span>
                    {item.description && (
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
