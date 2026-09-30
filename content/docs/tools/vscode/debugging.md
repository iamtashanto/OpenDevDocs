---
title: "VS Code: Interactive Debugging & launch.json"
description: Complete guide to VS Code debugging, breakpoints, conditional breakpoints, logpoints, watch variables, call stack inspection, and launch.json configurations.
category: tools
topic: vscode
type: guide
level: intermediate
tags:
  - vscode
  - debugging
  - nodejs
  - nextjs
  - breakpoints
platforms:
  - linux
  - macos
  - windows
tested:
  vscode: "1.93.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

VS Code features an interactive debugger for Node.js, Next.js, TypeScript, Python, and browser runtimes, replacing `console.log` debugging with step execution, heap inspection, and live expression watches.

---

## Debugging Workflow

1. **Set Breakpoint**: Click the left gutter next to any line number (red dot appears).
2. **Launch Session**: Press <kbd>F5</kbd> to start debugging.
3. **Inspect Execution State**:
   - **Variables**: Inspect local and global closure scopes.
   - **Watch**: Add custom expressions to evaluate on every step (e.g. `req.headers.authorization`).
   - **Call Stack**: Trace the execution path through parent callers.
   - **Debug Console**: Interactive REPL in the context of the current paused frame.

---

## Debug Actions Toolbar

| Icon / Key | Action | Description |
| :--- | :--- | :--- |
| <kbd>F5</kbd> | **Continue** | Resumes execution until the next breakpoint |
| <kbd>F10</kbd> | **Step Over** | Executes the current line and pauses at the next line |
| <kbd>F11</kbd> | **Step Into** | Enters inside the function called on the current line |
| <kbd>Shift</kbd> + <kbd>F11</kbd> | **Step Out** | Finishes current function and returns to caller |
| <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F5</kbd> | **Restart** | Restarts the debug session |
| <kbd>Shift</kbd> + <kbd>F5</kbd> | **Stop** | Terminates the debugger |

---

## Configuring `.vscode/launch.json`

Create `.vscode/launch.json` to define repeatable debug configurations:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Next.js App Router (Full Stack)",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Debug Current TypeScript File (tsx)",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "tsx",
      "args": ["${file}"],
      "internalConsoleOptions": "openOnSessionStart",
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"]
    },
    {
      "name": "Attach to Running Node Process",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true
    }
  ]
}
```

---

## Conditional Breakpoints & Logpoints

Right-click the gutter next to a line number:
- **Add Conditional Breakpoint**: Triggers only when a condition matches (e.g. `items.length === 0`).
- **Add Logpoint**: Prints a message to Debug Console without halting execution (e.g. `User logged in with ID: {user.id}`).

---

## Related Guides

- [Debugging Fundamentals](/docs/fundamentals/debugging)
- [Node.js Debugging Guide](/docs/nodejs/debugging)
- [Browser DevTools](/docs/tools/browser-devtools)
