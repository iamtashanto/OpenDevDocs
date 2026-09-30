---
title: Next.js Performance Optimization
description: Optimize Core Web Vitals (LCP, INP, CLS), reduce bundle sizes, and stream components in Next.js applications.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - performance
  - core-web-vitals
  - suspense
  - bundling
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Next.js offers architectural performance advantages through React Server Components, automated asset optimization, and streaming. Optimizing for Google's Core Web Vitals—**Largest Contentful Paint (LCP)**, **Interaction to Next Paint (INP)**, and **Cumulative Layout Shift (CLS)**—ensures lightning-fast user experiences.

---

## 1. Dynamic Imports & Lazy Loading

Use `next/dynamic` to defer loading heavy Client Components until they are needed:

```tsx
'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy markdown editor or chart component
const HeavyEditor = dynamic(() => import('@/components/heavy-editor'), {
  loading: () => <div className="p-4 animate-pulse">Loading Editor...</div>,
  ssr: false, // Disable SSR if library relies on browser APIs
});

export function EditorWrapper() {
  return <HeavyEditor />;
}
```

---

## 2. Streaming with Suspense

Instead of blocking the entire page render on slow database queries, stream component fragments with `<Suspense>`:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { RecentOrders, OrdersSkeleton } from '@/components/orders';
import { AnalyticsChart, ChartSkeleton } from '@/components/chart';

export default function Dashboard() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
      </Suspense>
    </main>
  );
}
```

---

## 3. Parallel Data Fetching

Avoid data fetching waterfalls by running independent asynchronous requests in parallel with `Promise.all`:

```tsx
// ❌ Bad: Sequential Waterfall
const user = await fetchUser();
const posts = await fetchPosts();

// ✅ Good: Parallel Execution
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);
```

---

## 4. Bundle Analyzer

Install `@next/bundle-analyzer` to inspect the size of client-side JavaScript packages:

```bash
pnpm add -D @next/bundle-analyzer
```

```typescript
// next.config.ts
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  // configuration
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
```

Run bundle analysis:

```bash
ANALYZE=true pnpm build
```

---

## Performance Summary Checklist

- [ ] **LCP**: Mark primary hero image with `priority` attribute in `next/image`.
- [ ] **CLS**: Always use `next/font` and specify explicit aspect ratios for images and videos.
- [ ] **INP**: Minimize heavy client JavaScript execution on user interactions; offload work to Server Actions or Web Workers.
- [ ] **Data Flow**: Push data fetching down to the specific Server Components that consume it.
