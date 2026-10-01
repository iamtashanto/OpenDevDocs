export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  href: string;
  topics: string[];
}

export interface LearningPathItem {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Full Spectrum";
  duration: string;
  description: string;
  href: string;
  steps: string[];
  badgeColor: string;
}

export interface PopularTechItem {
  name: string;
  category: string;
  icon: string;
  href: string;
  description: string;
}

export interface PopularCommandItem {
  title: string;
  tool: string;
  command: string;
  description: string;
  href: string;
}

export interface CommonErrorItem {
  title: string;
  category: string;
  cause: string;
  href: string;
  severity: "High" | "Medium" | "Common";
}

export interface RecipeItem {
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeToRead: string;
  description: string;
  href: string;
}

export interface DeveloperToolItem {
  name: string;
  type: string;
  description: string;
  href: string;
  icon: string;
}

export interface RecentDocItem {
  title: string;
  section: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Production";
  lastVerified: string;
  href: string;
}

export const homepageCategories: CategoryItem[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "🎨",
    description: "Modern web UI architecture, frameworks, and responsive design systems.",
    href: "/docs",
    topics: ["React", "Next.js", "TypeScript", "Tailwind CSS", "State Management"],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "⚙️",
    description: "Server architectures, RESTful APIs, authentication, and microservices.",
    href: "/docs",
    topics: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"],
  },
  {
    id: "programming",
    name: "Programming",
    icon: "💻",
    description: "Core language syntax, design patterns, algorithms, and idiomatic idioms.",
    href: "/docs",
    topics: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
  },
  {
    id: "database",
    name: "Database",
    icon: "🗄️",
    description: "Relational schemas, NoSQL document stores, caching, and ORM patterns.",
    href: "/docs",
    topics: ["PostgreSQL", "Redis", "MongoDB", "Prisma", "Indexing"],
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "🚀",
    description: "Containerization, CI/CD deployment pipelines, infrastructure, and automation.",
    href: "/docs",
    topics: ["Docker", "GitHub Actions", "CI/CD", "Nginx", "PM2"],
  },
  {
    id: "linux",
    name: "Linux",
    icon: "🐧",
    description: "Command-line mastery, file permissions, shell scripting, and system administration.",
    href: "/commands",
    topics: ["CLI Commands", "Bash", "Systemd", "Permissions", "SSH"],
  },
  {
    id: "networking",
    name: "Networking",
    icon: "🌐",
    description: "HTTP protocols, SSL/TLS certificates, DNS records, and reverse proxies.",
    href: "/docs",
    topics: ["HTTP/3", "WebSockets", "SSL/TLS", "DNS", "CORS"],
  },
  {
    id: "git",
    name: "Git & GitHub",
    icon: "🐙",
    description: "Version control workflows, interactive rebasing, merge conflicts, and PRs.",
    href: "/commands",
    topics: ["Branching", "Rebase", "Merge Conflicts", "Workflows", "Stash"],
  },
  {
    id: "tools",
    name: "Developer Tools",
    icon: "🛠️",
    description: "Code editors, terminal setups, API clients, and developer productivity tools.",
    href: "/tools",
    topics: ["VS Code", "Zsh & Starship", "Bruno / Postman", "Docker Desktop"],
  },
];

export const homepageLearningPaths: LearningPathItem[] = [
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    level: "Beginner",
    duration: "6 Modules",
    description: "Master modern browser architecture from HTML/CSS foundations to React and Next.js App Router.",
    href: "/roadmaps",
    steps: ["Web Fundamentals", "JavaScript Deep Dive", "TypeScript", "React & Hooks", "Next.js", "Performance & SEO"],
    badgeColor: "brand",
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    level: "Intermediate",
    duration: "7 Modules",
    description: "Build robust, scalable APIs, handle authentication, manage databases, and write production services.",
    href: "/roadmaps",
    steps: ["Server Architecture", "Node / Python", "REST & GraphQL", "PostgreSQL", "Caching with Redis", "Auth & Security"],
    badgeColor: "success",
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Developer",
    level: "Full Spectrum",
    duration: "8 Modules",
    description: "Connect frontend interfaces with backend systems, full-stack frameworks, database migrations, and CI/CD.",
    href: "/roadmaps",
    steps: ["Frontend Architecture", "Backend APIs", "Full Stack Next.js", "Database Design", "Auth & State", "Deployment"],
    badgeColor: "warning",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    level: "Intermediate",
    duration: "6 Modules",
    description: "From Linux server management and containerization to automated GitHub Actions CI/CD pipelines.",
    href: "/roadmaps",
    steps: ["Linux Admin", "Networking & SSL", "Docker Containers", "CI/CD Automation", "Nginx Reverse Proxy", "Monitoring"],
    badgeColor: "error",
  },
];

export const popularTechnologies: PopularTechItem[] = [
  { name: "Next.js", category: "Full-Stack", icon: "▲", href: "/docs/nextjs", description: "App Router, Server Actions, SSR, and production deployments." },
  { name: "React", category: "Frontend", icon: "⚛️", href: "/docs/react", description: "Components, hooks, server components, and performance patterns." },
  { name: "Tailwind CSS", category: "Styling", icon: "🎨", href: "/docs/tailwindcss", description: "Modern utility-first CSS design tokens, dark mode, and responsive layouts." },
  { name: "TypeScript", category: "Language", icon: "🔷", href: "/docs/typescript", description: "Static typing, generics, utility types, and strict mode configurations." },
  { name: "Node.js", category: "Runtime", icon: "🟢", href: "/docs/nodejs", description: "Asynchronous I/O, event loop, streams, and production server setup." },
  { name: "Kubernetes", category: "DevOps", icon: "☸️", href: "/docs/kubernetes", description: "Cluster orchestration, Pods, Deployments, Services, and HPA autoscaling." },
  { name: "Nginx", category: "Web Server", icon: "🟢", href: "/docs/nginx", description: "Reverse proxy, SSL hardening, upstream load balancing, and FastCGI caching." },
  { name: "GitHub Actions", category: "CI/CD", icon: "⚡", href: "/docs/github-actions", description: "Automated pipelines, least-privilege security, caching, and VPS deployments." },
  { name: "Cloudflare", category: "Edge & DNS", icon: "🟠", href: "/docs/cloudflare", description: "Anycast DNS, WAF security, Full (Strict) SSL, and Edge CDN caching." },
  { name: "Prisma ORM", category: "Database", icon: "◭", href: "/docs/prisma", description: "Type-safe schemas, Prisma Client queries, relations, and migrations." },
  { name: "Docker", category: "Containers", icon: "🐳", href: "/docs/docker", description: "Container lifecycle, Dockerfile multi-stage builds, and Docker Compose." },
  { name: "PostgreSQL", category: "Database", icon: "🐘", href: "/docs/postgresql", description: "Relational queries, indexing, transactions, and connection pooling." },
];

export const popularCommands: PopularCommandItem[] = [
  {
    title: "Force Kill Process on Port",
    tool: "Linux / macOS",
    command: "lsof -i :3000 -t | xargs kill -9",
    description: "Locates and terminates any zombie process holding port 3000.",
    href: "/commands",
  },
  {
    title: "Prune All Unused Docker Assets",
    tool: "Docker",
    command: "docker system prune -a --volumes -f",
    description: "Reclaims disk space by removing stopped containers, unused networks, and images.",
    href: "/commands",
  },
  {
    title: "Interactive Git Rebase",
    tool: "Git",
    command: "git rebase -i HEAD~4",
    description: "Squash, edit, or reword the last 4 commits before merging.",
    href: "/commands",
  },
  {
    title: "Check Real-Time Port Listening",
    tool: "Networking",
    command: "netstat -tuln | grep LISTEN",
    description: "Displays all open TCP and UDP listening ports on the server.",
    href: "/commands",
  },
];

export const commonErrors: CommonErrorItem[] = [
  {
    title: "TypeError: Cannot read properties of undefined",
    category: "JavaScript",
    cause: "Attempting to access nested properties on an asynchronous state before initialization.",
    href: "/errors/javascript/cannot-read-properties-of-undefined",
    severity: "Common",
  },
  {
    title: "CORS policy: No 'Access-Control-Allow-Origin' header",
    category: "Networking / Web",
    cause: "Browser blocked cross-origin HTTP request due to missing API response headers.",
    href: "/errors",
    severity: "High",
  },
  {
    title: "Error: listen EADDRINUSE: address already in use :::3000",
    category: "Node.js / Next.js",
    cause: "Another development server instance is already running on port 3000.",
    href: "/errors",
    severity: "Common",
  },
  {
    title: "Docker daemon socket permission denied",
    category: "Docker / Linux",
    cause: "Current Linux user is not in the 'docker' system usergroup.",
    href: "/errors",
    severity: "Medium",
  },
];

export const practicalRecipes: RecipeItem[] = [
  {
    title: "JWT Authentication in Next.js with HTTP-Only Cookies",
    category: "Next.js / Security",
    difficulty: "Intermediate",
    timeToRead: "7 min read",
    description: "Step-by-step implementation of secure stateless authentication using Next.js middleware and encrypted cookies.",
    href: "/recipes",
  },
  {
    title: "Multi-Stage Dockerfile for Production Node.js & Next.js",
    category: "Docker / DevOps",
    difficulty: "Beginner",
    timeToRead: "5 min read",
    description: "Reduce Docker image size from 1.2GB to under 120MB with standalone output and non-root security.",
    href: "/recipes",
  },
  {
    title: "PostgreSQL Connection Pooling with PgBouncer & Prisma",
    category: "Database / Node.js",
    difficulty: "Advanced",
    timeToRead: "9 min read",
    description: "Prevent connection exhaustion in serverless deployments with transaction-level pooling.",
    href: "/recipes",
  },
  {
    title: "Nginx Reverse Proxy with Automatic Let's Encrypt SSL",
    category: "DevOps / Linux",
    difficulty: "Intermediate",
    timeToRead: "6 min read",
    description: "Route domain traffic to internal Node.js ports with Certbot automated SSL renewals and rate limiting.",
    href: "/recipes",
  },
];

export const developerTools: DeveloperToolItem[] = [
  {
    name: "VS Code Configuration",
    type: "Code Editor",
    description: "Recommended extensions, formatters, and settings for modern TypeScript and React workflows.",
    href: "/tools",
    icon: "📝",
  },
  {
    name: "Bruno / Postman",
    type: "API Testing",
    description: "Lightweight, Git-friendly API client for debugging REST and GraphQL endpoints.",
    href: "/tools",
    icon: "📬",
  },
  {
    name: "Terminal & Starship",
    type: "Command Line",
    description: "Ultra-fast cross-shell prompt with Git branch status, Node version, and error code tracking.",
    href: "/tools",
    icon: "💻",
  },
  {
    name: "Docker Desktop & Compose",
    type: "Virtualization",
    description: "Local multi-container development environment setup with live code reload volumes.",
    href: "/tools",
    icon: "🐳",
  },
];

export const recentDocs: RecentDocItem[] = [
  {
    title: "Getting Started with OpenDevDocs",
    section: "Docs",
    level: "Beginner",
    lastVerified: "2026-09-30",
    href: "/docs/getting-started/getting-started",
  },
  {
    title: "Git Command Reference & Workflows",
    section: "Commands",
    level: "Beginner",
    lastVerified: "2026-09-30",
    href: "/commands/git/git-commands",
  },
  {
    title: "Debugging Cannot Read Properties of Undefined",
    section: "Errors",
    level: "Intermediate",
    lastVerified: "2026-09-30",
    href: "/errors/javascript/cannot-read-properties-of-undefined",
  },
  {
    title: "Next.js App Router Architecture Guide",
    section: "Docs",
    level: "Intermediate",
    lastVerified: "2026-09-30",
    href: "/docs",
  },
];
