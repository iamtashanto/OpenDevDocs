---
title: "Docker: Container exits immediately with code 0 or 1"
description: Fix containers that terminate immediately upon startup (Exited (0) or Exited (1)) due to foreground process termination, syntax errors, or missing entrypoints.
category: devops
topic: docker
type: troubleshooting
level: beginner
tags:
  - docker
  - exit-code
  - lifecycle
  - errors
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

## Symptoms

- `docker run -d my-image` creates the container, but `docker ps` shows nothing running.
- `docker ps -a` shows container status `Exited (0)` or `Exited (1)` seconds after launch.

---

## Why It Happens

A Docker container stays alive **only as long as its primary process (PID 1)** is actively executing in the foreground. Once PID 1 finishes or crashes, the container lifecycle immediately ends.

Common causes:
1. **Background daemonizing**: Running background daemons (e.g. `nginx` or `apache2ctl start` without `daemon off;`).
2. **Interactive shell without TTY**: Running `docker run -d alpine sh` without `-it` or a continuous loop.
3. **Application crashes on startup**: Missing environment variables, database connection failure, or syntax runtime errors.
4. **Shell script exit**: Entrypoint script executing and completing without a foreground command at the end (missing `exec "$@"`).

---

## How to Diagnose

<Steps>
  <Step step={1} title="Check Container Logs">
    Inspect the output that occurred right before the container exited:

    ```bash
    docker logs <container_name_or_id>
    ```
  </Step>

  <Step step={2} title="Inspect Container Exit Code">
    ```bash
    docker inspect <container_name_or_id> --format='{{.State.ExitCode}}'
    ```
  </Step>
</Steps>

---

## Solutions & Fixes

### 1. Run Services in Foreground Mode
If running Nginx or web servers:
```dockerfile
# Incorrect: Spawns background process and exits
CMD ["nginx"]

# Correct: Keeps PID 1 in foreground
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Keep Interactive Containers Alive for Debugging
```bash
# Run with interactive terminal
docker run -it my-image /bin/sh

# Or keep container alive with tail loop
docker run -d my-image tail -f /dev/null
```

### 3. Ensure Entrypoint Scripts End with `exec "$@"`
```bash
#!/bin/sh
set -e

# Run initial migrations
npm run db:migrate

# Hand over PID 1 to the CMD passed in Dockerfile
exec "$@"
```

---

## Related Topics

- [Docker Container Lifecycle](/docs/docker/container-lifecycle)
- [Docker Exec](/docs/docker/exec)
- [Docker Logs](/docs/docker/logs)
