---
title: "Kubernetes Secrets & Credential Management"
description: "Securely store database passwords, API tokens, TLS certificates, and registry credentials using Kubernetes Secrets."
category: devops
topic: kubernetes
type: guide
level: intermediate
tags:
  - kubernetes
  - secrets
  - security
  - credentials
  - base64
platforms:
  - all
tested:
  kubernetes: "1.31"
lastVerified: "2026-10-01"
---

# Kubernetes Secrets & Credential Management

A **Secret** is an API object that stores confidential data, such as database credentials, API access tokens, SSH private keys, and TLS certificates.

---

## 1. Secret Types

| Type | Purpose |
| :--- | :--- |
| `Opaque` (Default) | Arbitrary user-defined key-value credentials. |
| `kubernetes.io/tls` | TLS certificate (`tls.crt`) and private key (`tls.key`) for HTTPS termination. |
| `kubernetes.io/dockerconfigjson` | Private container registry authentication for pulling images. |

---

## 2. Creating Secrets

### 2.1 Using `stringData` in YAML (Auto-Encodes Plaintext to Base64)
```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
  namespace: default
type: Opaque
stringData:
  DB_USER: "app_user"
  DB_PASSWORD: "secure_password_123"
```

Apply:
```bash
kubectl apply -f secret.yaml
```

### 2.2 Using `kubectl create secret`
```bash
kubectl create secret generic api-keys \
  --from-literal=STRIPE_SECRET=sk_live_sample \
  --from-literal=SENDGRID_KEY=SG.sample
```

---

## 3. Consuming Secrets in Workloads

### 3.1 As Environment Variables
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: api-service
spec:
  containers:
    - name: api
      image: api:v1.0.0
      env:
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: DB_PASSWORD
```

### 3.2 As Injected Secret Volumes
Files inside `/etc/secrets` will contain the unencrypted secret contents, readable only by the container process:

```yaml
spec:
  containers:
    - name: api
      image: api:v1.0.0
      volumeMounts:
        - name: cert-volume
          mountPath: /etc/secrets
          readOnly: true
  volumes:
    - name: cert-volume
      secret:
        secretName: database-credentials
```

---

## 4. Production Security Practices

> [!WARNING]
> By default, Kubernetes Secrets are stored in `etcd` as base64-encoded strings (which is encoding, **not encryption**). For production clusters:
> 1. Enable **etcd encryption at rest** (KMS provider).
> 2. Avoid committing raw Secret YAML files into Git.
> 3. Use tools like **External Secrets Operator**, **HashiCorp Vault**, or **Sealed Secrets** to synchronize credentials securely from AWS Secrets Manager or GCP Secret Manager.
