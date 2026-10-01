---
title: "Kubectl CLI Fundamentals & Syntax"
description: "Master the Kubernetes CLI (kubectl) — syntax, kubeconfig contexts, resource aliases, formatted output options, and dry-run manifest generation."
category: devops
topic: kubernetes
type: guide
level: beginner
tags:
  - kubernetes
  - kubectl
  - cli
  - devops
  - tooling
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubectl CLI Fundamentals & Syntax

`kubectl` is the official command-line interface for communicating with a Kubernetes cluster's API Server.

---

## 1. Core Command Pattern

Every `kubectl` command follows a standard syntax:

```bash
kubectl <action> <resource_type> <resource_name> [flags]
```

### Common Resource Short-Names (Aliases)
| Resource | Short Alias | Resource | Short Alias |
| :--- | :--- | :--- | :--- |
| `pods` | `po` | `services` | `svc` |
| `deployments` | `deploy` | `ingresses` | `ing` |
| `replicasets` | `rs` | `configmaps` | `cm` |
| `namespaces` | `ns` | `persistentvolumeclaims` | `pvc` |

---

## 2. Managing Cluster Contexts (`~/.kube/config`)

`kubectl` reads authentication credentials and server endpoints from `~/.kube/config`.

```bash
# View active context
kubectl config current-context

# List all available cluster contexts
kubectl config get-contexts

# Switch active cluster context
kubectl config use-context production-cluster-us-east-1

# Switch active default namespace
kubectl config set-context --current --namespace=production
```

---

## 3. Formatting Outputs

```bash
# Detailed tabular view with Node and Pod IPs
kubectl get pods -o wide

# Export full live object definition as YAML
kubectl get deployment api-deployment -o yaml

# Extract specific JSONPath fields
kubectl get pods -o jsonpath='{.items[*].metadata.name}'
```

---

## 4. Rapid YAML Generation with `--dry-run=client`

Generate clean boilerplate YAML manifests without deploying them to the cluster:

```bash
# Generate a Deployment YAML template
kubectl create deployment web-app --image=nginx:alpine --replicas=3 --dry-run=client -o yaml > deployment.yaml

# Generate a ClusterIP Service YAML template
kubectl create service clusterip web-app --tcp=80:8080 --dry-run=client -o yaml > service.yaml
```
