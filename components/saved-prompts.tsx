"use client";

import { memo, useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  loadSavedPrompts,
  removePrompt,
  savePrompt,
  type SavedPrompt,
} from "@/lib/storage";

type SavedPromptsProps = {
  currentInput: string;
  onPickPrompt: (text: string) => void;
};

const MAX_VISIBLE_ITEMS = 10;

export const SavedPrompts = memo(function SavedPrompts({
  currentInput,
  onPickPrompt,
}: SavedPromptsProps) {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);

  const refreshPrompts = useCallback(() => {
    const next = loadSavedPrompts()
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_VISIBLE_ITEMS);
    setPrompts(next);
  }, []);

  useEffect(() => {
    refreshPrompts();
  }, [refreshPrompts]);

  const handleSave = useCallback(() => {
    savePrompt(currentInput);
    refreshPrompts();
  }, [currentInput, refreshPrompts]);

  const handleRemove = useCallback(
    (id: string) => {
      removePrompt(id);
      refreshPrompts();
    },
    [refreshPrompts],
  );

  const trimmedInput = currentInput.trim();

  return (
    <section className="rounded-2xl border bg-card/60 p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium">Saved prompts</h2>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleSave}
          disabled={trimmedInput.length === 0}
        >
          Save
        </Button>
      </div>

      {prompts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No saved prompts yet.</p>
      ) : (
        <ul className="space-y-2">
          {prompts.map((prompt) => (
            <li key={prompt.id}>
              <div className="flex items-start gap-2 rounded-xl border bg-background/80 p-2">
                <button
                  type="button"
                  onClick={() => onPickPrompt(prompt.text)}
                  className="flex-1 text-left text-sm text-foreground hover:text-primary"
                  aria-label={`Use saved prompt: ${prompt.text}`}
                >
                  {prompt.text}
                </button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemove(prompt.id);
                  }}
                  aria-label="Delete saved prompt"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
});
