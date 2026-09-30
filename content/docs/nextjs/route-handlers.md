---
title: Next.js Route Handlers
description: Learn how to build custom HTTP request handlers and REST API endpoints in the Next.js App Router using route.ts files.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - app-router
  - api
  - route-handlers
  - http
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs. Route Handlers are defined in a `route.ts` (or `route.js`) file inside the `app` directory.

---

## Supported HTTP Methods

Next.js supports standard HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`. If an unsupported method is called, Next.js automatically returns a `405 Method Not Allowed` response.

```typescript
// app/api/items/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const data = [{ id: 1, name: 'Sample Item' }];
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, item: body }, { status: 201 });
}
```

---

## Reading Request Headers and Cookies

Next.js extends the standard Web `Request` with `NextRequest`, providing helper methods for reading cookies and search parameters easily:

```typescript
// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Read search parameters (?search=test)
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('search');

  // Read request headers
  const authHeader = request.headers.get('authorization');

  // Read cookies
  const token = request.cookies.get('session-token');

  return NextResponse.json({
    query,
    hasAuth: Boolean(authHeader),
    hasSession: Boolean(token),
  });
}
```

---

## Dynamic Route Handlers

Route Handlers can be placed inside dynamic folder segments (e.g. `app/api/posts/[id]/route.ts`).

> [!NOTE]
> In modern Next.js (version 15+ and 16+), dynamic `params` in Route Handlers is an asynchronous Promise that must be awaited.

```typescript
// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const { id } = await context.params;

  return NextResponse.json({
    id,
    title: `Post details for ${id}`,
  });
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  const { id } = await context.params;

  // Perform deletion logic...
  return new NextResponse(null, { status: 204 });
}
```

---

## Caching Behavior

- **Static Caching**: `GET` handlers that do not access `request` headers/cookies or search parameters can be statically cached by default during build.
- **Dynamic Execution**: Handlers that access dynamic request information (`request.headers`, `request.cookies`, `request.nextUrl.searchParams`) or use methods other than `GET` are evaluated dynamically on each incoming request.

---

## Best Practices

1. **Keep Route Handlers for External APIs & Webhooks**: If you are handling UI form submissions within the same Next.js application, prefer **Server Actions** over Route Handlers.
2. **Do Not Nest `page.tsx` and `route.ts` at the Same Path**: A route segment cannot have both a `page.tsx` and a `route.ts` file.
3. **Always Validate Input**: Validate JSON payloads using libraries like Zod before database operations.
