---
title: "Creating Users & Roles in PostgreSQL"
description: Manage PostgreSQL roles, CREATE USER, password hashing, SUPERUSER privileges, and role attributes.
category: database
topic: postgresql
type: guide
level: beginner
tags:
  - postgresql
  - roles
  - users
  - security
  - permissions
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Roles vs Users in PostgreSQL

In PostgreSQL, a **Role** can function as both a user account (with login capabilities) or a user group. `CREATE USER` is simply an alias for `CREATE ROLE ... WITH LOGIN`.

---

## 1. Creating a Standard Application User

```sql
-- Create an application role with a secure password
CREATE ROLE app_user WITH LOGIN PASSWORD 'SuperSecretPass123!';

-- Prevent user from creating databases or superuser privileges
ALTER ROLE app_user NOCREATEDB NOCREATEROLE NOSUPERUSER;
```

---

## 2. Common Role Attributes

| Attribute | Meaning |
| :--- | :--- |
| **`LOGIN`** | Allows the role to establish database connections (a user account). |
| **`SUPERUSER`** | Bypasses all security and permission checks (grant with extreme caution). |
| **`CREATEDB`** | Allows the role to create new databases. |
| **`CREATEROLE`** | Allows the role to create or modify other roles. |
| **`PASSWORD '<str>'`** | Sets an encrypted password (stored using SCRAM-SHA-256). |
| **`VALID UNTIL '<ts>'`** | Sets an expiration timestamp for temporary accounts. |

---

## 3. Modifying and Deleting Roles

```sql
-- Change an existing user's password
ALTER ROLE app_user WITH PASSWORD 'NewUltraSecretPass456!';

-- Rename a role
ALTER ROLE old_user_name RENAME TO new_user_name;

-- Delete a role (must reassign or drop owned objects first)
REASSIGN OWNED BY old_user TO postgres;
DROP OWNED BY old_user;
DROP ROLE old_user;
```

---

## Best Practice: Least Privilege Principle

Never connect your production web application (Node.js/Next.js/Express) using the default `postgres` superuser account. Create a dedicated application role (`app_backend`) and grant permissions only to specific tables and schemas.
