---
title: HTTP Methods & Idempotency
description: Understand HTTP request methods (GET, POST, PUT, PATCH, DELETE), safety, idempotency, and when to use each in REST APIs.
category: backend
topic: backend-concepts
type: guide
level: beginner
tags:
  - backend
  - http
  - methods
  - idempotency
  - rest
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

HTTP methods (verbs) indicate the desired action to be performed on a target resource. Choosing the correct HTTP verb ensures predictability, cacheability, and network safety.

---

## Method Summary Table

| Method | Role | Safe? | Idempotent? | Request Body? |
| :--- | :--- | :--- | :--- | :--- |
| **`GET`** | Retrieve resource representation | **Yes** | **Yes** | No |
| **`POST`** | Create new resource / trigger processing | No | No | **Yes** |
| **`PUT`** | Complete replacement of resource | No | **Yes** | **Yes** |
| **`PATCH`** | Partial modification of resource | No | No | **Yes** |
| **`DELETE`**| Remove resource | No | **Yes** | Optional (rare) |
| **`HEAD`** | Same as GET but returns headers only | **Yes** | **Yes** | No |
| **`OPTIONS`**| Describe communication options / CORS preflight | **Yes** | **Yes** | No |

---

## Key Definitions

### 1. Safe Methods
A method is considered **Safe** if it does not alter the server state (read-only operations). `GET` and `HEAD` are safe.

### 2. Idempotent Methods
A method is **Idempotent** if making multiple identical requests has the exact same effect on server state as making a single request.
- `PUT /users/1` with `{ name: "Bob" }` $\rightarrow$ Running this 1 time or 100 times results in `user.name === "Bob"`. (Idempotent)
- `POST /users` with `{ name: "Bob" }` $\rightarrow$ Running this 5 times creates 5 separate database rows. (Non-idempotent)
- `DELETE /users/1` $\rightarrow$ Deletes the user on the first call; subsequent calls find nothing to delete, but the end server state is identical. (Idempotent)

---

## PUT vs PATCH

- **`PUT`**: Replaces the entire resource. Missing fields in the payload are typically reset to null or default values.
- **`PATCH`**: Applies partial delta updates. Only the explicitly provided fields are modified; unspecified fields remain untouched.
