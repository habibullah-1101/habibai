export type PromptTemplate = {
  id: string;
  title: string;
  prompt: string;
};

export const TEMPLATES: PromptTemplate[] = [
  {
    id: "instagram-caption",
    title: "Instagram Caption",
    prompt:
      "Write 3 Instagram captions about {topic} for {audience} in a {tone} tone. Include one CTA and 5 hashtags.",
  },
  {
    id: "reels-hook-ideas",
    title: "Reels Hook Ideas",
    prompt:
      "Generate 10 short Reels hook lines for {topic} targeting {audience} with a {tone} vibe.",
  },
  {
    id: "youtube-title-thumbnail",
    title: "YouTube Title + Thumbnail text",
    prompt:
      "Create 5 YouTube title options and matching thumbnail text for a video on {topic} for {audience} in a {tone} style.",
  },
  {
    id: "poster-headline-subheadline",
    title: "Poster Headline + Subheadline",
    prompt:
      "Write 6 bold headline + subheadline pairs for a poster about {topic} aimed at {audience} with a {tone} feel.",
  },
  {
    id: "logo-concept-directions",
    title: "Logo Concept directions",
    prompt:
      "Provide 5 logo concept directions for {topic}, including symbol idea, color mood, and typography for {audience} in a {tone} style.",
  },
  {
    id: "brand-voice-rewrite",
    title: "Brand Voice rewrite",
    prompt:
      "Rewrite this message in a {tone} brand voice for {audience} about {topic}: {input_text}.",
  },
];
