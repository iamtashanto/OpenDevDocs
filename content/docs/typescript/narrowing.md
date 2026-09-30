---
title: "Type Narrowing & Type Guards in TypeScript"
description: "Mastering type narrowing: typeof, instanceof, in operator, custom type predicates (is), discriminated unions, and truthiness narrowing."
category: programming
topic: typescript
type: guide
level: intermediate
tags:
  - typescript
  - narrowing
  - type-guards
  - control-flow
  - predicates
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Type Narrowing & Type Guards in TypeScript

**Type Narrowing** is the process where TypeScript analyzes JavaScript runtime checks (control flow analysis) to refine a broad type (like `string | number`) into a more specific type.

---

## 1. Built-in Type Guards

### 1. `typeof` Guard (Primitives)
```typescript
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input; // TypeScript knows padding is number here
  }
  return padding + input;               // TypeScript knows padding is string here
}
```

### 2. `instanceof` Guard (Classes & Dates)
```typescript
function formatInput(val: string | Date): string {
  if (val instanceof Date) {
    return val.toISOString(); // TypeScript knows val is a Date instance
  }
  return val.trim();
}
```

### 3. `in` Operator Guard (Object Properties)
```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // animal is narrowed to Fish
  } else {
    animal.fly();  // animal is narrowed to Bird
  }
}
```

---

## 2. Custom Type Predicates (`arg is Type`)

Define reusable runtime validation functions that return a type predicate:

```typescript
interface Article {
  title: string;
  slug: string;
}

// Custom Type Predicate:
function isArticle(item: unknown): item is Article {
  return (
    typeof item === "object" &&
    item !== null &&
    "title" in item &&
    "slug" in item &&
    typeof (item as Record<string, unknown>).title === "string"
  );
}

function processContent(item: unknown) {
  if (isArticle(item)) {
    console.log(item.title); // Fully narrowed to Article!
  }
}
```

---

## 3. Exhaustiveness Checking with `never`

Ensure all cases of a union are handled in a switch statement:

```typescript
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape) {
  switch (shape) {
    case "circle": return Math.PI;
    case "square": return 1;
    case "triangle": return 0.5;
    default: {
      // If a new Shape is added in the future, TypeScript errors here:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
    }
  }
}
```

---

## Related Topics

- [Union and Discriminated Union Types](/docs/typescript/union-types)
- [Primitive Types in TypeScript](/docs/typescript/primitive-types)
- [Error Handling](/docs/javascript/error-handling)
