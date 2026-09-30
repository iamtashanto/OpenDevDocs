---
title: "Docker Container Logs & Logging Drivers"
description: Complete guide to docker logs, streaming logs, log rotation, timestamps, and configuring JSON-file, Syslog, and journald logging drivers.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - logs
  - monitoring
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

Docker captures all standard output (`stdout`) and standard error (`stderr`) streams from the container's PID 1 process and routes them through a configurable logging driver.

---

## The `docker logs` Command

```bash
docker logs [OPTIONS] CONTAINER
```

### Essential Flags

```bash
# Stream/tail logs in real-time (follow)
docker logs -f my-app

# View last 100 log lines
docker logs --tail 100 my-app

# Include ISO-8601 timestamps
docker logs -t my-app

# View logs generated in the last 30 minutes
docker logs --since 30m my-app

# View logs until a specific timestamp
docker logs --until 2026-09-30T12:00:00Z my-app
```

---

## Log Rotation & Preventing Disk Fill

By default, Docker uses the `json-file` logging driver, which can grow indefinitely and consume entire disks if unconfigured.

### Per-Container Log Limits
```bash
docker run -d \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  nginx:alpine
```

### Daemon-Wide Default Config (`/etc/docker/daemon.json`)
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "5"
  }
}
```

---

## Production Logging Best Practices

1. **Log to Stdout/Stderr**: Never write logs to files inside the container filesystem.
2. **Use Structured JSON**: Structured logging allows log aggregators (Elasticsearch, Datadog, Grafana Loki) to parse fields automatically.
3. **Configure Centralized Log Drivers**: In multi-node clusters, route logs to `fluentd`, `syslog`, or cloud-native sinks (`awslogs`, `gcplogs`).

---

## Related Topics

- [Docker Exec](/docs/docker/exec)
- [Container Lifecycle](/docs/docker/container-lifecycle)
- [Troubleshooting: Disk Space Issues](/errors/docker/disk-space-issues)
