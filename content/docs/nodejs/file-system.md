---
title: Node.js File System (node:fs)
description: Read, write, and manipulate files and directories asynchronously using node:fs/promises and node:path in Node.js.
category: backend
topic: nodejs
type: guide
level: beginner
tags:
  - nodejs
  - fs
  - file-system
  - path
  - async
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

The Node.js `node:fs` module provides APIs to interact with the local file system. Modern Node.js code should almost always use the promise-based API (`node:fs/promises`) with `async/await`.

---

## 1. Reading Files

```javascript
import fs from 'node:fs/promises';

// Read UTF-8 text file
async function loadConfig() {
  try {
    const rawData = await fs.readFile('./config.json', 'utf-8');
    const config = JSON.parse(rawData);
    return config;
  } catch (err) {
    console.error('Failed to read config:', err);
    throw err;
  }
}
```

---

## 2. Writing and Appending Files

```javascript
import fs from 'node:fs/promises';

// Overwrite or create new file
await fs.writeFile('./output.txt', 'Hello, Node.js!', 'utf-8');

// Append data to an existing file
await fs.appendFile('./logs.txt', `\n[${new Date().toISOString()}] Event triggered`);
```

---

## 3. Working with Directories

```javascript
import fs from 'node:fs/promises';

// Create nested directories recursively
await fs.mkdir('./data/reports/2026', { recursive: true });

// Read directory contents
const files = await fs.readdir('./data/reports', { withFileTypes: true });

for (const file of files) {
  if (file.isDirectory()) {
    console.log(`Directory: ${file.name}`);
  } else if (file.isFile()) {
    console.log(`File: ${file.name}`);
  }
}

// Remove directory and all contents
await fs.rm('./data/temp', { recursive: true, force: true });
```

---

## 4. Safe Path Manipulation with `node:path`

Never concatenate file paths using string addition (`/` or `\`). Use `node:path` for cross-platform safety:

```javascript
import path from 'node:path';

// Join path segments correctly across Windows & POSIX
const filePath = path.join(process.cwd(), 'uploads', 'avatars', 'user-1.png');

// Extract details
const filename = path.basename(filePath); // "user-1.png"
const ext = path.extname(filePath);       // ".png"
const dir = path.dirname(filePath);       // "/path/to/uploads/avatars"
```

---

## Best Practices

- **Never use synchronous methods (`fs.readFileSync`) in web request handlers**: Synchronous file operations block the single Node.js event loop, preventing all other users from receiving responses.
- **Use Streams for Large Files**: For multi-megabyte files, use `fs.createReadStream` instead of reading the entire file into memory with `readFile`.
