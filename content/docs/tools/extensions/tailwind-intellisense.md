---
title: "Tailwind CSS IntelliSense"
description: Complete guide to the Tailwind CSS IntelliSense VS Code extension, autocomplete, hover preview of generated CSS, color decorators, and class validation.
category: tools
topic: extensions
type: reference
level: beginner
tags:
  - tailwindcss
  - vscode
  - intellisense
  - extensions
platforms:
  - linux
  - macos
  - windows
tested:
  extension: "0.14.x"
  tailwindcss: "3.x/4.x"
lastVerified: "2026-09-30"
---

## What It Does

The **Tailwind CSS IntelliSense** extension (`bradlc.vscode-tailwindcss`) provides intelligent autocomplete, syntax highlighting, hover previews of generated CSS rules, and linting for Tailwind CSS classes across HTML, JSX, TSX, Vue, and CSS files.

---

## Why Use It

1. **Autocomplete for Class Names**: Suggests utility classes as you type with instant fuzzy matching.
2. **Hover Previews**: Hovering over any class name (e.g. `bg-sky-500`) reveals the exact underlying CSS properties (`background-color: rgb(14 165 233);`).
3. **Color Decorators**: Displays live color swatches in the editor gutter and inline next to color class names.
4. **Linting & Diagnostics**: Highlights invalid utility class names, conflicts, and deprecated syntax.

---

## Installation

- **VS Code Marketplace**: Search for `bradlc.vscode-tailwindcss` and click **Install**.
- **CLI**:
  ```bash
  code --install-extension bradlc.vscode-tailwindcss
  ```

---

## Configuration

In `.vscode/settings.json`:

```json
{
  // Enable autocomplete inside custom attributes or template literals
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],

  // Trigger suggestions on string quotes
  "editor.quickSuggestions": {
    "strings": "on"
  },

  // Highlight conflicting class names (e.g. p-2 and p-4 on same element)
  "tailwindCSS.lint.conflicts": "warning"
}
```

---

## Use Cases & Examples

### Autocomplete with `cn()` / `clsx` Utility
When using class merging libraries (shadcn/ui or Tailwind Merge):
```tsx
import { cn } from "@/lib/utils";

export function Button({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        "px-4 py-2 font-medium rounded-lg transition-colors", // Full autocomplete here
        "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    />
  );
}
```

---

## Alternatives

- **UnoCSS Language Server**: High-performance engine for UnoCSS.
- **Windi CSS IntelliSense**: Legacy utility CSS extension.

---

## Performance & Security Considerations

- **Requires Tailwind Config**: The extension activates automatically only when a `tailwind.config.js`, `tailwind.config.ts`, or Tailwind v4 `@theme` block is detected in the workspace root.
- **Large Monorepos**: Configure `"tailwindCSS.rootConfigFile": "apps/web/tailwind.config.js"` if your config is located in a sub-package.

---

## Related Guides

- [CSS Fundamentals](/docs/css/flexbox)
- [Prettier Tailwind Plugin](/docs/tools/extensions/prettier)
- [VS Code Recommended Extensions](/docs/tools/vscode/extensions)
