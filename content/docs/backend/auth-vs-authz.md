---
title: Authentication vs Authorization
description: Understand the differences between Authentication (AuthN) and Authorization (AuthZ), RBAC, ABAC, and access control patterns.
category: backend
topic: backend-concepts
type: concept
level: beginner
tags:
  - backend
  - auth
  - authentication
  - authorization
  - rbac
  - security
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

Though often used interchangeably, **Authentication** and **Authorization** represent two distinct security checkpoints in backend architectures.

```
Incoming Request
      │
      ▼
[ 1. Authentication (AuthN) ] ──(Invalid credentials)──> 401 Unauthorized
      │ (Valid User)
      ▼
[ 2. Authorization (AuthZ) ]  ──(Insufficient rights)──> 403 Forbidden
      │ (Permitted)
      ▼
[ Business Logic Handler ]
```

---

## Direct Comparison

| Feature | Authentication (AuthN) | Authorization (AuthZ) |
| :--- | :--- | :--- |
| **Core Question** | "Who are you?" | "What are you allowed to do?" |
| **Verification Method** | Passwords, OTPs, Biometrics, SSO | Roles, Permissions, Policies, Ownership |
| **Failure Status Code** | **`401 Unauthorized`** | **`403 Forbidden`** |
| **Timing** | First step of every request | Evaluated after identity is verified |

---

## Common Authorization Models

### 1. Role-Based Access Control (RBAC)
Permissions are assigned to roles, and users are assigned one or more roles (e.g. `guest`, `member`, `admin`).

```typescript
function requireRole(role: string) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    }
    next();
  };
}
```

### 2. Attribute-Based Access Control (ABAC) & Resource Ownership
Access is evaluated dynamically based on attributes of the user, the resource, and the context (e.g. "A user can edit an article ONLY IF `article.authorId === user.id` OR `user.role === 'admin'`"):

```typescript
function canEditArticle(user, article) {
  if (user.role === 'admin') return true;
  return article.authorId === user.id;
}
```

---

## Best Practices

- **Never Trust Client Role Claims**: Always evaluate permissions against verified server-side session data or a cryptographically signed token.
- **Fail Closed (Deny by Default)**: Explicitly require granted permissions rather than checking if access is forbidden.
- **Audit Logging**: Log authorization failures (403) to detect privilege escalation attempts.
