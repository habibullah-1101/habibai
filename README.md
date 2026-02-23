# Habib AI

Habib AI is a lightweight chatbot app built with Next.js and the Vercel AI stack. It provides a simple starting point for building AI-powered chat experiences using the AI Gateway.

## Tech Stack

- Next.js
- Vercel AI SDK
- Vercel AI Gateway
- Tailwind CSS

## Local Setup

1. Install dependencies:
   ```bash
   pnpm i
   ```
2. Copy environment variables and set the gateway URL:
   ```bash
   cp .env.example .env.local
   ```
   Then set `AI_GATEWAY_BASE_URL` in `.env.local`.
3. Start the development server:
   ```bash
   pnpm dev
   ```

## Deploy

Deploy to Vercel.

## Credits

Originally based on the Vercel AI Gateway demo.
