# Habib AI

Habib AI is a lightweight chatbot app built with Next.js and the Vercel AI stack. It provides a simple starting point for building AI-powered chat experiences using the AI Gateway.

## Runtime Requirements

- **Node.js: 24.x**
- **Package manager:** Yarn via Corepack (`yarn`)

## Tech Stack

- Next.js
- Vercel AI SDK
- Vercel AI Gateway
- Tailwind CSS

## Local Setup

1. Enable Corepack (once per machine):
   ```bash
   corepack enable
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Copy environment variables and set the gateway URL:
   ```bash
   cp .env.example .env.local
   ```
   Then set `AI_GATEWAY_BASE_URL` in `.env.local`.
4. Start the development server:
   ```bash
   yarn dev
   ```

## Build & Smoke Validation

```bash
yarn build
yarn smoke
```

## Deploy (Vercel)

- Vercel project should use Node.js **24.x**.
- Build command: `yarn build`
- Install command: `yarn install`
- Required environment variable: `AI_GATEWAY_BASE_URL`

## Rollback

If you need to revert this runtime hardening change:

```bash
git revert <commit-sha>
```

Or roll back to the pre-upgrade commit/tag noted in the PR description.

## Credits

Originally based on the Vercel AI Gateway demo.
