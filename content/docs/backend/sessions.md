---
title: Server-Side Session Management
description: Learn stateful session architecture, session store backends (Redis, PostgreSQL), lifecycle invalidation, and session vs token trade-offs.
category: backend
topic: backend-concepts
type: concept
level: intermediate
tags:
  - backend
  - auth
  - sessions
  - redis
  - security
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## What is a Session?

A **Session** is a stateful authentication pattern where the server creates and persists session data (user ID, role, permissions, last active timestamp) in a central database or cache, while handing the client an opaque cryptographically-random **Session ID**.

---

## Session Workflow

```
Client (Browser)                 Server                    Redis Session Store
      │                             │                              │
      │ 1. POST /login (email/pwd)  │                              │
      ├────────────────────────────>│                              │
      │                             │ 2. Verify credentials       │
      │                             │ 3. Generate random sessionId │
      │                             │ 4. SET session:xyz {userId}  │
      │                             ├─────────────────────────────>│
      │ 5. Set-Cookie: sid=xyz      │<─────────────────────────────┤
      │<────────────────────────────┤                              │
      │                             │                              │
      │ 6. GET /dashboard (sid=xyz) │                              │
      ├────────────────────────────>│                              │
      │                             │ 7. GET session:xyz           │
      │                             ├─────────────────────────────>│
      │                             │<─────────────────────────────┤
      │ 8. Render dashboard data    │                              │
      │<────────────────────────────┤                              │
```

---

## Why Use Redis for Session Stores?

1. **In-Memory Speed**: Reading session state takes less than 1 millisecond.
2. **Automatic Expiration (TTL)**: Redis keys support native time-to-live (`EXPIRE session:xyz 604800`), automatically purging inactive sessions without scheduled cleanup cron jobs.
3. **Shared State Across Clusters**: All load-balanced backend instances query the same Redis cluster for consistent session states.

---

## Instant Session Invalidation & Revocation

The standout advantage of stateful sessions over stateless JWTs is the ability to revoke access immediately:

- **Logout**: Delete the key `session:xyz` from Redis.
- **Password Reset / Ban User**: Query and delete all active sessions associated with `userId`.
- **Force Logout All Devices**: Purge all session keys linked to that user ID.

---

## Sessions vs JWT Summary

| Feature | Server-Side Sessions | Stateless JWT |
| :--- | :--- | :--- |
| **State Storage** | Server Database / Redis | Client Browser Memory/Storage |
| **Instant Revocation** | Instant (delete DB row) | Complex (requires token blocklist) |
| **Database Lookup** | Required on every request | None (verified with cryptographic key) |
| **Payload Size** | Small (~32-byte opaque ID) | Larger (~300-1000 bytes) |
