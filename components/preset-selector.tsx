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
      <SelectTrigger className="w-[180px] rounded-xl">
        <SelectValue placeholder="Select preset" />
      </SelectTrigger>
      <SelectContent
        align="start"
        sideOffset={4}
        className="rounded-2xl border-0 shadow-border-medium bg-popover/95 backdrop-blur-sm animate-scale-in"
      >
        <SelectGroup>
          <SelectLabel className="text-xs text-muted-foreground px-2 py-1">
            Presets
          </SelectLabel>
          {PRESETS.map((preset) => (
            <SelectItem
              key={preset.id}
              value={preset.id}
              className="rounded-lg transition-colors duration-150 ease-out"
            >
              {preset.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
