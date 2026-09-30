---
title: "Absolute vs. Relative Paths"
description: "Mastering filesystem paths: root slash (/), current directory (.), parent directory (..), home shortcut (~), and path resolution rules."
category: fundamentals
topic: filesystem
type: guide
level: beginner
tags:
  - paths
  - filesystem
  - terminal
  - cli
  - fundamentals
platforms:
  - all
lastVerified: "2026-09-30"
---

# Absolute vs. Relative Paths

A **path** is a string specifying the unique location of a file or folder in a filesystem hierarchy. Every file path in software engineering is either **absolute** or **relative**.

---

## 1. Absolute Paths

An **absolute path** specifies the complete location of a file starting from the root of the filesystem. It always points to the exact same file, regardless of where your current working directory is.

### Unix/macOS/Linux:
Always begins with a forward slash `/`:
```text
/Users/alex/Coding/OpenDevDocs/package.json
/var/log/nginx/access.log
/etc/hosts
```

### Windows:
Begins with a drive letter and colon `C:\`:
```text
C:\Users\alex\Coding\OpenDevDocs\package.json
```

---

## 2. Relative Paths

A **relative path** specifies the location of a target file *relative* to your **current working directory (cwd)**.

Special path tokens:
- **`.` (single dot)**: The current working directory.
- **`..` (double dot)**: The immediate parent directory (one level up).
- **`~` (tilde)**: Shortcut representing the current user's home directory (`/Users/alex` or `/home/alex`).

### Relative Path Examples

Assuming your current directory is `/Users/alex/Coding/OpenDevDocs/src`:

| Target File | Relative Path from `src/` | Explanation |
| :--- | :--- | :--- |
| `src/components/Header.tsx` | `./components/Header.tsx` | Look in `components` inside current directory |
| `package.json` (in root) | `../package.json` | Go up one level to `OpenDevDocs/`, then find `package.json` |
| `.gitignore` (in root) | `../.gitignore` | Go up one level to root |
| `~/.zshrc` (in user home) | `~/.zshrc` | User home directory config |

---

## 3. Path Resolution in Code & Imports

### Node.js / TypeScript ES Modules:
```javascript
// Relative import: look in sibling directory
import { Button } from "../components/ui/button";

// Path alias (configured in tsconfig.json paths): resolves from project root
import { Button } from "@/components/ui/button";
```

### Node.js Filesystem Path Resolution:
```javascript
import path from "node:path";

// ❌ Risky: relative to where the terminal process was started
const data = fs.readFileSync("./data.json");

// ✅ Safe: absolute path resolved relative to current module location
const dataPath = path.resolve(import.meta.dirname, "./data.json");
const data = fs.readFileSync(dataPath);
```

---

## 4. Common Mistakes

1. **Assuming `.` means project root in scripts**: When executing `node server.js` from a different folder, `./` resolves to the terminal's execution folder, NOT the script's directory. Always use `path.resolve(__dirname, ...)` or `import.meta.dirname`.
2. **Hardcoding OS backslashes (`\`)**: Hardcoding `\` breaks on Linux/macOS and in Docker containers. Always use `path.join("src", "components")` or standard forward slashes `/`.

---

## Related Topics

- [Files and Directories](/docs/fundamentals/files-and-directories)
- [Terminal Fundamentals](/docs/fundamentals/terminal-fundamentals)
- [Shell Fundamentals & Scripting](/docs/fundamentals/shell-fundamentals)
