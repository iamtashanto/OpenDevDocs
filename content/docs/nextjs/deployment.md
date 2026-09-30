---
title: Next.js Deployment & Production
description: Deploy Next.js applications to Vercel, Docker containers, self-hosted Node.js servers, and static hosts.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - deployment
  - vercel
  - docker
  - devops
platforms:
  - web
  - node
  - linux
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Next.js applications can be deployed anywhere Node.js or static hosting is supported, including managed platforms like Vercel, Docker containers, Kubernetes, or self-hosted virtual machines.

---

## 1. Managed Deployment (Vercel)

Vercel is the primary platform built by the creators of Next.js, offering zero-configuration deployments:

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import the project in the Vercel Dashboard.
3. Configure environment variables in project settings.
4. Automatic preview builds for pull requests and instant production deployments on `main`.

---

## 2. Docker Container Deployment

For self-hosting on AWS ECS, Google Cloud Run, Fly.io, or VPS servers, use Next.js `standalone` output mode to generate a lean production container:

### Step 1: Enable Standalone Output

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

### Step 2: Multi-Stage Dockerfile

```dockerfile
# Multi-stage build for Next.js standalone
FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 3. Static HTML Export

If your application doesn't require server features (no Route Handlers, Server Actions, or dynamic cookies), you can export pure static HTML:

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true }, // Required unless using custom loader
};

export default nextConfig;
```

Running `pnpm build` outputs static files to the `out/` directory, which can be hosted on GitHub Pages, Cloudflare Pages, S3, or NGINX.

---

## Pre-Deployment Checklist

- [ ] Run `pnpm build` locally to catch type errors and build warnings.
- [ ] Configure production environment variables (`DATABASE_URL`, API keys).
- [ ] Set `NEXT_TELEMETRY_DISABLED=1` in CI/CD pipelines.
- [ ] Confirm all cache revalidation tokens and webhooks are secured.
