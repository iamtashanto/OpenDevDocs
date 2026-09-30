---
title: "Error Handling Architecture in Next.js"
description: "Handling runtime errors in Next.js: error.tsx boundaries, global-error.tsx, recovering via reset(), digest hashes, and server error sanitization."
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - error-handling
  - error-boundary
  - global-error
  - reset
platforms:
  - web
tested:
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Error Handling Architecture in Next.js

Next.js App Router automatically wraps route segments in React Error Boundaries using **`error.tsx`** files.

---

## 1. Segment Error Boundaries (`error.tsx`)

`error.tsx` **must always be a Client Component** (`"use client"`):

```tsx
// app/dashboard/error.tsx
"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to telemetry service (Sentry, Datadog)
    console.error("Dashboard route error:", error);
  }, [error]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold">Something went wrong!</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Error Reference ID: {error.digest ?? "N/A"}
      </p>
      <button
        onClick={() => reset()}
        className="btn mt-4"
      >
        Try Again
      </button>
    </div>
  );
}
```

---

## 2. Global Error Boundary (`app/global-error.tsx`)

To catch errors thrown inside the **Root Layout (`app/layout.tsx`)**, create `app/global-error.tsx`. It must define its own `<html>` and `<body>` tags:

```tsx
// app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen">
        <h2>Critical System Error</h2>
        <button onClick={() => reset()}>Reload Application</button>
      </body>
    </html>
  );
}
```

---

## Related Topics

- [Not Found Pages (not-found.tsx)](/docs/nextjs/not-found)
- [React Error Boundaries](/docs/react/error-boundaries)
- [Common Next.js Errors](/docs/nextjs/common-errors)
