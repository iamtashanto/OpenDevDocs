---
title: "Next.js App Router Architecture"
description: "How the App Router works: folder-based routing, nested route hierarchies, component tree evaluation, and streaming."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - app-router
  - routing
  - architecture
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Next.js App Router Architecture

The **App Router** is built on React Server Components and nested routing to deliver optimal performance and clean separation of concerns.

---

## 1. Folder-Based Route Mapping

In the App Router, every folder represents a **route segment** that maps to a URL path segment. A route is only publicly accessible when a **`page.tsx`** file is added inside that folder:

```
app/
├── page.tsx                  ──►  /
├── about/
│   └── page.tsx              ──►  /about
└── blog/
    ├── page.tsx              ──►  /blog
    └── [slug]/
        └── page.tsx          ──►  /blog/my-post
```

---

## 2. Nested Hierarchy Evaluation

When a user visits `/blog/my-post`, Next.js renders the component tree hierarchically from the root down to the leaf page:

```tsx
<RootLayout>
  <BlogLayout>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<Error />}>
        <PostPage params={{ slug: "my-post" }} />
      </ErrorBoundary>
    </Suspense>
  </BlogLayout>
</RootLayout>
```

---

## Related Topics

- [Layouts & Nested Layouts](/docs/nextjs/layouts)
- [Pages in Next.js](/docs/nextjs/pages)
- [Dynamic Route Segments](/docs/nextjs/dynamic-routes)
- [Route Groups](/docs/nextjs/route-groups)
