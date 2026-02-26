import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

export type ComposerAction = {
  id: string;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
};

export type ComposerPillProps = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  leftActions?: ComposerAction[];
  rightActions?: ComposerAction[];
};

export function ComposerPill({
  value,
  onChange,
  onSend,
  leftActions,
  rightActions,
}: ComposerPillProps) {
  return (
    <div className="rounded-2xl glass-effect shadow-border-medium transition-all duration-200 ease-out">
      <textarea
        name="prompt"
        placeholder="Describe what you want the AI to do..."
        onChange={(event) => onChange(event.target.value)}
        value={value}
        className="min-h-[120px] md:min-h-[160px] w-full resize-none border-0 bg-transparent p-3 md:p-4 text-base placeholder:text-muted-foreground/60 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault();
            onSend();
          }
        }}
      />
      <div className="flex items-center justify-between gap-3 border-t p-3 md:p-4">
        <div className="flex items-center gap-2 md:gap-3">
          {leftActions?.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                type="button"
                variant="outline"
                size="sm"
                title={action.label}
                aria-label={action.label}
                className="gap-1.5"
                onClick={action.onClick}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{action.label}</span>
              </Button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {rightActions?.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                type="button"
                variant="ghost"
                size="sm"
                title={action.label}
                aria-label={action.label}
                className="gap-1.5"
                onClick={action.onClick}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
