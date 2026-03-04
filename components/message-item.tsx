import { useChat } from "@ai-sdk/react";
import { Streamdown } from "streamdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MessageItemProps = {
  message: ReturnType<typeof useChat>["messages"][number];
  regenerate: ReturnType<typeof useChat>["regenerate"];
  status: ReturnType<typeof useChat>["status"];
};

export function MessageItem({ message, regenerate, status }: MessageItemProps) {
  return (
    <article
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
      {message.role === "assistant" && status === "ready" && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => regenerate()} className="rounded-full">
            Regenerate
          </Button>
        </div>
      )}
    </article>
  );
}
