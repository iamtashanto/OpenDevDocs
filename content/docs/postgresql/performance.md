---
title: "PostgreSQL Performance Optimization & Tuning"
description: Analyze slow queries with EXPLAIN ANALYZE, tune memory parameters (shared_buffers, work_mem), manage autovacuum, and pool connections with PgBouncer.
category: database
topic: postgresql
type: guide
level: advanced
tags:
  - postgresql
  - performance
  - explain-analyze
  - pgbouncer
  - vacuum
  - tuning
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## 1. Query Analysis with `EXPLAIN (ANALYZE, BUFFERS)`

Prepend `EXPLAIN (ANALYZE, BUFFERS)` to inspect how PostgreSQL's query optimizer executes a query:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT users.username, COUNT(orders.id)
FROM users
JOIN orders ON users.id = orders.user_id
WHERE users.is_active = true
GROUP BY users.username;
```

### Key Metrics in Output:
- **`Seq Scan`**: Full table scan across every disk page (indicates a missing index on the filter column).
- **`Index Scan` / `Bitmap Index Scan`**: Fast index seek locating specific tuples.
- **`Buffers: shared hit=... read=...`**: `hit` means retrieved from fast RAM buffer; `read` means fetched from physical disk.
- **`Execution Time`**: Real elapsed duration in milliseconds.

---

## 2. Table Maintenance: `VACUUM` & `ANALYZE`

PostgreSQL uses Multi-Version Concurrency Control (MVCC). When a row is updated or deleted, the old version ("dead tuple") remains on disk until cleaned by **VACUUM**:

```sql
-- Reclaim dead tuple space and update query planner table statistics
VACUUM ANALYZE orders;

-- Check table bloat and dead tuples
SELECT relname, n_live_tup, n_dead_tup, last_vacuum, last_autovacuum 
FROM pg_stat_user_tables;
```

---

## 3. Essential Memory Configuration Parameters

Configure in `/etc/postgresql/16/main/postgresql.conf`:

| Parameter | Recommended Setting | Purpose |
| :--- | :--- | :--- |
| **`shared_buffers`** | ~25% of Total System RAM | Dedicated RAM buffer pool caching active database pages. |
| **`effective_cache_size`** | ~50% to 75% of Total System RAM | Informs query planner how much memory is available across OS disk caches. |
| **`work_mem`** | 16MB – 64MB | Memory allocated per query sort, hash table, and join operation. |
| **`maintenance_work_mem`**| 512MB – 2GB | Memory allocated for maintenance tasks (`VACUUM`, `CREATE INDEX`). |

---

## 4. Connection Pooling with PgBouncer

Each direct connection to PostgreSQL spawns an independent OS process consuming ~10MB of RAM. High-concurrency serverless and containerized applications should place **PgBouncer** in front of PostgreSQL to pool hundreds of client connections into a fixed set of backend database workers.
