"use client";

import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { ModelSelector } from "@/components/model-selector";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect, useRef } from "react";
import { DEFAULT_MODEL } from "@/lib/constants";
import {
  DEFAULT_COMPOSER_LEFT_ACTIONS,
  DEFAULT_COMPOSER_RIGHT_ACTIONS,
  DEFAULT_TOPBAR_BUTTONS,
} from "@/lib/ui-config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Streamdown } from "streamdown";
import { PresetSelector } from "@/components/preset-selector";
import { TemplatePanel } from "@/components/template-panel";
import { SavedPrompts } from "@/components/saved-prompts";
import { Sidebar } from "@/components/sidebar";
import { TopPillBar } from "@/components/top-pill-bar";
import { ComposerPill } from "@/components/composer-pill";

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

function LogoMark() {
  return (
    <Link href="/" className="font-semibold tracking-tight text-sm md:text-base">
      HABIB AI
    </Link>
  );
}

function TopbarButtons({
  onNewChat,
  favoritesOn,
  onToggleFavorites,
}: {
  onNewChat: () => void;
  favoritesOn: boolean;
  onToggleFavorites: () => void;
}) {
  const getButtonAction = (buttonId: string) => {
    switch (buttonId) {
      case "new-chat":
        return onNewChat;
      case "favorites":
        return onToggleFavorites;
      default:
        return () => undefined;
    }
  };

  return (
    <>
      {DEFAULT_TOPBAR_BUTTONS.map((button) => {
        if (button.type === "theme-toggle") {
          return <ThemeToggle key={button.id} />;
        }

        const Icon = button.icon;

        if (!Icon) {
          return null;
        }

        return (
          <Button
            id={button.id}
            key={button.id}
            onClick={getButtonAction(button.id)}
            variant="outline"
            size="sm"
            title={button.title}
            aria-label={button.label}
            aria-pressed={button.id === "favorites" ? favoritesOn : undefined}
            className={cn(
              "h-10 w-10 gap-2 border-border/80 bg-muted/40 px-0 shadow-border-small hover:bg-muted/70 hover:shadow-border-medium md:w-auto md:px-3",
              button.id === "favorites" && favoritesOn && "bg-muted/90"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                button.id === "favorites" && favoritesOn && "fill-current"
              )}
            />
            <span className="hidden md:inline">{button.label}</span>
          </Button>
        );
      })}
    </>
  );
}

export function Chat({ modelId = DEFAULT_MODEL }: { modelId: string }) {
  const [input, setInput] = useState("");
  const [currentModelId, setCurrentModelId] = useState(modelId);
  const [currentPresetId, setCurrentPresetId] = useState("caption_writer");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [favoritesOn, setFavoritesOn] = useState(false);
  const [showPresetsPanel] = useState(true);
  const [showTemplatesPanel] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadClick = () => {
    uploadInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFileName(file?.name ?? "");
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

  const leftActions = DEFAULT_COMPOSER_LEFT_ACTIONS.map((action) => ({
    ...action,
    onClick: action.id === "attach" ? handleUploadClick : () => undefined,
  }));

  const rightActions = DEFAULT_COMPOSER_RIGHT_ACTIONS.map((action) => ({
    ...action,
    onClick: action.id === "send" ? onSend : () => undefined,
  }));

  const showComposerPanels =
    showPresetsPanel || showTemplatesPanel || Boolean(selectedFileName);

  return (
    <div className="flex h-screen flex-col overflow-hidden pl-16 pt-14">
      <Sidebar />
      <input
        ref={uploadInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <header className="fixed top-0 left-16 right-0 z-20 bg-transparent px-4 py-2 animate-fade-in md:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <TopPillBar
            left={
              <ModelSelectorHandler
                modelId={currentModelId}
                onModelIdChange={handleModelIdChange}
              />
            }
            center={<LogoMark />}
            right={
              <TopbarButtons
                onNewChat={handleNewChat}
                favoritesOn={favoritesOn}
                onToggleFavorites={() => setFavoritesOn((prev) => !prev)}
              />
            }
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
                <div>
                  <ComposerPill
                    value={input}
                    onChange={setInput}
                    onSend={onSend}
                    leftActions={leftActions}
                    rightActions={rightActions}
                  />
                  {showComposerPanels && (
                    <div className="mt-2 rounded-xl border bg-background/80 px-3 py-3 backdrop-blur-sm md:px-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        {showPresetsPanel && (
                          <PresetSelector
                            presetId={currentPresetId}
                            onPresetChange={setCurrentPresetId}
                          />
                        )}
                        {showTemplatesPanel && (
                          <TemplatePanel onSelectTemplate={(prompt) => setInput(prompt)} />
                        )}
                        {selectedFileName && (
                          <span className="hidden max-w-[180px] truncate text-xs text-muted-foreground md:inline">
                            {selectedFileName}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </form>
              <div className="mt-4 md:mt-6">
                <SavedPrompts
                  currentInput={input}
                  onPickPrompt={(text) => setInput(text)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {hasMessages && (
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full animate-fade-in overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 hide-scrollbar">
            <div className="flex flex-col gap-4 md:gap-6 pb-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    m.role === "user" &&
                      "bg-foreground text-background rounded-2xl p-3 md:p-4 ml-auto max-w-[90%] md:max-w-[75%] shadow-border-small font-medium text-sm md:text-base",
                    m.role === "assistant" && "max-w-[95%] md:max-w-[85%] text-foreground/90 leading-relaxed text-sm md:text-base"
                  )}
                >
                  {m.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return m.role === "assistant" ? (
                          <Streamdown key={`${m.id}-${i}`} isAnimating={status === "streaming" && m.id === messages[messages.length - 1]?.id}>
                            {part.text}
                          </Streamdown>
                        ) : (
                          <div key={`${m.id}-${i}`}>{part.text}</div>
                        );
                    }
                  })}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto w-full px-4 md:px-8 pb-4 animate-slide-down">
          <Alert variant="destructive" className="flex flex-col items-end">
            <div className="flex flex-row gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <AlertDescription className="dark:text-red-400 text-red-600">
                {error.message.startsWith("AI Gateway requires a valid credit card") ? <div>AI Gateway requires a valid credit card on file to service requests. Please visit your <Link className="underline underline-offset-4" href="https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card" target="_noblank">dashboard</Link> to add a card and unlock your free credits.</div> : "An error occurred while generating the response."}
              </AlertDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto transition-all duration-150 ease-out hover:scale-105"
              onClick={() => regenerate()}
            >
              Retry
            </Button>
          </Alert>
        </div>
      )}

      {hasMessages && (
        <div className="w-full max-w-4xl mx-auto">
          <div className="px-4 md:px-8 pb-3 md:pb-4">
            <SavedPrompts
              currentInput={input}
              onPickPrompt={(text) => setInput(text)}
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSend();
            }}
            className="px-4 md:px-8 pb-6 md:pb-8"
          >
            <div>
              <ComposerPill
                value={input}
                onChange={setInput}
                onSend={onSend}
                leftActions={leftActions}
                rightActions={rightActions}
              />
              <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-3">
                {showPresetsPanel && (
                  <PresetSelector
                    presetId={currentPresetId}
                    onPresetChange={setCurrentPresetId}
                  />
                )}
                {showTemplatesPanel && (
                  <TemplatePanel onSelectTemplate={(prompt) => setInput(prompt)} />
                )}
                {selectedFileName && (
                  <span className="hidden md:inline text-xs text-muted-foreground truncate max-w-[180px]">
                    {selectedFileName}
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      <footer className="pb-8 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
        <p className="text-xs md:text-sm text-muted-foreground">
          The models in the list are a small subset of those available in the
          Vercel AI Gateway.
          <br />
          See the{" "}
          <Button
            variant="link"
            asChild
            className="p-0 h-auto text-xs md:text-sm font-normal"
          >
            <a
              href="https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fmodel-list&title="
              target="_blank"
              rel="noopener noreferrer"
            >
              model library
            </a>
          </Button>{" "}
          for the full set. {" "}
          <Button
            variant="link"
            asChild
            className="p-0 h-auto text-xs md:text-sm font-normal"
          >
            <Link href="/about">About</Link>
          </Button>
        </p>
      </footer>
    </div>
  );
}
