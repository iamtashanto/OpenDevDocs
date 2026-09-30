---
title: "Client Components ('use client') in Next.js"
description: "When and how to use Client Components: the 'use client' directive, client-server component boundaries, and passing server components as children."
category: frontend
topic: nextjs
type: guide
level: beginner
tags:
  - nextjs
  - client-components
  - use-client
  - interactivity
  - state
platforms:
  - web
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

# Client Components (`"use client"`) in Next.js

A **Client Component** is a React component that executes both on the server (pre-rendered to HTML) and hydrates in the client browser, allowing interactivity, React state, and browser DOM events.

---

## 1. The `"use client"` Directive

Place `"use client"` at the very top of your component file before any imports:

```tsx
"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsDark(d => !d)}
      className="btn"
    >
      Theme: {isDark ? "Dark 🌙" : "Light ☀️"}
    </button>
  );
}
```

---

## 2. When to Use Client Components

| Feature Needed | Component Type |
| :--- | :--- |
| Direct database access / backend secrets | **Server Component** |
| Zero client JavaScript bundle overhead | **Server Component** |
| Interactive state (`useState`, `useReducer`) | **Client Component** |
| Event listeners (`onClick`, `onChange`) | **Client Component** |
| Browser-only APIs (`window`, `localStorage`, `navigator`) | **Client Component** |
| Custom React hooks (`useEffect`, `useRef`) | **Client Component** |

---

## 3. Best Practice: Push Client Boundaries to the Leaves

Keep root pages and layouts as Server Components. Only mark small interactive leaf widgets (e.g. search bars, modal toggles, voting buttons) as `"use client"`:

```tsx
// app/docs/page.tsx (Server Component)
import { DocViewer } from "@/components/DocViewer";
import { CopyButton } from "@/components/CopyButton"; // "use client" leaf component

export default async function DocPage() {
  const doc = await fetchDocFromDatabase();

  return (
    <main>
      <h1>{doc.title}</h1>
      <CopyButton code={doc.codeSnippet} />
      <DocViewer content={doc.html} />
    </main>
  );
}
```

---

## Related Topics

- [React Server Components](/docs/nextjs/server-components)
- [React State Management](/docs/react/state)
- [Linking and Navigation](/docs/nextjs/link-and-navigation)
