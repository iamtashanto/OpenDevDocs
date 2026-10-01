---
title: "Kubernetes Error: OOMKilled (Exit Code 137)"
description: Diagnose and fix Kubernetes OOMKilled (Out of Memory) exit code 137 when containers exceed memory limits or experience memory leaks.
category: devops
topic: kubernetes
type: troubleshooting
level: intermediate
tags:
  - kubernetes
  - oomkilled
  - exit-code-137
  - memory-limits
  - cgroups
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Symptoms

- `kubectl get pods` shows restarts and status `OOMKilled` or `CrashLoopBackOff`.
- `kubectl describe pod <name>` shows `Last State: Terminated`, `Reason: OOMKilled`, `Exit Code: 137`.

---

## Why It Happens

**Exit Code 137** ($128 + 9$, SIGKILL) occurs when the Linux kernel's Out-Of-Memory (OOM) Killer terminates the container process because its physical RAM usage exceeded the `resources.limits.memory` configured in the PodSpec.

Common causes:
1. **Memory Limit Configured Too Low**: Default application runtime memory requirements (e.g. Node.js V8 heap or JVM) exceed the limit.
2. **Memory Leak**: Application retains references to uncollected objects across HTTP requests.
3. **Heavy In-Memory Operations**: Unbuffered file uploads, large database query result sets loaded entirely into RAM.
4. **JVM / V8 Heap Misconfiguration**: Node.js or Java heap size not constrained relative to the container limit.

---

## How to Diagnose

<Steps>
  <Step step={1} title="Confirm OOMKilled in Pod Status">
    ```bash
    kubectl describe pod <pod-name>
    ```

    Look for:
    ```text
    Last State:     Terminated
      Reason:       OOMKilled
      Exit Code:    137
      Started:      Tue, 01 Oct 2026 10:15:00 +0000
      Finished:     Tue, 01 Oct 2026 10:18:22 +0000
    ```
  </Step>

  <Step step={2} title="Check Historical Memory Metrics">
    ```bash
    kubectl top pod <pod-name>
    ```
  </Step>
</Steps>

---

## Solutions & Fixes

### 1. Increase Pod Memory Limits
Update `resources.limits.memory` in your Deployment YAML:

```yaml
spec:
  containers:
    - name: api-server
      image: my-app:latest
      resources:
        requests:
          memory: "512Mi"
          cpu: "250m"
        limits:
          memory: "1024Mi" # Increased from 256Mi to 1Gi
          cpu: "1000m"
```

### 2. Configure V8 Max Old Space for Node.js
Ensure Node.js triggers garbage collection before the container memory limit is reached:

```yaml
spec:
  containers:
    - name: nextjs
      image: my-app:latest
      env:
        # Set max heap size to ~75% of container limit (e.g. 768MB of 1GB limit)
        - name: NODE_OPTIONS
          value: "--max-old-space-size=768"
      resources:
        limits:
          memory: "1024Mi"
```

### 3. Stream Large Payloads & Paginate Database Queries
Avoid reading entire 500MB database dumps or files into RAM:
- Use streaming pipelines (`fs.createReadStream`).
- Use database pagination (`take: 50, skip: 0`).

---

## Related Topics

- [Kubernetes Requests & Limits](/docs/kubernetes/requests-and-limits)
- [Kubernetes Troubleshooting](/docs/kubernetes/troubleshooting)
