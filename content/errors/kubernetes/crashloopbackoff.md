---
title: "Kubernetes Error: CrashLoopBackOff"
description: Fix the Kubernetes CrashLoopBackOff error when a container repeatedly starts, crashes on initialization, and enters an exponential backoff delay.
category: devops
topic: kubernetes
type: troubleshooting
level: beginner
tags:
  - kubernetes
  - crashloopbackoff
  - debugging
  - container-crash
  - errors
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Symptoms

- `kubectl get pods` shows pod status `CrashLoopBackOff` or `Error`.
- The `RESTARTS` count increments rapidly (e.g. 5, 10, 25 restarts).
- Pod fails to transition into the `Running` or `Ready` state.

---

## Why It Happens

`CrashLoopBackOff` means the application process inside the container started, encountered a fatal runtime exception, and exited with a non-zero exit code. Kubernetes attempts to restart the container, applying exponential backoff delay (10s, 20s, 40s, up to 5 minutes) to protect cluster nodes.

Common causes:
1. **Missing or Invalid Environment Variables**: Application requires a database connection string or secret key that was not supplied in the PodSpec.
2. **Database Connection Failure**: The backend database or Redis service is unreachable or not yet ready.
3. **Application Fatal Exception**: Node.js/Python uncaught syntax or import error during startup.
4. **Failing Liveness Probe**: Liveness probe endpoint returns HTTP 500 or times out during initialization.
5. **Entrypoint Execution Failure**: File permission errors on startup script or missing executable binary.

---

## How to Diagnose

<Steps>
  <Step step={1} title="Inspect Previous Container Logs">
    Because the container already crashed, view the previous instance logs:

    ```bash
    kubectl logs <pod-name> --previous
    ```
  </Step>

  <Step step={2} title="Check Exit Code and Events">
    ```bash
    kubectl describe pod <pod-name>
    ```

    Check `Last State -> Terminated -> Exit Code` and `Reason`.
  </Step>
</Steps>

---

## Solutions & Fixes

### 1. Fix Missing Environment Variables
Verify all required environment variables are defined in the Deployment manifest:

```yaml
spec:
  containers:
    - name: api
      image: my-app:1.0.0
      env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DATABASE_URL
```

### 2. Add Init Container to Wait for Database Readiness
Prevent the main application from starting before the database is listening:

```yaml
spec:
  initContainers:
    - name: wait-for-postgres
      image: busybox:1.36
      command: ['sh', '-c', 'until nc -z -w 2 postgres-service 5432; do echo waiting for postgres; sleep 2; done;']
  containers:
    - name: api
      image: my-app:1.0.0
```

### 3. Adjust Liveness Probe Initial Delay
If your app takes 15 seconds to boot, increase `initialDelaySeconds`:

```yaml
livenessProbe:
  httpGet:
    path: /api/healthz
    port: 3000
  initialDelaySeconds: 20
  periodSeconds: 10
```

---

## Related Topics

- [Kubernetes Probes & Health Checks](/docs/kubernetes/probes)
- [Kubernetes Logs, Exec & Debugging](/docs/kubernetes/logs-and-exec)
- [kubectl describe](/commands/kubernetes/kubectl-describe)
