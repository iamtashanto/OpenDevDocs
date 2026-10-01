---
title: "Deploy Next.js on Kubernetes (Complete Production Stack)"
description: "Deploy a production-ready Next.js application on Kubernetes with Deployment, Service, Ingress routing, TLS, and Horizontal Pod Autoscaler."
category: devops
topic: kubernetes
type: recipe
level: intermediate
tags:
  - kubernetes
  - nextjs
  - deployment
  - ingress
  - hpa
platforms:
  - all
tested:
  nextjs: "16.x"
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

## Goal

Deploy a highly-available, autoscaled Next.js web application to a Kubernetes cluster with zero-downtime rolling updates, public HTTPS domain ingress, and resource limits.

---

## Prerequisites

- Next.js application container image pushed to a registry (e.g. `ghcr.io/org/nextjs-app:1.0.0`)
- Running Kubernetes cluster (Minikube, Kind, EKS, GKE, or bare-metal)
- NGINX Ingress Controller installed in the cluster

---

<Steps>
  <Step step={1} title="Create ConfigMap and Secret">
    Save non-sensitive and sensitive runtime settings:

    ```yaml
    # nextjs-config.yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: nextjs-config
      namespace: default
    data:
      NODE_ENV: "production"
      PORT: "3000"
    ---
    apiVersion: v1
    kind: Secret
    metadata:
      name: nextjs-secrets
      namespace: default
    type: Opaque
    stringData:
      API_SECRET_KEY: "secret_token_123"
    ```
  </Step>

  <Step step={2} title="Create Next.js Deployment">
    Define the Pod specification, probes, and resource constraints:

    ```yaml
    # nextjs-deployment.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nextjs-deployment
      namespace: default
      labels:
        app: nextjs-web
    spec:
      replicas: 3
      strategy:
        type: RollingUpdate
        rollingUpdate:
          maxSurge: 1
          maxUnavailable: 0
      selector:
        matchLabels:
          app: nextjs-web
      template:
        metadata:
          labels:
            app: nextjs-web
        spec:
          containers:
            - name: nextjs
              image: ghcr.io/org/nextjs-app:1.0.0
              ports:
                - containerPort: 3000
              envFrom:
                - configMapRef:
                    name: nextjs-config
                - secretRef:
                    name: nextjs-secrets
              resources:
                requests:
                  cpu: "100m"
                  memory: "128Mi"
                limits:
                  cpu: "500m"
                  memory: "512Mi"
              startupProbe:
                httpGet:
                  path: /
                  port: 3000
                failureThreshold: 30
                periodSeconds: 1
              readinessProbe:
                httpGet:
                  path: /
                  port: 3000
                initialDelaySeconds: 5
                periodSeconds: 5
              livenessProbe:
                httpGet:
                  path: /
                  port: 3000
                initialDelaySeconds: 10
                periodSeconds: 10
    ```
  </Step>

  <Step step={3} title="Create ClusterIP Service and Ingress">
    Expose the deployment internally and route external traffic with TLS:

    ```yaml
    # nextjs-service-ingress.yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: nextjs-service
      namespace: default
    spec:
      type: ClusterIP
      selector:
        app: nextjs-web
      ports:
        - protocol: TCP
          port: 80
          targetPort: 3000
    ---
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: nextjs-ingress
      namespace: default
      annotations:
        kubernetes.io/ingress.class: "nginx"
        cert-manager.io/cluster-issuer: "letsencrypt-prod"
    spec:
      tls:
        - hosts:
            - app.example.com
          secretName: nextjs-tls-cert
      rules:
        - host: app.example.com
          http:
            paths:
              - path: /
                pathType: Prefix
                backend:
                  service:
                    name: nextjs-service
                    port:
                      number: 80
    ```
  </Step>

  <Step step={4} title="Create Horizontal Pod Autoscaler (HPA)">
    Automatically scale between 3 and 10 pods based on CPU load:

    ```yaml
    # nextjs-hpa.yaml
    apiVersion: autoscaling/v2
    kind: HorizontalPodAutoscaler
    metadata:
      name: nextjs-hpa
      namespace: default
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: nextjs-deployment
      minReplicas: 3
      maxReplicas: 10
      metrics:
        - type: Resource
          resource:
            name: cpu
            target:
              type: Utilization
              averageUtilization: 75
    ```
  </Step>
</Steps>

---

## Verification

Apply all manifests:
```bash
kubectl apply -f nextjs-config.yaml
kubectl apply -f nextjs-deployment.yaml
kubectl apply -f nextjs-service-ingress.yaml
kubectl apply -f nextjs-hpa.yaml
```

Verify the deployment status:
```bash
kubectl get pods -l app=nextjs-web
kubectl get svc nextjs-service
kubectl get ingress nextjs-ingress
kubectl get hpa nextjs-hpa
```

---

## Related Topics

- [Kubernetes Deployments](/docs/kubernetes/deployments)
- [Kubernetes Ingress & Routing](/docs/kubernetes/ingress)
- [Kubernetes Probes](/docs/kubernetes/probes)
