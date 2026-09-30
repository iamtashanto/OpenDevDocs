---
title: "VS Code: Settings & Configuration (`settings.json`)"
description: Complete guide to VS Code settings, user vs workspace settings, format on save, font ligatures, minimap customization, and recommended developer settings.
category: tools
topic: vscode
type: guide
level: beginner
tags:
  - vscode
  - settings
  - configuration
  - json
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

VS Code provides a dual settings architecture: **User Settings** (global across all projects) and **Workspace Settings** (stored in `.vscode/settings.json` scoped to the current project).

---

## Accessing `settings.json`

1. Open Command Palette: <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
2. Type **`Preferences: Open User Settings (JSON)`** or **`Preferences: Open Workspace Settings (JSON)`**.

---

## Recommended Developer `settings.json`

```json
{
  // Editor & Formatting
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', Menlo, Monaco, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.minimap.enabled": false,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",

  // Files & Search
  "files.autoSave": "onFocusChange",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  },

  // Terminal
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.cursorBlinking": true,

  // Language Specific Overrides
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  }
}
```

---

## Workspace Settings (`.vscode/settings.json`)

Commit `.vscode/settings.json` into your repository so that all team members automatically share identical formatting rules:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## Related Guides

- [Prettier Extension Guide](/docs/tools/extensions/prettier)
- [ESLint Extension Guide](/docs/tools/extensions/eslint)
- [VS Code Profiles](/docs/tools/vscode/profiles)
