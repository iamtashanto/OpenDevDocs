---
title: "Linking and Navigation in Next.js"
description: "Client-side routing with next/link: automatic prefetching, soft navigation, useRouter hook, usePathname, useSearchParams, and redirect()."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - link
  - navigation
  - prefetching
  - routing
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Linking and Navigation in Next.js

Next.js provides client-side, single-page navigation that preserves React state and pre-fetches route bundles in the background.

---

## 1. The `<Link>` Component

Always use `next/link` instead of native `<a href="...">` tags for internal navigation:

```tsx
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="flex gap-4">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/docs/javascript" prefetch={true} className="hover:underline">
        JavaScript Docs
      </Link>
    </nav>
  );
}
```

### Why `<Link>` is Superior:
- **Prefetching**: When a `<Link>` appears in the user's viewport, Next.js automatically pre-fetches the route in the background, making clicks feel instantaneous.
- **Soft Navigation**: Only changed layout and page segments are re-rendered; existing layout state is preserved.

---

## 2. Programmatic Navigation with `useRouter` (Client Components)

```tsx
"use client";

import { useRouter } from "next/navigation";

export function RedirectButton() {
  const router = useRouter();

  function handleClick() {
    // Navigate programmatically:
    router.push("/dashboard");
  }

  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

---

## 3. Server-Side Redirects (`redirect()`)

In Server Components, Server Actions, or Route Handlers:

```tsx
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login"); // Throws internal redirect exception
  }

  return <div>Welcome to private dashboard</div>;
}
```

---

## Related Topics

- [Next.js Pages](/docs/nextjs/pages)
- [Client Components vs Server Components](/docs/nextjs/client-components)
- [App Router Architecture](/docs/nextjs/app-router)
