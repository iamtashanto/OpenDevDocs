export interface RoadmapResource {
  title: string;
  href: string;
  type: "guide" | "command" | "recipe" | "error" | "external";
  badge?: string;
}

export interface RoadmapSubTopic {
  id: string;
  title: string;
  status?: "recommended" | "alternative" | "optional";
  description?: string;
  resourceHref?: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  subtitle: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  badge?: string;
  category: "foundation" | "core" | "architecture" | "devops" | "security" | "production";
  summary: string;
  keySkills: string[];
  subTopics?: RoadmapSubTopic[];
  resources: RoadmapResource[];
  recommendedChoice?: string;
}

export interface RoadmapStage {
  id: string;
  stageNumber: number;
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

export interface RoadmapData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedTime: string;
  badge: string;
  color: string;
  prerequisites: string[];
  stages: RoadmapStage[];
}

export const roadmapsList: Record<string, RoadmapData> = {
  "frontend": {
    slug: "frontend",
    title: "Frontend Developer Roadmap",
    subtitle: "Step-by-step path to becoming a modern, production-grade Frontend Engineer in 2026",
    description: "From semantic HTML, modern CSS and JavaScript fundamentals to React 19, Next.js App Router, state management, and edge performance optimization.",
    estimatedTime: "6 - 9 Months",
    badge: "Most Popular",
    color: "from-blue-500 to-indigo-600",
    prerequisites: ["Basic computer literacy", "Curiosity about web interfaces"],
    stages: [
      {
        id: "fe-stage-1",
        stageNumber: 1,
        title: "Web Foundations & The Core Trinity",
        description: "Master the foundational standards that power every web browser.",
        nodes: [
          {
            id: "fe-html",
            title: "HTML5 & Semantic Markup",
            subtitle: "Document structure, accessible elements, meta tags, and DOM tree",
            level: "Beginner",
            badge: "Must Know",
            category: "foundation",
            summary: "Semantic HTML provides the essential skeleton and accessibility tree for web applications. Understand heading hierarchy, ARIA attributes, forms, and SEO meta tags.",
            keySkills: [
              "Semantic tags (`<main>`, `<article>`, `<nav>`, `<section>`)",
              "Form validation, accessible inputs, and ARIA roles",
              "OpenGraph meta tags, SEO titles, and JSON-LD schema",
              "Audio, Video, and Canvas multimedia elements",
            ],
            subTopics: [
              { id: "fe-html-semantic", title: "Semantic Tags & Structure", status: "recommended" },
              { id: "fe-html-forms", title: "Form Validation & Accessibility (a11y)", status: "recommended" },
              { id: "fe-html-seo", title: "SEO Meta & Social Sharing Cards", status: "recommended" },
            ],
            resources: [
              { title: "HTML5 Core Documentation", href: "/docs/html/index", type: "guide" },
              { title: "Semantic HTML & Accessibility Guide", href: "/docs/html/semantic-elements", type: "guide" },
            ],
          },
          {
            id: "fe-css",
            title: "CSS3 & Modern Styling",
            subtitle: "Flexbox, CSS Grid, custom properties, responsive design, animations",
            level: "Beginner",
            badge: "Must Know",
            category: "foundation",
            summary: "Modern CSS enables fluid, responsive, and hardware-accelerated layouts without requiring heavy runtime styling libraries.",
            keySkills: [
              "Flexbox alignment and CSS Grid two-dimensional layouts",
              "CSS Variables (Custom Properties) for dynamic theming",
              "Media queries, container queries, and mobile-first design",
              "Keyframe animations, transitions, and transforms",
            ],
            subTopics: [
              { id: "fe-css-flexbox", title: "Flexbox & Grid Layouts", status: "recommended" },
              { id: "fe-css-tailwind", title: "Tailwind CSS Utility Styling", status: "recommended" },
              { id: "fe-css-modules", title: "CSS Modules & PostCSS", status: "alternative" },
            ],
            resources: [
              { title: "CSS Grid & Flexbox Guide", href: "/docs/css/layout-cheatsheet", type: "guide" },
              { title: "Tailwind CSS Production Setup", href: "/docs/tailwindcss/tailwindcss-overview", type: "guide" },
            ],
          },
          {
            id: "fe-js",
            title: "JavaScript (ES6+) & Modern Runtimes",
            subtitle: "Closures, Event Loop, Promises, Async/Await, Prototypes, ES Modules",
            level: "Beginner",
            badge: "Must Know",
            category: "foundation",
            summary: "JavaScript is the programmable engine of the browser. Master asynchronous execution, microtask queues, scope chains, and DOM manipulation.",
            keySkills: [
              "Async/Await, Promises, and fetch API with error handling",
              "Event loop, Call Stack, Microtasks vs Macrotasks",
              "Array methods (`map`, `filter`, `reduce`, `flatMap`)",
              "DOM traversal, event delegation, and bubbling",
            ],
            subTopics: [
              { id: "fe-js-async", title: "Promises & Async/Await", status: "recommended" },
              { id: "fe-js-modules", title: "ES Modules (import / export)", status: "recommended" },
              { id: "fe-js-dom", title: "DOM Manipulation & Events", status: "recommended" },
            ],
            resources: [
              { title: "JavaScript Core Guide", href: "/docs/javascript/javascript-overview", type: "guide" },
              { title: "Event Loop & Microtasks Visualized", href: "/docs/javascript/event-loop", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "fe-stage-2",
        stageNumber: 2,
        title: "Developer Workflow & Type Safety",
        description: "Essential tooling, version control, package managers, and TypeScript.",
        nodes: [
          {
            id: "fe-git",
            title: "Git & GitHub Collaboration",
            subtitle: "Branching workflows, interactive rebasing, merge conflicts, pull requests",
            level: "Intermediate",
            badge: "Must Know",
            category: "core",
            summary: "Professional code management requires clean commit histories, trunk-based or feature-branch workflows, and conflict resolution.",
            keySkills: [
              "Branching, checkout, stash, commit conventions",
              "Interactive rebasing (`git rebase -i`), squashing",
              "Resolving merge conflicts cleanly without data loss",
              "GitHub Pull Requests, code reviews, and protection rules",
            ],
            subTopics: [
              { id: "fe-git-branch", title: "Feature Branch Workflow", status: "recommended" },
              { id: "fe-git-rebase", title: "Interactive Rebasing", status: "recommended" },
            ],
            resources: [
              { title: "Git Essential Commands & Workflow", href: "/commands/git/git-commands", type: "command" },
              { title: "Git Guide for Teams", href: "/docs/git/git-overview", type: "guide" },
            ],
          },
          {
            id: "fe-typescript",
            title: "TypeScript & Static Typing",
            subtitle: "Interfaces, Generics, Utility Types, Discriminated Unions, Strict Mode",
            level: "Intermediate",
            badge: "Industry Standard",
            category: "core",
            summary: "TypeScript eliminates entire categories of runtime bugs, provides rich auto-completion, and guarantees contracts across client-server boundaries.",
            keySkills: [
              "Generics, conditional types, and mapped types",
              "Discriminated unions for reliable state machines",
              "Utility types (`Partial`, `Pick`, `Omit`, `ReturnType`)",
              "`tsconfig.json` strict mode and module resolution",
            ],
            subTopics: [
              { id: "fe-ts-generics", title: "Generics & Constraint Types", status: "recommended" },
              { id: "fe-ts-unions", title: "Discriminated Unions & Type Guards", status: "recommended" },
            ],
            resources: [
              { title: "TypeScript Deep Dive Guide", href: "/docs/typescript/typescript-overview", type: "guide" },
            ],
          },
          {
            id: "fe-pkg",
            title: "Package Managers & Bundlers",
            subtitle: "pnpm, npm, Vite, Turbopack, monorepos, module resolution",
            level: "Intermediate",
            badge: "Recommended: pnpm",
            category: "core",
            summary: "Fast dependency resolution and instant Hot Module Replacement (HMR) make development fluid.",
            keySkills: [
              "pnpm hard-linking & disk efficiency",
              "Vite ESM-first dev server and Rollup production builds",
              "Lockfile integrity and audit checks",
            ],
            subTopics: [
              { id: "fe-pkg-pnpm", title: "pnpm Workspace & Speed", status: "recommended" },
              { id: "fe-pkg-vite", title: "Vite HMR & Bundling", status: "recommended" },
              { id: "fe-pkg-npm", title: "npm / yarn", status: "alternative" },
            ],
            resources: [
              { title: "Package Managers Comparison", href: "/docs/package-managers/package-managers-overview", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "fe-stage-3",
        stageNumber: 3,
        title: "Frontend Framework & Full-Stack React",
        description: "Building scalable single-page and server-rendered web applications.",
        nodes: [
          {
            id: "fe-react",
            title: "React 19 & Component Architecture",
            subtitle: "Hooks, custom hooks, memoization, Context, Suspense, Concurrent Mode",
            level: "Intermediate",
            badge: "Must Know",
            category: "core",
            summary: "React is the dominant UI library in the industry. Master component lifecycles, state isolation, effects, and modern hooks.",
            keySkills: [
              "Hooks (`useState`, `useReducer`, `useEffect`, `useCallback`, `useMemo`)",
              "Custom hooks for reusable business logic",
              "React 19 Actions, `useActionState`, `useOptimistic`",
              "Suspense boundaries and streaming UI",
            ],
            subTopics: [
              { id: "fe-react-hooks", title: "Modern Hooks & Custom Hooks", status: "recommended" },
              { id: "fe-react-19", title: "React 19 Actions & Optimistic UI", status: "recommended" },
            ],
            resources: [
              { title: "React 19 Overview & Patterns", href: "/docs/react/react-overview", type: "guide" },
            ],
          },
          {
            id: "fe-nextjs",
            title: "Next.js 15+ App Router",
            subtitle: "Server Components (RSC), Server Actions, Route Handlers, SSR/SSG/ISR",
            level: "Advanced",
            badge: "Recommended",
            category: "architecture",
            summary: "Next.js enables full-stack React applications with zero-bundle-size React Server Components, automated SEO, and server actions.",
            keySkills: [
              "App Router layout hierarchy (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`)",
              "React Server Components (RSC) vs Client Components (`'use client'`)",
              "Server Actions for form submissions and mutations",
              "Static Site Generation (SSG), Incremental Static Regeneration (ISR)",
            ],
            subTopics: [
              { id: "fe-next-rsc", title: "React Server Components", status: "recommended" },
              { id: "fe-next-actions", title: "Server Actions & Mutations", status: "recommended" },
              { id: "fe-next-cache", title: "Data Caching & Revalidation", status: "recommended" },
            ],
            resources: [
              { title: "Next.js Full Guide", href: "/docs/nextjs/nextjs-overview", type: "guide" },
              { title: "Next.js vs Vue (Nuxt 3) Comparison", href: "/vs/nextjs-vs-vue", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "fe-stage-4",
        stageNumber: 4,
        title: "State Management & Data Fetching",
        description: "Server state vs client state, caching, optimistic updates, and offline sync.",
        nodes: [
          {
            id: "fe-data-fetching",
            title: "TanStack Query (React Query) & SWR",
            subtitle: "Server-state caching, background revalidation, query deduplication",
            level: "Intermediate",
            badge: "Recommended",
            category: "core",
            summary: "Stop putting server data in global Redux stores. TanStack Query automatically manages server cache, polling, window focus refetching, and pagination.",
            keySkills: [
              "`useQuery` and `useMutation` hooks with optimistic updates",
              "Query key factories and targeted cache invalidation",
              "Infinite scrolling and cursor pagination",
            ],
            resources: [
              { title: "Client-Server Architecture Guide", href: "/docs/backend/client-server-architecture", type: "guide" },
            ],
          },
          {
            id: "fe-client-state",
            title: "Zustand & Client State",
            subtitle: "Lightweight, un-opinionated store with zero boilerplate",
            level: "Intermediate",
            badge: "Recommended",
            category: "core",
            summary: "For genuine client-only state (modals, active tabs, client preferences), Zustand provides simple, boilerplate-free state management.",
            keySkills: [
              "Atomic state slices with zero Context re-renders",
              "Local storage persistence middleware",
              "TypeScript type inference with Zustand stores",
            ],
            subTopics: [
              { id: "fe-state-zustand", title: "Zustand Store", status: "recommended" },
              { id: "fe-state-redux", title: "Redux Toolkit", status: "alternative" },
            ],
            resources: [
              { title: "React Component Patterns", href: "/docs/react/react-overview", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "fe-stage-5",
        stageNumber: 5,
        title: "Production Performance, Testing & Security",
        description: "Core Web Vitals, Lighthouse audits, unit/e2e testing, and browser security.",
        nodes: [
          {
            id: "fe-perf",
            title: "Web Performance & Core Web Vitals",
            subtitle: "LCP, INP, CLS, code splitting, image optimization, dynamic imports",
            level: "Advanced",
            badge: "Must Know",
            category: "production",
            summary: "High-performance websites convert better and rank higher. Master image formats (AVIF/WebP), font subsetting, and INP optimization.",
            keySkills: [
              "Largest Contentful Paint (LCP) and Interaction to Next Paint (INP)",
              "Cumulative Layout Shift (CLS) prevention",
              "Bundle analysis with dynamic `import()` code splitting",
            ],
            resources: [
              { title: "Blocked by CORS Policy Error Troubleshooting", href: "/errors/web/cors-policy", type: "error" },
            ],
          },
          {
            id: "fe-testing",
            title: "Testing & QA Automation",
            subtitle: "Vitest, React Testing Library, Playwright for End-to-End testing",
            level: "Advanced",
            badge: "Best Practice",
            category: "production",
            summary: "Catch regressions before deployment with automated unit, component, and full browser E2E test suites.",
            keySkills: [
              "Vitest unit tests for pure utility functions",
              "React Testing Library user interaction simulations",
              "Playwright cross-browser E2E testing in CI/CD",
            ],
            resources: [
              { title: "GitHub Actions CI/CD Setup", href: "/docs/github-actions/github-actions-overview", type: "guide" },
            ],
          },
        ],
      },
    ],
  },

  "backend": {
    slug: "backend",
    title: "Backend Developer Roadmap",
    subtitle: "Complete path to architecting high-throughput, secure, distributed backend systems",
    description: "From networking protocols and Linux servers to Node.js/Go, SQL databases, caching, message queues, Docker, and distributed microservices.",
    estimatedTime: "8 - 12 Months",
    badge: "High Demand",
    color: "from-emerald-500 to-teal-600",
    prerequisites: ["Programming fundamentals", "Command-line basics"],
    stages: [
      {
        id: "be-stage-1",
        stageNumber: 1,
        title: "Internet, Networking & Operating Systems",
        description: "Understand the lower layers of the web stack that support every API.",
        nodes: [
          {
            id: "be-networking",
            title: "HTTP/HTTPS, TCP/IP & DNS",
            subtitle: "HTTP/1.1 vs HTTP/2 vs HTTP/3, TLS handshakes, DNS resolution, IP CIDR",
            level: "Beginner",
            badge: "Must Know",
            category: "foundation",
            summary: "Backend engineering starts at the network layer. Master TCP 3-way handshakes, TLS 1.3 encryption, HTTP status codes, and DNS record propagation.",
            keySkills: [
              "HTTP methods (GET, POST, PUT, PATCH, DELETE, OPTIONS)",
              "Status codes (2xx, 3xx, 4xx, 5xx) semantics",
              "DNS record types (A, AAAA, CNAME, TXT, MX) and TTL",
              "TCP flow control vs UDP datagrams",
            ],
            subTopics: [
              { id: "be-net-http", title: "HTTP/1.1, HTTP/2 & HTTP/3 (QUIC)", status: "recommended" },
              { id: "be-net-dns", title: "DNS Architecture & Records", status: "recommended" },
              { id: "be-net-tls", title: "TLS 1.3 & SSL Certificates", status: "recommended" },
            ],
            resources: [
              { title: "Networking Fundamentals for Developers", href: "/docs/networking/networking-overview", type: "guide" },
              { title: "DNS Configuration & Troubleshooting", href: "/docs/networking/dns-guide", type: "guide" },
            ],
          },
          {
            id: "be-linux",
            title: "Linux Server Administration & Shell",
            subtitle: "Processes, file permissions, systemd, SSH, bash scripting, resource monitoring",
            level: "Beginner",
            badge: "Must Know",
            category: "foundation",
            summary: "Almost all backend code runs on Linux. Master file permissions (`chmod`, `chown`), process management (`htop`, `systemd`), and SSH key security.",
            keySkills: [
              "Process monitoring with `ps`, `top`, `htop`, `kill`",
              "Service management with `systemctl` and `journalctl`",
              "Bash scripting for automated maintenance tasks",
              "SSH hardening and firewall rules (`ufw`, `iptables`)",
            ],
            subTopics: [
              { id: "be-linux-perms", title: "Permissions & User Security", status: "recommended" },
              { id: "be-linux-systemd", title: "systemd Background Services", status: "recommended" },
              { id: "be-linux-bash", title: "Shell Scripting Automation", status: "recommended" },
            ],
            resources: [
              { title: "Linux Commands Cheatsheet", href: "/docs/linux/linux-overview", type: "guide" },
              { title: "Linux Disk Space Troubleshooting", href: "/commands/linux/disk-usage", type: "command" },
            ],
          },
        ],
      },
      {
        id: "be-stage-2",
        stageNumber: 2,
        title: "Backend Language & API Frameworks",
        description: "Choose and master a high-performance backend language and framework.",
        nodes: [
          {
            id: "be-nodejs",
            title: "Node.js & TypeScript Backend",
            subtitle: "Event Loop, Streams, Buffers, Worker Threads, Express, NestJS, Fastify",
            level: "Intermediate",
            badge: "Recommended",
            category: "core",
            summary: "Node.js offers an enormous ecosystem with non-blocking I/O. Use TypeScript to build type-safe REST and GraphQL APIs.",
            keySkills: [
              "Asynchronous non-blocking architecture and Event Loop phases",
              "Streams and Buffers for processing massive file uploads without OOM errors",
              "Express / Fastify middleware chaining and error handling",
              "Node.js clustering and worker threads for CPU-heavy tasks",
            ],
            subTopics: [
              { id: "be-lang-node", title: "Node.js / Express / Fastify", status: "recommended" },
              { id: "be-lang-go", title: "Golang (Go) & Gin", status: "alternative" },
              { id: "be-lang-python", title: "Python FastAPI", status: "alternative" },
            ],
            resources: [
              { title: "Node.js Core Architecture Guide", href: "/docs/nodejs/nodejs-overview", type: "guide" },
              { title: "Node.js vs Go Comparison", href: "/vs/nodejs-vs-go", type: "guide" },
              { title: "Fix Node.js EADDRINUSE Port Collision", href: "/errors/node/eaddrinuse", type: "error" },
            ],
          },
          {
            id: "be-api-design",
            title: "RESTful API & GraphQL Architecture",
            subtitle: "Endpoint versioning, pagination, rate limiting, OpenAPI / Swagger",
            level: "Intermediate",
            badge: "Must Know",
            category: "core",
            summary: "Design clean, predictable APIs that scale. Learn cursor vs offset pagination, HTTP headers, idempotent requests, and rate limiting.",
            keySkills: [
              "Idempotency keys for payment and mutating requests",
              "Rate limiting using Token Bucket algorithm in Redis",
              "OpenAPI / Swagger documentation generation",
              "CORS headers and preflight handling",
            ],
            resources: [
              { title: "REST vs GraphQL Comparison", href: "/vs/rest-vs-graphql", type: "guide" },
              { title: "Blocked by CORS Policy Error Fix", href: "/errors/web/cors-policy", type: "error" },
            ],
          },
        ],
      },
      {
        id: "be-stage-3",
        stageNumber: 3,
        title: "Relational & NoSQL Databases",
        description: "Data modeling, indexing, transactions, and object-relational mapping.",
        nodes: [
          {
            id: "be-postgres",
            title: "PostgreSQL & Relational Data Modeling",
            subtitle: "ACID transactions, B-Tree & GIN indexes, EXPLAIN ANALYZE, connection pooling",
            level: "Intermediate",
            badge: "Industry Standard",
            category: "core",
            summary: "PostgreSQL is the gold standard of relational databases. Master schema normalization, foreign keys, complex joins, and query optimization.",
            keySkills: [
              "Schema design with proper foreign keys and constraints",
              "Creating optimal B-Tree and GIN indexes for fast queries",
              "Diagnosing query bottlenecks with `EXPLAIN (ANALYZE, BUFFERS)`",
              "Managing connection pools with PgBouncer to prevent connection exhaustion",
            ],
            subTopics: [
              { id: "be-db-postgres", title: "PostgreSQL (Relational)", status: "recommended" },
              { id: "be-db-mongo", title: "MongoDB (Document NoSQL)", status: "alternative" },
            ],
            resources: [
              { title: "PostgreSQL Comprehensive Guide", href: "/docs/postgresql/postgresql-overview", type: "guide" },
              { title: "Postgres vs MongoDB Comparison", href: "/vs/postgres-vs-mongodb", type: "guide" },
            ],
          },
          {
            id: "be-orm",
            title: "ORMs & Query Builders (Prisma / Drizzle)",
            subtitle: "Type-safe database access, automated migrations, zero-overhead queries",
            level: "Intermediate",
            badge: "Recommended",
            category: "core",
            summary: "Bridge TypeScript and SQL with modern type-safe ORMs. Understand the tradeoffs between Prisma's query engine and Drizzle's SQL-first performance.",
            keySkills: [
              "Automated migration files and schema sync",
              "Preventing N+1 query problems in relational lookups",
              "Raw SQL fallback for analytical queries",
            ],
            resources: [
              { title: "Prisma Guide", href: "/docs/prisma/prisma-overview", type: "guide" },
              { title: "Prisma vs Drizzle ORM Comparison", href: "/vs/prisma-vs-drizzle", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "be-stage-4",
        stageNumber: 4,
        title: "Caching, Queues & Asynchronous Processing",
        description: "Scale read and write throughput with Redis and message brokers.",
        nodes: [
          {
            id: "be-redis",
            title: "Redis In-Memory Caching & Key-Value Store",
            subtitle: "Cache invalidation (Cache-Aside, Write-Through), TTL, Pub/Sub, distributed locks",
            level: "Advanced",
            badge: "Must Know",
            category: "architecture",
            summary: "Reduce database load by caching expensive queries and session tokens in ultra-fast RAM data structures.",
            keySkills: [
              "Cache-Aside pattern and TTL expiration policies",
              "Distributed locking with Redlock for race condition prevention",
              "Redis Hashes, Sets, Sorted Sets, and Streams",
            ],
            resources: [
              { title: "Cookies, Sessions & Storage Guide", href: "/docs/backend/cookies", type: "guide" },
            ],
          },
          {
            id: "be-queues",
            title: "Message Queues & Background Workers",
            subtitle: "BullMQ, RabbitMQ, Apache Kafka, event-driven decoupled systems",
            level: "Advanced",
            badge: "Architecture",
            category: "architecture",
            summary: "Offload slow work (email sending, image processing, PDF generation) to asynchronous background job queues.",
            keySkills: [
              "Producer-Consumer architecture and Dead Letter Queues (DLQ)",
              "Idempotent job processing and exponential backoff retries",
              "Event-driven architecture with RabbitMQ or Kafka topics",
            ],
            resources: [
              { title: "Client-Server Architecture Guide", href: "/docs/backend/client-server-architecture", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "be-stage-5",
        stageNumber: 5,
        title: "Authentication, Security & Container Deployment",
        description: "Protect APIs, manage secrets, and deploy with Docker containers.",
        nodes: [
          {
            id: "be-auth",
            title: "Authentication & Authorization (AuthN & AuthZ)",
            subtitle: "JWTs, OAuth 2.0, OpenID Connect, RBAC, session cookies, bcrypt hashing",
            level: "Intermediate",
            badge: "Security Critical",
            category: "security",
            summary: "Implement secure user authentication with cryptographically signed tokens, refresh token rotation, and Role-Based Access Control (RBAC).",
            keySkills: [
              "HTTP-only, Secure, SameSite cookies for token storage",
              "JWT verification, expiration, and secret key rotation",
              "Password hashing with bcrypt or argon2id",
              "OAuth2 authorization code flow with PKCE",
            ],
            resources: [
              { title: "Authentication vs Authorization Guide", href: "/docs/backend/auth-vs-authz", type: "guide" },
              { title: "JWT & React Authentication Recipe", href: "/recipes/auth/react-nextjs-auth-jwt", type: "recipe" },
            ],
          },
          {
            id: "be-docker",
            title: "Docker Containerization & Production Deployments",
            subtitle: "Multi-stage builds, Alpine images, Docker Compose, Nginx reverse proxy",
            level: "Intermediate",
            badge: "Must Know",
            category: "devops",
            summary: "Package backend applications into immutable containers that run identically in development and production clouds.",
            keySkills: [
              "Multi-stage Dockerfiles for minimal production image sizes",
              "Managing multi-container environments with Docker Compose",
              "Configuring Nginx as a reverse proxy with SSL termination",
            ],
            resources: [
              { title: "Docker Container Run Command Reference", href: "/commands/docker/run", type: "command" },
              { title: "Docker vs Kubernetes Comparison", href: "/vs/docker-vs-kubernetes", type: "guide" },
              { title: "Nginx Reverse Proxy & SSL Setup Recipe", href: "/recipes/devops/nginx-reverse-proxy-ssl", type: "recipe" },
            ],
          },
        ],
      },
    ],
  },

  "devops": {
    slug: "devops",
    title: "DevOps & Cloud Engineer Roadmap",
    subtitle: "End-to-end guide to Infrastructure as Code, CI/CD, Kubernetes, and Cloud Reliability",
    description: "From Linux and networking protocols to Docker, automated GitHub Actions pipelines, Kubernetes orchestration, Terraform IaC, and full-stack observability.",
    estimatedTime: "10 - 14 Months",
    badge: "Enterprise Standard",
    color: "from-purple-500 to-indigo-600",
    prerequisites: ["Linux basics", "Git version control", "Basic scripting"],
    stages: [
      {
        id: "do-stage-1",
        stageNumber: 1,
        title: "Linux Systems, Shell & Networking Protocols",
        description: "Master the operating system foundation and network plumbing.",
        nodes: [
          {
            id: "do-linux",
            title: "Linux Internals & Resource Inspection",
            subtitle: "Systemd, kernel signals, memory swap, disk I/O analysis, permissions",
            level: "Beginner",
            badge: "Must Know",
            category: "foundation",
            summary: "Diagnose CPU throttling, memory leaks, and disk space saturation across production server nodes.",
            keySkills: [
              "System performance analysis (`vmstat`, `iostat`, `dmesg`, `journalctl`)",
              "File system access control lists (ACLs) and sudo security",
              "Storage management: LVM, partitioning, inode exhaustion",
            ],
            resources: [
              { title: "Linux Commands Guide", href: "/docs/linux/linux-overview", type: "guide" },
              { title: "Linux Disk Space Troubleshooting", href: "/commands/linux/disk-usage", type: "command" },
            ],
          },
          {
            id: "do-net",
            title: "DevOps Networking, Firewalls & SSL",
            subtitle: "Subnetting (CIDR), routing tables, iptables/nftables, Let's Encrypt SSL/TLS",
            level: "Intermediate",
            badge: "Must Know",
            category: "foundation",
            summary: "Configure Virtual Private Clouds (VPCs), configure secure bastion hosts, and manage automated SSL/TLS certificate renewal.",
            keySkills: [
              "IP CIDR block subnet calculations for VPCs",
              "Automating ACME SSL certificate renewals with Certbot",
              "Configuring load balancing algorithms (Round Robin, Least Connections)",
            ],
            resources: [
              { title: "Networking for DevOps Guide", href: "/docs/devops-networking/devops-networking-overview", type: "guide" },
              { title: "Nginx Reverse Proxy & SSL Setup", href: "/recipes/devops/nginx-reverse-proxy-ssl", type: "recipe" },
            ],
          },
        ],
      },
      {
        id: "do-stage-2",
        stageNumber: 2,
        title: "Containers & CI/CD Pipeline Automation",
        description: "Containerize services and build automated test/build/deploy pipelines.",
        nodes: [
          {
            id: "do-docker",
            title: "Docker Containerization & Multi-Stage Builds",
            subtitle: "Layer caching, container networking, volumes, rootless execution",
            level: "Intermediate",
            badge: "Must Know",
            category: "core",
            summary: "Build lean, secure container images under 50MB and orchestrate local development with Docker Compose.",
            keySkills: [
              "Multi-stage builds separating build tools from production runtime",
              "Layer cache optimization with `COPY package*.json ./`",
              "Fixing common Docker container crashes and permission bugs",
            ],
            resources: [
              { title: "Docker Run Command Guide", href: "/commands/docker/run", type: "command" },
              { title: "Fix Container Exits Immediately Error", href: "/errors/docker/container-exits-immediately", type: "error" },
              { title: "Fix Cannot Connect to Database in Docker", href: "/errors/docker/cannot-connect-to-database", type: "error" },
            ],
          },
          {
            id: "do-cicd",
            title: "GitHub Actions CI/CD Pipelines",
            subtitle: "Matrix builds, workflow caching, OIDC AWS authentication, release automation",
            level: "Intermediate",
            badge: "Recommended",
            category: "core",
            summary: "Automate code linting, unit testing, Docker image pushing to container registries, and zero-downtime deployment triggers.",
            keySkills: [
              "Building Directed Acyclic Graph (DAG) workflows with `needs:`",
              "Configuring action caches to speed up dependency installation by 80%",
              "Using OpenID Connect (OIDC) for passwordless cloud authentication",
            ],
            resources: [
              { title: "GitHub Actions Workflow Syntax", href: "/docs/github-actions/github-actions-overview", type: "guide" },
              { title: "GitHub Actions Jobs & Runners", href: "/docs/github-actions/github-actions-jobs-runners", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "do-stage-3",
        stageNumber: 3,
        title: "Kubernetes Container Orchestration",
        description: "Scale and manage container clusters across cloud availability zones.",
        nodes: [
          {
            id: "do-k8s",
            title: "Kubernetes (K8s) Cluster Orchestration",
            subtitle: "Pods, Deployments, Services, Ingress Controllers, ConfigMaps, Secrets, HPA",
            level: "Advanced",
            badge: "Enterprise Standard",
            category: "architecture",
            summary: "Orchestrate hundreds of microservice instances with self-healing, rolling updates, and automated Horizontal Pod Autoscaling (HPA).",
            keySkills: [
              "Deployments, ReplicaSets, and rolling update strategies",
              "Service discovery (ClusterIP, NodePort, LoadBalancer)",
              "Ingress routing with NGINX Ingress Controller / Traefik",
              "Resource requests, limits, and liveness/readiness probes",
            ],
            resources: [
              { title: "Kubernetes Guide", href: "/docs/kubernetes/kubernetes-overview", type: "guide" },
              { title: "Docker vs Kubernetes Comparison", href: "/vs/docker-vs-kubernetes", type: "guide" },
            ],
          },
          {
            id: "do-helm",
            title: "Helm Package Manager for Kubernetes",
            subtitle: "Parameterized charts, release management, values.yaml templating",
            level: "Advanced",
            badge: "Recommended",
            category: "architecture",
            summary: "Package complex multi-manifest Kubernetes deployments into versioned, parameterized Helm charts with automated rollback capabilities.",
            keySkills: [
              "Writing reusable Helm templates with Go template syntax",
              "Managing environment overrides (`values.dev.yaml`, `values.prod.yaml`)",
              "Automating chart releases and dependencies",
            ],
            resources: [
              { title: "Kubernetes Architecture Overview", href: "/docs/kubernetes/kubernetes-overview", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "do-stage-4",
        stageNumber: 4,
        title: "Infrastructure as Code (IaC) & Cloud Architecture",
        description: "Declare, version, and provision cloud resources reproducibly.",
        nodes: [
          {
            id: "do-terraform",
            title: "Terraform & OpenTofu (IaC)",
            subtitle: "HCL syntax, state locking in S3/DynamoDB, modules, plan vs apply",
            level: "Advanced",
            badge: "Must Know",
            category: "devops",
            summary: "Provision VPCs, managed databases (RDS), Kubernetes clusters (EKS/GKE), and DNS zones with declarative, version-controlled code.",
            keySkills: [
              "Remote state backends with S3 bucket encryption and DynamoDB table locking",
              "Writing reusable Terraform modules with input variables and outputs",
              "Safely inspecting execution plans with `terraform plan` before `apply`",
            ],
            resources: [
              { title: "Cloudflare Origin SSL Setup Recipe", href: "/recipes/devops/cloudflare-origin-ssl-setup", type: "recipe" },
            ],
          },
          {
            id: "do-observability",
            title: "Observability, Monitoring & Log Aggregation",
            subtitle: "Prometheus metrics, Grafana dashboards, OpenTelemetry distributed tracing, Loki",
            level: "Advanced",
            badge: "Production Standard",
            category: "production",
            summary: "Gain real-time visibility into system health, query latency percentiles (p95, p99), error rates, and cluster resource saturation.",
            keySkills: [
              "Setting up Prometheus scraping targets and custom PromQL alert rules",
              "Building informative Grafana operational dashboards",
              "Distributed tracing across microservices with OpenTelemetry",
            ],
            resources: [
              { title: "Linux Process & Resource Inspection", href: "/commands/linux/disk-usage", type: "command" },
            ],
          },
        ],
      },
    ],
  },

  "fullstack": {
    slug: "fullstack",
    title: "Full Stack Developer Roadmap",
    subtitle: "Master the complete web engineering spectrum from browser UI to database architecture",
    description: "Connect React/Next.js client experiences with Node.js/Go APIs, relational PostgreSQL databases, container deployments, and edge CDN performance.",
    estimatedTime: "10 - 14 Months",
    badge: "Comprehensive",
    color: "from-cyan-500 to-blue-600",
    prerequisites: ["HTML, CSS, JavaScript fundamentals"],
    stages: [
      {
        id: "fs-stage-1",
        stageNumber: 1,
        title: "Modern Web UI & Client Engineering",
        description: "Responsive styling, component architecture, and modern TypeScript.",
        nodes: [
          {
            id: "fs-fe-core",
            title: "React 19 & Next.js App Router",
            subtitle: "Server Components, Server Actions, Tailwind CSS, TypeScript",
            level: "Intermediate",
            badge: "Must Know",
            category: "foundation",
            summary: "Build ultra-fast, search-engine-optimized user interfaces with hybrid client-server rendering.",
            keySkills: [
              "React Server Components & streaming UI",
              "Tailwind CSS responsive design system",
              "Strict TypeScript types across client & server",
            ],
            resources: [
              { title: "React Overview", href: "/docs/react/react-overview", type: "guide" },
              { title: "Next.js App Router Guide", href: "/docs/nextjs/nextjs-overview", type: "guide" },
            ],
          },
        ],
      },
      {
        id: "fs-stage-2",
        stageNumber: 2,
        title: "Backend APIs & Database Architecture",
        description: "Data modeling, migrations, REST/GraphQL APIs, and authentication.",
        nodes: [
          {
            id: "fs-be-db",
            title: "PostgreSQL, Prisma ORM & Authentication",
            subtitle: "Schema relations, migrations, JWT & session auth, rate limiting",
            level: "Intermediate",
            badge: "Must Know",
            category: "core",
            summary: "Store and serve business data securely with PostgreSQL, Prisma ORM, and battle-tested authentication flows.",
            keySkills: [
              "Relational data modeling and indexing",
              "Type-safe queries with Prisma / Drizzle",
              "Secure authentication cookies and role-based permissions",
            ],
            resources: [
              { title: "PostgreSQL Guide", href: "/docs/postgresql/postgresql-overview", type: "guide" },
              { title: "Auth vs Authorization", href: "/docs/backend/auth-vs-authz", type: "guide" },
              { title: "Next.js JWT Authentication Recipe", href: "/recipes/auth/react-nextjs-auth-jwt", type: "recipe" },
            ],
          },
        ],
      },
      {
        id: "fs-stage-3",
        stageNumber: 3,
        title: "Containerization & Production Deployment",
        description: "Docker packaging, CI/CD pipelines, and cloud hosting.",
        nodes: [
          {
            id: "fs-deploy",
            title: "Docker, Nginx & GitHub Actions CI/CD",
            subtitle: "Containerized environments, automated testing, zero-downtime deploys",
            level: "Advanced",
            badge: "Recommended",
            category: "production",
            summary: "Automate tests and ship full-stack web applications with Docker and GitHub Actions.",
            keySkills: [
              "Docker Compose for local development with database",
              "GitHub Actions automated build and test pipelines",
              "Cloud deployment to VPS or serverless platforms",
            ],
            resources: [
              { title: "Docker Command Reference", href: "/commands/docker/run", type: "command" },
              { title: "Nginx SSL Recipe", href: "/recipes/devops/nginx-reverse-proxy-ssl", type: "recipe" },
            ],
          },
        ],
      },
    ],
  },
};
