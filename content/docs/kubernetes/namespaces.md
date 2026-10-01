---
title: "Kubernetes Namespaces"
description: "Isolate environments, teams, and workloads within a single cluster using Kubernetes Namespaces and ResourceQuotas."
category: devops
topic: kubernetes
type: guide
level: beginner
tags:
  - kubernetes
  - namespaces
  - multi-tenancy
  - isolation
  - resource-quotas
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Namespaces

A **Namespace** provides a mechanism for isolating groups of resources within a single physical Kubernetes cluster. Namespaces provide scoped naming, RBAC boundaries, and resource quota limits.

---

## 1. Default Built-in Namespaces

When a Kubernetes cluster is created, it comes with default namespaces:

- `default`: The default target for objects that don't declare a specific namespace.
- `kube-system`: Reserved for control plane and infrastructure components (CoreDNS, kube-proxy, metrics-server).
- `kube-public`: Publicly readable cluster status information.
- `kube-node-lease`: Holds heartbeat lease objects for node health checking.

---

## 2. Working with Namespaces

### Create a Namespace
```bash
kubectl create namespace staging
kubectl create namespace production
```

### Or Declare in YAML
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: staging
```

### View Resources in a Specific Namespace
```bash
kubectl get pods -n staging
```

### Switch Your Default Working Namespace Context
```bash
kubectl config set-context --current --namespace=staging
```

---

## 3. Cross-Namespace Communication

Pods in one namespace can reach Services in another namespace using Fully Qualified Domain Names (FQDN):

```bash
# Reaching the PostgreSQL service in the 'database' namespace:
http://postgres.database.svc.cluster.local:5432
```

---

## 4. Enforcing Limits with `ResourceQuota`

Prevent a development team or staging namespace from exhausting all cluster CPU or memory:

```yaml
# quota.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: staging-quota
  namespace: staging
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "20"
```
