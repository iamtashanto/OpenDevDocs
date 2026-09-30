---
title: "Generics in TypeScript"
description: "Mastering TypeScript Generics: generic functions, interfaces, type constraints (T extends object), default generic types, and real-world API wrappers."
category: programming
topic: typescript
type: guide
level: intermediate
tags:
  - typescript
  - generics
  - type-parameters
  - constraints
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Generics in TypeScript

**Generics** allow you to write reusable, flexible functions, classes, and interfaces that work with a variety of data types while preserving full compile-time type safety.

---

## 1. Generic Functions

Instead of losing type information with `any`, a generic type variable `<T>` captures the exact type passed by the caller:

```typescript
// Generic identity function:
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);         // Type inferred as: number
const str = identity("OpenDev"); // Type inferred as: string
```

---

## 2. Generic Interfaces & API Wrappers

A universal API response envelope:

```typescript
interface ApiResponse<TData> {
  status: "success" | "error";
  statusCode: number;
  data: TData;
  error?: string;
}

interface User {
  id: string;
  name: string;
}

// Typed fetch wrapper:
async function apiGet<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  return await res.json();
}

// Usage:
const response = await apiGet<User>("/api/me");
console.log(response.data.name); // Fully typed as string!
```

---

## 3. Generic Constraints (`extends`)

Restrict generic type parameters to match a required minimum structure:

```typescript
interface HasId {
  id: string | number;
}

// T MUST have an 'id' property:
function printId<T extends HasId>(item: T): void {
  console.log("Entity ID:", item.id);
}

printId({ id: 101, title: "Doc" }); // ✅ Valid
// printId({ name: "Alex" });         // ❌ Error: Property 'id' is missing
```

---

## Related Topics

- [Utility Types in TypeScript](/docs/typescript/utility-types)
- [Interfaces vs. Type Aliases](/docs/typescript/interfaces)
- [Functions in TypeScript](/docs/typescript/functions)
