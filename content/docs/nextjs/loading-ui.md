---
title: "Loading UI and Streaming with Suspense in Next.js"
description: "Creating instant loading states in Next.js: loading.tsx conventions, React Suspense boundaries, and progressive SSR streaming."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - loading
  - suspense
  - streaming
  - skeletons
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Loading UI and Streaming with Suspense in Next.js

The special **`loading.tsx`** file automatically wraps a route segment inside a **React Suspense** boundary, streaming fallback loading skeletons to the browser immediately while asynchronous server data loads in the background.

---

## 1. Instant Route Loading Skeletons (`loading.tsx`)

Create a `loading.tsx` file inside any route folder:

```tsx
// app/docs/loading.tsx
export default function DocsLoading() {
  return (
    <div className="space-y-4 p-8 animate-pulse">
      <div className="h-8 bg-muted rounded w-1/3" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-4/5" />
      <div className="h-64 bg-muted rounded w-full" />
    </div>
  );
}
```

---

## 2. Granular In-Page Streaming with `<Suspense>`

Instead of blocking the entire page while waiting for one slow component, stream fast UI immediately and wrap the slow component in `<Suspense>`:

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";
import { FastProfileHeader } from "@/components/Header";
import { SlowAnalyticsGraph } from "@/components/Graph";

export default function DashboardPage() {
  return (
    <main className="p-8">
      {/* 1. Renders and streams to browser immediately: */}
      <FastProfileHeader />

      {/* 2. Streams in progressively as database resolves: */}
      <Suspense fallback={<p>Loading chart data...</p>}>
        <SlowAnalyticsGraph />
      </Suspense>
    </main>
  );
}
```

---

## Related Topics

- [Next.js Error Handling (error.tsx)](/docs/nextjs/error-handling)
- [Server Components](/docs/nextjs/server-components)
- [Data Fetching](/docs/nextjs/data-fetching)
