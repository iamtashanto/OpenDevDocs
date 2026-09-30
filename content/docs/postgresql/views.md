---
title: "PostgreSQL Views & Materialized Views"
description: Simplify complex queries with standard SQL views and accelerate analytical reporting using Materialized Views with concurrent refresh.
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - views
  - materialized-views
  - reporting
  - performance
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## What is a View?

A **View** is a saved SQL query that acts like a virtual table. It does not store physical data on disk; whenever you query a view, PostgreSQL executes the underlying `SELECT` statement in real time.

---

## 1. Standard Views (`CREATE VIEW`)

Use views to encapsulate complex multi-table JOINs and hide sensitive columns:

```sql
CREATE VIEW public_user_profiles AS
SELECT 
    users.id,
    users.username,
    user_profiles.bio,
    user_profiles.avatar_url,
    COUNT(articles.id) AS published_articles_count
FROM users
JOIN user_profiles ON users.id = user_profiles.user_id
LEFT JOIN articles ON users.id = articles.author_id AND articles.is_published = true
GROUP BY users.id, users.username, user_profiles.bio, user_profiles.avatar_url;

-- Query the view just like a regular table
SELECT * FROM public_user_profiles WHERE published_articles_count > 10;
```

---

## 2. Materialized Views (Physical Disk Caching)

A **Materialized View** executes the query once and saves the physical result set to disk. Subsequent queries are instantaneous because they read pre-calculated results rather than re-running heavy aggregations.

```sql
CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT 
    DATE_TRUNC('month', created_at) AS sale_month,
    product_id,
    COUNT(id) AS total_orders,
    SUM(total_amount) AS total_revenue
FROM orders
GROUP BY DATE_TRUNC('month', created_at), product_id;
```

---

## 3. Refreshing Materialized Views

Because materialized views do not update automatically on base table mutations, they must be refreshed periodically (e.g. via cron job or trigger):

```sql
-- Standard refresh (acquires exclusive lock on the view)
REFRESH MATERIALIZED VIEW monthly_sales_summary;
```

### Zero-Downtime Concurrent Refresh

To refresh without blocking concurrent reads on the view, create a unique index on the view first:

```sql
-- Step 1: Create unique index
CREATE UNIQUE INDEX idx_monthly_sales_unique 
ON monthly_sales_summary (sale_month, product_id);

-- Step 2: Refresh concurrently without blocking reads
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_summary;
```
