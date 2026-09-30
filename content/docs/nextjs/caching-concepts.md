---
title: Next.js Caching Architecture
description: Understand Request Memoization, Data Cache, Full Route Cache, and Router Cache in the Next.js App Router.
category: frontend
topic: nextjs
type: concept
level: advanced
tags:
  - nextjs
  - caching
  - performance
  - data-cache
  - revalidation
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Next.js improves application performance by caching rendering work and data requests across four distinct layers:

```
1. Request Memoization (React Server) -> Dedupes identical GET requests in a single render pass
2. Data Cache (Next.js Server)       -> Persists HTTP fetch responses across incoming requests
3. Full Route Cache (Next.js Server) -> Stores HTML and RSC payload generated at build or revalidation time
4. Router Cache (Client Browser)     -> Caches RSC payloads in memory per user session
```

---

## 1. Request Memoization

React automatically dedupes identical `fetch` requests with the same URL and options across a component tree during a single render pass.

```tsx
async function getUser() {
  // Only executed once even if called in 5 sibling/child components
  const res = await fetch('https://api.example.com/user');
  return res.json();
}

export default async function Page() {
  const user = await getUser();
  return <ProfileHeader />;
}

async function ProfileHeader() {
  const user = await getUser(); // Deduped from Page call
  return <h2>{user.name}</h2>;
}
```

---

## 2. Data Cache

The Next.js Data Cache persists `fetch` data across different user requests and deployments.

### Time-Based Revalidation (ISR)

```typescript
// Revalidate cached data every 60 seconds
const res = await fetch('https://api.example.com/prices', {
  next: { revalidate: 60 },
});
```

### On-Demand Revalidation via Tags

```typescript
// Fetch with a cache tag
const res = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] },
});
```

To purge the cache on-demand (e.g. inside a Server Action or Route Handler):

```typescript
'use server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function updateProduct() {
  // Purge tag cache
  revalidateTag('products');
  // Purge route cache
  revalidatePath('/products');
}
```

### Opting Out of Data Caching

```typescript
const res = await fetch('https://api.example.com/feed', {
  cache: 'no-store', // Always fetch fresh data on every request
});
```

---

## 3. Full Route Cache

At build time (or upon revalidation), Next.js caches the rendered HTML and React Server Component (RSC) payload for statically renderable routes.

- **Static Routes**: Cached by default.
- **Dynamic Routes**: If a route uses dynamic functions (`cookies()`, `headers()`, or `searchParams`), it bypasses the Full Route Cache and renders dynamically on demand.

---

## 4. Router Cache (Client-Side)

The client-side Router Cache stores visited and preloaded route segments in the browser session memory.

- **Prefetching**: When `<Link href="/about">` appears in the viewport, Next.js prefetches the segment payload into the Router Cache.
- **Refresh**: Calling `router.refresh()` purges the client router cache and requests a new server render.

---

## Caching Summary Table

| Cache Mechanism | Where | What is Cached | Purpose |
| :--- | :--- | :--- | :--- |
| **Request Memoization** | Server | Return values of `fetch` | Deduplicate calls within one render |
| **Data Cache** | Server | HTTP responses | Persist API data across requests |
| **Full Route Cache** | Server | HTML & RSC Payload | Instant static page delivery |
| **Router Cache** | Client Browser | RSC Payload | Instant client-side page transitions |
