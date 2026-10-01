---
title: "Prisma with Next.js App Router"
description: "Production guide for using Prisma in Next.js 16: Server Components, Server Actions, Route Handlers, and avoiding client bundle leaks."
category: databases
topic: prisma
type: guide
level: intermediate
tags:
  - prisma
  - nextjs
  - app-router
  - server-actions
  - server-components
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma with Next.js App Router

Next.js 16 App Router runs server-side code in **React Server Components (RSC)**, **Server Actions**, and **Route Handlers**, allowing direct, secure database queries without an extra REST API layer.

---

## 1. Direct Queries in React Server Components

Because Server Components run only on the server, you can query Prisma directly inside your component function:

```tsx
// app/posts/page.tsx (Server Component)
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Latest Articles</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 border rounded-xl">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-xs text-slate-500">By {post.author.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
```

---

## 2. Mutations with React Server Actions

Server Actions provide a clean pattern for form submissions and mutations:

```typescript
// app/posts/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || title.trim().length === 0) {
    throw new Error("Title is required");
  }

  await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      authorId: "usr_mock_id",
    },
  });

  // Revalidate the posts list cache
  revalidatePath("/posts");
}
```

---

## 3. Critical Security Rule: Never Import Prisma in Client Components

<Callout type="danger">
Never import `prisma` inside files marked with `"use client"`. Doing so will expose database connection credentials to the browser and crash your client bundle. Database access must always remain on the server.
</Callout>

---

## Related Topics

- [Next.js App Router Overview](/docs/nextjs/app-router)
- [Prisma Client Singleton](/docs/prisma/prisma-client)
- [Next.js + Postgres + Prisma Recipe](/recipes/prisma/nextjs-postgres-prisma)
