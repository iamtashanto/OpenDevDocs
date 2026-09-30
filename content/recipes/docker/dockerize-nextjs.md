---
title: "Dockerize a Next.js App (Production Multi-Stage)"
description: Create an optimized, secure multi-stage Dockerfile for Next.js App Router using standalone output with image size under 120MB.
category: devops
topic: docker
type: recipe
level: intermediate
tags:
  - nextjs
  - docker
  - devops
  - containers
  - multi-stage
platforms:
  - linux
  - all
tested:
  nextjs: "16.x"
  docker: "27.x"
  node: "22-alpine"
lastVerified: "2026-09-30"
---

## Goal

Build a minimal (<120MB), secure, unprivileged Docker container image for a Next.js App Router project utilizing multi-stage build caching and the `standalone` output mode.

---

## Prerequisites

- Next.js 14, 15, or 16 project
- Docker Engine installed locally

---

<Steps>
  <Step step={1} title="Enable Standalone Output in Next.js">
    Configure `output: 'standalone'` in your `next.config.ts`:

    ```typescript
    // next.config.ts
    import type { NextConfig } from "next";

    const nextConfig: NextConfig = {
      output: "standalone",
    };

    export default nextConfig;
    ```
  </Step>

  <Step step={2} title="Create .dockerignore">
    Prevent copying local caches, git files, and environment files into the build context:

    ```text
    Dockerfile
    .dockerignore
    node_modules
    .next
    .git
    .env*.local
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    pnpm-debug.log*
    ```
  </Step>

  <Step step={3} title="Create Production Multi-Stage Dockerfile">
    Create `Dockerfile` at your project root:

    ```dockerfile
    # Stage 1: Base image
    FROM node:22-alpine AS base
    RUN apk add --no-cache libc6-compat
    WORKDIR /app

    # Stage 2: Install dependencies
    FROM base AS deps
    COPY package.json pnpm-lock.yaml ./
    RUN corepack enable pnpm && pnpm install --frozen-lockfile

    # Stage 3: Build application
    FROM base AS builder
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN corepack enable pnpm && pnpm build

    # Stage 4: Production runner (minimal size, non-root user)
    FROM base AS runner
    ENV NODE_ENV=production
    ENV PORT=3000
    ENV HOSTNAME="0.0.0.0"

    # Create unprivileged system user
    RUN addgroup --system --gid 1001 nodejs && \
        adduser --system --uid 1001 nextjs

    # Copy static assets and standalone server output
    COPY --from=builder /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

    USER nextjs
    EXPOSE 3000

    CMD ["node", "server.js"]
    ```
  </Step>

  <Step step={4} title="Build and Run Container">
    Build the image and start the container:

    ```bash
    # Build image
    docker build -t my-next-app:latest .

    # Run container
    docker run -d --name nextjs-prod -p 3000:3000 my-next-app:latest
    ```
  </Step>
</Steps>

---

## Verification

Check the final image size and container logs:

```bash
# Check image size (should be ~100MB - 130MB)
docker images my-next-app:latest

# Check container health
docker logs -f nextjs-prod
```

Open `http://localhost:3000` in your browser.

---

## Production Security Notes

- **Non-Root User**: The container runs under unprivileged user `nextjs` (UID 1001), preventing container escape vulnerabilities.
- **Minimal Surface**: Alpine base image removes unnecessary system binaries, keeping the attack surface minimal.
