---
title: "Kubernetes Error: Pod Stuck in Pending State"
description: Fix Kubernetes Pods stuck in the Pending state due to insufficient CPU/memory capacity, node taints, unbound PVCs, or affinity rules.
category: devops
topic: kubernetes
type: troubleshooting
level: beginner
tags:
  - kubernetes
  - pod-pending
  - scheduler
  - capacity
  - errors
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Symptoms

- `kubectl get pods` shows pod status `Pending` indefinitely.
- The `NODE` column in `kubectl get pods -o wide` is empty (`<none>`).
- Container never starts, restarts count is 0.

---

## Why It Happens

A Pod remains in `Pending` when the **`kube-scheduler`** cannot find any Worker Node in the cluster that satisfies the Pod's constraints and resource requests.

Common causes:
1. **Insufficient Cluster Resources**: The requested CPU or RAM (`resources.requests`) exceeds the available capacity on any single node.
2. **Unbound PersistentVolumeClaim (PVC)**: The Pod requests a PVC that has not yet been bound to physical storage.
3. **Node Selector or Affinity Mismatch**: Pod specifies a `nodeSelector` (e.g. `disktype: ssd`) that no online node possesses.
4. **Node Taints without Tolerations**: Worker nodes are tainted (e.g. control-plane nodes or maintenance drain) and the Pod lacks corresponding tolerations.

---

## How to Diagnose

<Steps>
  <Step step={1} title="Check Pod Scheduler Events">
    ```bash
    kubectl describe pod <pod-name>
    ```

    Read the **Events** section at the bottom:
    ```text
    Events:
      Type     Reason            Age   From               Message
      ----     ------            ----  ----               -------
      Warning  FailedScheduling  45s   default-scheduler  0/3 nodes are available: 3 Insufficient cpu.
    ```
  </Step>

  <Step step={2} title="Check Node Resource Allocation">
    ```bash
    kubectl describe nodes | grep -A 8 "Allocated resources"
    ```
  </Step>
</Steps>

---

## Solutions & Fixes

### 1. Reduce Unrealistic `resources.requests`
Developers often overestimate required baseline resources (e.g. requesting 4 full CPU cores for a light microservice):

```yaml
spec:
  containers:
    - name: web
      resources:
        requests:
          # Lower baseline request so scheduler can fit the pod
          cpu: "100m"
          memory: "128Mi"
        limits:
          cpu: "1000m"
          memory: "512Mi"
```

### 2. Verify Storage PVC Status
If the event says `pod has unbound immediate PersistentVolumeClaims`:

```bash
kubectl get pvc
```
Check if the PVC is in `Pending` status and inspect storage class availability.

### 3. Add Cluster Nodes or Enable Cluster Autoscaler
If all nodes are truly at 100% compute capacity, scale up your node pool in your cloud provider or cluster autoscaler.

---

## Related Topics

- [Kubernetes Requests & Limits](/docs/kubernetes/requests-and-limits)
- [Kubernetes Volumes & Persistent Storage](/docs/kubernetes/volumes-and-storage)
