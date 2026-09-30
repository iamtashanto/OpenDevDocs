---
title: "Installing PostgreSQL"
description: Install PostgreSQL on macOS, Ubuntu/Debian Linux, Windows, and run production instances in Docker.
category: database
topic: postgresql
type: guide
level: beginner
tags:
  - postgresql
  - database
  - installation
  - linux
  - macos
  - docker
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Overview

PostgreSQL is one of the world's most advanced, open-source object-relational database systems. It is known for reliability, feature robustness, and performance.

---

## 1. macOS (via Homebrew)

```bash
# Install PostgreSQL 16
brew install postgresql@16

# Start PostgreSQL service in background
brew services start postgresql@16

# Verify connection
psql postgres
```

---

## 2. Ubuntu / Debian Linux

```bash
# Update package list and install PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Enable and start the systemd service
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Access default postgres administrative account
sudo -u postgres psql
```

---

## 3. Docker (Recommended for Local Development)

Run a disposable or persisted PostgreSQL 16 container with Docker:

```bash
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres:16-alpine
```

Connect via `psql`:

```bash
docker exec -it postgres-dev psql -U postgres -d mydb
```

---

## 4. Verifying Installation & Service Status

Check service status and listening port (`5432`):

```bash
# Check service status on Linux
sudo systemctl status postgresql

# Verify PostgreSQL is listening on port 5432
ss -tulpn | grep 5432
```
