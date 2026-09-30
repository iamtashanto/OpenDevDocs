---
title: "JavaScript Objects and Property Access"
description: "Mastering JavaScript Objects: object literals, dot vs bracket notation, computed property names, Object.keys/values/entries, and shallow vs deep cloning."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - objects
  - dictionaries
  - cloning
  - fundamentals
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Objects and Property Access

Objects are collections of key-value pairs used to store structured data and complex entities.

---

## 1. Object Literal & Property Access

```javascript
const user = {
  id: "usr_102",
  username: "iamtashanto",
  "preferred-theme": "dark", // Multi-word keys need quotes
  greet() {
    return `Hello, ${this.username}!`;
  },
};

// Dot Notation (Standard identifier keys):
console.log(user.username); // "iamtashanto"

// Bracket Notation (Dynamic keys or keys with hyphens):
console.log(user["preferred-theme"]); // "dark"

const dynamicKey = "id";
console.log(user[dynamicKey]); // "usr_102"
```

---

## 2. Essential Object Utility Methods

```javascript
const book = { title: "Clean Code", author: "Martin", year: 2008 };

// Object.keys(): Array of property names
console.log(Object.keys(book)); // ["title", "author", "year"]

// Object.values(): Array of property values
console.log(Object.values(book)); // ["Clean Code", "Martin", 2008]

// Object.entries(): Array of [key, value] tuples
console.log(Object.entries(book));
// [["title", "Clean Code"], ["author", "Martin"], ["year", 2008]]
```

---

## 3. Shallow vs. Deep Cloning

```javascript
const original = {
  name: "Project",
  settings: { dark: true },
};

// 1. Shallow Clone (Spread or Object.assign):
// Sub-objects (settings) are shared by reference!
const shallowCopy = { ...original };
shallowCopy.settings.dark = false;
console.log(original.settings.dark); // false (accidentally mutated original!)

// 2. Deep Clone with structuredClone() (Modern Standard):
const deepCopy = structuredClone(original);
deepCopy.settings.dark = true;
console.log(original.settings.dark); // false (original is protected)
```

---

## Related Topics

- [Destructuring & Rest/Spread Syntax](/docs/javascript/destructuring)
- [JSON Data Format](/docs/fundamentals/json)
- [Cannot read properties of undefined Troubleshooting](/errors/javascript/cannot-read-properties-of-undefined)
