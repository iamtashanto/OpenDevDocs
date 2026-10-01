"use client";

import * as React from "react";
import Link from "next/link";
import {
  Code2,
  Terminal,
  Copy,
  Check,
  Zap,
  Play,
  ArrowRight,
  ShieldCheck,
  Server,
  Database,
  Globe,
  Layers,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudioPreset {
  id: string;
  name: string;
  filename: string;
  language: string;
  badge: string;
  runtime: string;
  docHref: string;
  topology: {
    client: { name: string; tech: string; metric: string };
    edge: { name: string; tech: string; metric: string };
    server: { name: string; tech: string; metric: string };
    storage: { name: string; tech: string; metric: string };
  };
  headers: {
    status: string;
    latency: string;
    cache: string;
    protocol: string;
  };
  code: string;
}

function HighlightedCode({ code, language }: { code: string; language: string }) {
  const lines = code.split("\n");

  const highlightLine = (line: string) => {
    // Comments
    if (line.trim().startsWith("#") || line.trim().startsWith("--") || line.trim().startsWith("//")) {
      return <span className="text-zinc-400 dark:text-zinc-500 italic">{line}</span>;
    }

    // Keyword matching regex
    const tokens = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:import|export|from|async|function|const|return|await|throw|new|if|use|server|FROM|WORKDIR|COPY|RUN|ENV|USER|EXPOSE|CMD|AS|upstream|listen|proxy_pass|ssl_certificate|ssl_certificate_key|ssl_protocols|gzip|gzip_types|location|least_conn|CREATE|INDEX|CONCURRENTLY|IF|NOT|EXISTS|ON|INCLUDE|WHERE|EXPLAIN|ANALYZE|BUFFERS|COSTS|OFF|SELECT|ORDER|BY|DESC|LIMIT|NOW|INTERVAL)\b|[(),;{}[\].=:]|\s+)/g);

    return tokens.map((tok, i) => {
      if (!tok) return null;

      // Strings
      if ((tok.startsWith('"') && tok.endsWith('"')) || (tok.startsWith("'") && tok.endsWith("'")) || (tok.startsWith('`') && tok.endsWith('`'))) {
        return <span key={i} className="text-emerald-600 dark:text-emerald-400 font-medium">{tok}</span>;
      }

      // Keywords
      if (/^(import|export|from|async|function|const|return|await|throw|new|if|server|FROM|WORKDIR|COPY|RUN|ENV|USER|EXPOSE|CMD|AS|upstream|listen|proxy_pass|ssl_certificate|ssl_certificate_key|ssl_protocols|gzip|gzip_types|location|least_conn|CREATE|INDEX|CONCURRENTLY|IF|NOT|EXISTS|ON|INCLUDE|WHERE|EXPLAIN|ANALYZE|BUFFERS|COSTS|OFF|SELECT|ORDER|BY|DESC|LIMIT|NOW|INTERVAL)$/.test(tok)) {
        return <span key={i} className="text-purple-600 dark:text-purple-400 font-bold">{tok}</span>;
      }

      // Types & Identifiers
      if (/^(z|OrderSchema|FormData|processCheckout|auth|revalidateTag|db|session|validated|order|nextjs|nodejs)$/.test(tok)) {
        return <span key={i} className="text-blue-600 dark:text-blue-400 font-semibold">{tok}</span>;
      }

      // Punctuation
      if (/^[(),;{}[\].=:]$/.test(tok)) {
        return <span key={i} className="text-zinc-400 dark:text-zinc-500">{tok}</span>;
      }

      return <span key={i} className="text-zinc-800 dark:text-zinc-200">{tok}</span>;
    });
  };

  return (
    <pre className="min-w-full font-mono text-xs leading-relaxed">
      <code>
        {lines.map((l, i) => (
          <div key={i} className="table-row">
            <span className="table-cell pr-4 text-right select-none text-zinc-300 dark:text-zinc-600 text-[11px] w-6">
              {i + 1}
            </span>
            <span className="table-cell whitespace-pre">
              {highlightLine(l)}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}

const studioPresets: StudioPreset[] = [
  {
    id: "nextjs",
    name: "React 19 & Next.js 15",
    filename: "app/actions/checkout.ts",
    language: "typescript",
    badge: "App Router & SSR",
    runtime: "Edge / Node.js 22",
    docHref: "/docs",
    topology: {
      client: { name: "Client Browser", tech: "React 19 useActionState", metric: "0ms" },
      edge: { name: "Edge Router", tech: "Cloudflare Workers", metric: "2.1ms" },
      server: { name: "SSR Runtime", tech: "Next.js Server Actions", metric: "1.2ms" },
      storage: { name: "Database Pool", tech: "PostgreSQL 16 + Redis", metric: "0.4ms" },
    },
    headers: {
      status: "200 OK",
      latency: "1.4ms",
      cache: "HIT (Edge-POP)",
      protocol: "HTTP/3 QUIC",
    },
    code: `"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const OrderSchema = z.object({
  cartId: z.string().uuid(),
  paymentMethodId: z.string(),
});

export async function processCheckout(formData: FormData) {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");

  const validated = OrderSchema.parse(Object.fromEntries(formData));

  const order = await db.orders.create({
    data: { userId: session.userId, ...validated, status: "PAID" },
  });

  revalidateTag(\`cart:\${session.userId}\`);
  return { success: true, orderId: order.id };
}`,
  },
  {
    id: "docker",
    name: "Multi-Stage Docker",
    filename: "Dockerfile.production",
    language: "dockerfile",
    badge: "Containers & CI/CD",
    runtime: "Alpine 3.20 Linux",
    docHref: "/docs",
    topology: {
      client: { name: "Docker Daemon", tech: "BuildKit 0.18 Engine", metric: "Local" },
      edge: { name: "Registry Cache", tech: "GitHub Packages / ECR", metric: "0.8s" },
      server: { name: "Build Runner", tech: "Multi-Stage Node 22", metric: "8.4s" },
      storage: { name: "Final Artifact", tech: "Non-Root Distroless", metric: "84 MB" },
    },
    headers: {
      status: "BUILD SUCCESS",
      latency: "8.4s",
      cache: "LAYER CACHE HIT",
      protocol: "OCI Image v1",
    },
    code: `# Stage 1: Lean Base & Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Stage 2: Production Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm run build

# Stage 3: Minimal Non-Root Production Image
FROM node:22-alpine AS runner
WORKDIR /app
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
    name: "High-Perf Nginx",
    filename: "nginx.conf",
    language: "nginx",
    badge: "Reverse Proxy & SSL",
    runtime: "Nginx 1.25 Mainline",
    docHref: "/docs",
    topology: {
      client: { name: "Public Internet", tech: "TLS 1.3 / HTTP/2", metric: "0ms" },
      edge: { name: "Nginx Gateway", tech: "Rate Limit + Gzip", metric: "0.12ms" },
      server: { name: "Upstream Cluster", tech: "Least-Conn Balance", metric: "1.1ms" },
      storage: { name: "Static Buffer", tech: "Brotli Cache Disk", metric: "0.2ms" },
    },
    headers: {
      status: "200 OK",
      latency: "0.18ms",
      cache: "BYPASS (Upstream)",
      protocol: "TLSv1.3",
    },
    code: `upstream app_cluster {
    least_conn;
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3001 max_fails=3 fail_timeout=10s;
    keepalive 64;
}

server {
    listen 443 ssl http2;
    server_name api.opendevdocs.dev;

    ssl_certificate /etc/letsencrypt/live/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/privkey.pem;
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
    }
}`,
  },
  {
    id: "postgres",
    name: "Postgres Index Optimizer",
    filename: "migrations/003_perf_index.sql",
    language: "sql",
    badge: "SQL & Query Tuning",
    runtime: "PostgreSQL 16 + PgBouncer",
    docHref: "/docs",
    topology: {
      client: { name: "Node App Pool", tech: "PgBouncer 6432", metric: "0ms" },
      edge: { name: "Query Planner", tech: "Cost Optimizer", metric: "0.02ms" },
      server: { name: "Index Scan", tech: "Compound BTREE", metric: "0.04ms" },
      storage: { name: "WAL Storage", tech: "NVMe SSD Replica", metric: "0.3ms" },
    },
    headers: {
      status: "EXPLAIN SUCCESS",
      latency: "0.042ms",
      cache: "SHARED BUFFERS HIT",
      protocol: "Postgres Wire v3",
    },
    code: `-- Concurrent zero-downtime index creation
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_created
ON orders (user_id, created_at DESC)
INCLUDE (total_amount, currency)
WHERE status != 'DELETED';

-- Real-time query execution plan verification
EXPLAIN (ANALYZE, BUFFERS, COSTS OFF)
SELECT id, total_amount, currency, created_at
FROM orders
WHERE user_id = 'usr_9482910'
  AND created_at >= NOW() - INTERVAL '30 days'
  AND status = 'PAID'
ORDER BY created_at DESC
LIMIT 20;`,
  },
];

export function HeroShowcase() {
  const [activePresetIdx, setActivePresetIdx] = React.useState(0);
  const [isSimulating, setIsSimulating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const currentPreset = studioPresets[activePresetIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPreset.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 text-left">
      {/* Outer Workbench Chrome */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-2xl shadow-black/10 dark:shadow-blue-500/5 overflow-hidden">
        {/* macOS Style Title Bar & Preset Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-zinc-50 dark:bg-[#0c0c0e] border-b border-zinc-200/80 dark:border-zinc-800">
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:inline">
              opendevdocs / {currentPreset.filename}
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200/60 dark:border-zinc-800 text-xs">
            {studioPresets.map((preset, idx) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setActivePresetIdx(idx)}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium whitespace-nowrap",
                  activePresetIdx === idx
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Pane Workbench Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200/80 dark:divide-zinc-800">
          {/* ── LEFT PANE (40%): Live Architecture Pipeline & Telemetry ── */}
          <div className="lg:col-span-5 p-5 flex flex-col justify-between bg-zinc-50/50 dark:bg-[#0c0c0e]/50">
            <div>
              {/* Header with Run Button */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                    Live Pipeline
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  <Play className={cn("size-3", isSimulating && "animate-spin")} />
                  <span>{isSimulating ? "Simulating..." : "Test Stream"}</span>
                </button>
              </div>

              {/* Connected Topology Diagram */}
              <div className="space-y-2 relative">
                {/* Connecting Line */}
                <div
                  className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 opacity-30 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Node 1: Client */}
                <div className="relative flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                  <div className="size-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <Globe className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {currentPreset.topology.client.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {currentPreset.topology.client.metric}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {currentPreset.topology.client.tech}
                    </p>
                  </div>
                </div>

                {/* Node 2: Edge */}
                <div className="relative flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                  <div className="size-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {currentPreset.topology.edge.name}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500">
                        {currentPreset.topology.edge.metric}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {currentPreset.topology.edge.tech}
                    </p>
                  </div>
                </div>

                {/* Node 3: Server */}
                <div className="relative flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-blue-500/40 ring-1 ring-blue-500/20">
                  <div className="size-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0 border border-purple-500/20">
                    <Server className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {currentPreset.topology.server.name}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500">
                        {currentPreset.topology.server.metric}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {currentPreset.topology.server.tech}
                    </p>
                  </div>
                </div>

                {/* Node 4: Storage */}
                <div className="relative flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                  <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <Database className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {currentPreset.topology.storage.name}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500">
                        {currentPreset.topology.storage.metric}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {currentPreset.topology.storage.tech}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Request Telemetry Box */}
            <div className="mt-4 p-3 rounded-xl bg-zinc-100 dark:bg-black/60 border border-zinc-200/80 dark:border-zinc-800 text-xs font-mono">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1.5 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                <span>TELEMETRY</span>
                <span className="text-emerald-500">{currentPreset.headers.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="text-zinc-400">Latency: </span>
                  <strong className="text-emerald-400">{currentPreset.headers.latency}</strong>
                </div>
                <div>
                  <span className="text-zinc-400">Cache: </span>
                  <strong>{currentPreset.headers.cache}</strong>
                </div>
                <div>
                  <span className="text-zinc-400">Protocol: </span>
                  <strong>{currentPreset.headers.protocol}</strong>
                </div>
                <div>
                  <span className="text-zinc-400">Target: </span>
                  <strong>{currentPreset.runtime.split(" ")[0]}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANE (60%): High-Fidelity Code Editor ── */}
          <div className="lg:col-span-7 p-5 flex flex-col justify-between bg-white dark:bg-[#09090b]">
            <div>
              {/* Code File Header */}
              <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Code2 className="size-4 text-blue-500" />
                  <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {currentPreset.filename}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    {currentPreset.badge}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Window with Multi-color Syntax Tokens */}
              <div className="rounded-xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200/80 dark:border-zinc-800/80 p-3 font-mono text-xs leading-relaxed max-h-[300px] overflow-x-auto text-zinc-800 dark:text-zinc-200 select-text">
                <HighlightedCode code={currentPreset.code} language={currentPreset.language} />
              </div>
            </div>

            {/* Bottom Documentation Jump Link */}
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono text-[11px]">
                Runtime: <strong className="text-zinc-700 dark:text-zinc-300">{currentPreset.runtime}</strong>
              </span>

              <Link
                href={currentPreset.docHref}
                className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Read production guide</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
