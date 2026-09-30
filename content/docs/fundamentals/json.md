---
title: "JSON (JavaScript Object Notation)"
description: "Mastering JSON: syntax specifications, data types, JSON.parse vs JSON.stringify, schema validation, and common formatting pitfalls."
category: fundamentals
topic: serialization
type: guide
level: beginner
tags:
  - json
  - serialization
  - api
  - data
  - javascript
platforms:
  - all
lastVerified: "2026-09-30"
---

# JSON (JavaScript Object Notation)

**JSON** (JavaScript Object Notation) is a lightweight, text-based, language-independent data interchange format. It is the universal standard for web APIs, configuration files (`package.json`, `tsconfig.json`), and document databases.

---

## 1. Supported JSON Data Types

JSON strictly supports only 6 data types:

| Data Type | Example | Rules / Notes |
| :--- | :--- | :--- |
| **String** | `"OpenDevDocs"` | **Must use double quotes `"`**. Single quotes are invalid. |
| **Number** | `42`, `3.1415`, `-10`, `2.5e3` | Integers and floating-point. No `NaN` or `Infinity`. |
| **Boolean** | `true`, `false` | Must be lowercase. |
| **Null** | `null` | Must be lowercase. |
| **Array** | `["react", "nextjs", 16]` | Ordered list of zero or more values. |
| **Object** | `{"key": "value"}` | Unordered collection of key-value pairs. Keys **must be double-quoted strings**. |

### Unsupported Types in JSON
JSON **cannot** store functions, comments, `undefined`, `Date` objects (must be ISO strings), `BigInt`, or circular object references.

---

## 2. Syntax Example

```json
{
  "name": "OpenDevDocs",
  "version": "1.0.0",
  "private": true,
  "stars": 0,
  "contributors": [
    {
      "username": "iamtashanto",
      "roles": ["maintainer", "author"]
    }
  ],
  "metadata": null
}
```

---

## 3. Parsing and Serializing in JavaScript

```javascript
// Serializing JavaScript Object to JSON string:
const user = { id: 1, name: "Alex", active: true };
const jsonString = JSON.stringify(user, null, 2); // 2 spaces indentation

// Parsing JSON string back into JavaScript Object:
try {
  const parsed = JSON.parse(jsonString);
  console.log(parsed.name); // "Alex"
} catch (error) {
  console.error("Invalid JSON format!", error.message);
}
```

---

## 4. Common Syntax Pitfalls

1. **Trailing Commas**:
   ```json
   // ❌ SyntaxError in standard JSON
   {
     "name": "Alex",
   }
   ```
2. **Single Quotes or Unquoted Keys**:
   ```json
   // ❌ SyntaxError: keys and strings MUST use double quotes
   {
     name: 'Alex'
   }
   ```
3. **Comments**: Standard JSON RFC 8259 does not support comments (`//` or `/* */`). (Some tools like TypeScript support `JSONC` for comments).

---

## Related Topics

- [YAML Data Serialization](/docs/fundamentals/yaml)
- [Client and Server HTTP Communication](/docs/fundamentals/client-and-server)
- [JavaScript Objects & Arrays](/docs/javascript/objects)
