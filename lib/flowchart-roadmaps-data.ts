export interface FlowchartTopic {
  id: string;
  name: string;
  badgeType?: "recommended" | "alternative" | "order-not-strict" | "none";
  docsUrl: string;
  description: string;
  keyPoints?: string[];
}

export interface FlowchartGroup {
  id: string;
  title?: string;
  position: "left" | "right" | "center";
  topics: FlowchartTopic[];
}

export interface FlowchartMilestone {
  id: string;
  title: string;
  docsUrl?: string;
  description: string;
  note?: string;
  projectIdea?: {
    text: string;
    actionLabel: string;
    actionUrl: string;
  };
  leftBranch?: {
    connectorType?: "dotted" | "solid";
    groups: FlowchartGroup[];
  };
  rightBranch?: {
    connectorType?: "dotted" | "solid";
    groups: FlowchartGroup[];
  };
}

export interface FlowchartRoadmap {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  relatedRoadmaps: Array<{ name: string; slug: string }>;
  milestones: FlowchartMilestone[];
}

export const flowchartRoadmaps: Record<string, FlowchartRoadmap> = {
  "frontend": {
    slug: "frontend",
    title: "Frontend Developer Roadmap",
    subtitle: "Community-driven visual flowchart to becoming a modern frontend developer in 2026",
    description: "Step by step guide to becoming a modern frontend developer. Click on any topic to explore its in-depth OpenDevDocs documentation guide, commands, and code recipes.",
    category: "Frontend",
    relatedRoadmaps: [
      { name: "JavaScript Roadmap", slug: "frontend" },
      { name: "React & Next.js", slug: "frontend" },
      { name: "Backend Roadmap", slug: "backend" },
      { name: "DevOps Roadmap", slug: "devops" },
    ],
    milestones: [
      {
        id: "fe-internet",
        title: "Internet & Web Fundamentals",
        docsUrl: "/docs/networking/networking-overview",
        description: "How computers communicate across the globe, how data packets travel, and how web browsers convert bytes into interactive interfaces.",
        note: "Every web developer must understand the foundational protocols that govern network traffic.",
        rightBranch: {
          connectorType: "dotted",
          groups: [
            {
              id: "fe-internet-topics",
              position: "right",
              topics: [
                {
                  id: "how-internet-works",
                  name: "How does the Internet work?",
                  badgeType: "recommended",
                  docsUrl: "/docs/networking/networking-overview",
                  description: "IP routing, packets, ISP gateways, and transatlantic cables.",
                  keyPoints: ["TCP/IP stack", "Packet switching", "ISP routing and latency"],
                },
                {
                  id: "what-is-http",
                  name: "What is HTTP / HTTPS?",
                  badgeType: "recommended",
                  docsUrl: "/docs/networking/networking-overview",
                  description: "Request/response cycles, HTTP verbs, status codes, and TLS handshakes.",
                  keyPoints: ["HTTP/1.1 vs HTTP/2 vs HTTP/3", "TLS encryption", "Request headers"],
                },
                {
                  id: "domain-names",
                  name: "Domain Names & DNS",
                  badgeType: "recommended",
                  docsUrl: "/docs/networking/dns-guide",
                  description: "How domain names map to IP addresses through authoritative nameservers.",
                  keyPoints: ["A, AAAA, CNAME records", "TTL and propagation", "DNS resolvers"],
                },
                {
                  id: "browser-rendering",
                  name: "Browsers & Rendering Engines",
                  badgeType: "recommended",
                  docsUrl: "/docs/html/index",
                  description: "Parsing HTML/CSS, building the DOM tree, layout, paint, and composite steps.",
                  keyPoints: ["Critical Rendering Path", "DOM & CSSOM", "Repaints & Reflows"],
                },
              ],
            },
          ],
        },
      },
      {
        id: "fe-html-css-js",
        title: "HTML, CSS & JavaScript Core",
        docsUrl: "/docs/javascript/javascript-overview",
        description: "The core trinity of client-side web development that powers every browser interface.",
        projectIdea: {
          text: "HTML, CSS and JavaScript are the backbone of web development. Make sure to practice by building real interactive projects.",
          actionLabel: "Explore JavaScript Docs",
          actionUrl: "/docs/javascript/javascript-overview",
        },
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "fe-html-topics",
              title: "HTML5 Essentials",
              position: "left",
              topics: [
                {
                  id: "html-semantics",
                  name: "Semantic HTML Elements",
                  badgeType: "recommended",
                  docsUrl: "/docs/html/semantic-elements",
                  description: "Structuring documents with meaningful tags (<article>, <main>, <nav>, <header>).",
                  keyPoints: ["Accessibility (a11y)", "SEO heading hierarchy", "Form controls"],
                },
                {
                  id: "html-forms",
                  name: "Forms & Native Validations",
                  badgeType: "recommended",
                  docsUrl: "/docs/html/index",
                  description: "Form inputs, required constraints, pattern matching, and submission events.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "fe-css-topics",
              title: "Modern CSS",
              position: "right",
              topics: [
                {
                  id: "css-flexbox-grid",
                  name: "Flexbox & CSS Grid",
                  badgeType: "recommended",
                  docsUrl: "/docs/css/layout-cheatsheet",
                  description: "Master two-dimensional layouts, alignment, auto-fill, and responsive grids.",
                  keyPoints: ["Flex container properties", "Grid template areas", "Auto-fit vs auto-fill"],
                },
                {
                  id: "css-variables",
                  name: "CSS Variables & Theming",
                  badgeType: "recommended",
                  docsUrl: "/docs/css/layout-cheatsheet",
                  description: "Custom properties for dynamic theme switches and token systems.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "fe-vcs",
        title: "Version Control & GitHub",
        docsUrl: "/docs/git/git-overview",
        description: "Track code revisions, collaborate with teams, and deploy through automated workflows.",
        leftBranch: {
          connectorType: "dotted",
          groups: [
            {
              id: "fe-git-clients",
              title: "Version Control",
              position: "left",
              topics: [
                {
                  id: "git-cli",
                  name: "Git CLI Commands",
                  badgeType: "recommended",
                  docsUrl: "/commands/git/git-commands",
                  description: "Branching, staging, committing, interactive rebasing, and merge resolution.",
                  keyPoints: ["git rebase -i", "git cherry-pick", "git stash and pop"],
                },
              ],
            },
            {
              id: "fe-vcs-hosts",
              title: "VCS Hosting",
              position: "left",
              topics: [
                {
                  id: "github",
                  name: "GitHub",
                  badgeType: "recommended",
                  docsUrl: "/docs/github/github-overview",
                  description: "Pull requests, code reviews, branch protections, and issue management.",
                },
                {
                  id: "gitlab",
                  name: "GitLab",
                  badgeType: "alternative",
                  docsUrl: "/docs/git/git-overview",
                  description: "Self-hosted Git repositories and integrated DevOps pipelines.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "dotted",
          groups: [
            {
              id: "fe-package-managers",
              title: "Package Managers",
              position: "right",
              topics: [
                {
                  id: "pnpm",
                  name: "pnpm (Fast & Disk Efficient)",
                  badgeType: "recommended",
                  docsUrl: "/docs/package-managers/package-managers-overview",
                  description: "Hard-linked, isolated node_modules with near-instant install speeds.",
                },
                {
                  id: "npm",
                  name: "npm",
                  badgeType: "alternative",
                  docsUrl: "/docs/package-managers/package-managers-overview",
                  description: "The default package manager bundled with Node.js.",
                },
                {
                  id: "bun-pkg",
                  name: "Bun",
                  badgeType: "alternative",
                  docsUrl: "/docs/package-managers/package-managers-overview",
                  description: "All-in-one JavaScript runtime, bundler, and package manager.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "fe-frameworks",
        title: "Learn a Modern Framework",
        docsUrl: "/docs/react/react-overview",
        description: "Component-driven user interface architectures, reactive state management, and ecosystem tools.",
        projectIdea: {
          text: "At this stage, you are ready to construct complex multi-page applications with declarative state and component trees.",
          actionLabel: "Compare Next.js vs Vue",
          actionUrl: "/vs/nextjs-vs-vue",
        },
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "fe-framework-options",
              position: "left",
              topics: [
                {
                  id: "react-19",
                  name: "React (v19)",
                  badgeType: "recommended",
                  docsUrl: "/docs/react/react-overview",
                  description: "The industry standard UI library. Master hooks, Suspense, and component architecture.",
                  keyPoints: ["Hooks & custom hooks", "Actions & optimistic UI", "Context & memoization"],
                },
                {
                  id: "vue-js",
                  name: "Vue.js (v3)",
                  badgeType: "alternative",
                  docsUrl: "/vs/nextjs-vs-vue",
                  description: "Progressive JavaScript framework with intuitive Composition API and built-in reactivity.",
                },
                {
                  id: "svelte",
                  name: "Svelte / SvelteKit",
                  badgeType: "alternative",
                  docsUrl: "/docs/javascript/javascript-overview",
                  description: "Compile-time framework with zero virtual DOM overhead and clean syntax.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "fe-css-frameworks",
              title: "CSS Frameworks",
              position: "right",
              topics: [
                {
                  id: "tailwind-css",
                  name: "Tailwind CSS",
                  badgeType: "recommended",
                  docsUrl: "/docs/tailwindcss/tailwindcss-overview",
                  description: "Utility-first CSS framework for rapid UI styling directly in markup.",
                  keyPoints: ["JIT compiler", "Arbitrary variants", "Design tokens and theme extensions"],
                },
                {
                  id: "css-modules",
                  name: "CSS Modules",
                  badgeType: "alternative",
                  docsUrl: "/docs/css/layout-cheatsheet",
                  description: "Scoped CSS classes preventing style leaks across component boundaries.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "fe-fullstack-react",
        title: "Full-Stack React & Next.js",
        docsUrl: "/docs/nextjs/nextjs-overview",
        description: "Server-side rendering, React Server Components (RSC), Server Actions, and API routes.",
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "fe-nextjs-features",
              position: "right",
              topics: [
                {
                  id: "nextjs-app-router",
                  name: "Next.js App Router (v15+)",
                  badgeType: "recommended",
                  docsUrl: "/docs/nextjs/nextjs-overview",
                  description: "File-system routing with layouts, templates, error boundaries, and loading states.",
                  keyPoints: ["React Server Components (RSC)", "Server Actions", "Streaming with Suspense"],
                },
                {
                  id: "typescript-advanced",
                  name: "TypeScript Integration",
                  badgeType: "recommended",
                  docsUrl: "/docs/typescript/typescript-overview",
                  description: "Generics, Discriminated Unions, strict type checking, and schema validation.",
                },
              ],
            },
          ],
        },
        leftBranch: {
          connectorType: "dotted",
          groups: [
            {
              id: "fe-auth-security",
              position: "left",
              topics: [
                {
                  id: "auth-jwt",
                  name: "JWT & Session Auth",
                  badgeType: "recommended",
                  docsUrl: "/recipes/auth/react-nextjs-auth-jwt",
                  description: "Secure session cookies, token refresh rotation, and middleware guards.",
                },
                {
                  id: "cors-security",
                  name: "CORS & Browser Security",
                  badgeType: "recommended",
                  docsUrl: "/errors/web/cors-policy",
                  description: "Cross-Origin Resource Sharing, CSP headers, and XSS prevention.",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  "backend": {
    slug: "backend",
    title: "Backend Developer Roadmap",
    subtitle: "Community-driven visual flowchart to becoming a production backend engineer in 2026",
    description: "Step by step path to mastering server architectures, databases, REST/GraphQL APIs, caching, containerization, and distributed systems. Click any topic to open its guide.",
    category: "Backend",
    relatedRoadmaps: [
      { name: "Frontend Roadmap", slug: "frontend" },
      { name: "DevOps Roadmap", slug: "devops" },
      { name: "Full Stack Roadmap", slug: "fullstack" },
    ],
    milestones: [
      {
        id: "be-os-net",
        title: "Linux & Networking Protocols",
        docsUrl: "/docs/linux/linux-overview",
        description: "Operating system primitives, memory processes, file permissions, and TCP/IP networking.",
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-linux-skills",
              title: "Linux Server Administration",
              position: "left",
              topics: [
                {
                  id: "linux-cli",
                  name: "Linux Shell & Permissions",
                  badgeType: "recommended",
                  docsUrl: "/docs/linux/linux-overview",
                  description: "chmod, chown, process inspection (top, htop), systemd unit files.",
                  keyPoints: ["systemctl service management", "Resource inspection (df, du, free)", "SSH key configuration"],
                },
                {
                  id: "disk-inspection",
                  name: "Disk & Memory Diagnosis",
                  badgeType: "recommended",
                  docsUrl: "/commands/linux/disk-usage",
                  description: "Inspecting inode exhaustion, log rotations, and memory saturation.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "dotted",
          groups: [
            {
              id: "be-net-protocols",
              title: "Networking & Protocols",
              position: "right",
              topics: [
                {
                  id: "http-dns",
                  name: "HTTP/2, HTTP/3 & DNS",
                  badgeType: "recommended",
                  docsUrl: "/docs/networking/networking-overview",
                  description: "Multiplexing, stream prioritization, DNS lookup pipelines, and TLS handshakes.",
                },
                {
                  id: "dns-records",
                  name: "DNS Records & Propagation",
                  badgeType: "recommended",
                  docsUrl: "/docs/networking/dns-guide",
                  description: "Authoritative nameservers, CNAME, A records, and TTL caching.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "be-languages",
        title: "Backend Language & Runtime",
        docsUrl: "/docs/nodejs/nodejs-overview",
        description: "Build robust, asynchronous, high-concurrency server applications.",
        projectIdea: {
          text: "Select a core backend programming language. Node.js with TypeScript or Go are the top industry choices.",
          actionLabel: "Compare Node.js vs Go",
          actionUrl: "/vs/nodejs-vs-go",
        },
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-node-stack",
              title: "Node.js Ecosystem",
              position: "left",
              topics: [
                {
                  id: "nodejs-runtime",
                  name: "Node.js (Event Loop & Streams)",
                  badgeType: "recommended",
                  docsUrl: "/docs/nodejs/nodejs-overview",
                  description: "Non-blocking I/O, Worker Threads, Buffers, and stream pipelines.",
                  keyPoints: ["Event Loop phases", "Stream backpressure", "Cluster module"],
                },
                {
                  id: "express-fastify",
                  name: "Express.js & Fastify",
                  badgeType: "recommended",
                  docsUrl: "/docs/express/express-overview",
                  description: "Middleware pipelines, JSON body parsers, and route controllers.",
                },
                {
                  id: "node-eaddrinuse",
                  name: "Fix EADDRINUSE Port Errors",
                  badgeType: "order-not-strict",
                  docsUrl: "/errors/node/eaddrinuse",
                  description: "Troubleshoot dangling background process port locks.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-go-stack",
              title: "Golang (Go)",
              position: "right",
              topics: [
                {
                  id: "golang-gin",
                  name: "Go & Gin Web Framework",
                  badgeType: "alternative",
                  docsUrl: "/vs/nodejs-vs-go",
                  description: "Goroutines, channels, lightweight memory footprint, and compiled binaries.",
                  keyPoints: ["Goroutines concurrency", "Static binary deployment", "Sub-millisecond latency"],
                },
                {
                  id: "go-vps-deploy",
                  name: "Deploy Go App to VPS",
                  badgeType: "alternative",
                  docsUrl: "/recipes/devops/deploy-go-gin-vps",
                  description: "Production systemd service setup for Go binaries behind Nginx.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "be-databases",
        title: "Relational Databases & ORMs",
        docsUrl: "/docs/postgresql/postgresql-overview",
        description: "Schema design, relational indexes, ACID transactions, and type-safe query builders.",
        projectIdea: {
          text: "PostgreSQL is the gold standard for relational data. Learn how it compares to MongoDB and how to query it with Prisma or Drizzle.",
          actionLabel: "Compare Postgres vs MongoDB",
          actionUrl: "/vs/postgres-vs-mongodb",
        },
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-postgres-topics",
              title: "PostgreSQL",
              position: "left",
              topics: [
                {
                  id: "postgres-core",
                  name: "PostgreSQL (Relational)",
                  badgeType: "recommended",
                  docsUrl: "/docs/postgresql/postgresql-overview",
                  description: "B-Tree indexes, GIN, foreign keys, EXPLAIN ANALYZE, and ACID isolation.",
                  keyPoints: ["Index optimization", "Connection pooling", "Table normalization"],
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-orm-topics",
              title: "ORMs & Query Builders",
              position: "right",
              topics: [
                {
                  id: "prisma-orm",
                  name: "Prisma ORM",
                  badgeType: "recommended",
                  docsUrl: "/docs/prisma/prisma-overview",
                  description: "Type-safe declarative database client and schema migration generator.",
                },
                {
                  id: "prisma-drizzle-compare",
                  name: "Prisma vs Drizzle ORM",
                  badgeType: "alternative",
                  docsUrl: "/vs/prisma-vs-drizzle",
                  description: "Full breakdown of schema engines vs zero-overhead SQL-first ORMs.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "be-caching-queues",
        title: "Caching, Auth & API Architecture",
        docsUrl: "/docs/backend/auth-vs-authz",
        description: "In-memory caching with Redis, JWT authentication, and REST vs GraphQL architectures.",
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-auth-topics",
              title: "Authentication & Security",
              position: "left",
              topics: [
                {
                  id: "auth-authz",
                  name: "AuthN vs AuthZ (RBAC)",
                  badgeType: "recommended",
                  docsUrl: "/docs/backend/auth-vs-authz",
                  description: "Role-Based Access Control, token verification, and password hashing.",
                  keyPoints: ["JWT signature verification", "Refresh token rotation", "Bcrypt hashing"],
                },
                {
                  id: "cookies-sessions",
                  name: "Cookies, Sessions & Storage",
                  badgeType: "recommended",
                  docsUrl: "/docs/backend/cookies",
                  description: "HttpOnly, SameSite, Secure flags, and Redis session stores.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-api-arch",
              title: "API Architecture",
              position: "right",
              topics: [
                {
                  id: "rest-graphql-compare",
                  name: "REST vs GraphQL",
                  badgeType: "recommended",
                  docsUrl: "/vs/rest-vs-graphql",
                  description: "Compare HTTP endpoint schemas, payload sizes, and caching strategies.",
                },
                {
                  id: "client-server",
                  name: "Client-Server Architecture",
                  badgeType: "recommended",
                  docsUrl: "/docs/backend/client-server-architecture",
                  description: "Stateless API tiers, gateway proxies, and load balancing patterns.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "be-deployment",
        title: "Docker Containerization & Nginx",
        docsUrl: "/commands/docker/run",
        description: "Package backend services into immutable containers and expose them behind reverse proxies.",
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-docker-topics",
              title: "Docker Containers",
              position: "left",
              topics: [
                {
                  id: "docker-run-guide",
                  name: "Docker Container CLI",
                  badgeType: "recommended",
                  docsUrl: "/commands/docker/run",
                  description: "Port binding, volumes, restart policies, and environment variables.",
                },
                {
                  id: "docker-exit-fix",
                  name: "Fix Container Exits Immediately",
                  badgeType: "order-not-strict",
                  docsUrl: "/errors/docker/container-exits-immediately",
                  description: "Diagnose foreground PID 1 process exits and ENTRYPOINT bugs.",
                },
                {
                  id: "docker-db-fix",
                  name: "Fix DB Connection in Docker",
                  badgeType: "order-not-strict",
                  docsUrl: "/errors/docker/cannot-connect-to-database",
                  description: "Bridge host.docker.internal vs Docker compose network routing.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "be-nginx-topics",
              title: "Web Server & Reverse Proxy",
              position: "right",
              topics: [
                {
                  id: "nginx-ssl-recipe",
                  name: "Nginx SSL & Reverse Proxy",
                  badgeType: "recommended",
                  docsUrl: "/recipes/devops/nginx-reverse-proxy-ssl",
                  description: "Let's Encrypt automated Certbot SSL and upstream proxy pass configuration.",
                },
                {
                  id: "docker-k8s-compare",
                  name: "Docker vs Kubernetes",
                  badgeType: "recommended",
                  docsUrl: "/vs/docker-vs-kubernetes",
                  description: "Single-host containers vs multi-node cluster orchestration.",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  "devops": {
    slug: "devops",
    title: "DevOps & Cloud Engineer Roadmap",
    subtitle: "Community-driven visual flowchart to Infrastructure as Code, CI/CD, Kubernetes & Observability",
    description: "End-to-end roadmap covering Linux systems, cloud networks, Docker, GitHub Actions, Kubernetes orchestration, and Terraform. Click on any box to open its guide.",
    category: "DevOps",
    relatedRoadmaps: [
      { name: "Backend Roadmap", slug: "backend" },
      { name: "Frontend Roadmap", slug: "frontend" },
      { name: "Full Stack Roadmap", slug: "fullstack" },
    ],
    milestones: [
      {
        id: "do-os-net",
        title: "Linux & Cloud Networking",
        docsUrl: "/docs/devops-networking/devops-networking-overview",
        description: "Operating system internals, systemd, kernel limits, CIDR subnetting, and firewalls.",
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "do-linux-os",
              title: "Linux Administration",
              position: "left",
              topics: [
                {
                  id: "do-linux-cmd",
                  name: "Linux Systems & CLI",
                  badgeType: "recommended",
                  docsUrl: "/docs/linux/linux-overview",
                  description: "Kernel signals, memory swap management, and user permissions.",
                },
                {
                  id: "do-disk-cleanup",
                  name: "Linux Disk Usage & Cleanup",
                  badgeType: "recommended",
                  docsUrl: "/commands/linux/disk-usage",
                  description: "Find massive log files, inspect inode exhaustion, and clear cache.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "dotted",
          groups: [
            {
              id: "do-net-security",
              title: "Networking & Security",
              position: "right",
              topics: [
                {
                  id: "do-net-overview",
                  name: "Networking for DevOps",
                  badgeType: "recommended",
                  docsUrl: "/docs/devops-networking/devops-networking-overview",
                  description: "VPCs, Subnetting (CIDR), iptables, NAT gateways, and load balancers.",
                },
                {
                  id: "do-cf-ssl",
                  name: "Cloudflare Origin SSL Setup",
                  badgeType: "recommended",
                  docsUrl: "/recipes/devops/cloudflare-origin-ssl-setup",
                  description: "Configure Full (Strict) SSL with Origin CA certificates.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "do-containers-cicd",
        title: "Containers & CI/CD Pipelines",
        docsUrl: "/docs/github-actions/github-actions-overview",
        description: "Containerize microservices with Docker and build automated GitHub Actions pipelines.",
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "do-docker-stack",
              title: "Docker Containers",
              position: "left",
              topics: [
                {
                  id: "do-docker-run",
                  name: "Docker Container Runtime",
                  badgeType: "recommended",
                  docsUrl: "/commands/docker/run",
                  description: "Multi-stage builds, layer caching, and rootless security.",
                },
                {
                  id: "do-docker-prune",
                  name: "Docker System Prune",
                  badgeType: "recommended",
                  docsUrl: "/commands/docker/system-prune",
                  description: "Reclaim gigabytes of dangling images, unused volumes, and build cache.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "do-cicd-stack",
              title: "CI / CD Tools",
              position: "right",
              topics: [
                {
                  id: "do-gha-overview",
                  name: "GitHub Actions Overview",
                  badgeType: "recommended",
                  docsUrl: "/docs/github-actions/github-actions-overview",
                  description: "Triggers, environments, secrets, matrix testing, and deployments.",
                  keyPoints: ["Workflow DAGs", "Secret masking", "OIDC Cloud auth"],
                },
                {
                  id: "do-gha-runners",
                  name: "GitHub Actions Runners & Jobs",
                  badgeType: "recommended",
                  docsUrl: "/docs/github-actions/github-actions-jobs-runners",
                  description: "Self-hosted runners, concurrency controls, and artifact caching.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "do-k8s-iac",
        title: "Kubernetes & Infrastructure as Code",
        docsUrl: "/docs/kubernetes/kubernetes-overview",
        description: "Cluster orchestration, declarative YAML manifests, Helm charts, and Terraform IaC.",
        projectIdea: {
          text: "Kubernetes manages container lifecycle at scale. Understand how it compares to standalone Docker.",
          actionLabel: "Compare Docker vs Kubernetes",
          actionUrl: "/vs/docker-vs-kubernetes",
        },
        leftBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "do-k8s-topics",
              title: "Container Orchestration",
              position: "left",
              topics: [
                {
                  id: "k8s-overview",
                  name: "Kubernetes (K8s)",
                  badgeType: "recommended",
                  docsUrl: "/docs/kubernetes/kubernetes-overview",
                  description: "Pods, Deployments, Services, Ingress, ConfigMaps, and HPA autoscaling.",
                  keyPoints: ["Declarative reconciliation", "Rolling updates", "Liveness & readiness probes"],
                },
                {
                  id: "k8s-docker-compare",
                  name: "Docker vs Kubernetes",
                  badgeType: "recommended",
                  docsUrl: "/vs/docker-vs-kubernetes",
                  description: "Detailed architecture tradeoffs and when to adopt Kubernetes.",
                },
              ],
            },
          ],
        },
        rightBranch: {
          connectorType: "solid",
          groups: [
            {
              id: "do-iac-topics",
              title: "Provisioning & Web Servers",
              position: "right",
              topics: [
                {
                  id: "nginx-proxy-guide",
                  name: "Nginx Reverse Proxy & SSL",
                  badgeType: "recommended",
                  docsUrl: "/recipes/devops/nginx-reverse-proxy-ssl",
                  description: "Reverse proxying microservices with TLS termination and gzip compression.",
                },
                {
                  id: "go-deploy-guide",
                  name: "VPS Service Deployment",
                  badgeType: "alternative",
                  docsUrl: "/recipes/devops/deploy-go-gin-vps",
                  description: "Systemd daemon management and production environment isolation.",
                },
              ],
            },
          ],
        },
      },
    ],
  },
};
