---
title: "Docker Security Basics & Hardening"
description: Complete guide to container security, non-root users, Linux capabilities, read-only root filesystems, secret management, and vulnerability scanning.
category: devops
topic: docker
type: guide
level: intermediate
tags:
  - docker
  - security
  - hardening
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

Containers share the host kernel. Hardening your containers prevents privilege escalation attacks, unauthorized host filesystem access, and data exfiltration.

---

## 1. Never Run as Root

By default, containers run as UID 0 (`root`). If an attacker breaks out of the container boundary, they gain root privileges on the underlying host kernel.

### Dockerfile User Hardening
```dockerfile
# Create dedicated system group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

For official Node images:
```dockerfile
USER node
```

---

## 2. Drop Unneeded Linux Capabilities

Linux divides root privileges into distinct capabilities (e.g. `CAP_NET_RAW`, `CAP_SYS_ADMIN`). Drop all default capabilities and add only what is strictly required:

```bash
docker run -d \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  nginx:alpine
```

In `compose.yaml`:
```yaml
cap_drop:
  - ALL
cap_add:
  - NET_BIND_SERVICE
```

---

## 3. Read-Only Root Filesystems

Prevent attackers from downloading malware, modifying binary files, or injecting web shells by mounting the container filesystem as read-only:

```bash
docker run -d \
  --read-only \
  --tmpfs /tmp \
  --tmpfs /var/run \
  my-app-image
```

---

## 4. Vulnerability Scanning with Docker Scout / Trivy

Scan images for known Common Vulnerabilities and Exposures (CVEs) before deploying:

```bash
# Docker Scout
docker scout quickview myapp:latest
docker scout cves myapp:latest

# Trivy scanner
trivy image myapp:latest
```

---

## 5. Secure Secret Management

- **NEVER** embed tokens, private keys, or credentials in `Dockerfile` layers or image tags.
- Use Docker BuildKit `--mount=type=secret` during build time.
- Inject secrets at runtime via Docker Secrets, HashiCorp Vault, or cloud secret managers.

---

## Related Guides

- [Docker Production Best Practices](/docs/docker/production-best-practices)
- [Linux Permissions](/docs/linux/permissions)
- [Troubleshooting: Permission Denied](/errors/docker/permission-denied)
