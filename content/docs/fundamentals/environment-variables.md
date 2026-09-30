---
title: "Environment Variables and .env"
description: "Managing configuration via environment variables: process.env, .env files, security boundaries, and Twelve-Factor App principles."
category: fundamentals
topic: configuration
type: guide
level: beginner
tags:
  - environment-variables
  - env
  - secrets
  - configuration
  - security
platforms:
  - all
lastVerified: "2026-09-30"
---

# Environment Variables and .env

**Environment variables (env vars)** are dynamic key-value pairs stored in the operating system process memory. They allow developers to configure applications across different environments (local development, staging, production) without hardcoding secrets or URLs into source code.

---

## 1. Setting and Reading Variables in the Terminal

### Temporary (Current Command Only)
```bash
PORT=8080 node server.js
```

### Session-Wide (Exported)
```bash
export DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
echo $DATABASE_URL
```

---

## 2. Using `.env` Files

In modern frameworks (Next.js, Vite, Node.js), environment variables are stored in `.env` files in the project root:

```ini
# .env.local (DO NOT COMMIT TO GIT)
DATABASE_URL="postgresql://postgres:secret@localhost:5432/app"
JWT_SECRET="super-secret-key-32-chars-long"

# Public variables exposed to the frontend browser:
NEXT_PUBLIC_API_URL="https://api.example.com"
```

### Git Security Rule
Always add `.env`, `.env.local`, and `.env.production` to your `.gitignore`:

```text
.env
.env*.local
```

Commit a **`.env.example`** template containing variable names with dummy placeholder values so team members know what variables are required.

---

## 3. Reading Environment Variables in Code

### Node.js / Next.js Server Components:
```javascript
const dbUrl = process.env.DATABASE_URL;
const isProd = process.env.NODE_ENV === "production";

if (!dbUrl) {
  throw new Error("DATABASE_URL environment variable is missing!");
}
```

### Schema Validation with Zod (Best Practice):
```typescript
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
```

---

## 4. Common Mistakes

1. **Accidentally Committing Secrets to Public Git Repositories**: If you accidentally push API keys or database passwords to GitHub, assume they are compromised immediately and rotate the keys.
2. **Expecting `process.env` in Static Client Bundles**: Standard server environment variables are stripped during frontend compilation. Only variables explicitly prefixed (e.g. `NEXT_PUBLIC_` or `VITE_`) are bundled into client JavaScript.

---

## Related Topics

- [Shell Fundamentals & PATH](/docs/fundamentals/shell-fundamentals)
- [Processes & Signal Handling](/docs/fundamentals/processes)
- [JWT Authentication Recipe](/recipes/auth/react-nextjs-auth-jwt)
- [Next.js + Prisma Recipe](/recipes/nextjs/nextjs-postgres-prisma)
