---
title: Cannot read properties of undefined
description: Fix the "Cannot read properties of undefined (reading 'x')" JavaScript error — root cause, examples, and solution.
---

# Cannot read properties of undefined

## Error

```
TypeError: Cannot read properties of undefined (reading 'foo')
```

## Root Cause

You are trying to access a property on a value that is `undefined`. This happens when:

- A variable was never assigned
- An async operation hasn't resolved yet
- An object doesn't have the expected shape
- An array index is out of bounds

## Example

```js
const user = undefined;
console.log(user.name); // ❌ TypeError: Cannot read properties of undefined (reading 'name')
```

## Fix

**Option 1: Optional chaining**

```js
console.log(user?.name); // ✅ Returns undefined safely
```

**Option 2: Guard clause**

```js
if (user) {
  console.log(user.name);
}
```

**Option 3: Default value**

```js
const { name = "Guest" } = user ?? {};
```

## Prevention

- Always initialize variables with a default value
- Use TypeScript — it catches these at compile time
- Use optional chaining (`?.`) when accessing nested properties from API responses
