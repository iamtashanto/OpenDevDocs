---
title: "Deploy Next.js App on Ubuntu VPS (Standalone + PM2 + Nginx + SSL)"
description: "Step-by-step production deployment guide for Next.js App Router on an Ubuntu VPS using standalone output, PM2 cluster mode, Nginx reverse proxy, and SSL."
category: devops
topic: deployment
type: recipe
level: intermediate
tags:
  - nextjs
  - vps
  - pm2
  - nginx
  - deployment
  - ubuntu
platforms:
  - linux
  - all
tested:
  nextjs: "16.x"
  node: "22.x"
  nginx: "1.26"
lastVerified: "2026-10-01"
---

## Goal

Host a production Next.js App Router application on a Linux Ubuntu VPS with automated zero-downtime restarts using PM2, Nginx reverse proxying, WebSockets, and Let's Encrypt SSL.

---

## Prerequisites

- Ubuntu 22.04 or 24.04 LTS VPS with SSH root/sudo access
- Domain name pointing to your VPS IP address (e.g. `app.example.com`)

---

<Steps>
  <Step step={1} title="Install Node.js 22, PNPM, and PM2">
    Run on your VPS:

    ```bash
    # 1. Install Node.js 22 LTS via NodeSource
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install -y nodejs git nginx certbot python3-certbot-nginx

    # 2. Enable PNPM
    corepack enable && corepack prepare pnpm@latest --activate

    # 3. Install PM2 globally
    sudo npm install -g pm2
    ```
  </Step>

  <Step step={2} title="Enable Standalone Output in Next.js">
    In your local Next.js project's `next.config.ts`:

    ```typescript
    // next.config.ts
    import type { NextConfig } from "next";

    const nextConfig: NextConfig = {
      output: "standalone",
    };

    export default nextConfig;
    ```
  </Step>

  <Step step={3} title="Clone and Build on VPS">
    ```bash
    # Create web directory
    sudo mkdir -p /var/www/nextjs-app
    sudo chown -R $USER:$USER /var/www/nextjs-app

    # Clone your repository
    git clone https://github.com/your-username/your-repo.git /var/www/nextjs-app
    cd /var/www/nextjs-app

    # Create production .env file
    cp .env.example .env.production

    # Install dependencies and build
    pnpm install --frozen-lockfile
    pnpm build

    # Copy static assets to standalone directory
    cp -r public .next/standalone/public
    cp -r .next/static .next/standalone/.next/static
    ```
  </Step>

  <Step step={4} title="Configure PM2 Ecosystem File">
    Create `/var/www/nextjs-app/ecosystem.config.js`:

    ```javascript
    module.exports = {
      apps: [
        {
          name: "nextjs-app",
          script: ".next/standalone/server.js",
          instances: "max", // Utilizes all available CPU cores in cluster mode
          exec_mode: "cluster",
          env: {
            PORT: 3000,
            NODE_ENV: "production",
          },
        },
      ],
    };
    ```

    Start and save PM2 service:
    ```bash
    pm2 start ecosystem.config.js
    pm2 save
    # Ensure PM2 automatically resurrects upon VPS reboot:
    pm2 startup
    # (Copy and run the sudo env command outputted by pm2 startup)
    ```
  </Step>

  <Step step={5} title="Configure Nginx Reverse Proxy & SSL">
    Create `/etc/nginx/sites-available/app.example.com.conf`:

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name app.example.com;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;

            # WebSockets & Upgrades
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            # Proxy Identity Headers
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_read_timeout 60s;
        }

        # Cache Next.js static assets for 1 year
        location /_next/static {
            alias /var/www/nextjs-app/.next/static;
            expires 365d;
            access_log off;
        }
    }
    ```

    Enable site and request SSL certificate:
    ```bash
    sudo ln -s /etc/nginx/sites-available/app.example.com.conf /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    sudo certbot --nginx -d app.example.com
    ```
  </Step>
</Steps>

---

## Verification

```bash
# Check PM2 process health
pm2 status
pm2 logs nextjs-app

# Check Nginx status
sudo systemctl status nginx
```

Visit `https://app.example.com` in your browser.
