---
title: "Installing Prisma"
description: "How to install the Prisma CLI, install @prisma/client, initialize database configuration, and verify installation."
category: databases
topic: prisma
type: guide
level: beginner
tags:
  - prisma
  - installation
  - setup
  - npm
  - pnpm
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Installing Prisma

Setting up Prisma requires installing the **Prisma CLI** as a development dependency and the **Prisma Client** as a production runtime dependency.

---

## 1. Installation

<Steps>
  <Step step={1} title="Install Prisma CLI & Client">
    In your project root directory:

    <PackageManagerTabs package="@prisma/client" />

    And install the CLI tool as a development dependency:

    <PackageManagerTabs package="prisma" dev />
  </Step>

  <Step step={2} title="Initialize Prisma Configuration">
    Run `prisma init` to create the initial configuration files:

    ```bash
    # For PostgreSQL (Default)
    npx prisma init --datasource-provider postgresql
    ```

    This command automatically creates:
    - `prisma/schema.prisma` (The main schema file)
    - `.env` (Environment variable configuration with `DATABASE_URL`)
  </Step>

  <Step step={3} title="Configure Database Connection URL">
    Open `.env` and set your PostgreSQL connection string:

    ```ini
    # .env
    DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/myapp_dev?schema=public"
    ```
  </Step>
</Steps>

---

## 2. Verifying the Setup

Check that the Prisma CLI is installed and communicating with your environment:

```bash
npx prisma --version
```

Output:
```text
prisma                  : 6.x.x
@prisma/client          : 6.x.x
Computed binaryTargets : darwin-arm64
```

---

## Related Guides

- [Project Setup & Directory Structure](/docs/prisma/project-setup)
- [Prisma Schema Fundamentals](/docs/prisma/schema.prisma)
- [PostgreSQL Installation & Setup](/docs/postgresql/installation)
