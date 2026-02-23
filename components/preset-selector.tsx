"use client";

import { memo } from "react";
import { PRESETS } from "@/lib/presets";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PresetSelectorProps = {
  presetId: string;
  onPresetChange: (presetId: string) => void;
};

export const PresetSelector = memo(function PresetSelector({
  presetId,
  onPresetChange,
}: PresetSelectorProps) {
  return (
    <Select value={presetId} onValueChange={onPresetChange}>
      <SelectTrigger className="w-9 h-9 md:w-[170px] border-0 bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:outline-none focus:border-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl font-medium text-sm p-0 md:px-3 [&_[data-placeholder]]:hidden md:[&_[data-placeholder]]:block [&>svg]:hidden md:[&>svg]:block">
        <div className="flex items-center justify-center w-full h-full md:hidden">
          <span className="text-xs">P</span>
        </div>
        <div className="hidden md:flex items-center gap-2 w-full">
          <SelectValue placeholder="Preset" />
        </div>
      </SelectTrigger>

      <SelectContent className="rounded-2xl border-0 shadow-border-medium bg-popover/95 backdrop-blur-sm animate-scale-in" align="start" sideOffset={4}>
        <SelectGroup>
          <SelectLabel className="text-xs text-muted-foreground px-2 py-1">Presets</SelectLabel>
          {PRESETS.map((preset) => (
            <SelectItem key={preset.id} value={preset.id} className="rounded-lg transition-colors duration-150 ease-out">
              {preset.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
