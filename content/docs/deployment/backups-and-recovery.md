---
title: "Database Backups & Disaster Recovery"
description: Complete guide to production database backups, logical dumps vs physical WAL archiving, offsite object storage (S3), RTO, RPO, and recovery testing.
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - backups
  - database
  - postgresql
  - disaster-recovery
  - devops
platforms:
  - linux
  - cloud
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

A backup strategy is only as good as your ability to restore it. Data loss can occur from human error, bad software migrations, hardware failures, or ransomware.

---

## Key Disaster Recovery Metrics

- **Recovery Point Objective (RPO)**: The maximum acceptable data loss measured in time (e.g. *"We can afford to lose at most 1 hour of transaction data"*).
- **Recovery Time Objective (RTO)**: The maximum acceptable downtime to restore operations (e.g. *"The database must be restored and running within 30 minutes"*).

---

## 1. Automated Daily Logical Backups (`pg_dump`)

```bash
#!/bin/bash
set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="/tmp/backup_${TIMESTAMP}.sql.gz"
S3_BUCKET="s3://my-company-backups/postgres"

# Dump and compress
pg_dump -h localhost -U postgres -d production_db | gzip > "$BACKUP_FILE"

# Upload to secure offsite S3 storage
aws s3 cp "$BACKUP_FILE" "${S3_BUCKET}/backup_${TIMESTAMP}.sql.gz"

# Clean local temp file
rm "$BACKUP_FILE"

echo "Backup completed: backup_${TIMESTAMP}.sql.gz"
```

---

## 2. Continuous Point-in-Time Recovery (PITR) with WAL Archiving

For mission-critical production databases where RPO must be <5 minutes:
- Use tools like **pgBackRest** or **WAL-G**.
- Streams Write-Ahead Logs (WAL) continuously to S3, enabling restoration to any exact second in time.

---

## The 3-2-1 Backup Rule

1. Maintain at least **3 copies** of your data.
2. Store backups across **2 different media / storage types** (e.g. local disk + cloud object storage).
3. Keep at least **1 copy completely offsite** (in a separate cloud provider or geographic region).

> [!WARNING]
> Never assume backups work until you have successfully executed a full test restore into a clean staging database. Test your restore procedures quarterly.

---

## Related Guides

- [PostgreSQL Backup & Restore Commands](/docs/postgresql/backup)
- [PostgreSQL with Docker Compose](/recipes/docker/postgres-docker-compose)
- [Rollback Strategies](/docs/deployment/rollback-strategies)
