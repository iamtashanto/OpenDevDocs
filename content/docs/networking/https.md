---
title: "HTTPS & Public Key Infrastructure (PKI)"
description: Master HTTPS encrypted web traffic, asymmetric vs symmetric encryption, Certificate Authorities, and TLS trust chains.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - https
  - security
  - tls
  - certificates
  - ssl
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is HTTPS?

**HTTPS (Hypertext Transfer Protocol Secure)** is HTTP encapsulated inside an encrypted **TLS (Transport Layer Security)** connection over TCP port **`443`**.

HTTPS guarantees three core security principles:
1. **Confidentiality / Encryption**: Third parties eavesdropping on Wi-Fi or ISP transit cannot read passwords, cookies, or payloads.
2. **Integrity**: Data cannot be tampered with or injected in transit without detection.
3. **Authentication**: Proves the client is communicating with the authentic legitimate server (preventing Man-in-the-Middle impersonation).

---

## Asymmetric vs Symmetric Encryption

HTTPS uses a hybrid approach combining the best aspects of both encryption paradigms:

```
1. Asymmetric Encryption (Public / Private Keypair)
   - Used ONLY during the initial TLS handshake to securely negotiate a shared secret
   - Computationally heavy, but allows secure key exchange without prior trust

2. Symmetric Encryption (AES-GCM / ChaCha20)
   - Uses the negotiated shared secret key to encrypt high-speed payload data
   - Ultra-fast hardware-accelerated encryption
```

---

## Public Key Infrastructure (PKI) & Trust Chain

How does your browser know `https://docs.tashanto.com` is legitimate?

```
[ Root Certificate Authority (Root CA) ] (Pre-installed in OS / Browser trust store)
                     │ Signs
                     ▼
[ Intermediate Certificate Authority ] (Let's Encrypt / DigiCert)
                     │ Signs
                     ▼
[ Leaf Server Certificate (docs.tashanto.com) ]
```

When a browser connects to a web server:
1. The server presents its **Leaf Certificate**.
2. The browser validates digital signatures recursively up the chain until reaching a trusted **Root CA** embedded in the operating system.

---

## Free Automated Certificates (Let's Encrypt & Certbot)

Production servers obtain free, auto-renewing 90-day TLS certificates using the ACME protocol via Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```
