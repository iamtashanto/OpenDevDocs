---
title: "Not Found (404) Pages in Next.js"
description: "Custom 404 pages in Next.js: not-found.tsx conventions and programmatically triggering 404s using notFound() function."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - not-found
  - "404"
  - error-handling
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Not Found (404) Pages in Next.js

The **`not-found.tsx`** file renders custom 404 UI whenever an unmatched URL is requested or when the **`notFound()`** function is invoked.

---

## 1. Triggering 404s Programmatically with `notFound()`

When an entity (e.g. document, user, blog post) does not exist in the database:

```tsx
// app/docs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { docsSource } from "@/app/source";

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = docsSource.getPage([slug]);

  // Invokes not-found.tsx boundary:
  if (!page) {
    notFound();
  }

  return <h1>{page.data.title}</h1>;
}
```

---

## 2. Custom 404 UI (`app/not-found.tsx`)

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <h1 className="text-4xl font-bold">404 - Document Not Found</h1>
      <p className="text-muted-foreground mt-2">
        The documentation page you are looking for does not exist or has moved.
      </p>
      <Link href="/" className="btn mt-6">
        Return to Homepage
      </Link>
    </main>
  );
}
```

---

## Related Topics

- [Error Handling (error.tsx)](/docs/nextjs/error-handling)
- [Dynamic Routes](/docs/nextjs/dynamic-routes)
- [Pages in Next.js](/docs/nextjs/pages)
