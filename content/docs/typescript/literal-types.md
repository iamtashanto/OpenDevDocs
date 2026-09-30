---
title: "Literal Types and 'as const' in TypeScript"
description: "Mastering string, numeric, and boolean literal types in TypeScript: restricting variables to exact values, template literal types, and as const assertions."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - literal-types
  - as-const
  - template-literals
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Literal Types and 'as const' in TypeScript

A **literal type** is a more specific sub-type of a primitive type. Instead of allowing *any* string or number, a literal type restricts a variable to an **exact value**.

---

## 1. String and Number Literal Types

```typescript
// Only these exact strings are valid:
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type HttpSuccessCode = 200 | 201 | 204;

function setVariant(v: ButtonVariant) { /* ... */ }

setVariant("primary"); // ✅ Valid
// setVariant("custom");  // ❌ Error: Argument of type '"custom"' is not assignable to 'ButtonVariant'
```

---

## 2. The `as const` Assertion (Const Assertions)

When declaring objects or arrays, TypeScript widens property types to general primitives (`string`, `number`). Adding `as const` locks every property into its **exact literal type** and makes all properties `readonly`:

```typescript
// Without 'as const': method is inferred as string (NOT "GET")
const config1 = {
  endpoint: "/api/users",
  method: "GET",
};

// With 'as const': method is locked to literal "GET"
const config2 = {
  endpoint: "/api/users",
  method: "GET",
} as const;

// config2.method is now type: "GET" (readonly)
```

---

## 3. Template Literal Types

Construct new string literal types by interpolating other types:

```typescript
type Direction = "top" | "right" | "bottom" | "left";
type MarginClass = `m-${Direction}`; 
// Type: "m-top" | "m-right" | "m-bottom" | "m-left"

type EventName = `on${Capitalize<"click" | "change" | "submit">}`;
// Type: "onClick" | "onChange" | "onSubmit"
```

---

## Related Topics

- [Union and Intersection Types](/docs/typescript/union-types)
- [Type Aliases](/docs/typescript/type-aliases)
- [Enums and Alternatives](/docs/typescript/enums-and-alternatives)
