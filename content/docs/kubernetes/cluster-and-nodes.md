---
title: "Kubernetes Cluster & Nodes"
description: "Understand Kubernetes clusters, control plane vs worker nodes, node status conditions, allocatable capacity, labels, taints, and tolerations."
category: devops
topic: kubernetes
type: guide
level: beginner
tags:
  - kubernetes
  - cluster
  - nodes
  - infrastructure
  - devops
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Cluster & Nodes

A **Kubernetes Cluster** is a set of connected physical or virtual machines (called **Nodes**) running Kubernetes components to execute containerized workloads as a unified distributed system.

---

## 1. Types of Nodes

1. **Control Plane Nodes (Masters)**: Host the control plane services (`kube-apiserver`, `etcd`, `kube-scheduler`). In managed cloud services (EKS, GKE, AKS), the control plane is fully managed and hidden.
2. **Worker Nodes**: Physical servers or VMs where application pods are scheduled and executed.

---

## 2. Inspecting Nodes with `kubectl`

View all nodes in the connected cluster:

```bash
kubectl get nodes -o wide
```

Output:
```text
NAME             STATUS   ROLES           AGE   VERSION   INTERNAL-IP   OS-IMAGE             KERNEL-VERSION
node-master-01   Ready    control-plane   45d   v1.31.0   10.0.1.10     Ubuntu 24.04 LTS     6.8.0-generic
node-worker-01   Ready    <none>          45d   v1.31.0   10.0.1.20     Ubuntu 24.04 LTS     6.8.0-generic
node-worker-02   Ready    <none>          45d   v1.31.0   10.0.1.21     Ubuntu 24.04 LTS     6.8.0-generic
```

### Inspecting Node Capacity & Health
```bash
kubectl describe node node-worker-01
```

Look for:
- **Conditions**: `Ready: True`, `MemoryPressure: False`, `DiskPressure: False`, `PIDPressure: False`.
- **Capacity**: Total hardware physical resources.
- **Allocatable**: Resources available for user Pods after reserving system overhead for the OS and `kubelet`.

---

## 3. Node Labels & Selectors

Assign custom metadata labels to worker nodes to control workload placement:

```bash
# Label a specific worker node with SSD storage
kubectl label nodes node-worker-01 disktype=ssd
```

Target labeled nodes in a Pod or Deployment spec using `nodeSelector`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres-db
spec:
  nodeSelector:
    disktype: ssd
  containers:
    - name: postgres
      image: postgres:17-alpine
```

---

## 4. Node Taints & Tolerations

- **Taint**: Applied to a node to repel a set of pods (e.g. `node-role.kubernetes.io/control-plane:NoSchedule`).
- **Toleration**: Applied to a pod to allow (but not force) scheduling on matching tainted nodes.
