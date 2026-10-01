---
title: "Configuring Free SSL/TLS with Let's Encrypt & Certbot"
description: Complete guide to obtaining, installing, and auto-renewing free SSL/TLS certificates for Nginx and Apache using Certbot and Let's Encrypt.
category: devops
topic: deployment
type: guide
level: beginner
tags:
  - ssl
  - https
  - certbot
  - letsencrypt
  - nginx
  - security
platforms:
  - linux
tested:
  certbot: "2.11.x"
  ubuntu: "24.04"
lastVerified: "2026-09-30"
---

**Let's Encrypt** provides free, automated 90-day X.509 certificates. **Certbot** is the official Electronic Frontier Foundation (EFF) client that handles domain challenge verification, certificate installation, and automated renewals.

---

## Prerequisites

1. An Ubuntu/Debian Linux VPS with public IPv4.
2. A registered domain name with an `A` record pointing to the VPS IP address.
3. Ports `80` and `443` open in your firewall (`sudo ufw allow 'Nginx Full'`).

---

## Step-by-Step Installation

<Steps>
  <Step step={1} title="Install Certbot via Snap / APT">
    ```bash
    # Install Certbot and the Nginx plugin
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
    ```
  </Step>

  <Step step={2} title="Run Automated Certbot Nginx Wizard">
    Certbot reads your active `/etc/nginx/sites-available` configuration, completes the HTTP-01 challenge, requests the certificate, and writes the SSL directives automatically:

    ```bash
    sudo certbot --nginx -d example.com -d www.example.com
    ```

    Follow the interactive prompts:
    - Enter your emergency contact email address.
    - Agree to the Terms of Service.
    - Choose whether to automatically redirect HTTP traffic to HTTPS (Select **Yes / Redirect**).
  </Step>

  <Step step={3} title="Verify Automated Certificate Renewal">
    Let's Encrypt certificates expire after 90 days. Certbot registers a `systemd` timer (`certbot.timer`) or cron job that checks twice daily and automatically renews certificates within 30 days of expiry.

    Test the renewal workflow with a dry run:
    ```bash
    sudo certbot renew --dry-run
    ```
  </Step>
</Steps>

---

## Useful Certbot Commands

```bash
# List all installed certificates and expiration dates
sudo certbot certificates

# Force immediate renewal
sudo certbot renew --force-renewal

# Revoke a compromised certificate
sudo certbot revoke --cert-path /etc/letsencrypt/live/example.com/cert.pem
```

---

## Related Guides

- [Nginx Reverse Proxy Guide](/docs/deployment/nginx-reverse-proxy)
- [HTTPS & TLS Fundamentals](/docs/deployment/https-and-ssl)
- [Deploying Node.js to Linux VPS](/docs/deployment/deploy-nodejs-vps)
