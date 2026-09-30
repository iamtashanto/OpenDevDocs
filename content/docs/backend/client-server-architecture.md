---
title: Client-Server Architecture
description: Understand client-server separation of concerns, 2-tier vs 3-tier architectures, and how modern web clients communicate with backend servers.
category: backend
topic: backend-concepts
type: concept
level: beginner
tags:
  - backend
  - architecture
  - client-server
  - networking
  - system-design
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

The client-server architecture is a computing model where workload is partitioned between **service requestors** (clients) and **service providers** (servers).

```
┌─────────────────────────────────┐
│        Clients (Frontend)       │
│  (Browsers, Mobile Apps, CLIs)  │
└────────────────┬────────────────┘
                 │ HTTP / WebSocket Request
                 ▼
┌─────────────────────────────────┐
│    Application Server (Backend) │
│    (Node.js, Express, Go, etc.) │
└────────────────┬────────────────┘
                 │ SQL / NoSQL Query
                 ▼
┌─────────────────────────────────┐
│         Database Layer          │
│   (PostgreSQL, Redis, Mongo)    │
└─────────────────────────────────┘
```

---

## Roles and Responsibilities

### 1. The Client (Frontend)
- Renders user interfaces and handles client-side state.
- Collects user inputs, clicks, and gestures.
- Initiates network requests over HTTP/HTTPS or WebSocket connections.
- Formats and displays server responses.

### 2. The Server (Backend)
- Houses core business logic, domain rules, and data integrity checks.
- Authenticates users and enforces authorization policies.
- Connects securely to internal databases, caches, and third-party APIs.
- Protects confidential secrets, API keys, and sensitive computational operations.

---

## Tier Architectures

- **2-Tier Architecture**: Client communicates directly with the database (legacy model, vulnerable to security leaks).
- **3-Tier Architecture**: Client $\leftrightarrow$ Application Server $\leftrightarrow$ Database (the industry standard).
- **N-Tier / Microservices**: Client $\leftrightarrow$ API Gateway / Load Balancer $\leftrightarrow$ Independent Microservices $\leftrightarrow$ Dedicated DBs & Caches.

---

## Core Advantages of Separation of Concerns

1. **Independent Scalability**: Scale backend application instances horizontally without altering frontend code.
2. **Multi-Platform Support**: A single unified REST or GraphQL API backend can serve web browsers, iOS apps, Android apps, and external third-party integrations.
3. **Enhanced Security**: Database credentials, encryption keys, and proprietary algorithms remain isolated behind firewalls.
