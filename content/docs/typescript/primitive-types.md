---
title: "Primitive Types in TypeScript"
description: "Mastering TypeScript primitives: string, number, boolean, null, undefined, symbol, bigint, any vs unknown, and never."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - primitives
  - types
  - unknown
  - any
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Primitive Types in TypeScript

TypeScript extends JavaScript's primitive types with compile-time type annotations and provides special top and bottom types.

---

## 1. Core Primitives

```typescript
const username: string = "iamtashanto";
const starCount: number = 42;
const isPublished: boolean = true;
const bigIntValue: bigint = 9007199254740991n;
const uniqueKey: symbol = Symbol("id");

const emptyValue: null = null;
const notAssigned: undefined = undefined;
```

---

## 2. Special Types: `any` vs. `unknown` vs. `never`

| Type | Classification | Behavior | Safe to Use? |
| :--- | :--- | :--- | :--- |
| **`any`** | Top Type (Bypasses Compiler) | Disables all typechecking. Allows calling any method or accessing any property without check. | ❌ Avoid (defeats TypeScript's purpose) |
| **`unknown`** | Top Type (Type-Safe) | Can hold any value, but TypeScript **forces you to narrow or typecheck** before performing any operations on it. | ✅ Recommended for raw API inputs |
| **`never`** | Bottom Type | Represents values that can **never occur** (e.g. function that always throws an error or infinite loop). | ✅ Great for exhaustive switch checks |

### `unknown` in Action:
```typescript
function parseApiResponse(data: unknown) {
  // ❌ Error: Property 'title' does not exist on type 'unknown'.
  // console.log(data.title);

  // ✅ Safe narrowing check:
  if (typeof data === "object" && data !== null && "title" in data) {
    console.log((data as { title: string }).title);
  }
}
```

---

## Related Topics

- [Arrays and Tuples in TypeScript](/docs/typescript/arrays)
- [Type Narrowing Techniques](/docs/typescript/narrowing)
- [Union and Literal Types](/docs/typescript/union-types)
