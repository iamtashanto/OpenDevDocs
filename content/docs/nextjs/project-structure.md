---
title: "Next.js App Router Project Structure"
description: "Understanding Next.js folder organization: special file conventions (page, layout, loading, error, not-found, route), public assets, and components."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - project-structure
  - conventions
  - special-files
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Next.js App Router Project Structure

Next.js uses a **file-system based router** where folders define URL paths and **special reserved files** define UI behaviors and routing logic.

---

## 1. Complete Architecture Overview

```
my-next-app/
├── app/                      # App Router root
│   ├── layout.tsx            # Root layout (required: <html> and <body>)
│   ├── page.tsx              # Homepage UI (Route: /)
│   ├── loading.tsx           # Global loading skeleton (React Suspense)
│   ├── error.tsx             # Global client error boundary
│   ├── not-found.tsx         # 404 UI
│   ├── global.css            # Tailwind & CSS design system
│   ├── api/                  # Backend Route Handlers
│   │   └── search/
│   │       └── route.ts      # API endpoint (GET /api/search)
│   └── docs/                 # Nested route (/docs)
│       ├── layout.tsx        # Docs sidebar layout
│       └── [slug]/
│           └── page.tsx      # Dynamic route (/docs/javascript)
├── components/               # Reusable UI components
├── lib/                      # Database clients (prisma.ts) and utilities
├── public/                   # Static uncompiled assets (favicon, images)
├── next.config.ts            # Next.js framework configuration
└── tsconfig.json             # TypeScript configuration with @/* alias
```

---

## 2. Special Reserved File Conventions

| File Name | Purpose | Render Context |
| :--- | :--- | :--- |
| **`page.tsx`** | Unique UI for the route segment | Server Component (default) |
| **`layout.tsx`** | Shared UI wrapper for a segment and its children | Server Component (default) |
| **`loading.tsx`** | Instant loading UI wrapped in React Suspense | Server Component |
| **`error.tsx`** | Error UI boundary for a segment | **Must be Client Component** (`"use client"`) |
| **`not-found.tsx`** | 404 Not Found UI | Server Component |
| **`route.ts`** | Backend HTTP API endpoint (`GET`, `POST`, etc.) | Server only (no JSX) |
| **`middleware.ts`** | Edge request interceptor at project root | Edge / Node.js runtime |

---

## Related Topics

- [App Router & Routing Mechanics](/docs/nextjs/app-router)
- [Layouts & Templates](/docs/nextjs/layouts)
- [Route Handlers](/docs/nextjs/route-handlers)
