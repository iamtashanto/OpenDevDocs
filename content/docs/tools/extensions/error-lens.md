---
title: "Error Lens: Inline Error & Warning Highlighting"
description: Complete guide to the Error Lens VS Code extension, inline diagnostic messages, font customization, filtering noise, and boosting debugging speed.
category: tools
topic: extensions
type: reference
level: beginner
tags:
  - error-lens
  - vscode
  - diagnostics
  - extensions
platforms:
  - linux
  - macos
  - windows
tested:
  extension: "3.x"
lastVerified: "2026-09-30"
---

## What It Does

**Error Lens** (`usernamehw.errorlens`) enhances VS Code's language diagnostics by printing compiler errors, linter warnings, and hints directly inline at the end of the line, complete with highlighted background tints.

---

## Why Use It

1. **Eliminates Hovering**: Read the full error description instantly without pausing to hover your mouse over squiggly lines.
2. **Instant Feedback**: See syntax errors and type mismatches immediately as you write code.
3. **Color-Coded Severity**: Errors (red), warnings (yellow), and info/hints (blue) stand out clearly.

---

## Installation

- **VS Code Marketplace**: Search for `usernamehw.errorlens` and click **Install**.
- **CLI**:
  ```bash
  code --install-extension usernamehw.errorlens
  ```

---

## Configuration

In `.vscode/settings.json`:

```json
{
  // Show error only after typing stops (debounce delay in ms)
  "errorLens.delay": 300,

  // Render icons in the gutter
  "errorLens.gutterIconsEnabled": true,

  // Customize message template
  "errorLens.messageTemplate": "[$source] $message",

  // Suppress subtle warnings if preferred
  "errorLens.enabledDiagnosticLevels": [
    "error",
    "warning"
  ],

  // Exclude noisy linters or specific error codes
  "errorLens.exclude": [
    "eslint(prettier/prettier)"
  ]
}
```

---

## Use Cases & Examples

When a TypeScript type error occurs:
```typescript
const count: number = "hello"; 
// Inline renders: [ts] Type 'string' is not assignable to type 'number'. (2322)
```
You see the error message immediately in bright red at the end of line, allowing you to correct it without lifting your hands from the keyboard.

---

## Alternatives

- **Built-in VS Code Squiggles**: Native subtle underlines; requires mouse hover or opening the Problems panel (<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>).
- **Inline Diagnostics**: Built-in experimental VS Code feature (`editor.inlineSuggest.enabled`).

---

## Performance & Security Considerations

- **Visual Clutter**: In projects with hundreds of pre-existing warnings, Error Lens can feel visually overwhelming. Use `"errorLens.enabledDiagnosticLevels": ["error"]` to restrict display to blocking errors only.
- **Resource Usage**: Lightweight extension that reads standard VS Code language diagnostic events without spawning external processes.

---

## Related Guides

- [ESLint Extension Guide](/docs/tools/extensions/eslint)
- [Debugging Fundamentals](/docs/fundamentals/debugging)
