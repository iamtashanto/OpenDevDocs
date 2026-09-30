---
title: Node.js Security Fundamentals
description: Defend Node.js applications against prototype pollution, ReDoS, SQL injection, cross-site scripting, and dependency vulnerabilities.
category: backend
topic: nodejs
type: guide
level: intermediate
tags:
  - nodejs
  - security
  - owasp
  - vulnerabilities
  - sanitization
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

Securing a Node.js backend requires defense-in-depth across input validation, dependency management, process permissions, and HTTP response headers.

---

## 1. Prototype Pollution Prevention

Prototype pollution occurs when attacker-controlled JSON properties (like `__proto__` or `constructor.prototype`) mutate global JavaScript prototypes, leading to property injection or Remote Code Execution (RCE).

### Mitigation
- Use `Object.create(null)` for plain key-value lookup dictionaries.
- Validate input structures strictly using `zod` schemas.
- Use `Map` instead of raw object literals for arbitrary user-keyed dictionaries.

---

## 2. Regular Expression Denial of Service (ReDoS)

Evil regexes with nested quantifiers (e.g. `/^(a+)+$/`) cause exponential backtracking on malicious input strings, locking up the single Node.js event loop thread at 100% CPU.

### Mitigation
- Avoid nested greedy wildcards (`(a+)+`, `([a-zA-Z]+)*`).
- Use tools like `safe-regex` or validator libraries rather than writing custom complex regex.

---

## 3. SQL & NoSQL Injection Prevention

Never concatenate raw user strings into SQL queries:

```javascript
// ❌ Dangerous: SQL Injection
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;

// ✅ Secure: Parameterized Prepared Statements
const query = 'SELECT * FROM users WHERE email = $1';
await db.query(query, [req.body.email]);
```

---

## 4. HTTP Security Headers with Helmet

Use `helmet` to set security headers that protect against clickjacking, MIME-sniffing, and cross-site scripting:

```javascript
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());
```

---

## 5. Continuous Dependency Auditing

Audit third-party dependencies for known CVEs:

```bash
# Audit dependencies
pnpm audit

# Fix vulnerabilities automatically when patches are available
pnpm audit --fix
```

---

## Security Checklist

- [ ] Run application containers as non-root users (`USER node`).
- [ ] Never expose stack traces or internal errors to production clients.
- [ ] Set strict payload size limits (`express.json({ limit: '100kb' })`) to prevent memory exhaustion DoS attacks.
- [ ] Store passwords using slow cryptographic hashes like `argon2` or `bcrypt`.
