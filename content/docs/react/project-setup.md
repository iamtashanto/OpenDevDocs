---
title: "React Project Setup (Vite & Next.js)"
description: "How to initialize a modern React project: creating a Vite SPA or a Next.js App Router full-stack application with TypeScript and Tailwind CSS."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - vite
  - nextjs
  - setup
  - project
platforms:
  - web
tested:
  react: "19.x"
  vite: "6.x"
lastVerified: "2026-09-30"
---

# React Project Setup (Vite & Next.js)

The React team recommends initializing new applications using a production framework like **Next.js** (for full-stack, SEO, and SSR) or **Vite** (for client-side Single Page Applications).

---

## Option 1: Next.js App Router (Full-Stack & SSR)

For production web applications with server components, file-based routing, and SEO:

```bash
pnpm create next-app@latest my-app --typescript --tailwind --eslint --app
```

Navigate and start development server:
```bash
cd my-app
pnpm dev
```

---

## Option 2: Vite (Client-Side Single Page Application)

For client-only dashboards, widgets, or internal tools:

```bash
pnpm create vite my-app --template react-ts
```

Install dependencies and start dev server:
```bash
cd my-app
pnpm install
pnpm dev
```

---

## 3. Recommended Project Structure

```
src/
├── app/ (or routes/)      # Page routes and layouts
├── components/            # Reusable UI components
│   └── ui/                # Buttons, inputs, dialogs
├── hooks/                 # Reusable custom React hooks
├── lib/                   # Utility helpers and API clients
├── types/                 # TypeScript type definitions
└── styles/                # Global CSS stylesheet
```

---

## Related Topics

- [React Components](/docs/react/components)
- [Next.js Introduction](/docs/nextjs/introduction)
- [Setting up TypeScript](/docs/typescript/setup)
