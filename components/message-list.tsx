import { useChat } from "@ai-sdk/react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageItem } from "@/components/message-item";

type MessageListProps = {
  messages: ReturnType<typeof useChat>["messages"];
  regenerate: ReturnType<typeof useChat>["regenerate"];
  status: ReturnType<typeof useChat>["status"];
  error: ReturnType<typeof useChat>["error"];
};

export function MessageList({ messages, regenerate, status, error }: MessageListProps) {
  return (
    <>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          regenerate={regenerate}
          status={status}
        />
      ))}
      {error && (
        <Alert variant="destructive" className="animate-slide-up">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || "Something went wrong while generating the response."}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
