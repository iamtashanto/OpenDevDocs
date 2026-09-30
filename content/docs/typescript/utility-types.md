---
title: "TypeScript Utility Types (Partial, Pick, Omit, Record)"
description: "Mastering built-in TypeScript utility types: Partial, Required, Readonly, Record, Pick, Omit, Exclude, Extract, NonNullable, ReturnType, and Awaited."
category: programming
topic: typescript
type: guide
level: intermediate
tags:
  - typescript
  - utility-types
  - partial
  - pick
  - omit
  - record
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# TypeScript Utility Types (Partial, Pick, Omit, Record)

TypeScript provides built-in global utility types to facilitate common type transformations.

---

## 1. Object Transformation Utilities

Consider a base user model:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}
```

| Utility | Transformation | Example | Resulting Type |
| :--- | :--- | :--- | :--- |
| **`Partial<T>`** | Makes **all** properties optional (`?`) | `Partial<User>` | `{ id?: string; name?: string; ... }` (for PATCH updates) |
| **`Required<T>`** | Makes **all** properties mandatory | `Required<User>` | All optional `?` modifiers removed |
| **`Readonly<T>`** | Makes **all** properties `readonly` | `Readonly<User>` | Properties cannot be reassigned |
| **`Pick<T, K>`** | Selects a subset of keys from `T` | `Pick<User, "id" \| "email">` | `{ id: string; email: string; }` |
| **`Omit<T, K>`** | Removes keys `K` from `T` | `Omit<User, "id">` | `{ name: string; email: string; age: number; }` |
| **`Record<K, V>`** | Creates object type with keys `K` and values `V` | `Record<string, number>` | `{ [key: string]: number }` |

---

## 2. Union & Function Utilities

| Utility | Purpose | Example |
| :--- | :--- | :--- |
| **`Exclude<T, U>`** | Excludes types in `U` from union `T` | `Exclude<"a" \| "b" \| "c", "a">` → `"b" \| "c"` |
| **`Extract<T, U>`** | Extracts types in `U` from union `T` | `Extract<string \| number, string>` → `string` |
| **`NonNullable<T>`** | Removes `null` and `undefined` from `T` | `NonNullable<string \| null>` → `string` |
| **`ReturnType<T>`** | Obtains the return type of a function type `T` | `ReturnType<() => number>` → `number` |
| **`Parameters<T>`** | Obtains function parameters as a tuple | `Parameters<(a: string, b: number) => void>` → `[string, number]` |
| **`Awaited<T>`** | Unwraps Promise types recursively | `Awaited<Promise<string>>` → `string` |

---

## Related Topics

- [Generics in TypeScript](/docs/typescript/generics)
- [Interfaces vs. Type Aliases](/docs/typescript/interfaces)
- [Type Narrowing](/docs/typescript/narrowing)
