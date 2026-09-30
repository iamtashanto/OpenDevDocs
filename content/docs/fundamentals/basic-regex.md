---
title: "Regular Expressions (Regex) Fundamentals"
description: "Practical guide to regular expressions: character classes, quantifiers, anchors, capture groups, flags, and common validation patterns."
category: fundamentals
topic: regex
type: guide
level: beginner
tags:
  - regex
  - text-processing
  - validation
  - javascript
  - fundamentals
platforms:
  - all
lastVerified: "2026-09-30"
---

# Regular Expressions (Regex) Fundamentals

A **Regular Expression (Regex)** is a search pattern used for matching character combinations in strings. Regex powers text validation (emails, phone numbers), search-and-replace routines, and string extraction.

---

## 1. Core Regex Syntax & Cheat Sheet

### Character Classes
- **`.`**: Matches any single character except newline (`\n`).
- **`\d`**: Matches any digit `[0-9]`. (`\D` matches any non-digit).
- **`\w`**: Matches any word character (letters, numbers, underscore `[a-zA-Z0-9_]`).
- **`\s`**: Matches any whitespace character (space, tab `\t`, newline `\n`).
- **`[abc]`**: Matches any character inside brackets (`a`, `b`, or `c`).
- **`[^abc]`**: Matches any character NOT inside brackets.

### Quantifiers (Repetition)
- **`*`**: 0 or more occurrences (`a*` matches `""`, `"a"`, `"aaaa"`).
- **`+`**: 1 or more occurrences (`a+` matches `"a"`, `"aaa"`).
- **`?`**: 0 or 1 occurrence (optional character).
- **`{n}`**: Exactly $n$ occurrences (`\d{4}` matches 4 digits).
- **`{min,max}`**: Between $min$ and $max$ occurrences (`\w{3,8}`).

### Anchors & Boundaries
- **`^`**: Start of string (or start of line in multiline mode).
- **`$`**: End of string (or end of line).
- **`\b`**: Word boundary.

### Flags
- **`g`** (global): Find all matches rather than stopping at the first.
- **`i`** (case-insensitive): Ignore uppercase vs lowercase differences.
- **`m`** (multiline): `^` and `$` match line breaks within string.

---

## 2. Practical JavaScript Examples

### Test if a String Matches:
```javascript
const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

console.log(hexColorRegex.test("#fff"));    // true
console.log(hexColorRegex.test("#10b981")); // true
console.log(hexColorRegex.test("invalid")); // false
```

### Extract Data with Capture Groups:
```javascript
const dateString = "2026-09-30";
const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;

const match = dateString.match(dateRegex);
if (match) {
  const [, year, month, day] = match;
  console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
  // Year: 2026, Month: 09, Day: 30
}
```

### Replace Patterns in Text:
```javascript
const text = "OpenDevDocs version 1.0.0 released!";
const clean = text.replace(/v?\d+\.\d+\.\d+/g, "[SEMVER]");
console.log(clean); // "OpenDevDocs [SEMVER] released!"
```

---

## 3. Common Pitfalls

1. **Catastrophic Backtracking**: Nested quantifiers (e.g. `(a+)+$`) can cause regex engines to lock up the CPU when given long non-matching strings (ReDoS attack). Keep expressions simple and bounded.
2. **Forgetting to Escape Special Characters**: If you want to match a literal dot `.`, dollar sign `$`, or parenthesis `(`, you must escape it with a backslash `\` (e.g. `\.`, `\$`, `\(`).

---

## Related Topics

- [JSON Data Serialization](/docs/fundamentals/json)
- [JavaScript String & Array Methods](/docs/javascript/arrays)
- [Shell Command Filtering with Grep](/docs/fundamentals/shell-fundamentals)
