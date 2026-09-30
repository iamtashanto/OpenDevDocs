---
title: "JavaScript Destructuring and Spread Operator"
description: "Mastering destructuring assignment: array unpacking, object property extraction, renaming, default values, and rest/spread syntax (...)."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - destructuring
  - spread
  - rest
  - syntax
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Destructuring and Spread Operator

Destructuring syntax allows you to unpack values from arrays or properties from objects into distinct variables in a clean, declarative statement.

---

## 1. Object Destructuring

```javascript
const user = {
  id: 101,
  email: "alex@example.com",
  profile: {
    name: "Alex Rivera",
  },
};

// 1. Basic unpacking:
const { id, email } = user;

// 2. Renaming variables and providing default values:
const { email: userEmail, role = "guest" } = user;
console.log(userEmail); // "alex@example.com"
console.log(role);      // "guest"

// 3. Nested destructuring:
const { profile: { name } } = user;
console.log(name); // "Alex Rivera"
```

---

## 2. Array Destructuring

Array destructuring unpacks values positionally:

```javascript
const coordinates = [40.7128, -74.0060, 10];

// Basic positional unpacking:
const [latitude, longitude, altitude = 0] = coordinates;

// Skipping items:
const [, lng] = coordinates; // lng = -74.0060

// Swapping variables without temporary variable:
let a = 1;
let b = 2;
[a, b] = [b, a]; // a=2, b=1
```

---

## 3. Rest (`...`) vs. Spread (`...`) Operators

While using the identical `...` syntax, they perform opposite operations:

### Spread Operator (Expands arrays/objects):
```javascript
// Clone and merge arrays:
const frontend = ["React", "Next.js"];
const backend = ["Node.js", "PostgreSQL"];
const fullstack = [...frontend, ...backend, "Docker"];

// Merge objects with overrides:
const defaults = { theme: "light", fontSize: 14 };
const userConfig = { ...defaults, theme: "dark" }; // theme becomes "dark"
```

### Rest Operator (Collects remaining items into an array/object):
```javascript
const [head, ...tail] = [1, 2, 3, 4, 5];
// head = 1, tail = [2, 3, 4, 5]

const { id: userId, ...otherFields } = user;
// otherFields contains email and profile
```

---

## Related Topics

- [JavaScript Objects](/docs/javascript/objects)
- [JavaScript Arrays](/docs/javascript/arrays)
- [Functions & Parameter Destructuring](/docs/javascript/functions)
