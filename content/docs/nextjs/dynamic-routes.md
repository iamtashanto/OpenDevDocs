---
title: "Dynamic Routes and Catch-All Segments in Next.js"
description: "Mastering dynamic routing: [slug], catch-all [...slug], optional catch-all [[...slug]], generateStaticParams(), and static site generation."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - dynamic-routes
  - catch-all
  - generate-static-params
  - ssg
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Dynamic Routes and Catch-All Segments in Next.js

When you don't know the exact URL segment names ahead of time (e.g. blog posts, product IDs, documentation paths), use **Dynamic Route Segments** wrapped in square brackets `[slug]`.

---

## 1. Dynamic Routing Conventions

| Folder Pattern | Route Example | Parameter Extracted |
| :--- | :--- | :--- |
| **`app/blog/[slug]/page.tsx`** | `/blog/react-hooks` | `{ slug: "react-hooks" }` |
| **`app/docs/[...slug]/page.tsx`** *(Catch-all)* | `/docs/git/branch/merge` | `{ slug: ["git", "branch", "merge"] }` |
| **`app/docs/[[...slug]]/page.tsx`** *(Optional catch-all)* | `/docs` AND `/docs/git/branch` | `{ slug: undefined }` OR `{ slug: ["git", "branch"] }` |

---

## 2. Static Generation with `generateStaticParams()`

Generate static HTML files for all dynamic routes at build time (SSG) for maximum performance:

```tsx
// app/docs/[[...slug]]/page.tsx
import { notFound } from "next/navigation";
import { docsSource } from "@/app/source";

// 1. Tell Next.js all possible slug paths at build time:
export async function generateStaticParams() {
  return docsSource.generateParams();
}

// 2. Render pre-generated static page:
export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = docsSource.getPage(slug);
  if (!page) notFound();

  return (
    <article>
      <h1>{page.data.title}</h1>
      <p>{page.data.description}</p>
    </article>
  );
}
```

---

## Related Topics

- [Next.js Pages](/docs/nextjs/pages)
- [Route Groups](/docs/nextjs/route-groups)
- [Data Fetching in Next.js](/docs/nextjs/data-fetching)
