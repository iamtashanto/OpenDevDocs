"use client";

import * as React from "react";
import {
  Code2,
  Terminal,
  Activity,
  AlertTriangle,
  Copy,
  Check,
  Zap,
  CheckCircle2,
  ArrowRight,
  Server,
  Database,
  Globe,
  Cpu,
  ShieldCheck,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA DEFINITIONS
   ───────────────────────────────────────────────────────────────────────────── */

type ShowcaseTab = "architecture" | "code" | "cli" | "errors";

const codeSnippets = [
  {
    id: "react19",
    title: "React 19 Server Action",
    filename: "app/actions/checkout.ts",
    language: "typescript",
    badge: "Next.js 16 & React 19",
    telemetry: { speed: "1.2ms", status: "Type-Safe", size: "1.4 kB", runtime: "Edge" },
    docHref: "/docs",
    code: `"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const CheckoutSchema = z.object({
  cartId: z.string().uuid(),
  paymentMethodId: z.string(),
});

export async function processCheckout(formData: FormData) {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");

  const validated = CheckoutSchema.parse({
    cartId: formData.get("cartId"),
    paymentMethodId: formData.get("paymentMethodId"),
  });

  const order = await db.orders.create({
    data: { ...validated, userId: session.userId, status: "PAID" },
  });

  revalidateTag(\`cart:\${session.userId}\`);
  return { success: true, orderId: order.id };
}`,
  },
  {
    id: "dockerfile",
    title: "Multi-Stage Dockerfile",
    filename: "Dockerfile.production",
    language: "dockerfile",
    badge: "Docker & Linux",
    telemetry: { speed: "Build: 8.4s", status: "Minimal Image", size: "84 MB", runtime: "Alpine 3.20" },
    docHref: "/docs",
    code: `# Multi-stage lean production build
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Stage 1: Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Stage 2: Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm run build

# Stage 3: Runner (Ultra-lean non-root runtime)
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]`,
  },
  {
    id: "nginx",
    title: "High-Perf Nginx Proxy",
    filename: "nginx.conf",
    language: "nginx",
    badge: "Nginx & DevOps",
    telemetry: { speed: "0.12ms", status: "HTTP/3 Ready", size: "gzip / brotli", runtime: "Linux" },
    docHref: "/docs",
    code: `upstream app_cluster {
    least_conn;
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3001 max_fails=3 fail_timeout=10s;
    keepalive 64;
}

server {
    listen 443 ssl http2;
    server_name api.opendevdocs.dev;

    ssl_certificate /etc/letsencrypt/live/opendevdocs/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/opendevdocs/privkey.pem;
    ssl_protocols TLSv1.3 TLSv1.2;

    # Gzip & Brotli compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass http://app_cluster;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}`,
  },
  {
    id: "postgres",
    title: "PostgreSQL Compound Index",
    filename: "migrations/004_perf_index.sql",
    language: "sql",
    badge: "PostgreSQL & Database",
    telemetry: { speed: "0.04ms scan", status: "Index Scan", size: "BTREE", runtime: "Postgres 16" },
    docHref: "/docs",
    code: `-- Zero-downtime concurrent index optimization
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_created_status
ON orders (user_id, created_at DESC)
INCLUDE (total_amount, currency)
WHERE status != 'DELETED';

-- Analytical query execution plan verification
EXPLAIN ANALYZE
SELECT id, total_amount, currency, created_at
FROM orders
WHERE user_id = 'usr_84920481'
  AND created_at >= NOW() - INTERVAL '30 days'
  AND status = 'PAID'
ORDER BY created_at DESC
LIMIT 20;`,
  },
];

const cliCommands = [
  {
    id: "docker-compose",
    title: "Docker Compose Full Stack",
    tool: "Docker",
    command: "docker compose -f docker-compose.prod.yml up -d --build --remove-orphans",
    badge: "DevOps",
    docHref: "/commands",
    flags: [
      { flag: "-f docker-compose.prod.yml", desc: "Specifies alternate production configuration file" },
      { flag: "up -d", desc: "Builds, recreates, and runs containers detached in background" },
      { flag: "--build", desc: "Forces rebuilding of container images prior to starting" },
      { flag: "--remove-orphans", desc: "Removes containers for services no longer in the compose file" },
    ],
    output: [
      { type: "info", text: "[+] Building 1.4s (12/12) FINISHED" },
      { type: "success", text: " => [internal] load build definition from Dockerfile" },
      { type: "success", text: " => => transferring dockerfile: 942B done" },
      { type: "info", text: "[+] Running 4/4" },
      { type: "success", text: " ✔ Network prod_vpc               Created" },
      { type: "success", text: " ✔ Container db_postgres          Healthy" },
      { type: "success", text: " ✔ Container cache_redis          Healthy" },
      { type: "success", text: " ✔ Container web_app_1            Started (port 3000 -> 80)" },
    ],
  },
  {
    id: "git-rebase",
    title: "Interactive Git Rebase & Clean",
    tool: "Git",
    command: "git fetch origin && git rebase -i --autosquash origin/main",
    badge: "Version Control",
    docHref: "/commands",
    flags: [
      { flag: "fetch origin", desc: "Downloads latest commits and branches from remote without merging" },
      { flag: "-i", desc: "Opens interactive editor to squash, fixup, reword, or drop commits" },
      { flag: "--autosquash", desc: "Automatically arranges fixup!/squash! commits into order" },
    ],
    output: [
      { type: "info", text: "From github.com:iamtashanto/OpenDevDocs" },
      { type: "info", text: " * branch            main       -> FETCH_HEAD" },
      { type: "success", text: "Successfully rebased and updated refs/heads/feature/auth." },
      { type: "info", text: "Current branch is up to date with origin/main." },
    ],
  },
  {
    id: "linux-audit",
    title: "Linux Port & Process Audit",
    tool: "Linux",
    command: "sudo ss -tulpn | grep -E '(:80|:443|:3000|:5432)'",
    badge: "Linux SysAdmin",
    docHref: "/commands",
    flags: [
      { flag: "-t", desc: "Display TCP sockets only" },
      { flag: "-u", desc: "Display UDP sockets" },
      { flag: "-l", desc: "Show only listening sockets" },
      { flag: "-p", desc: "Show process name and PID using socket" },
      { flag: "-n", desc: "Do not resolve service names (numeric ports)" },
    ],
    output: [
      { type: "info", text: "Netid State  Recv-Q Send-Q  Local Address:Port   Peer Address:Port  Process" },
      { type: "success", text: "tcp   LISTEN 0      128     0.0.0.0:80           0.0.0.0:*          users:((\"nginx\",pid=1024,fd=6))" },
      { type: "success", text: "tcp   LISTEN 0      128     0.0.0.0:443          0.0.0.0:*          users:((\"nginx\",pid=1024,fd=7))" },
      { type: "success", text: "tcp   LISTEN 0      511     127.0.0.1:3000       0.0.0.0:*          users:((\"node\",pid=3190,fd=18))" },
      { type: "success", text: "tcp   LISTEN 0      128     127.0.0.1:5432       0.0.0.0:*          users:((\"postgres\",pid=940,fd=4))" },
    ],
  },
];

const errorDiagnoses = [
  {
    id: "cors",
    title: "CORS: No 'Access-Control-Allow-Origin' header present",
    severity: "HIGH",
    category: "Browser Security / API",
    cause: "The backend server did not include explicit CORS authorization headers on preflight OPTIONS or GET/POST responses requested from a cross-origin web client domain.",
    stackTrace: `Access to fetch at 'https://api.backend.internal/v1/auth' from origin 'https://app.frontend.com' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. (Status: 403 Forbidden)`,
    fix: `// In your Express / Next.js API route or Middleware:
import cors from "cors";

export const corsOptions = {
  origin: ["https://app.frontend.com", "https://staging.frontend.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400, // 24 hours preflight cache
};`,
    docHref: "/errors",
  },
  {
    id: "db-pool",
    title: "FATAL: remaining connection slots are reserved for non-replication superuser connections",
    severity: "CRITICAL",
    category: "PostgreSQL / Connection Pool",
    cause: "Serverless functions or microservices spawned thousands of unpooled direct PostgreSQL database connections, exceeding max_connections (default 100).",
    stackTrace: `Error: connect ECONNREFUSED 10.0.4.20:5432
  at Connection.parseE (/app/node_modules/pg/lib/connection.js:614:13)
  error: remaining connection slots are reserved for non-replication superuser connections
  code: '53300', routine: 'InitPostgres'`,
    fix: `// 1. Switch to PgBouncer / Prisma Accelerate / AWS RDS Proxy connection string:
DATABASE_URL="postgres://user:pwd@pgbouncer.internal:6432/db?pgbouncer=true&connection_limit=10"

// 2. Configure singleton client pool in Node.js:
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Limit max connections per container
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});`,
    docHref: "/errors",
  },
  {
    id: "docker-port",
    title: "Error response from daemon: driver failed programming external connectivity on endpoint",
    severity: "MEDIUM",
    category: "Docker / Network Collision",
    cause: "Another local process or orphaned container is already listening on host port 80 or 3000, blocking the Docker daemon from binding the socket.",
    stackTrace: `docker: Error response from daemon: driver failed programming external connectivity on 
endpoint web_gateway (9b84a92c): Bind for 0.0.0.0:80 failed: port is already allocated.`,
    fix: `# 1. Identify which process is holding port 80:
sudo lsof -i :80  # or sudo ss -tulpn | grep :80

# 2. Stop conflicting Apache / Nginx or kill orphan container:
sudo systemctl stop nginx
docker rm -f $(docker ps -aq --filter "publish=80")

# 3. Restart container with custom port mapping:
docker run -d -p 8080:80 --name web_gateway my-image:latest`,
    docHref: "/errors",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   INTERACTIVE ARCHITECTURE SVG COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
function InteractiveArchitectureFlow() {
  const [activeNode, setActiveNode] = React.useState<number>(1);

  const nodes = [
    {
      id: 0,
      title: "Client Browser / App",
      sub: "React 19 / Mobile Client",
      icon: <Globe className="size-5 text-cyan-400" />,
      color: "cyan",
      stats: { latency: "0ms", protocol: "HTTP/3 QUIC", encryption: "TLS 1.3" },
      desc: "End-user client initiating concurrent streaming requests with prefetching and optimistic state.",
    },
    {
      id: 1,
      title: "Edge Gateway & Proxy",
      sub: "Cloudflare / Nginx Reverse Proxy",
      icon: <ShieldCheck className="size-5 text-blue-400" />,
      color: "blue",
      stats: { latency: "< 10ms", protocol: "Brotli Compression", ddos: "Active Shield" },
      desc: "Edge terminating SSL, geo-routing requests, evaluating rate limits, and serving cached static assets.",
    },
    {
      id: 2,
      title: "App Server & SSR Engine",
      sub: "Next.js App Router / Go Runtime",
      icon: <Server className="size-5 text-purple-400" />,
      color: "purple",
      stats: { latency: "1.2ms", rendering: "React Server Components", threads: "Async Event Loop" },
      desc: "Executes Server Actions, validates session tokens, streams React HTML chunks, and coordinates backend services.",
    },
    {
      id: 3,
      title: "Distributed Cache",
      sub: "Redis 7.2 Cluster",
      icon: <Zap className="size-5 text-amber-400" />,
      color: "amber",
      stats: { latency: "0.4ms", hitRate: "98.4%", memory: "128 MB" },
      desc: "Ultra-fast in-memory cache for session stores, rate-limiting tokens, and hot query result tags.",
    },
    {
      id: 4,
      title: "Relational Database",
      sub: "PostgreSQL 16 with PgBouncer",
      icon: <Database className="size-5 text-emerald-400" />,
      color: "emerald",
      stats: { latency: "0.8ms", pool: "20 / 100 conns", replication: "Sync Standby" },
      desc: "ACID-compliant relational store with BTREE indexing, partitioned tables, and write-ahead transaction logging.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Architecture Interactive Diagram */}
      <div className="relative rounded-2xl bg-slate-950 p-6 lg:p-8 border border-slate-800/80 overflow-hidden">
        {/* Subtle Background Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden="true"
        />

        {/* Live Status Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-8 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-3 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Live System Pipeline • Interactive Architecture
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-blue-400" />
              Edge: <strong className="text-white">Active</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400" />
              Cache Hit: <strong className="text-white">98.4%</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-purple-400" />
              SSR Latency: <strong className="text-white">1.2ms</strong>
            </span>
          </div>
        </div>

        {/* SVG Flow Map with Clickable Nodes */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {nodes.map((node, idx) => {
            const isSelected = activeNode === node.id;
            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  onClick={() => setActiveNode(node.id)}
                  className={cn(
                    "group relative flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300",
                    "border backdrop-blur-md cursor-pointer focus:outline-none",
                    isSelected
                      ? "bg-slate-900 border-blue-500/80 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/20 -translate-y-1"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90"
                  )}
                >
                  {/* Active Indicator Beacon */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 flex size-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full size-2.5 bg-blue-500" />
                    </span>
                  )}

                  <div
                    className={cn(
                      "size-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110",
                      isSelected
                        ? "bg-blue-500/20 border border-blue-500/40"
                        : "bg-slate-800 border border-slate-700/60"
                    )}
                  >
                    {node.icon}
                  </div>

                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {node.sub}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 w-full text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
                    <span className="text-emerald-400">●</span>
                    <span>{Object.values(node.stats)[0]}</span>
                  </div>
                </button>

                {/* Flow Connector Arrow on Desktop */}
                {idx < nodes.length - 1 && (
                  <div className="hidden md:flex justify-center -mx-2 z-0" aria-hidden="true">
                    <div className="relative flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="text-slate-600">
                        <line
                          x1="0"
                          y1="12"
                          x2="20"
                          y2="12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          className="animate-pulse"
                        />
                        <polygon points="16,8 24,12 16,16" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Detail Inspector Dock */}
        <div className="relative z-10 mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[11px] font-semibold">
                Node {activeNode + 1} of {nodes.length}
              </span>
              <span className="font-semibold text-white">
                {nodes[activeNode].title}
              </span>
              <span className="text-slate-400">({nodes[activeNode].sub})</span>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
            >
              <span>View full architectural guide</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <p className="text-slate-300 leading-relaxed mb-3">
            {nodes[activeNode].desc}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-[11px] font-mono">
            {Object.entries(nodes[activeNode].stats).map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:gap-1.5">
                <span className="text-slate-500 capitalize">{k}:</span>
                <span className="text-slate-200 font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN HERO SHOWCASE COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
export function HeroShowcase() {
  const [activeTab, setActiveTab] = React.useState<ShowcaseTab>("architecture");
  const [activeCodeIdx, setActiveCodeIdx] = React.useState(0);
  const [activeCliIdx, setActiveCliIdx] = React.useState(0);
  const [activeErrorIdx, setActiveErrorIdx] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCode = codeSnippets[activeCodeIdx];
  const currentCli = cliCommands[activeCliIdx];
  const currentError = errorDiagnoses[activeErrorIdx];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-6">
      {/* Outer Glow Container */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-slate-200/80 via-slate-200/40 to-slate-200/10 dark:from-blue-500/20 dark:via-purple-500/10 dark:to-transparent shadow-2xl shadow-blue-500/5">
        <div className="rounded-[22px] bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-800/80 overflow-hidden text-slate-100">
          {/* Main Showcase Top Tab Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:px-5 sm:py-3.5 bg-slate-950/80 border-b border-slate-800/80">
            {/* macOS Traffic Lights */}
            <div className="hidden sm:flex items-center gap-2" aria-hidden="true">
              <span className="size-3 rounded-full bg-rose-500/80" />
              <span className="size-3 rounded-full bg-amber-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">OpenDevDocs Studio</span>
            </div>

            {/* Showcase View Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "architecture"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <Activity className="size-3.5" />
                <span>Architecture Flow</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "code"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <Code2 className="size-3.5" />
                <span>Code Guides</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("cli")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "cli"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <Terminal className="size-3.5" />
                <span>CLI Studio</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("errors")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "errors"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <AlertTriangle className="size-3.5" />
                <span>Error Resolver</span>
              </button>
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="p-4 sm:p-6 lg:p-7">
            {/* ─── TAB 1: ARCHITECTURE FLOW ─── */}
            {activeTab === "architecture" && <InteractiveArchitectureFlow />}

            {/* ─── TAB 2: CODE PLAYGROUND ─── */}
            {activeTab === "code" && (
              <div className="space-y-4">
                {/* Sub-tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {codeSnippets.map((snippet, idx) => (
                      <button
                        key={snippet.id}
                        type="button"
                        onClick={() => setActiveCodeIdx(idx)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                          activeCodeIdx === idx
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                            : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"
                        )}
                      >
                        {snippet.title}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                      {currentCode.filename}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(currentCode.code)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                      title="Copy code"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Code Window Container */}
                <div className="relative rounded-xl bg-black/60 border border-slate-800/90 font-mono text-xs overflow-x-auto p-4 leading-relaxed max-h-[360px] select-text shadow-inner">
                  <pre className="text-slate-200 font-mono">
                    <code>{currentCode.code}</code>
                  </pre>
                </div>

                {/* Telemetry Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Zap className="size-3.5 text-amber-400" />
                      Latency: <strong className="text-slate-200">{currentCode.telemetry.speed}</strong>
                    </span>
                    <span>
                      Status: <strong className="text-emerald-400">{currentCode.telemetry.status}</strong>
                    </span>
                    <span>
                      Bundle: <strong className="text-slate-200">{currentCode.telemetry.size}</strong>
                    </span>
                    <span className="hidden sm:inline">
                      Target: <strong className="text-blue-400">{currentCode.telemetry.runtime}</strong>
                    </span>
                  </div>

                  <Link
                    href={currentCode.docHref}
                    className="inline-flex items-center gap-1 text-blue-400 hover:underline font-sans font-semibold text-xs"
                  >
                    <span>Read full doc</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* ─── TAB 3: CLI STUDIO ─── */}
            {activeTab === "cli" && (
              <div className="space-y-4">
                {/* Sub-tabs */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-3">
                  {cliCommands.map((cmd, idx) => (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => setActiveCliIdx(idx)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                        activeCliIdx === idx
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"
                      )}
                    >
                      {cmd.title}
                    </button>
                  ))}
                </div>

                {/* Command Bar with Copy Button */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                  <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-4">
                    <span className="text-emerald-400 font-bold select-none">$</span>
                    <span className="text-slate-100 select-all whitespace-nowrap">
                      {currentCli.command}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentCli.command)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Command</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Interactive Flag Breakdown */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Parameter Explanations
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentCli.flags.map((item) => (
                      <div
                        key={item.flag}
                        className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs"
                      >
                        <span className="font-mono text-emerald-400 font-semibold block mb-0.5">
                          {item.flag}
                        </span>
                        <span className="text-slate-400 text-[11px]">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Terminal Execution Output */}
                <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs space-y-1">
                  <p className="text-slate-500 text-[10px] mb-2 border-b border-slate-800/80 pb-1">
                    Terminal Output (Simulated Execution)
                  </p>
                  {currentCli.output.map((line, idx) => (
                    <p
                      key={idx}
                      className={cn(
                        line.type === "success" ? "text-emerald-400" : "text-slate-300"
                      )}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* ─── TAB 4: ERROR RESOLVER ─── */}
            {activeTab === "errors" && (
              <div className="space-y-4">
                {/* Sub-tabs */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-3">
                  {errorDiagnoses.map((err, idx) => (
                    <button
                      key={err.id}
                      type="button"
                      onClick={() => setActiveErrorIdx(idx)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                        activeErrorIdx === idx
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"
                      )}
                    >
                      {err.title.slice(0, 32)}...
                    </button>
                  ))}
                </div>

                {/* Error Header & Cause */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-rose-300">
                      {currentError.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                      {currentError.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-rose-200">Root Cause:</strong> {currentError.cause}
                  </p>
                </div>

                {/* Stack Trace Snippet */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] text-rose-400/90 leading-relaxed overflow-x-auto">
                  <pre>
                    <code>{currentError.stackTrace}</code>
                  </pre>
                </div>

                {/* Step-by-Step Fix */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="size-4" />
                      Verified Solution Snippet
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(currentError.fix)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white"
                    >
                      {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                      <span>{copied ? "Copied" : "Copy Fix"}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                    <pre>
                      <code>{currentError.fix}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
