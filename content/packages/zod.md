---
title: "Zod: TypeScript-First Schema Declaration & Validation"
description: Complete developer reference for Zod, TypeScript-first schema declaration, runtime type inference, parsing, object schemas, transforms, and error handling.
category: packages
topic: validation
type: reference
level: beginner
tags:
  - zod
  - typescript
  - validation
  - schema
platforms:
  - nodejs
  - browser
  - all
tested:
  zod: "3.23.x"
  typescript: "5.6.x"
lastVerified: "2026-09-30"
---

## What It Is

**Zod** is a TypeScript-first schema declaration and runtime data validation library. It allows developers to define a single schema once and automatically infer the corresponding static TypeScript type, eliminating duplicate type declarations and runtime parsing bugs.

---

## Why Use It

1. **Zero Runtime Dependencies**: Ultra-lean, framework-agnostic, and runs identically in Node.js, Next.js, and browser environments.
2. **Automatic Type Inference (`z.infer<typeof schema>`)**: Eliminates manual synchronization between TypeScript interfaces and runtime validation logic.
3. **Parse, Don't Validate**: Zod safely transforms, coerces, and normalizes input data during the parsing phase.
4. **Developer Experience**: Concise, chainable, composable API with deep error reporting and custom error messages.

---

## Installation

<PackageManagerTabs>
  <Tab value="pnpm">
    ```bash
    pnpm add zod
    ```
  </Tab>
  <Tab value="npm">
    ```bash
    npm install zod
    ```
  </Tab>
  <Tab value="yarn">
    ```bash
    yarn add zod
    ```
  </Tab>
  <Tab value="bun">
    ```bash
    bun add zod
    ```
  </Tab>
</PackageManagerTabs>

> [!NOTE]
> Ensure `"strict": true` is enabled in your `tsconfig.json` for proper type inference.

---

## Quick Start

```typescript
import { z } from "zod";

// 1. Define schema
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  age: z.number().int().min(18).optional(),
  role: z.enum(["admin", "user", "guest"]).default("user"),
});

// 2. Infer static TypeScript type
export type User = z.infer<typeof UserSchema>;

// 3. Parse untrusted data
const rawData = {
  id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  name: "Alice",
  email: "alice@example.com",
};

// Returns parsed User object or throws ZodError
const user = UserSchema.parse(rawData);

// Safe parsing (Does not throw)
const result = UserSchema.safeParse(rawData);
if (!result.success) {
  console.error(result.error.format());
} else {
  console.log("Validated user:", result.data);
}
```

---

## Common APIs

| API | Description | Example |
| :--- | :--- | :--- |
| `z.string()` | Validates string primitives with helpers (`email`, `uuid`, `url`, `regex`) | `z.string().min(3).max(50)` |
| `z.number()` | Validates numbers (`int`, `positive`, `gt`, `gte`) | `z.number().positive()` |
| `z.boolean()` | Validates boolean `true`/`false` | `z.boolean()` |
| `z.array(schema)` | Validates array elements | `z.array(z.string()).nonempty()` |
| `z.object(shape)` | Validates nested objects | `z.object({ a: z.string() })` |
| `z.enum([...])` | Validates union of string literals | `z.enum(["pending", "done"])` |
| `z.union([...])` | Validates OR unions | `z.union([z.string(), z.number()])` |
| `z.coerce.*` | Coerces strings to primitives | `z.coerce.number()`, `z.coerce.date()` |
| `.optional()` | Allows `undefined` | `z.string().optional()` |
| `.nullable()` | Allows `null` | `z.string().nullable()` |
| `.nullish()` | Allows `null` or `undefined` | `z.string().nullish()` |
| `.transform(fn)`| Transforms output during parse | `z.string().transform(s => s.trim())` |
| `.refine(fn)` | Custom validation predicates | `schema.refine(v => v % 2 === 0)` |

---

## Examples

### 1. Validating Environment Variables (Next.js / Node.js)
```typescript
// env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
```

### 2. Next.js Server Action / API Route Validation
```typescript
import { z } from "zod";

const CreatePostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
});

export async function createPostAction(formData: FormData) {
  const result = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Safe data is fully typed
  const { title, content } = result.data;
  // await db.post.create(...)
}
```

---

## Best Practices

1. **Use `safeParse` for User-Facing Forms**: Avoid try/catch overhead and handle error states gracefully.
2. **Coerce Primitives from FormData / Query Strings**: Query strings and `FormData` entries are always strings; use `z.coerce.number()` or `z.coerce.boolean()` to parse them accurately.
3. **Keep Schemas Modular**: Reuse small atomic sub-schemas with `.merge()` and `.extend()`.
4. **Use Custom Error Messages**: Provide human-friendly error descriptions directly in the schema definition.

---

## Common Mistakes

- **Using `parse()` without try/catch**: Unhandled `ZodError` will crash Node.js processes or trigger 500 error pages. Use `safeParse()` instead.
- **Forgetting `strict: true` in tsconfig**: Leads to inaccurate static type inferences.
- **Confusing `.nullish()` with `.optional()`**: `.optional()` permits `undefined`, whereas `.nullable()` permits `null`.

---

## Alternatives

- **Valibot**: Highly modular alternative with a smaller bundle size (~1KB) through tree-shaking.
- **Yup**: Popular schema validator, historically paired with Formik, but with weaker TypeScript inference.
- **TypeBox**: High-performance JSON Schema generator optimized for Fastify.
- **ArkType**: Ultra-fast TypeScript syntax validator with zero compilation overhead.

---

## When Not to Use It

- For simple primitive checks inside performance-critical hot loops where microsecond overhead matters.
- In projects where pure JSON Schema standard compliance without TypeScript is strictly required.

---

## Official Resources

- [Official Zod Documentation](https://zod.dev)
- [Zod GitHub Repository](https://github.com/colinhacks/zod)
- [npm Package: zod](https://www.npmjs.com/package/zod)
