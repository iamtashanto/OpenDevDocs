---
title: "Prettier: Opinionated Code Formatter"
description: Complete guide to the Prettier VS Code extension, configuration (.prettierrc), format on save, Tailwind CSS plugin sorting, and avoiding ESLint conflicts.
category: tools
topic: extensions
type: reference
level: beginner
tags:
  - prettier
  - vscode
  - formatting
  - extensions
platforms:
  - linux
  - macos
  - windows
tested:
  prettier: "3.3.x"
  extension: "11.x"
lastVerified: "2026-09-30"
---

## What It Does

The **Prettier - Code Formatter** extension (`esbenp.prettier-vscode`) enforces consistent code formatting style across JavaScript, TypeScript, JSX, HTML, CSS, JSON, GraphQL, and Markdown files by re-parsing code and printing it with standardized indentation, line wrapping, and quotation rules.

---

## Why Use It

1. **Eliminates Code Style Debates**: Automates formatting decisions so code reviews focus purely on logic and architecture.
2. **Deterministic Output**: Formats code identically across all contributors and platforms.
3. **Format on Save**: Instantly formats files whenever you save (<kbd>Cmd/Ctrl</kbd> + <kbd>S</kbd>).

---

## Installation

- **VS Code Marketplace**: Search for `esbenp.prettier-vscode` and click **Install**.
- **CLI**:
  ```bash
  code --install-extension esbenp.prettier-vscode
  ```

---

## Configuration

### 1. Configure VS Code (`.vscode/settings.json`)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

### 2. Configure Project Rules (`.prettierrc`)
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 3. Configure Ignore Rules (`.prettierignore`)
```text
node_modules
dist
build
.next
coverage
```

---

## Use Cases & Examples

### Automatic Tailwind CSS Class Sorting
When paired with `prettier-plugin-tailwindcss`, saving a component automatically re-orders class names in standard utility order:

```tsx
// Before Save:
<button className="text-white hover:bg-blue-700 bg-blue-600 px-4 py-2 rounded font-bold" />

// After Save (Cmd+S):
<button className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700" />
```

---

## Alternatives

- **Biome**: Ultra-fast Rust-based linter and formatter (replaces both Prettier and ESLint with 20x faster speeds).
- **dprint**: Pluggable binary formatter written in Rust.

---

## Performance & Security Considerations

- **ESLint Conflicts**: Do not use stylistic ESLint rules alongside Prettier. Install `eslint-config-prettier` to disable conflicting formatting rules.
- **Large Minified Files**: Add bundled/minified vendor files to `.prettierignore` to prevent VS Code freezes when opening multi-megabyte files.

---

## Related Guides

- [ESLint Extension Guide](/docs/tools/extensions/eslint)
- [VS Code Settings Reference](/docs/tools/vscode/settings)
