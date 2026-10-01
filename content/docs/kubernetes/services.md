---
title: "Kubernetes Services & Networking"
description: "Master Kubernetes Services — stable virtual IPs, internal DNS discovery, ClusterIP, NodePort, LoadBalancer, and EndpointSlice load balancing."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - services
  - networking
  - dns
  - load-balancing
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Services & Networking

Pods are ephemeral. When a Pod crashes or a Deployment performs a rolling update, new Pods receive new internal IP addresses. A **Service** provides a single, permanent virtual IP and DNS name that automatically load-balances traffic across the dynamic pool of backend Pods.

---

## 1. How Services Work

```
[ Incoming Request: http://api-service:8080 ]
                     │
                     ▼
       ┌───────────────────────────┐
       │   Service: api-service    │
       │   ClusterIP: 10.96.0.45   │
       │   Selector: app=api       │
       └─────────────┬─────────────┘
                     │ (Kube-proxy Load Balancing)
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
  ┌─────────┐   ┌─────────┐   ┌─────────┐
  │  Pod 1  │   │  Pod 2  │   │  Pod 3  │
  │ 10.244.1│   │ 10.244.2│   │ 10.244.3│
  └─────────┘   └─────────┘   └─────────┘
```

---

## 2. Service Types

| Type | Accessibility | Description |
| :--- | :--- | :--- |
| **`ClusterIP`** (Default) | Internal Only | Allocates a virtual cluster-internal IP. Accessible only by other pods inside the cluster. |
| **`NodePort`** | Cluster Node IPs | Opens a static high port (`30000-32767`) on every Worker Node's IP address. |
| **`LoadBalancer`** | Public Internet | Provisions a cloud provider load balancer (AWS ALB/NLB, GCP, Azure) and forwards traffic to the Service. |
| **`ExternalName`** | Internal -> External | Maps a service name to an external DNS CNAME (e.g. `api.stripe.com`). |

---

## 3. ClusterIP Service (Standard Internal Communication)

```yaml
# service-clusterip.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-api
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: backend-api # Must match the label on your Pods
  ports:
    - protocol: TCP
      port: 80         # Port exposed on the Service
      targetPort: 8080 # Port your container is actually listening on
```

---

## 4. Kubernetes Internal DNS Resolution

Kubernetes runs CoreDNS. Any Pod in the cluster can communicate with another Service using standard DNS:

```bash
# From inside the same namespace:
curl http://backend-api:80

# From a different namespace (e.g. 'staging'):
curl http://backend-api.default.svc.cluster.local:80
```

### DNS Hierarchy Breakdown
```
backend-api  .  default    .  svc   .  cluster.local
 [Service]     [Namespace]   [Type]      [Domain]
```

---

## 5. LoadBalancer Service (Public Ingress via Cloud)

```yaml
# service-loadbalancer.yaml
apiVersion: v1
kind: Service
metadata:
  name: public-web-lb
spec:
  type: LoadBalancer
  selector:
    app: web-frontend
  ports:
    - port: 80
      targetPort: 3000
```

Check the allocated public external IP:
```bash
kubectl get svc public-web-lb
```

Output:
```text
NAME            TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)
public-web-lb   LoadBalancer   10.96.120.15    35.230.40.12    80:31245/TCP
```
