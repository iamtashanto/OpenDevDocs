---
title: "JWT Authentication with HTTP-Only Cookies in Next.js"
description: Implement secure stateless authentication using JSON Web Tokens (JWT), HTTP-only cookies, and Next.js middleware protection.
category: security
topic: auth
type: recipe
level: intermediate
tags:
  - nextjs
  - auth
  - jwt
  - cookies
  - security
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  jose: "5.x"
lastVerified: "2026-09-30"
---

## Goal

Build an authentication flow in Next.js App Router where users log in, receive an encrypted, signed JWT stored in a secure `httpOnly` cookie, and protected routes are guarded via Edge-compatible middleware.

---

## Prerequisites

- Next.js 14, 15, or 16 App Router project
- Basic knowledge of Server Actions and cookies

---

<Steps>
  <Step step={1} title="Install Edge-Compatible JWT Library (jose)">
    Install `jose`, the standard Edge-compatible Web Crypto JWT library:

    <PackageManagerTabs package="jose" />
  </Step>

  <Step step={2} title="Create Session Utility (`lib/session.ts`)">
    Implement token signing and verification:

    ```typescript
    // lib/session.ts
    import { SignJWT, jwtVerify } from "jose";
    import { cookies } from "next/headers";

    const secretKey = process.env.JWT_SECRET || "super-secret-key-change-in-production";
    const key = new TextEncoder().encode(secretKey);

    export async function createSession(userId: string, email: string) {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      const token = await new SignJWT({ userId, email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);

      const cookieStore = await cookies();
      cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
      });
    }

    export async function verifySession(token: string) {
      try {
        const { payload } = await jwtVerify(key, token, {
          algorithms: ["HS256"],
        });
        return payload;
      } catch {
        return null;
      }
    }

    export async function deleteSession() {
      const cookieStore = await cookies();
      cookieStore.delete("session");
    }
    ```
  </Step>

  <Step step={3} title="Protect Routes with Middleware (`middleware.ts`)">
    Create `middleware.ts` at your project root:

    ```typescript
    // middleware.ts
    import { NextResponse } from "next/server";
    import type { NextRequest } from "next/request";
    import { verifySession } from "@/lib/session";

    const protectedRoutes = ["/dashboard", "/settings", "/profile"];

    export async function middleware(req: NextRequest) {
      const path = req.nextUrl.pathname;
      const isProtected = protectedRoutes.some((route) => path.startsWith(route));

      if (isProtected) {
        const sessionCookie = req.cookies.get("session")?.value;
        const session = sessionCookie ? await verifySession(sessionCookie) : null;

        if (!session) {
          return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
      }

      return NextResponse.next();
    }

    export const config = {
      matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    };
    ```
  </Step>
</Steps>

---

## Security Notes

1. **`httpOnly: true`**: Prevents JavaScript in the browser from reading the cookie, mitigating Cross-Site Scripting (XSS) token theft.
2. **`sameSite: 'lax'`**: Protects against Cross-Site Request Forgery (CSRF).
3. **`secure: true`**: Ensures the cookie is only transmitted over encrypted HTTPS connections in production.
