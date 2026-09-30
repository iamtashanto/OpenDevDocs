---
title: "Route Groups in Next.js App Router"
description: "Organizing routes with Route Groups (folderName): omitting folder names from URLs, creating multiple root layouts, and organizing dashboard vs marketing routes."
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - route-groups
  - layouts
  - organization
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Route Groups in Next.js App Router

A **Route Group** is created by wrapping a folder name in parentheses: `(folderName)`. Route groups allow you to organize your route segments and layouts **without affecting the public URL path structure**.

---

## 1. Organizing Projects Without Changing URLs

```
app/
├── (marketing)/
│   ├── layout.tsx            # Marketing layout (Header with Pricing CTA)
│   ├── about/
│   │   └── page.tsx          ──► URL: /about (NOT /(marketing)/about)
│   └── contact/
│       └── page.tsx          ──► URL: /contact
└── (dashboard)/
    ├── layout.tsx            # Dashboard layout (Sidebar with Account Settings)
    └── settings/
        └── page.tsx          ──► URL: /settings
```

---

## 2. Creating Multiple Root Layouts

You can create completely separate root layouts (e.g. one for public marketing pages and one for the authenticated app) by removing the top-level `app/layout.tsx` and creating individual `layout.tsx` files inside distinct route groups:

```
app/
├── (marketing)/
│   ├── layout.tsx            # Contains <html> and <body> for marketing
│   └── page.tsx              ──► URL: /
└── (app)/
    ├── layout.tsx            # Contains <html> and <body> for web app
    └── dashboard/
        └── page.tsx          ──► URL: /dashboard
```

---

## Related Topics

- [Layouts in Next.js](/docs/nextjs/layouts)
- [Pages in Next.js](/docs/nextjs/pages)
- [Dynamic Routes](/docs/nextjs/dynamic-routes)
