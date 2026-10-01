---
title: "kubectl apply"
description: Apply declarative configuration changes to Kubernetes resources from YAML manifest files or stdin.
category: devops
topic: kubernetes
type: reference
level: beginner
tags:
  - kubernetes
  - kubectl
  - apply
  - yaml
  - declarative
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Command

<Command>kubectl apply -f deployment.yaml</Command>

---

## Short Description

`kubectl apply` manages applications through declarative configuration files, creating new resources or updating existing resources in place.

---

## Syntax

```bash
kubectl apply -f <filename_or_directory> [FLAGS]
```

---

## Examples

### 1. Apply Single Manifest File
```bash
kubectl apply -f ./k8s/deployment.yaml
```

### 2. Recursively Apply All YAML Files in a Directory
```bash
kubectl apply -R -f ./k8s/
```

### 3. Apply Configuration from URL
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

### 4. Dry Run Validation Without Modifying Cluster
```bash
kubectl apply -f deployment.yaml --dry-run=server
```

---

## Common Options

| Option | Shorthand | Description |
| :--- | :--- | :--- |
| `--filename` | `-f` | Path to a file, directory, or URL containing YAML manifests. |
| `--recursive` | `-R` | Recursively process all directory subfolders. |
| `--dry-run` | | Simulate request (`client` or `server`). |
| `--prune` | | Automatically delete obsolete resources omitted from manifest directory. |

---

## Related Topics

- [Kubernetes Deployments](/docs/kubernetes/deployments)
- [Kubernetes Services](/docs/kubernetes/services)
