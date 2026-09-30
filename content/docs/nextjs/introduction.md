---
title: "Introduction to Next.js App Router"
description: "Understanding Next.js: React Server Components, hybrid rendering, static site generation, streaming SSR, and edge architecture."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - app-router
  - react-server-components
  - ssr
  - ssg
platforms:
  - web
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

# Introduction to Next.js App Router

**Next.js** is a full-stack React framework for the web. Built on modern React features (such as React Server Components, Streaming, and Actions), Next.js provides hybrid rendering, automatic bundling, server-side data fetching, and edge delivery.

---

## 1. Key Features of the App Router

- **React Server Components (RSC)**: By default, components in the `app/` directory execute exclusively on the server, producing zero client-side JavaScript bundle overhead.
- **Nested Layouts**: Define UI layouts that preserve state, maintain scroll positions, and avoid unnecessary re-rendering across route transitions.
- **Streaming SSR with Suspense**: Stream page chunks progressively from the server to the browser as database queries resolve.
- **Server Actions**: Mutate server-side databases directly from forms or components without manually writing API endpoints.

---

## 2. App Router vs. Legacy Pages Router

| Feature | App Router (`app/`) | Legacy Pages Router (`pages/`) |
| :--- | :--- | :--- |
| **Component Default** | Server Component | Client Component |
| **Data Fetching** | `async`/`await` directly in components | `getServerSideProps` / `getStaticProps` |
| **Layouts** | Native nested `layout.tsx` hierarchy | Custom `_app.tsx` wrappers |
| **Routing Model** | Folder-based with special files (`page.tsx`, `layout.tsx`) | File-based (`about.tsx` → `/about`) |

---

## Related Topics

- [Creating a Next.js Project](/docs/nextjs/create-project)
- [Next.js Project Directory Structure](/docs/nextjs/project-structure)
- [Server Components vs Client Components](/docs/nextjs/server-components)
