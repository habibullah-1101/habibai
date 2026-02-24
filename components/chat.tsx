"use client";

import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { ModelSelector } from "@/components/model-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { SendIcon, PlusIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { DEFAULT_MODEL } from "@/lib/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Streamdown } from "streamdown";
import { PresetSelector } from "@/components/preset-selector";
import { TemplatePanel } from "@/components/template-panel";
import { SavedPrompts } from "@/components/saved-prompts";

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

export function Chat({ modelId = DEFAULT_MODEL }: { modelId: string }) {
  const [input, setInput] = useState("");
  const [currentModelId, setCurrentModelId] = useState(modelId);
  const [currentPresetId, setCurrentPresetId] = useState("caption_writer");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-20 border-b bg-background/90 backdrop-blur-sm animate-fade-in">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-semibold tracking-tight text-sm md:text-base">
              HABIB AI
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleNewChat}
              variant="outline"
              size="sm"
              className="h-9 px-3 shadow-border-small hover:shadow-border-medium"
            >
              <PlusIcon className="mr-1.5 h-4 w-4" />
              New Chat
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      {!hasMessages && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-16 md:px-8 animate-fade-in">
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
                  sendMessage({ text: input }, { body: { modelId: currentModelId, presetId: currentPresetId } });
                  setInput("");
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-2xl glass-effect shadow-border-medium transition-all duration-200 ease-out">
                  <ModelSelectorHandler
                    modelId={modelId}
                    onModelIdChange={handleModelIdChange}
                  />
                  <PresetSelector
                    presetId={currentPresetId}
                    onPresetChange={setCurrentPresetId}
                  />
                  <TemplatePanel
                    onSelectTemplate={(prompt) => {
                      setInput(prompt);
                      inputRef.current?.focus();
                    }}
                  />
                  <div className="flex flex-1 items-center">
                    <Input
                      ref={inputRef}
                      name="prompt"
                      placeholder="Ask a question..."
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      autoFocus
                      className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/60"
                      onKeyDown={(e) => {
                        if (e.metaKey && e.key === "Enter") {
                          sendMessage(
                            { text: input },
                            { body: { modelId: currentModelId, presetId: currentPresetId } },
                          );
                          setInput("");
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 rounded-xl hover:bg-muted/50"
                      disabled={!input.trim()}
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
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
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-14 animate-fade-in overflow-hidden">
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
              sendMessage({ text: input }, { body: { modelId: currentModelId, presetId: currentPresetId } });
              setInput("");
            }}
            className="px-4 md:px-8 pb-6 md:pb-8"
          >
            <div className="flex items-center gap-3 p-4 rounded-2xl glass-effect shadow-border-medium transition-all duration-200 ease-out">
              <ModelSelectorHandler
                modelId={modelId}
                onModelIdChange={handleModelIdChange}
              />
              <PresetSelector
                presetId={currentPresetId}
                onPresetChange={setCurrentPresetId}
              />
              <TemplatePanel
                onSelectTemplate={(prompt) => {
                  setInput(prompt);
                  inputRef.current?.focus();
                }}
              />
              <div className="flex flex-1 items-center">
                <Input
                  ref={inputRef}
                  name="prompt"
                  placeholder="Ask a question..."
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/60 font-medium"
                  onKeyDown={(e) => {
                    if (e.metaKey && e.key === "Enter") {
                      sendMessage(
                        { text: input },
                        { body: { modelId: currentModelId, presetId: currentPresetId } },
                      );
                      setInput("");
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-xl hover:bg-accent hover:text-accent-foreground hover:scale-110 transition-all duration-150 ease disabled:opacity-50 disabled:hover:scale-100"
                  disabled={!input.trim()}
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
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
