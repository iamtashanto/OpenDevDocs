---
title: "VS Code: Extensions & Workspace Recommendations"
description: Complete guide to managing VS Code extensions, workspace recommendations (.vscode/extensions.json), disabling extensions per workspace, and extension performance.
category: tools
topic: vscode
type: guide
level: beginner
tags:
  - vscode
  - extensions
  - productivity
  - marketplace
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
lastVerified: "2026-09-30"
---

Extensions expand VS Code with language support, linters, debuggers, theme palettes, and cloud deployment integrations from the Visual Studio Marketplace.

---

## Managing Extensions

- **Open Extensions View**: <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>
- **CLI Installation**:
  ```bash
  code --install-extension esbenp.prettier-vscode
  code --install-extension dbaeumer.vscode-eslint
  ```

---

## Workspace Recommended Extensions (`.vscode/extensions.json`)

To ensure every developer cloning your repository gets prompted to install necessary extensions, commit a `.vscode/extensions.json` file:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "eamodio.gitlens",
    "ms-azuretools.vscode-docker"
  ],
  "unwantedRecommendations": [
    "msjsdiag.debugger-for-chrome"
  ]
}
```

When a contributor opens the workspace, VS Code displays a notification: *"This workspace has extension recommendations."* Clicking Install All configures their development environment in seconds.

---

## Diagnosing Extension Performance Issues

If VS Code feels sluggish or CPU spikes:

1. Open Command Palette $\rightarrow$ **`Developer: Show Running Extensions`**.
2. Inspect the **Startup Activation Time** (in ms) for each extension.
3. Identify extensions taking >500ms to activate or consuming excessive RAM.

---

## Related Guides

- [Prettier Extension Deep-Dive](/docs/tools/extensions/prettier)
- [ESLint Extension Deep-Dive](/docs/tools/extensions/eslint)
- [VS Code Profiles](/docs/tools/vscode/profiles)
