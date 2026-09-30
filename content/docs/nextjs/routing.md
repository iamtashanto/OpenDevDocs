---
title: Next.js App Router Architecture & Routing
description: Deep dive into Next.js App Router directory conventions, layout nesting, loading states, and route handlers.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - app-router
  - routing
  - fullstack
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Next.js App Router uses a file-system based router located in the `app/` directory. Folders define route paths, while special filenames define the UI behavior for each route segment.

---

## Special File Conventions

| File | Role |
| :--- | :--- |
| `page.tsx` | Unique UI for a route and makes the path publicly accessible. |
| `layout.tsx` | Shared UI for a segment and its children (preserves state across navigation). |
| `loading.tsx` | Instant loading state / Suspense fallback for the segment. |
| `not-found.tsx` | UI when `notFound()` is thrown or route doesn't exist. |
| `error.tsx` | Error boundary UI fallback for the segment. |
| `route.ts` | Server-side HTTP API endpoint (GET, POST, PUT, DELETE). |

---

## Route Example Structure

```
app/
├── layout.tsx         -> Root layout (html, body, RootProvider)
├── page.tsx           -> / (Homepage)
├── docs/
│   ├── layout.tsx     -> /docs layout (Sidebar, TOC)
│   └── [[...slug]]/
│       └── page.tsx   -> /docs/* (Dynamic documentation pages)
└── api/
    └── search/
        └── route.ts   -> /api/search (Search API endpoint)
```

<Callout type="tip" title="Layout State Preservation">
Layouts do **not** re-render on navigation between sibling pages inside the same layout hierarchy. This ensures instant page transitions without losing scroll state or re-mounting common sidebars.
</Callout>
