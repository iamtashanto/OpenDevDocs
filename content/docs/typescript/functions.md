---
title: "Functions and Signatures in TypeScript"
description: "Typing functions in TypeScript: parameter types, return type inference, optional/default parameters, function types, and function overloads."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - functions
  - types
  - overloads
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Functions and Signatures in TypeScript

TypeScript allows you to enforce types on function inputs (parameters), outputs (return types), and define reusable function signature types.

---

## 1. Parameter and Return Type Annotations

```typescript
function formatPrice(amount: number, currency: string = "USD"): string {
  return `${amount.toFixed(2)} ${currency}`;
}

// Arrow function with explicit return:
const multiply = (a: number, b: number): number => a * b;

// Void return (function returns nothing):
function logWarning(msg: string): void {
  console.warn(`[WARN]: ${msg}`);
}
```

---

## 2. Function Signature Types

Define reusable callable function types for callbacks and handlers:

```typescript
type ClickHandler = (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;

type Predicate<T> = (item: T) => boolean;

const isEven: Predicate<number> = (num) => num % 2 === 0;
```

---

## 3. Function Overloads

Function overloads let a single function declare multiple callable signatures:

```typescript
// 1. Overload signatures:
function getElement(id: string): HTMLElement | null;
function getElement(index: number): HTMLElement | null;

// 2. Implementation signature (compatible with all overloads):
function getElement(identifier: string | number): HTMLElement | null {
  if (typeof identifier === "string") {
    return document.getElementById(identifier);
  }
  return document.querySelectorAll(".item")[identifier] as HTMLElement ?? null;
}
```

---

## Related Topics

- [Generics in Functions](/docs/typescript/generics)
- [Interfaces vs. Type Aliases](/docs/typescript/interfaces)
- [Type Narrowing](/docs/typescript/narrowing)
