"use client";

import { useAvailableModels } from "@/lib/hooks/use-available-models";
import { Loader2, ChevronDown } from "lucide-react";
import { DEFAULT_MODEL } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { memo } from "react";

type ModelSelectorProps = {
  modelId: string;
  onModelChange: (modelId: string) => void;
};

export const ModelSelector = memo(function ModelSelector({
  modelId = DEFAULT_MODEL,
  onModelChange,
}: ModelSelectorProps) {
  const { models, isLoading, error } = useAvailableModels();
  const selectedModelLabel =
    models?.find((model) => model.id === modelId)?.label ?? modelId.replace(/[-_]/g, " ");

  return (
    <Select
      value={modelId}
      onValueChange={onModelChange}
      disabled={isLoading || !!error || !models?.length}
    >
      <SelectTrigger className="h-9 w-auto min-w-[128px] rounded-full border border-border/70 bg-muted/35 px-3 text-sm font-medium shadow-border-small transition-colors hover:bg-muted/60 focus:ring-0 focus:ring-offset-0">
        <div className="flex items-center gap-1.5">
          {isLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Loading…</span>
            </>
          ) : error ? (
            <span className="text-red-500">Model unavailable</span>
          ) : !models?.length ? (
            <span>No models</span>
          ) : (
            <>
              <SelectValue>{selectedModelLabel}</SelectValue>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </>
          )}
        </div>
      </SelectTrigger>

      <SelectContent className="min-w-[180px] rounded-xl border border-border/80 bg-popover/95 p-1 shadow-border-medium backdrop-blur-sm animate-scale-in" align="start" sideOffset={6}>
        <SelectGroup>
          <SelectLabel className="text-xs text-muted-foreground px-2 py-1">Models</SelectLabel>
          {models?.map((model) => (
            <SelectItem key={model.id} value={model.id} className="rounded-lg transition-colors duration-150 ease-out">
              {model.label}
            </SelectItem>
          )) || []}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
