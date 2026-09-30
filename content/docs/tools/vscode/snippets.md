---
title: "VS Code: Custom Code Snippets"
description: Complete guide to authoring custom VS Code snippets for TypeScript, React, and Next.js, tab stops ($1, $2), placeholders, and variables.
category: tools
topic: vscode
type: guide
level: intermediate
tags:
  - vscode
  - snippets
  - productivity
  - json
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

**Code Snippets** are pre-configured code templates that expand when typing a prefix and pressing <kbd>Tab</kbd>, saving hours of repetitive boilerplate typing.

---

## Creating Custom Snippets

1. Open Command Palette: <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
2. Type **`Preferences: Configure User Snippets`**
3. Select the target language (e.g. `typescriptreact.json` for React/Next.js or `global` for all files).

---

## Snippet Syntax & Anatomy

```json
{
  "React Functional Component (TypeScript)": {
    "prefix": "rfc",
    "body": [
      "interface ${TM_FILENAME_BASE}Props {",
      "  $1",
      "}",
      "",
      "export function ${TM_FILENAME_BASE}({ $2 }: ${TM_FILENAME_BASE}Props) {",
      "  return (",
      "    <div className=\"$3\">",
      "      $0",
      "    </div>",
      "  );",
      "}"
    ],
    "description": "Creates a modern TypeScript React Functional Component using file basename"
  }
}
```

---

## Tab Stops, Placeholders & Built-in Variables

| Syntax | Description | Example |
| :--- | :--- | :--- |
| `$1`, `$2`, `$3` | **Tab Stops**: Pressing <kbd>Tab</kbd> jumps cursor forward in sequence | `$1` (first stop), `$2` (second stop) |
| `${1:defaultVal}` | **Placeholder**: Default text selected on tab stop | `${1:isActive}` |
| `${1|one,two,three|}` | **Choice List**: Dropdown menu of options | `${1|get,post,put|}` |
| `$0` | **Final Cursor Position**: Where cursor rests when done editing snippet | `$0` |
| `$TM_FILENAME_BASE` | File name without extension | In `UserCard.tsx`, expands to `UserCard` |
| `$CURRENT_YEAR` | 4-digit current year | `2026` |
| `$CLIPBOARD` | Current clipboard text contents | `${CLIPBOARD}` |

---

## Next.js Server Action Snippet Example

```json
{
  "Next.js Server Action": {
    "prefix": "saction",
    "body": [
      "\"use server\";",
      "",
      "import { z } from \"zod\";",
      "",
      "export async function ${1:actionName}(formData: FormData) {",
      "  $0",
      "}"
    ],
    "description": "Next.js Server Action template"
  }
}
```

---

## Related Guides

- [VS Code Settings](/docs/tools/vscode/settings)
- [Keyboard Shortcuts](/docs/tools/vscode/keyboard-shortcuts)
- [React Component Fundamentals](/docs/react/components)
