"use client";

import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { ModelSelector } from "@/components/model-selector";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect, useRef } from "react";
import { DEFAULT_MODEL } from "@/lib/constants";
import { DEFAULT_COMPOSER_RIGHT_ACTIONS } from "@/lib/ui-config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Menu, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Streamdown } from "streamdown";
import { Sidebar } from "@/components/sidebar";
import { TopPillBar } from "@/components/top-pill-bar";
import { ComposerPill } from "@/components/composer-pill";
import { ActionSheet, type ActionSheetItem } from "@/components/action-sheet";
import { TOOLS_MENU, TOOLS_MENU_TITLES, type ToolsMenuPanel } from "@/lib/tools-menu";

function ModelSelectorHandler({
  modelId,
  onModelIdChange,
}: {
  modelId: string;
  onModelIdChange: (newModelId: string) => void;
}) {
  const router = useRouter();

  const handleSelectChange = (newModelId: string) => {
    onModelIdChange(newModelId);
    const params = new URLSearchParams();
    params.set("modelId", newModelId);
    router.push(`?${params.toString()}`);
  };

  return <ModelSelector modelId={modelId} onModelChange={handleSelectChange} />;
}

function HamburgerButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Open sidebar menu"
      title="Menu"
      className="h-9 w-9 rounded-full border border-border/60 bg-muted/35 hover:bg-muted/60"
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
}

function TopbarButtons({ onNewChat }: { onNewChat: () => void }) {
  return (
    <>
      <Button
        type="button"
        onClick={onNewChat}
        variant="ghost"
        size="icon"
        title="Start new chat"
        aria-label="Start new chat"
        className={cn(
          "h-9 w-9 rounded-full border border-border/60 bg-muted/35",
          "hover:bg-muted/60",
        )}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <ThemeToggle />
    </>
  );
}

export function Chat({ modelId = DEFAULT_MODEL }: { modelId: string }) {
  const [input, setInput] = useState("");
  const [currentModelId, setCurrentModelId] = useState(modelId);
  const [currentPresetId, setCurrentPresetId] = useState("caption_writer");
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [toolsPanel, setToolsPanel] = useState<ToolsMenuPanel>("root");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleModelIdChange = (newModelId: string) => {
    setCurrentModelId(newModelId);
  };

  const { messages, error, sendMessage, regenerate, setMessages, stop, status } = useChat();

  const hasMessages = messages.length > 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    stop();
    setMessages([]);
    setInput("");
  };

  const onSend = () => {
    if (!input.trim()) {
      return;
    }

    sendMessage(
      { text: input },
      { body: { modelId: currentModelId, presetId: currentPresetId } },
    );
    setInput("");
  };

  const leftActions = [{
    id: "tools-menu",
    label: "Tools",
    icon: Plus,
    onClick: () => setActionSheetOpen(true),
  }];

  const rightActions = DEFAULT_COMPOSER_RIGHT_ACTIONS.map((action) => ({
    ...action,
    onClick: action.id === "send" ? onSend : () => undefined,
  }));

  const actionSheetItems: ActionSheetItem[] = TOOLS_MENU
    .filter((item) => item.panel === toolsPanel)
    .map((item) => ({
      id: item.id,
      label: item.label,
      description: item.description,
      icon: item.icon,
      closeOnSelect: item.closeOnSelect,
      onClick: () => {
        if (item.action === "panel" && item.targetPanel) {
          setToolsPanel(item.targetPanel);
          return;
        }

        if (item.action === "insert" && item.inputPrefix) {
          setInput((prev) => prev || item.inputPrefix || "");
          setToolsPanel("root");
          return;
        }

        if (item.action === "attach") {
          fileInputRef.current?.click();
          setToolsPanel("root");
          return;
        }

        if (item.action === "select-preset" && item.presetId) {
          setCurrentPresetId(item.presetId);
          setInput(`Using ${item.label} preset: `);
          setToolsPanel("root");
          return;
        }

        if (item.action === "select-template" && item.templatePrompt) {
          setInput(item.templatePrompt);
          setToolsPanel("root");
        }
      },
    }));

  return (
    <div className="flex h-screen flex-col overflow-hidden pl-16 pt-14">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(event) => {
          const fileName = event.target.files?.[0]?.name;

          if (fileName) {
            setInput((prev) => (prev ? `${prev}
Attached file: ${fileName}` : `Attached file: ${fileName}`));
          }

          event.target.value = "";
        }}
      />
      <Sidebar />
      <header className="fixed top-0 left-16 right-0 z-20 bg-transparent px-4 py-2 animate-fade-in md:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <TopPillBar
            left={<HamburgerButton />}
            center={
              <ModelSelectorHandler
                modelId={currentModelId}
                onModelIdChange={handleModelIdChange}
              />
            }
            right={<TopbarButtons onNewChat={handleNewChat} />}
          />
        </div>
      </header>
      {!hasMessages && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 animate-fade-in">
          <div className="w-full max-w-2xl text-center space-y-8 md:space-y-12">
            <h1 className="text-3xl md:text-6xl font-light tracking-tight text-foreground animate-slide-up">
              <span className="font-mono font-semibold tracking-tight bg-foreground text-background px-4 py-3 rounded-2xl shadow-border-medium">
                HABIB AI
              </span>
            </h1>
            <div className="w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSend();
                }}
              >
                <ComposerPill
                  value={input}
                  onChange={setInput}
                  leftActions={leftActions}
                  rightActions={rightActions}
                  onSend={onSend}
                />
              </form>
            </div>
          </div>
        </div>
      )}

      {hasMessages && (
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-48">
            {messages.map((message, index) => (
              <article
                key={message.id}
                className={cn(
                  "w-full rounded-2xl px-5 py-4 shadow-border-small",
                  message.role === "user"
                    ? "ml-auto max-w-[85%] bg-muted/80"
                    : "mr-auto max-w-[90%] bg-background border"
                )}
              >
                <header className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {message.role === "user" ? "You" : "Habib AI"}
                </header>
                <div className="text-sm leading-relaxed">
                  {message.parts.map((part, partIndex) => {
                    if (part.type === "text") {
                      return <Streamdown key={`${message.id}-${partIndex}`}>{part.text}</Streamdown>;
                    }

                    return null;
                  })}
                </div>
                {message.role === "assistant" && index === messages.length - 1 && status === "ready" && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => regenerate()}
                      className="rounded-full"
                    >
                      Regenerate
                    </Button>
                  </div>
                )}
              </article>
            ))}
            {error && (
              <Alert variant="destructive" className="animate-slide-up">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error.message || "Something went wrong while generating the response."}
                </AlertDescription>
              </Alert>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>
      )}

      {hasMessages && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-6 md:left-16 md:px-8">
          <div className="pointer-events-auto w-full max-w-4xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSend();
              }}
            >
              <ComposerPill
                value={input}
                onChange={setInput}
                leftActions={leftActions}
                rightActions={rightActions}
                onSend={onSend}
              />
            </form>
          </div>
        </div>
      )}

      <ActionSheet
        open={actionSheetOpen}
        title={TOOLS_MENU_TITLES[toolsPanel]}
        items={actionSheetItems}
        onOpenChange={(open) => {
          setActionSheetOpen(open);
          if (!open) {
            setToolsPanel("root");
          }
        }}
        onBack={
          toolsPanel !== "root"
            ? () => {
                setToolsPanel("root");
              }
            : undefined
        }
      />
    </div>
  );
}
