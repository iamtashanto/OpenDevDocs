---
title: "Common PostgreSQL Errors & Solutions"
description: Troubleshoot and fix common PostgreSQL errors, authentication failures, connection pool exhaustion, unique constraint violations, and deadlocks.
category: database
topic: postgresql
type: troubleshooting
level: intermediate
tags:
  - postgresql
  - troubleshooting
  - debugging
  - errors
  - database
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## 1. Password Authentication Failed

### Error
```
FATAL: password authentication failed for user "app_user"
```

### Fix
1. Verify the password matches.
2. Check PostgreSQL's client authentication configuration file (`pg_hba.conf`). Ensure the authentication method is set to `scram-sha-256` or `md5` rather than `peer` for network TCP connections:
   ```ini
   # /etc/postgresql/16/main/pg_hba.conf
   host    all             app_user        127.0.0.1/32            scram-sha-256
   ```
3. Reload PostgreSQL: `sudo systemctl reload postgresql`.

---

## 2. Connection Refused

### Error
```
could not connect to server: Connection refused (0x0000274D/10061)
Is the server running on host "localhost" and accepting TCP/IP connections on port 5432?
```

### Fix
1. Verify the PostgreSQL service is active: `sudo systemctl status postgresql`.
2. Check `listen_addresses` in `postgresql.conf`:
   ```ini
   listen_addresses = '*'  # Default is often 'localhost'
   ```
3. Verify port 5432 is open and listening: `ss -tulpn | grep 5432`.

---

## 3. Duplicate Key Violates Unique Constraint

### Error
```
ERROR: duplicate key value violates unique constraint "users_email_key"
DETAIL: Key (email)=(alice@example.com) already exists.
```

### Fix
Handle conflicts gracefully at the application level using `ON CONFLICT DO NOTHING` or `ON CONFLICT DO UPDATE` (upsert):

```sql
INSERT INTO users (email, username) 
VALUES ('alice@example.com', 'alice_2')
ON CONFLICT (email) DO NOTHING;
```

---

## 4. Connection Pool Exhaustion

### Error
```
FATAL: remaining connection slots are reserved for non-replication superuser connections
```

### Fix
1. Increase `max_connections` in `postgresql.conf` (e.g. `max_connections = 200`).
2. Deploy **PgBouncer** or use application-side connection pooling (e.g. Prisma connection limits or `pg-pool`) to multiplex database connections.

---

## 5. Deadlock Detected

### Error
```
ERROR: deadlock detected
DETAIL: Process 12345 waits for ShareLock on transaction 67890; Process 67890 waits for ExclusiveLock on transaction 12345.
```

### Fix
1. Ensure all concurrent transactions access and update tables in the **exact same consistent order**.
2. Keep transaction durations as short as possible.
3. Use `NOWAIT` or `SET lock_timeout = '2s'` to fail early rather than blocking indefinite deadlocks.
