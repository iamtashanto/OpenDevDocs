---
title: REST API Architecture
description: Learn REST principles, statelessness, resource naming conventions, and best practices for building scalable RESTful APIs.
category: backend
topic: backend-concepts
type: concept
level: beginner
tags:
  - backend
  - rest
  - api
  - http
  - architecture
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## What is REST?

**REST (Representational State Transfer)** is an architectural style for designing networked applications. RESTful APIs use standard HTTP verbs and URIs to interact with abstract entities known as **Resources**.

---

## 6 Guiding Constraints of REST

1. **Client-Server**: Complete separation of user interface concerns from data storage and business logic.
2. **Stateless**: Each request from the client must contain all necessary information for the server to process it. The server stores no context between requests.
3. **Cacheable**: Responses must explicitly define whether they can be cached by clients or intermediary proxies (`Cache-Control` header).
4. **Uniform Interface**: Consistent resource identification (`/users`), manipulation through representations (JSON), and self-descriptive messages.
5. **Layered System**: Clients cannot tell whether they are connected directly to the end server or an intermediary load balancer, proxy, or CDN.
6. **Code on Demand (Optional)**: Servers can temporarily extend client functionality by transferring executable code (e.g. JavaScript scripts).

---

## REST Resource Naming Conventions

Always use plural nouns rather than verbs for endpoint URIs:

| Action | ❌ Bad (RPC Style) | ✅ Good (RESTful Style) |
| :--- | :--- | :--- |
| List all users | `GET /getAllUsers` | `GET /api/v1/users` |
| Get a single user | `GET /getUserById?id=12` | `GET /api/v1/users/12` |
| Create user | `POST /createNewUser` | `POST /api/v1/users` |
| Update user | `POST /updateUser/12` | `PUT /api/v1/users/12` |
| Delete user | `POST /deleteUser?id=12` | `DELETE /api/v1/users/12` |
| Get user orders | `GET /getUserOrders/12` | `GET /api/v1/users/12/orders` |

---

## API Versioning Strategies

- **URI Path Versioning (Recommended)**: `/api/v1/users`
- **Header Versioning**: `Accept: application/vnd.company.v1+json`
- **Query Parameter Versioning**: `/api/users?version=1`
