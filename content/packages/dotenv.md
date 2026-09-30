---
title: "dotenv: Environment Variable Management"
description: Complete developer reference for dotenv, loading .env files into process.env, custom paths, multi-environment overrides, and modern alternatives.
category: packages
topic: configuration
type: reference
level: beginner
tags:
  - dotenv
  - nodejs
  - env
  - configuration
platforms:
  - nodejs
tested:
  dotenv: "16.4.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

## What It Is

**dotenv** is a zero-dependency module that loads environment variables from a `.env` file into Node.js `process.env`. It follows the Twelve-Factor App methodology for separating code from configuration.

---

## Why Use It

1. **Local Secret Isolation**: Keep database passwords, API credentials, and secret tokens out of version-controlled source code.
2. **Environment Parity**: Easily toggle between development, staging, and test environments by switching configuration files.
3. **De-facto Standard**: Universal support across virtually all Node.js libraries, frameworks, and deployment scripts.

---

## Installation

<PackageManagerTabs>
  <Tab value="pnpm">
    ```bash
    pnpm add dotenv
    ```
  </Tab>
  <Tab value="npm">
    ```bash
    npm install dotenv
    ```
  </Tab>
  <Tab value="yarn">
    ```bash
    yarn add dotenv
    ```
  </Tab>
  <Tab value="bun">
    ```bash
    bun add dotenv
    ```
  </Tab>
</PackageManagerTabs>

---

## Quick Start

### 1. Create `.env` file in project root:
```ini
# .env
PORT=4000
DATABASE_URL=postgresql://postgres:secret@localhost:5432/devdb
API_SECRET_KEY=supersecretkey123
```

### 2. Require / Import as early as possible in your entry point:
```javascript
// CommonJS
require('dotenv').config();

console.log(process.env.PORT); // "4000"
console.log(process.env.DATABASE_URL);
```

In ES Modules (`"type": "module"`):
```typescript
import 'dotenv/config';

console.log(process.env.PORT);
```

---

## Common APIs & Options

| Usage | Description | Example |
| :--- | :--- | :--- |
| `dotenv.config()` | Loads `.env` from current working directory | `dotenv.config()` |
| `path` option | Custom path to `.env` file | `dotenv.config({ path: '.env.local' })` |
| `encoding` option | Encoding of file | `dotenv.config({ encoding: 'latin1' })` |
| `override` option | Overwrite existing `process.env` keys | `dotenv.config({ override: true })` |
| CLI preload (`-r`) | Preload dotenv before app boots (No code import needed) | `node -r dotenv/config index.js` |

---

## Examples

### Loading Custom Path Based on NODE_ENV
```javascript
const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});
```

### Preloading via npm Scripts
```json
{
  "scripts": {
    "start": "node -r dotenv/config dist/index.js",
    "dev": "nodemon -r dotenv/config src/index.js"
  }
}
```

---

## Best Practices

1. **Add `.env*` to `.gitignore`**: Never commit actual secrets or `.env` files to git.
2. **Commit `.env.example`**: Commit a template file with placeholder values showing required variables:
   ```ini
   # .env.example
   PORT=3000
   DATABASE_URL=
   API_SECRET_KEY=
   ```
3. **Validate with Zod**: Combine `dotenv` with `zod` to fail fast during server startup if required variables are missing.

---

## Common Mistakes

- **Importing after application modules**: If another module reads `process.env.DATABASE_URL` at top-level evaluation time before `dotenv.config()` is called, the value will be `undefined`.
- **Assuming values are typed**: All variables in `process.env` are `string` or `undefined`. Numeric `PORT=3000` is read as `"3000"`.

---

## Alternatives & Modern Native Feature

- **Node.js 20.6+ Native `--env-file` Flag**: Node.js now has native `.env` loading without any third-party dependencies:
  ```bash
  node --env-file=.env index.js
  ```
- **dotenv-expand**: Extends dotenv to support variable expansion (e.g. `URL=${PROTOCOL}://${HOST}`).

---

## When Not to Use It

- In **Next.js**, **Vite**, or **Remix** applications where `.env` file loading is already built directly into the framework core.
- In **Node.js 20.6+** where `node --env-file=.env` satisfies your requirements without installing extra packages.

---

## Official Resources

- [Official dotenv Documentation](https://github.com/motdotla/dotenv)
- [npm Package: dotenv](https://www.npmjs.com/package/dotenv)
