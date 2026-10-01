---
title: "Deploy React (Vite SPA) on Ubuntu VPS with Nginx & SSL"
description: "Deploy a production React Single Page Application (Vite) on Ubuntu VPS with Nginx SPA fallback routing (try_files), Gzip compression, and SSL."
category: devops
topic: deployment
type: recipe
level: beginner
tags:
  - react
  - vite
  - vps
  - nginx
  - spa
  - deployment
platforms:
  - linux
  - all
tested:
  react: "19.x"
  vite: "6.x"
  nginx: "1.26"
lastVerified: "2026-10-01"
---

## Goal

Host a fast, optimized React Single Page Application (SPA) built with Vite on an Ubuntu VPS served statically through Nginx with client-side routing fallback and Let's Encrypt SSL.

---

## Prerequisites

- Ubuntu VPS with Nginx and Git installed
- Domain name pointed to the VPS (e.g. `react.example.com`)

---

<Steps>
  <Step step={1} title="Build the React Production Bundle">
    In your project root (locally or on the server):

    ```bash
    # Install dependencies and build
    npm run build
    # Outputs static HTML, CSS, and JS bundles to ./dist/
    ```
  </Step>

  <Step step={2} title="Transfer Files to VPS Document Root">
    ```bash
    # Create directory on VPS
    sudo mkdir -p /var/www/react-app

    # Set ownership
    sudo chown -R $USER:$USER /var/www/react-app

    # Copy files from dist into /var/www/react-app
    cp -r dist/* /var/www/react-app/
    ```
  </Step>

  <Step step={3} title="Configure Nginx with SPA Routing Fallback">
    Create `/etc/nginx/sites-available/react.example.com.conf`:

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name react.example.com;

        root /var/www/react-app;
        index index.html;

        # Essential: Fallback all client-side routes (e.g. /dashboard, /profile) to index.html
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache hashed JS/CSS assets aggressively
        location ~* \.(?:css|js|woff2?|svg|png|jpg|webp)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }

        # Do NOT cache index.html so users always receive fresh asset hashes
        location = /index.html {
            expires -1;
            add_header Cache-Control "no-store, no-cache, must-revalidate";
        }
    }
    ```

    Enable and test:
    ```bash
    sudo ln -s /etc/nginx/sites-available/react.example.com.conf /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    ```
  </Step>

  <Step step={4} title="Obtain SSL Certificate">
    ```bash
    sudo certbot --nginx -d react.example.com
    ```
  </Step>
</Steps>

---

## Verification

1. Open `https://react.example.com` in your browser.
2. Navigate to subroutes (e.g. `/dashboard`) and hit **Browser Refresh** (`Cmd+R` / `F5`) to verify `try_files` prevents 404 errors.
