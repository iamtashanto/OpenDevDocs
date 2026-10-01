---
title: "kubectl get"
description: List one or more Kubernetes resources such as Pods, Deployments, Services, Nodes, and Namespaces with custom output formatting.
category: devops
topic: kubernetes
type: reference
level: beginner
tags:
  - kubernetes
  - kubectl
  - get
  - pods
  - resources
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Command

<Command>kubectl get pods -n default -o wide</Command>

---

## Short Description

`kubectl get` lists one or more API resources in your cluster, displaying tabular status columns like readiness, restart count, age, IP address, and hosting node.

---

## Syntax

```bash
kubectl get <resource_type> [NAME] [FLAGS]
```

---

## Examples

### 1. List Pods Across All Namespaces
```bash
kubectl get pods -A
```

### 2. Output Full Object Definition in YAML
```bash
kubectl get deployment api-server -o yaml
```

### 3. List Services with Wide Details
```bash
kubectl get svc -o wide
```

### 4. Filter Pods by Label Selector
```bash
kubectl get pods -l app=web,environment=production
```

---

## Common Options

| Option | Shorthand | Description |
| :--- | :--- | :--- |
| `--all-namespaces` | `-A` | List requested resources across all cluster namespaces. |
| `--namespace` | `-n` | Specify target namespace (defaults to active context). |
| `--output` | `-o` | Output format: `wide`, `yaml`, `json`, `name`, `jsonpath`. |
| `--selector` | `-l` | Filter resources by label key=value pairs. |
| `--watch` | `-w` | Stream real-time resource state updates. |

---

## Related Topics

- [Kubernetes Pods](/docs/kubernetes/pods)
- [Kubernetes Deployments](/docs/kubernetes/deployments)
- [kubectl describe](/commands/kubernetes/kubectl-describe)
