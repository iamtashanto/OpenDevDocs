---
title: "Data Fetching & Revalidation in Next.js"
description: "Data fetching in Next.js App Router: async/await in Server Components, extended fetch API, time-based revalidation, and on-demand cache tagging."
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - data-fetching
  - cache
  - revalidation
  - fetch
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Data Fetching & Revalidation in Next.js

In the App Router, data fetching is performed directly inside async Server Components using `async`/`await` or through the native `fetch()` API with granular caching controls.

---

## 1. Direct Backend & Database Queries

Server Components can query databases (Prisma, Drizzle, PostgreSQL) directly with zero API latency overhead:

```tsx
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <h2>Recent Users ({users.length})</h2>
    </div>
  );
}
```

---

## 2. Extended `fetch()` Caching Options

Next.js extends the native `fetch` Web API with caching and revalidation controls:

### 1. Static Cached Fetch (Default / Build-Time SSG)
```tsx
// Cached indefinitely until manual revalidation:
const res = await fetch("https://api.example.com/docs", {
  cache: "force-cache",
});
```

### 2. Time-Based Incremental Static Regeneration (ISR)
```tsx
// Revalidates data at most once every 60 seconds:
const res = await fetch("https://api.example.com/crypto-prices", {
  next: { revalidate: 60 },
});
```

### 3. Dynamic Server-Side Rendering (SSR on every request)
```tsx
// Never caches; fetches fresh on every incoming request:
const res = await fetch("https://api.example.com/live-stock", {
  cache: "no-store",
});
```

---

## 3. On-Demand Revalidation (`revalidateTag` & `revalidatePath`)

Purge cached data instantly when data changes (e.g. after a Server Action mutation):

```tsx
import { revalidateTag, revalidatePath } from "next/cache";

export async function publishArticle(formData: FormData) {
  "use server";
  // 1. Mutate database...
  
  // 2. Purge cache for tagged fetches:
  revalidateTag("articles-list", "max");

  // 3. Or purge cache for a specific route:
  revalidatePath("/docs");
}
```

---

## Related Topics

- [Server Components](/docs/nextjs/server-components)
- [Server Actions](/docs/nextjs/server-actions)
- [Caching Concepts in Next.js](/docs/nextjs/caching-concepts)
