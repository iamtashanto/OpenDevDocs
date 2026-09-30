---
title: Next.js Middleware
description: Intercept requests, enforce authentication, rewrite paths, and modify headers using Next.js Middleware.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - middleware
  - edge
  - routing
  - security
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Middleware allows you to run code before a request is completed. Based on the incoming request, you can rewrite URLs, redirect users, modify request/response headers, or directly respond with custom statuses.

Middleware is defined in a single `middleware.ts` (or `middleware.js`) file placed in the root of your project (or inside `src/`).

---

## Basic Middleware Structure

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read request details
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token');

  // Redirect unauthenticated users away from protected areas
  if (pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue to target page
  return NextResponse.next();
}

// Configure matching paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

---

## Common Middleware Use Cases

### 1. Modifying Request & Response Headers

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone request headers and add custom headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-custom-request-id', crypto.randomUUID());

  // Pass modified headers to downstream server components
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set response headers
  response.headers.set('x-custom-response-header', 'OpenDevDocs');
  return response;
}
```

### 2. URL Rewriting (Multi-Tenancy & Subdomains)

Rewriting modifies the internal route path without changing the URL visible in the user's browser:

```typescript
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Rewrite subdomains (e.g. org1.example.com -> /sites/org1)
  if (hostname.endsWith('.example.com')) {
    const subdomain = hostname.replace('.example.com', '');
    return NextResponse.rewrite(
      new URL(`/sites/${subdomain}${request.nextUrl.pathname}`, request.url)
    );
  }

  return NextResponse.next();
}
```

---

## Middleware Constraints & Best Practices

1. **Lightweight Execution**: Middleware runs at the edge before static assets and pages. Avoid large dependencies and slow database roundtrips.
2. **Use Matcher Filters**: Always configure `matcher` to exclude static files, images, and public assets to avoid unnecessary execution overhead.
3. **Defense in Depth**: Do not rely on Middleware alone for data security; always verify authorization in Server Components and Server Actions.
