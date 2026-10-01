---
title: "Prisma Error P1001: Can't reach database server"
description: "Troubleshoot and resolve Prisma connection errors when the database server is offline, credentials are wrong, or network firewalls block traffic."
category: databases
topic: prisma
type: troubleshooting
level: beginner
tags:
  - prisma
  - errors
  - p1001
  - connection
  - postgresql
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Error P1001: Can't reach database server

---

## Error Message

```text
PrismaClientInitializationError: Can't reach database server at `localhost`:`5432`

Please make sure your database server is running at `localhost`:`5432`.
  code: 'P1001',
  clientVersion: '6.x.x'
```

---

## Symptoms

- Application fails to initialize at startup.
- `prisma migrate dev` or `prisma db pull` crashes immediately.
- Error message specifies host and port (e.g. `localhost:5432` or `aws-rds-host:5432`).

---

## Why It Happens

1. **Database is stopped**: Local PostgreSQL service is not active.
2. **Wrong Port or Host**: `.env` specifies the wrong hostname or port.
3. **Docker container not running**: PostgreSQL Docker container was stopped.
4. **Firewall / Cloud Security Group**: Cloud database (AWS RDS, DigitalOcean) blocks incoming connections from your IP.

---

## How to Fix It

### 1. If Running Locally via Docker:
```bash
# Check if Postgres container is running
docker ps -a

# Start the database container
docker compose up -d postgres
# or
docker start my-postgres-container
```

### 2. If Running Native PostgreSQL (macOS / Linux):
```bash
# macOS (Homebrew)
brew services start postgresql@16

# Linux (Ubuntu systemd)
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### 3. Verify PostgreSQL is Listening on Port 5432:
```bash
# Test TCP socket connectivity
nc -zv localhost 5432
```

---

## Related Guides

- [Prisma Environment Variables](/docs/prisma/environment-variables)
- [PostgreSQL Installation & Connecting](/docs/postgresql/connecting)
- [Docker Compose with PostgreSQL](/recipes/docker/postgres-docker-compose)
