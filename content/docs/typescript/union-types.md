---
title: "Union and Intersection Types in TypeScript"
description: "Combining types in TypeScript: union types (|), intersection types (&), common property access, and discriminated unions."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - unions
  - intersections
  - discriminated-unions
  - types
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Union and Intersection Types in TypeScript

TypeScript provides two powerful operators for combining multiple types: **Unions (`|`)** and **Intersections (`&`)**.

---

## 1. Union Types (`|` — "OR")

A union type represents a value that can be any **one** of several types:

```typescript
type Identifier = string | number;

function printId(id: Identifier) {
  // TypeScript only permits operations common to both string and number:
  console.log(`ID is: ${id}`);

  // Narrowing is required for type-specific methods:
  if (typeof id === "string") {
    console.log("Uppercase ID:", id.toUpperCase());
  }
}
```

---

## 2. Intersection Types (`&` — "AND")

An intersection type combines multiple types into **one unified type** containing all properties of the combined members:

```typescript
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type UserData = {
  id: string;
  name: string;
};

// Merged type containing all 4 properties:
type DatabaseUser = UserData & Timestamps;

const user: DatabaseUser = {
  id: "usr_1",
  name: "Alex",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

---

## 3. Discriminated Unions (Tagged Unions)

Discriminated unions are the single most powerful architectural pattern in TypeScript for modeling state:

```typescript
type NetworkState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: string };

function renderUI(state: NetworkState) {
  switch (state.status) {
    case "loading":
      return "Loading spinner...";
    case "success":
      // TypeScript KNOWS state.data exists here!
      return `Loaded ${state.data.length} items.`;
    case "error":
      // TypeScript KNOWS state.error exists here!
      return `Error: ${state.error}`;
  }
}
```

---

## Related Topics

- [Literal Types in TypeScript](/docs/typescript/literal-types)
- [Type Narrowing Techniques](/docs/typescript/narrowing)
- [Interfaces vs. Type Aliases](/docs/typescript/interfaces)
