---
title: Node.js Environment Variables
description: Configure environment variables in Node.js using native --env-file flags, dotenv, process.env, and schema validation.
category: backend
topic: nodejs
type: guide
level: beginner
tags:
  - nodejs
  - configuration
  - env
  - dotenv
  - security
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

Environment variables allow backend applications to read secrets, database credentials, API keys, and deployment configuration from the operating system without hardcoding them into source files.

---

## 1. Native Node.js `--env-file` (Node.js 20.6+)

Modern Node.js can parse `.env` files natively without requiring third-party libraries:

```ini
# .env
PORT=4000
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
NODE_ENV=development
```

Run your application with the `--env-file` flag:

```bash
node --env-file=.env server.js
```

Inside your JavaScript code:

```javascript
// server.js
const port = process.env.PORT || 3000;
console.log(`Server will run on port ${port}`);
```

---

## 2. Using `dotenv` Package

If you need compatibility with older Node versions or programmatic configuration loading:

```bash
pnpm add dotenv
```

Load `.env` at the earliest entry point:

```javascript
// index.js (ESM)
import 'dotenv/config';

console.log(process.env.DATABASE_URL);
```

---

## 3. Validating Variables with Zod

Prevent runtime failures caused by missing environment variables by validating them at startup:

```typescript
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
```

If any variable is missing or formatted incorrectly, the process crashes immediately at startup with an informative error message.

---

## Security Best Practices

1. **Add `.env` to `.gitignore`**: Never commit secrets or connection strings to version control.
2. **Provide `.env.example`**: Commit a dummy template file documenting required variables without actual secrets.
3. **Use Secret Managers in Production**: In cloud environments (AWS, GCP, Doppler, Infisical), inject variables directly into the container runtime.
