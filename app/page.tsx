import { Chat } from "@/components/chat";
import { ChatShell } from "@/components/layout/chat-shell";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ modelId: string }>;
}) {
  const { modelId } = await searchParams;

  return (
    <ChatShell>
      <Chat modelId={modelId} />
    </ChatShell>
  );
}
