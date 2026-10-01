---
title: "Deploy Laravel on Ubuntu VPS (LEMP + Queue Worker + Cron + SSL)"
description: "Production guide for hosting Laravel 11/12 on Ubuntu VPS with PHP 8.3-FPM, Nginx public root, Artisan optimization, systemd queue workers, and cron scheduler."
category: devops
topic: deployment
type: recipe
level: intermediate
tags:
  - laravel
  - php
  - vps
  - queue-worker
  - cron
  - nginx
platforms:
  - linux
  - all
tested:
  laravel: "11.x / 12.x"
  php: "8.3"
  nginx: "1.26"
lastVerified: "2026-10-01"
---

## Goal

Deploy a production Laravel application on an Ubuntu VPS with optimized Artisan caching, background queue processing using systemd, automated task scheduling via Cron, and secure Nginx HTTPS.

---

<Steps>
  <Step step={1} title="Install PHP 8.3, Composer, and Dependencies">
    ```bash
    sudo apt update
    sudo apt install -y php8.3-fpm php8.3-cli php8.3-mysql php8.3-pgsql php8.3-sqlite3 \
                        php8.3-bcmath php8.3-mbstring php8.3-xml php8.3-curl \
                        php8.3-zip php8.3-gd php8.3-redis php8.3-intl \
                        composer nginx certbot python3-certbot-nginx git unzip
    ```
  </Step>

  <Step step={2} title="Clone Codebase and Configure Permissions">
    ```bash
    sudo mkdir -p /var/www/laravel-app
    sudo chown -R $USER:$USER /var/www/laravel-app
    cd /var/www/laravel-app

    git clone https://github.com/your-org/your-laravel-repo.git .

    # Install production dependencies without dev packages
    composer install --no-dev --optimize-autoloader

    # Setup environment file
    cp .env.example .env
    php artisan key:generate

    # Set storage and bootstrap/cache permissions for Nginx user (www-data)
    sudo chown -R www-data:www-data /var/www/laravel-app/storage /var/www/laravel-app/bootstrap/cache
    sudo chmod -R 775 /var/www/laravel-app/storage /var/www/laravel-app/bootstrap/cache

    # Create public storage symlink
    php artisan storage:link
    ```
  </Step>

  <Step step={3} title="Run Production Optimizations & Migrations">
    ```bash
    # Run database migrations
    php artisan migrate --force

    # Cache configuration, routes, and Blade views
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan event:cache
    ```
  </Step>

  <Step step={4} title="Configure Nginx Server Block">
    Create `/etc/nginx/sites-available/laravel.example.com.conf`:

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name laravel.example.com;

        # CRITICAL SECURITY: Root MUST point to the /public subdirectory!
        root /var/www/laravel-app/public;
        index index.php;

        client_max_body_size 50M;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            fastcgi_pass unix:/run/php/php8.3-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include fastcgi_params;
            fastcgi_hide_header X-Powered-By;
        }

        # Prevent downloading sensitive dotfiles (.env, .git)
        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
    ```

    Enable and reload:
    ```bash
    sudo ln -s /etc/nginx/sites-available/laravel.example.com.conf /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    sudo certbot --nginx -d laravel.example.com
    ```
  </Step>

  <Step step={5} title="Setup Background Queue Worker via Systemd">
    Create `/etc/systemd/system/laravel-queue.service`:

    ```ini
    [Unit]
    Description=Laravel Queue Worker
    After=network.target mysql.service

    [Service]
    User=www-data
    Group=www-data
    Restart=always
    ExecStart=/usr/bin/php /var/www/laravel-app/artisan queue:work --sleep=3 --tries=3 --max-time=3600

    [Install]
    WantedBy=multi-user.target
    ```

    Enable and start queue service:
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable --now laravel-queue
    ```
  </Step>

  <Step step={6} title="Configure Laravel Task Scheduler in Crontab">
    Open the root crontab:
    ```bash
    sudo crontab -e
    ```

    Add the schedule runner line:
    ```cron
    * * * * * cd /var/www/laravel-app && php artisan schedule:run >> /dev/null 2>&1
    ```
  </Step>
</Steps>
