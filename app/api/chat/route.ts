import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { DEFAULT_MODEL, SUPPORTED_MODELS } from "@/lib/constants";
import { gateway } from "@/lib/gateway";
import { PRESETS } from "@/lib/presets";

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    messages,
    modelId = DEFAULT_MODEL,
    presetId,
  }: { messages: UIMessage[]; modelId: string; presetId?: string } =
    await req.json();

  if (!SUPPORTED_MODELS.includes(modelId)) {
    return new Response(
      JSON.stringify({ error: `Model ${modelId} is not supported` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const selectedPreset = presetId
    ? PRESETS.find((preset) => preset.id === presetId)
    : PRESETS.find((preset) => preset.id === "caption_writer");

  if (presetId && !selectedPreset) {
    return new Response(
      JSON.stringify({ error: `Preset ${presetId} is not supported` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = streamText({
    model: gateway(modelId),
    system:
      selectedPreset?.systemPrompt ??
      "You are a software engineer exploring Generative AI.",
    messages: convertToModelMessages(messages),
    onError: (e) => {
      console.error("Error while streaming.", e);
    },
  });

  return result.toUIMessageStreamResponse();
}
