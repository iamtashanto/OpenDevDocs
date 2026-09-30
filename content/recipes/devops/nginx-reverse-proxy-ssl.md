---
title: "Nginx Reverse Proxy with Certbot Let's Encrypt SSL"
description: Configure an Nginx reverse proxy on Ubuntu with automated SSL/TLS certificates and HTTP to HTTPS redirection.
category: devops
topic: nginx
type: recipe
level: intermediate
tags:
  - nginx
  - ssl
  - certbot
  - reverse-proxy
  - devops
  - linux
platforms:
  - linux
tested:
  ubuntu: "24.04"
  nginx: "1.24+"
lastVerified: "2026-09-30"
---

## Goal

Forward incoming public HTTPS web traffic on ports 80/443 to an internal Node.js or Docker application listening on port 3000, with automated Let's Encrypt SSL certificates.

---

## Prerequisites

- Ubuntu 22.04 or 24.04 VPS
- Registered domain name with an `A` record pointing to the server's public IP address
- Backend application running locally (e.g. port 3000)

---

<Steps>
  <Step step={1} title="Install Nginx and Certbot">
    ```bash
    sudo apt-get update
    sudo apt-get install -y nginx certbot python3-certbot-nginx
    ```
  </Step>

  <Step step={2} title="Create Nginx Server Block Configuration">
    Create `/etc/nginx/sites-available/docs.example.com`:

    ```nginx
    server {
        server_name docs.example.com;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;

            # WebSocket and Connection headers
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';

            # Client identity headers
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
  </Step>

  <Step step={3} title="Enable Site and Test Nginx Syntax">
    ```bash
    # Create symlink in sites-enabled
    sudo ln -s /etc/nginx/sites-available/docs.example.com /etc/nginx/sites-enabled/

    # Verify configuration syntax
    sudo nginx -t

    # Reload Nginx
    sudo systemctl reload nginx
    ```
  </Step>

  <Step step={4} title="Obtain Let's Encrypt SSL Certificate">
    Run Certbot with the automated Nginx plugin:

    ```bash
    sudo certbot --nginx -d docs.example.com --non-interactive --agree-tos -m admin@example.com --redirect
    ```
  </Step>
</Steps>

---

## Automated Renewal Verification

Certbot automatically installs a systemd timer for certificate renewal. Verify renewal works cleanly:

```bash
sudo certbot renew --dry-run
```
