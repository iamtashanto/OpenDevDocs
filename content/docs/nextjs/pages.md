---
title: "Pages in Next.js App Router"
description: "Creating pages in Next.js: page.tsx conventions, PageProps typing, async Server Components, searchParams, and params."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - pages
  - pageprops
  - searchparams
  - params
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Pages in Next.js App Router

A **Page** is UI that is unique to a route. You define a page by exporting a default React component from a **`page.tsx`** file inside a folder.

---

## 1. Basic Page Component

```tsx
// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OpenDevDocs",
};

export default function AboutPage() {
  return (
    <main className="p-8">
      <h1>About OpenDevDocs</h1>
      <p>An open-source developer documentation platform.</p>
    </main>
  );
}
```

---

## 2. Page Props (`params` and `searchParams`)

In modern Next.js App Router, `params` and `searchParams` are passed to pages as Promises that can be awaited directly in async Server Components:

```tsx
// app/products/[id]/page.tsx
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function ProductPage(props: PageProps) {
  const { id } = await props.params;
  const { query, page } = await props.searchParams;

  return (
    <main className="p-8">
      <h1>Product ID: {id}</h1>
      <p>Search Query: {query ?? "None"}</p>
      <p>Page Number: {page ?? "1"}</p>
    </main>
  );
}
```

---

## Related Topics

- [Dynamic Route Segments](/docs/nextjs/dynamic-routes)
- [Server Components](/docs/nextjs/server-components)
- [Data Fetching in Next.js](/docs/nextjs/data-fetching)
