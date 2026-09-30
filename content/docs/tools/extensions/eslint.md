---
title: "ESLint: JavaScript & TypeScript Static Code Analysis"
description: Complete guide to the ESLint VS Code extension, flat config (eslint.config.js), auto-fixing on save, rules, and integration with TypeScript.
category: tools
topic: extensions
type: reference
level: beginner
tags:
  - eslint
  - vscode
  - linting
  - extensions
platforms:
  - linux
  - macos
  - windows
tested:
  eslint: "9.x"
  extension: "3.x"
lastVerified: "2026-09-30"
---

## What It Does

The **ESLint** extension (`dbaeumer.vscode-eslint`) integrates the ESLint static analysis engine into VS Code, highlighting syntax errors, code smells, bad practices, and security vulnerabilities directly in the code editor as you type.

---

## Why Use It

1. **Catches Bugs Early**: Identifies unhandled promises, undefined variables, missing React Hook dependencies, and type mismatches before runtime.
2. **Auto-Fix on Save**: Automatically fixes autofixable violations (e.g. removing unused imports or adding missing `const` declarations) every time you save.
3. **Team Standardization**: Enforces shared engineering standards across teams.

---

## Installation

- **VS Code Marketplace**: Search for `dbaeumer.vscode-eslint` and click **Install**.
- **CLI**:
  ```bash
  code --install-extension dbaeumer.vscode-eslint
  ```

---

## Configuration

### 1. VS Code Settings (`.vscode/settings.json`)
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### 2. ESLint Flat Config (`eslint.config.mjs` / `eslint.config.js`)
```javascript
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  }
);
```

---

## Use Cases & Examples

### Catching Missing React Hook Dependencies
If you reference a state variable inside `useEffect` without adding it to the dependency array:
```tsx
useEffect(() => {
  fetchUserData(userId); // Warning: React Hook useEffect has a missing dependency: 'userId'
}, []);
```
Hovering over the squiggly line and pressing <kbd>Cmd/Ctrl</kbd> + <kbd>.</kbd> allows ESLint to automatically insert `userId` into the array!

---

## Alternatives

- **Biome**: Rust-powered linter; significantly faster execution but with a smaller ecosystem of custom community plugins.
- **Oxllint**: High-speed linter focused on catching JavaScript/TypeScript bugs with zero configuration.

---

## Performance & Security Considerations

- **Type-Aware Linting Performance**: Rules requiring type-checking (`@typescript-eslint/recommended-type-checked`) parse full TypeScript ASTs and can slow down large monorepos. Keep type-aware rules enabled for CI and run lighter linting inside the editor.
- **Workspace Trust**: Only enable the ESLint extension on trusted workspaces, as ESLint executes arbitrary JavaScript plugins bundled in `node_modules`.

---

## Related Guides

- [Prettier Extension Guide](/docs/tools/extensions/prettier)
- [Error Lens Extension](/docs/tools/extensions/error-lens)
