---
title: "React Server Components (RSC) in Next.js"
description: "Mastering React Server Components: server-only execution, direct database access, zero client bundle size, and passing data to Client Components."
category: frontend
topic: nextjs
type: concept
level: beginner
tags:
  - nextjs
  - server-components
  - rsc
  - performance
  - security
platforms:
  - web
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

# React Server Components (RSC) in Next.js

In the App Router, **all components inside `app/` are React Server Components by default**.

---

## 1. Why Server Components are Revolutionary

1. **Zero Client JavaScript Bundle**: Server components execute on the server and render into a lightweight virtual DOM stream. Their dependencies (like markdown parsers, heavy date libraries, SQL clients) are **never sent to the client's browser**.
2. **Direct Access to Backend Resources**: Query databases (Prisma, PostgreSQL), read local filesystem files, or query internal microservices directly inside component bodies.
3. **Enhanced Security**: API keys, database connection strings, and tokens remain secure on the server and are never exposed in browser developer tools.

---

## 2. Server Component Example

```tsx
import { prisma } from "@/lib/prisma";

// Async Server Component:
export default async function ArticlesPage() {
  // Direct database query on server:
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8">
      <h1>Articles Directory</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <a href={`/docs/${article.slug}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

---

## 3. What Server Components CANNOT Do

- ❌ Cannot use React state hooks (`useState`, `useReducer`).
- ❌ Cannot use lifecycle / effect hooks (`useEffect`, `useLayoutEffect`).
- ❌ Cannot attach browser event listeners (`onClick`, `onChange`).
- ❌ Cannot use browser-only APIs (`window`, `document`, `localStorage`).

*When you need interactivity, state, or event handlers, use **Client Components**.*

---

## Related Topics

- [Client Components ("use client")](/docs/nextjs/client-components)
- [Data Fetching in Next.js](/docs/nextjs/data-fetching)
- [Server Actions](/docs/nextjs/server-actions)
