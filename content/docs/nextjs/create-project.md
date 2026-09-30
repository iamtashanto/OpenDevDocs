---
title: "Creating a Next.js Project (create-next-app)"
description: "How to initialize a production Next.js application: create-next-app flags, TypeScript, Tailwind CSS, Turbopack, and dev server execution."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - setup
  - create-next-app
  - turbopack
  - pnpm
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Creating a Next.js Project (`create-next-app`)

The easiest way to start a new Next.js project is using `create-next-app`.

---

## 1. Automated Setup

Run the initialization script in non-interactive mode with standard production flags:

```bash
# Using pnpm:
pnpm create next-app@latest my-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

---

## 2. Project Scripts

Inside `package.json`, Next.js provides 4 core scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- **`pnpm dev`**: Starts local development server with instant Turbopack Fast Refresh on `http://localhost:3000`.
- **`pnpm build`**: Analyzes routes, optimizes assets, and compiles an optimized static and server production bundle.
- **`pnpm start`**: Starts the production Node.js standalone server.

---

## Related Topics

- [Next.js Project Structure](/docs/nextjs/project-structure)
- [App Router Architecture](/docs/nextjs/app-router)
- [Dockerize Next.js Application Recipe](/recipes/docker/dockerize-nextjs)
