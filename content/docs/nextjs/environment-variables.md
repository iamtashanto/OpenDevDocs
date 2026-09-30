---
title: Next.js Environment Variables
description: Manage server-only secrets and client-accessible environment variables securely in Next.js applications.
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - configuration
  - security
  - environment-variables
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Next.js has built-in support for loading environment variables from `.env` files into `process.env`. By default, environment variables are only accessible in the Node.js runtime environment (Server Components, Route Handlers, Server Actions).

---

## Loading Order & Files

Next.js evaluates `.env` files in the following priority order (from highest to lowest precedence):

1. `process.env` (system-level variables)
2. `.env.development.local` / `.env.production.local` / `.env.test.local`
3. `.env.local` (Local overrides, should be ignored by git)
4. `.env.development` / `.env.production` / `.env.test`
5. `.env` (Default configuration)

---

## Exposing Variables to the Browser

To expose a variable to the browser (Client Components), prefix the key with `NEXT_PUBLIC_`:

```ini
# .env.local

# Server-only (Hidden from browser bundles)
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
STRIPE_SECRET_KEY="sk_live_123456"

# Exposed to the browser
NEXT_PUBLIC_APP_URL="https://example.com"
NEXT_PUBLIC_ANALYTICS_ID="analytics_abc123"
```

---

## Usage in Components

### In Server Components & Route Handlers

```typescript
// app/api/status/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL; // Accessible
  return NextResponse.json({ connected: Boolean(dbUrl) });
}
```

### In Client Components

```tsx
// components/analytics.tsx
'use client';

export function Analytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID; // Inlined at build time

  return <div data-id={analyticsId}>Analytics Ready</div>;
}
```

---

## Type-Safe Environment Variables

To validate environment variables at startup, use a validation schema (e.g. using `zod` and `@t3-oss/env-nextjs`):

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

---

## Best Practices & Security

- **Never commit `.env.local`**: Add `.env*.local` to your `.gitignore` file to prevent accidental secret leaks.
- **Do not prefix secrets with `NEXT_PUBLIC_`**: Any key starting with `NEXT_PUBLIC_` is inlined directly into client JavaScript bundles.
- **Server Actions & Route Handlers**: Always keep database connection strings, JWT signing keys, and third-party API secret tokens in server-only variables.
