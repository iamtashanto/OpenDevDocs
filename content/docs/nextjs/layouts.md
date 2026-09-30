---
title: "Layouts and Root Layout in Next.js"
description: "Mastering Next.js layouts: RootLayout (<html>/<body>), nested layouts, state preservation across route changes, and Layout vs Template."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - layouts
  - root-layout
  - templates
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Layouts and Root Layout in Next.js

A **Layout** is UI that is shared between multiple route segments. Layouts preserve component state, maintain scroll positions, and do not re-render on navigation.

---

## 1. The Root Layout (`app/layout.tsx`)

The **Root Layout** is mandatory for every Next.js application. It must define the top-level `<html>` and `<body>` tags:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "@/app/global.css";

export const metadata: Metadata = {
  title: "OpenDevDocs",
  description: "Learn. Build. Debug. Deploy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <header className="border-b p-4">Site Header</header>
        {children}
        <footer className="border-t p-4">Site Footer</footer>
      </body>
    </html>
  );
}
```

---

## 2. Nested Layouts

Any subfolder in the `app/` directory can define its own `layout.tsx` to wrap child pages (e.g. adding a sidebar navigation):

```tsx
// app/docs/layout.tsx
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 border-r p-4">
        <h2>Documentation Sidebar</h2>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

---

## 3. Layouts vs. Templates

- **Layout (`layout.tsx`)**: Persists across route transitions. State inside the layout is **preserved**.
- **Template (`template.tsx`)**: Re-creates a new component instance on every navigation. Used when you want to reset state (e.g. triggering page enter/exit animations or logging page views).

---

## Related Topics

- [Next.js Pages](/docs/nextjs/pages)
- [Route Groups](/docs/nextjs/route-groups)
- [App Router Architecture](/docs/nextjs/app-router)
