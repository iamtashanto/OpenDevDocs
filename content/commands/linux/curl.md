---
title: "Transfer Data from or to a Server (curl)"
description: Make HTTP requests, test APIs, download files, and inspect response headers using curl.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - curl
  - http
  - api
  - networking
platforms:
  - linux
  - macos
  - windows
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d '{"key":"val"}'</Command>

---

## Short Description

`curl` is a command-line tool for transferring data to or from a server using protocols including HTTP, HTTPS, FTP, and SCP.

---

## Examples

### 1. Download File and Save Output (`-o` or `-O`)

```bash
# Save to specific filename
curl -o setup.tar.gz https://example.com/downloads/setup.tar.gz

# Save using remote filename
curl -O https://example.com/file.zip
```

### 2. Inspect HTTP Response Headers Only (`-I`)

```bash
curl -I https://docs.tashanto.com
```

### 3. Send JSON POST Request

```bash
curl -X POST https://api.example.com/v1/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer my_jwt_token" \
  -d '{"name": "Alice", "role": "admin"}'
```

### 4. Follow Redirects (`-L`) and Silent Progress (`-s`)

```bash
curl -sL https://get.pnpm.io/install.sh | sh -
```
