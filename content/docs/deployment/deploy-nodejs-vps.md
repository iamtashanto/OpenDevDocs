---
title: "Deploying a Node.js App to a Linux VPS"
description: Complete end-to-end production guide for deploying a Node.js Express/TypeScript backend to an Ubuntu VPS using systemd, Nginx reverse proxy, and Let's Encrypt SSL.
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - nodejs
  - vps
  - ubuntu
  - linux
  - nginx
  - systemd
platforms:
  - linux
tested:
  ubuntu: "24.04"
  node: "22.x"
  nginx: "1.26.x"
lastVerified: "2026-09-30"
---

This guide walks through configuring a clean Ubuntu Linux VPS (DigitalOcean, Hetzner, AWS EC2) to host a production Node.js application securely behind Nginx and systemd.

---

## Step-by-Step Production Deployment

<Steps>
  <Step step={1} title="Server Security & Node.js Setup">
    SSH into your server and install Node.js 22 LTS via NodeSource:

    ```bash
    # Update system packages
    sudo apt update && sudo apt upgrade -y

    # Install Node.js 22 LTS
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install -y nodejs git build-essential ufw

    # Enable firewall (SSH, HTTP, HTTPS)
    sudo ufw allow OpenSSH
    sudo ufw allow 'Nginx Full'
    sudo ufw --force enable
    ```
  </Step>

  <Step step={2} title="Create Dedicated App User & Deploy Code">
    Never run applications as root!

    ```bash
    # Create unprivileged system user
    sudo adduser --system --group --no-create-home appuser

    # Clone repository into /var/www
    sudo mkdir -p /var/www/api
    sudo git clone https://github.com/myorg/my-api.git /var/www/api
    sudo chown -R appuser:appuser /var/www/api

    # Install dependencies & build
    cd /var/www/api
    sudo -u appuser npm ci
    sudo -u appuser npm run build
    ```
  </Step>

  <Step step={3} title="Configure systemd Process Service">
    Create `/etc/systemd/system/api.service`:

    ```ini
    [Unit]
    Description=Node.js API Server
    After=network.target

    [Service]
    Type=simple
    User=appuser
    WorkingDirectory=/var/www/api
    Environment=NODE_ENV=production
    Environment=PORT=3000
    ExecStart=/usr/bin/node dist/index.js
    Restart=always
    RestartSec=5s
    LimitNOFILE=65535

    [Install]
    WantedBy=multi-user.target
    ```

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable --now api.service
    ```
  </Step>

  <Step step={4} title="Configure Nginx & Free SSL">
    Install Nginx and Certbot:

    ```bash
    sudo apt install -y nginx certbot python3-certbot-nginx
    ```

    Create `/etc/nginx/sites-available/api.example.com`:

    ```nginx
    server {
        server_name api.example.com;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

    ```bash
    sudo ln -s /etc/nginx/sites-available/api.example.com /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx

    # Issue automated SSL certificate
    sudo certbot --nginx -d api.example.com
    ```
  </Step>
</Steps>

---

## Verifying Deployment & Logs

```bash
# Check service health
sudo systemctl status api.service

# Live tail of application logs
journalctl -u api.service -f

# Check Nginx access and error logs
sudo tail -f /var/log/nginx/error.log
```

---

## Related Guides

- [Process Managers (systemd vs PM2)](/docs/deployment/process-managers)
- [Nginx Reverse Proxy Guide](/docs/deployment/nginx-reverse-proxy)
- [Configure HTTPS with Let's Encrypt](/docs/deployment/configure-https-letsencrypt)
