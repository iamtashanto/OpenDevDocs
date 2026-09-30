---
title: "Common TypeScript Errors and How to Fix Them"
description: "Resolving frequent TypeScript compiler errors: TS2322 (not assignable), TS2339 (property does not exist), TS2532 (object possibly undefined), and TS18046."
category: programming
topic: typescript
type: troubleshooting
level: intermediate
tags:
  - typescript
  - errors
  - troubleshooting
  - debugging
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Common TypeScript Errors and How to Fix Them

A diagnostic guide for interpreting and resolving common TypeScript compiler error codes.

---

## 1. `TS2322`: Type 'X' is not assignable to type 'Y'

### Why it happens:
You attempted to assign a value whose shape or type conflicts with the declared type.

```typescript
// ❌ Error: Type 'string' is not assignable to type 'number'.
const port: number = process.env.PORT || 3000;

// ✅ Fix: Coerce or parse string to number
const port: number = Number(process.env.PORT) || 3000;
```

---

## 2. `TS2339`: Property 'X' does not exist on type 'Y'

### Why it happens:
Accessing a property on an object whose type definition does not include that key.

```typescript
const user: { name: string } = { name: "Alex" };

// ❌ Error: Property 'role' does not exist on type '{ name: string; }'
// console.log(user.role);

// ✅ Fix: Add property to type definition or use optional property
type User = {
  name: string;
  role?: string;
};
```

---

## 3. `TS2532` / `TS18048`: 'X' is possibly 'undefined' or 'null'

### Why it happens:
`strictNullChecks` is enabled and the variable may be `undefined` at runtime.

```typescript
const users = [{ id: 1, name: "Alex" }];
const found = users.find(u => u.id === 2); // Type: { id: number; name: string; } | undefined

// ❌ Error: 'found' is possibly 'undefined'.
// console.log(found.name);

// ✅ Fix: Optional chaining or guard check
console.log(found?.name ?? "User not found");
```

---

## 4. `TS7006`: Parameter 'x' implicitly has an 'any' type

### Why it happens:
`noImplicitAny` is enabled and TypeScript could not infer the parameter type.

```typescript
// ❌ Error: Parameter 'event' implicitly has an 'any' type.
// function handleClick(event) { ... }

// ✅ Fix: Explicitly annotate the parameter
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log(event.currentTarget);
}
```

---

## Related Topics

- [Type Narrowing](/docs/typescript/narrowing)
- [Primitive Types in TypeScript](/docs/typescript/primitive-types)
- [JavaScript TypeError Troubleshooting](/errors/javascript/cannot-read-properties-of-undefined)
