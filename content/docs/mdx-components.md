---
title: Reusable MDX Documentation Components
description: Complete reference for custom MDX components available in OpenDevDocs documentation.
category: standards
topic: components
type: reference
level: beginner
tags:
  - mdx
  - components
  - reference
  - contributing
lastVerified: "2026-09-30"
---

## Overview

OpenDevDocs provides a suite of pre-configured technical documentation components that are **globally available** in all `.md` and `.mdx` files without any manual imports.

---

## 1. Callouts & Semantic Alerts

### Standard Callout

```mdx
<Callout type="note" title="Database Notice">
PostgreSQL 16 requires at least 512MB RAM for standard indexing buffers.
</Callout>
```

<Callout type="note" title="Database Notice">
PostgreSQL 16 requires at least 512MB RAM for standard indexing buffers.
</Callout>

### Convenience Callouts (`Tip`, `Warning`, `Danger`, `Info`)

```mdx
<Tip title="Pro-Tip">
Use `git switch` instead of `git checkout` for changing branches in modern Git.
</Tip>

<Warning title="Production Caution">
Never commit API secrets, private keys, or `.env.local` files to public repositories.
</Warning>

<Danger title="Destructive Action">
Running `git reset --hard` will permanently discard all uncommitted changes in your working tree.
</Danger>
```

<Tip title="Pro-Tip">
Use `git switch` instead of `git checkout` for changing branches in modern Git.
</Tip>

<Warning title="Production Caution">
Never commit API secrets, private keys, or `.env.local` files to public repositories.
</Warning>

<Danger title="Destructive Action">
Running `git reset --hard` will permanently discard all uncommitted changes in your working tree.
</Danger>

---

## 2. Command (`<Command>`)

Renders a standalone copyable CLI command with prompt formatting:

```mdx
<Command>pnpm create next-app@latest ./my-app --typescript --tailwind</Command>
```

<Command>pnpm create next-app@latest ./my-app --typescript --tailwind</Command>

---

## 3. Terminal (`<Terminal>`)

Renders an interactive terminal window with window controls and output:

```mdx
<Terminal title="bash">
$ curl -I https://docs.tashanto.com
HTTP/2 200
content-type: text/html; charset=utf-8
strict-transport-security: max-age=63072000; includeSubDomains; preload
</Terminal>
```

<Terminal title="bash">
curl -I https://docs.tashanto.com
HTTP/2 200
content-type: text/html; charset=utf-8
strict-transport-security: max-age=63072000; includeSubDomains; preload
</Terminal>

---

## 4. Steps (`<Steps>`, `<Step>`)

Numbered sequence for tutorials, installations, and setup workflows:

```mdx
<Steps>
  <Step step={1} title="Clone the Repository">
    Clone the OpenDevDocs repository to your local workspace:
    ```bash
    git clone https://github.com/iamtashanto/OpenDevDocs.git
    ```
  </Step>

  <Step step={2} title="Install Dependencies">
    Install project packages with pnpm:
    ```bash
    pnpm install
    ```
  </Step>
</Steps>
```

<Steps>
  <Step step={1} title="Clone the Repository">
    Clone the OpenDevDocs repository to your local workspace:
    ```bash
    git clone https://github.com/iamtashanto/OpenDevDocs.git
    ```
  </Step>

  <Step step={2} title="Install Dependencies">
    Install project packages with pnpm:
    ```bash
    pnpm install
    ```
  </Step>
</Steps>

---

## 5. Package Manager Tabs (`<PackageManagerTabs>`)

Automatically generates copyable install commands for `pnpm`, `npm`, `yarn`, and `bun`:

```mdx
<PackageManagerTabs package="tailwindcss" dev />
```

<PackageManagerTabs package="tailwindcss" dev />

---

## 6. Operating System Tabs (`<OSTabs>`)

Provides operating system-specific commands across Linux, macOS, and Windows:

```mdx
<OSTabs
  linux="sudo apt-get install -y docker-ce"
  macos="brew install --cask docker"
  windows="winget install Docker.DockerDesktop"
/>
```

<OSTabs
  linux="sudo apt-get install -y docker-ce"
  macos="brew install --cask docker"
  windows="winget install Docker.DockerDesktop"
/>

---

## 7. File Tree (`<FileTree>`, `<Folder>`, `<File>`)

Visual folder and directory structure display:

```mdx
<FileTree>
  <Folder name="app" defaultOpen>
    <Folder name="docs">
      <File name="layout.tsx" />
      <File name="page.tsx" />
    </Folder>
    <File name="globals.css" />
    <File name="layout.tsx" />
  </Folder>
  <Folder name="content" defaultOpen>
    <Folder name="docs">
      <File name="index.md" />
    </Folder>
  </Folder>
  <File name="package.json" />
</FileTree>
```

<FileTree>
  <Folder name="app" defaultOpen>
    <Folder name="docs">
      <File name="layout.tsx" />
      <File name="page.tsx" />
    </Folder>
    <File name="globals.css" />
    <File name="layout.tsx" />
  </Folder>
  <Folder name="content" defaultOpen>
    <Folder name="docs">
      <File name="index.md" />
    </Folder>
  </Folder>
  <File name="package.json" />
</FileTree>

---

## 8. Version Badge & Keyboard Shortcuts

```mdx
<VersionBadge version="v16.3+" />
<VersionBadge status="stable" />
<VersionBadge status="lts" />
<VersionBadge status="experimental" />

Press <KeyboardShortcut keys={["Ctrl", "K"]} /> or <KeyboardShortcut keys={["⌘", "K"]} /> to open search.
```

- Version: <VersionBadge version="v16.3+" /> <VersionBadge status="stable" /> <VersionBadge status="lts" /> <VersionBadge status="experimental" />
- Shortcut: Press <KeyboardShortcut keys={["Ctrl", "K"]} /> or <KeyboardShortcut keys={["⌘", "K"]} /> to open search.

---

## 9. Expandable Details (`<ExpandableDetails>`)

```mdx
<ExpandableDetails title="Deep Dive: How V8 Manages Scope Allocation">
When a block is executed, V8 creates a BlockContext on the heap if any variables inside the block are captured by closures. Otherwise, variable references are allocated directly to register slots.
</ExpandableDetails>
```

<ExpandableDetails title="Deep Dive: How V8 Manages Scope Allocation">
When a block is executed, V8 creates a BlockContext on the heap if any variables inside the block are captured by closures. Otherwise, variable references are allocated directly to register slots.
</ExpandableDetails>
