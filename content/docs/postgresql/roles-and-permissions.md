---
title: "PostgreSQL Roles, Permissions & Row-Level Security (RLS)"
description: Manage database permissions with GRANT/REVOKE, schema ownership, and secure multi-tenant data using Row-Level Security (RLS).
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - permissions
  - security
  - rls
  - grant
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## 1. Granting and Revoking Table Permissions

```sql
-- Grant read-only access to a reporting role
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_role;

-- Grant standard CRUD permissions to application role
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_backend;

-- Grant sequence usage (required for SERIAL / IDENTITY columns)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_backend;

-- Revoke dangerous permissions
REVOKE DROP, TRUNCATE ON ALL TABLES IN SCHEMA public FROM app_backend;
```

---

## 2. Automatic Permissions on Future Tables

Configure `ALTER DEFAULT PRIVILEGES` so newly created tables automatically receive appropriate grants:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_backend;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT USAGE, SELECT ON SEQUENCES TO app_backend;
```

---

## 3. Row-Level Security (RLS)

**Row-Level Security (RLS)** restricts which individual table rows a database user can view or mutate based on security policies (essential for multi-tenant applications).

### Enabling RLS on a Table

```sql
-- Step 1: Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Step 2: Create access policy allowing users to see only their own documents
CREATE POLICY user_documents_isolation_policy ON documents
    FOR ALL
    TO app_user
    USING (owner_id = current_setting('app.current_user_id')::bigint)
    WITH CHECK (owner_id = current_setting('app.current_user_id')::bigint);
```

In your application backend (e.g. Node.js):
```sql
BEGIN;
SET LOCAL app.current_user_id = '123';
SELECT * FROM documents; -- Automatically filters strictly to owner_id = 123
COMMIT;
```
