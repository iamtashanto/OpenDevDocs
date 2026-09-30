---
title: "Arrays and Tuples in TypeScript"
description: "Annotating arrays in TypeScript: type[] syntax, Array<T> generic, readonly arrays, and fixed-length typed Tuples."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - arrays
  - tuples
  - readonly
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Arrays and Tuples in TypeScript

TypeScript enables precise typing of variable-length arrays and fixed-length ordered tuples.

---

## 1. Array Annotations

```typescript
// Standard array annotation:
const frameworks: string[] = ["Next.js", "React", "Vite"];

// Generic Array<T> syntax (identical behavior):
const scores: Array<number> = [98, 85, 92];

// Union type array (can contain numbers OR strings):
const mixed: (string | number)[] = ["Page", 1, "Section", 2];
```

---

## 2. Readonly Arrays (Immutable)

Prevent mutation methods like `.push()`, `.pop()`, or `.splice()` on arrays:

```typescript
const allowedMethods: readonly string[] = ["GET", "POST", "PUT"];

// ❌ Compiler Error: Property 'push' does not exist on type 'readonly string[]'
// allowedMethods.push("DELETE");
```

---

## 3. Fixed-Length Tuples

A **tuple** is an array with a fixed number of elements whose individual positions have specific types:

```typescript
// Tuple: [HTTP Status Code, Status Message]
let response: [number, string];

response = [200, "OK"]; // ✅ Valid
// response = ["OK", 200]; // ❌ Error: Type 'string' is not assignable to type 'number'

// Named tuple elements (for documentation clarity):
type Coordinates = [latitude: number, longitude: number, altitude?: number];
const location: Coordinates = [40.7128, -74.0060];
```

---

## Related Topics

- [Objects in TypeScript](/docs/typescript/objects)
- [Generics in TypeScript](/docs/typescript/generics)
- [JavaScript Array Methods](/docs/javascript/arrays)
