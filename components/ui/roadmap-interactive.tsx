"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  Terminal,
  FileCode2,
  AlertTriangle,
  Layers,
  Sparkles,
  ExternalLink,
  Flame,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoadmapStep {
  step: number;
  title: string;
  duration: string;
  tier: "Foundations" | "Core Competency" | "Advanced Architecture" | "Production & Scale";
  summary: string;
  concepts: string[];
  guides: Array<{
    title: string;
    href: string;
    type: "guide" | "command" | "recipe" | "error";
  }>;
}

export interface RoadmapTrack {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  totalDuration: string;
  targetRole: string;
  steps: RoadmapStep[];
}

export const roadmapTracks: RoadmapTrack[] = [
  {
    id: "frontend",
    name: "Frontend Engineer",
    icon: "🎨",
    badge: "Web, React, Next.js, Performance",
    description: "From browser fundamentals and modern TypeScript to React 19, Next.js App Router, Web Vitals, and Edge deployments.",
    totalDuration: "12–16 Weeks",
    targetRole: "Senior Frontend / React Architect",
    steps: [
      {
        step: 1,
        title: "Internet Protocols & Browser Runtime Mechanics",
        duration: "1–2 Weeks",
        tier: "Foundations",
        summary: "Understand HTTP/3, TLS handshakes, DNS resolution, and the browser Critical Rendering Path (DOM -> CSSOM -> Layout -> Paint -> Composite).",
        concepts: ["HTTP/1.1 vs HTTP/2 vs HTTP/3", "CORS Security Model", "Browser Event Loop", "Critical Rendering Path", "DOM Reflow & Repaint"],
        guides: [
          { title: "Blocked by CORS Policy Troubleshooting", href: "/errors/web/cors-policy", type: "error" },
          { title: "Nginx Reverse Proxy & SSL Setup Recipe", href: "/recipes/devops/nginx-reverse-proxy-ssl", type: "recipe" },
        ],
      },
      {
        step: 2,
        title: "Semantic HTML5, Accessibility (A11y) & Modern CSS",
        duration: "2 Weeks",
        tier: "Foundations",
        summary: "Build accessible, responsive UI with WCAG standards, CSS Grid, Flexbox, Container Queries, and modern Tailwind CSS v4 design tokens.",
        concepts: ["WCAG 2.1 AA Compliance", "ARIA Roles & Live Regions", "CSS Subgrid & Container Queries", "Tailwind CSS Design Tokens", "Fluid Typography"],
        guides: [
          { title: "CSS Responsive Layouts & Flexbox Reference", href: "/docs", type: "guide" },
          { title: "Next.js Image & Font Optimization Guide", href: "/docs", type: "guide" },
        ],
      },
      {
        step: 3,
        title: "Modern JavaScript (ES2024+) & Strict TypeScript",
        duration: "3 Weeks",
        tier: "Core Competency",
        summary: "Master closures, asynchronous execution (Promises, async/await), Generics, Conditional Types, Type Narrowing, and Zod runtime schema validation.",
        concepts: ["Microtasks & Macrotasks", "TypeScript Generics & Utility Types", "Discriminated Unions", "Zod Runtime Validation", "Immutability Patterns"],
        guides: [
          { title: "TypeScript Strict Mode Best Practices", href: "/docs", type: "guide" },
          { title: "Git Basics: Branching & Commits", href: "/docs/git/basic-snapshotting", type: "guide" },
        ],
      },
      {
        step: 4,
        title: "React 19 Architecture, Hooks & State Systems",
        duration: "3 Weeks",
        tier: "Core Competency",
        summary: "Deep-dive into Concurrent React, useTransition, useActionState, Server Actions, state machines, and fine-grained reactivity.",
        concepts: ["Concurrent Mode & Suspense", "useTransition & useDeferredValue", "Zustand / TanStack Query", "Server Actions Integration", "Re-render Optimization"],
        guides: [
          { title: "React 19 Server Actions & Optimistic UI", href: "/docs", type: "guide" },
          { title: "Axios vs Fetch in Modern React Apps", href: "/packages/axios", type: "guide" },
        ],
      },
      {
        step: 5,
        title: "Next.js 15 App Router & Full-Stack Capabilities",
        duration: "3 Weeks",
        tier: "Advanced Architecture",
        summary: "Build production applications with Server Components (RSC), Dynamic Server Functions, Route Handlers, Caching strategies, and middleware.",
        concepts: ["React Server Components (RSC)", "Dynamic IO & PPR", "Incremental Static Regeneration", "Next.js Middleware Auth", "Edge Route Handlers"],
        guides: [
          { title: "Next.js Authentication with JWT & Cookies", href: "/recipes/auth/react-nextjs-auth-jwt", type: "recipe" },
          { title: "Node.js EADDRINUSE Port Collision Fix", href: "/errors/node/eaddrinuse", type: "error" },
        ],
      },
      {
        step: 6,
        title: "Core Web Vitals, Performance & Production Delivery",
        duration: "2 Weeks",
        tier: "Production & Scale",
        summary: "Optimize LCP, INP, and CLS, analyze JS bundle sizes, configure Cloudflare edge caching, and build automated CI/CD deployment pipelines.",
        concepts: ["Interaction to Next Paint (INP)", "Largest Contentful Paint (LCP)", "Bundle Splitting & Dynamic Imports", "Edge Caching & Headers", "Automated Lighthouse CI"],
        guides: [
          { title: "GitHub Actions CI/CD Overview", href: "/docs/github-actions/index", type: "guide" },
          { title: "Cloudflare Origin SSL & Edge CDN Setup", href: "/recipes/devops/cloudflare-origin-ssl-setup", type: "recipe" },
        ],
      },
    ],
  },
  {
    id: "backend",
    name: "Backend Engineer",
    icon: "⚙️",
    badge: "Node.js, Go, PostgreSQL, Redis, Microservices",
    description: "Architect scalable APIs, high-throughput microservices, concurrent databases, caching layers, and production background workers.",
    totalDuration: "14–18 Weeks",
    targetRole: "Senior Backend / Distributed Systems Engineer",
    steps: [
      {
        step: 1,
        title: "Backend Core, OS Concepts & Asynchronous Runtimes",
        duration: "2 Weeks",
        tier: "Foundations",
        summary: "Understand Linux processes, file descriptors, event loops, I/O multiplexing, and memory allocation in Node.js (V8) and Golang runtimes.",
        concepts: ["Event Loop vs Thread Pool", "Non-blocking I/O & epoll", "Goroutines vs Worker Threads", "Memory Leaks & Profiling", "Signals & Graceful Shutdown"],
        guides: [
          { title: "Client-Server Architecture Fundamentals", href: "/docs/backend/client-server-architecture", type: "guide" },
          { title: "Authentication vs Authorization Guide", href: "/docs/backend/auth-vs-authz", type: "guide" },
        ],
      },
      {
        step: 2,
        title: "Relational Databases, ACID & PostgreSQL Tuning",
        duration: "3 Weeks",
        tier: "Core Competency",
        summary: "Master PostgreSQL schema design, composite BTREE indexes, EXPLAIN ANALYZE query planning, ACID transactions, and connection pooling (PgBouncer).",
        concepts: ["EXPLAIN (ANALYZE, BUFFERS)", "Composite BTREE Indexes", "MVCC & Isolation Levels", "PgBouncer Connection Pooling", "Zero-Downtime Migrations"],
        guides: [
          { title: "PostgreSQL Connection Pool Exhaustion Fix", href: "/errors", type: "error" },
          { title: "PostgreSQL vs MongoDB Comparison", href: "/vs/postgres-vs-mongodb", type: "guide" },
        ],
      },
      {
        step: 3,
        title: "API Architectures: RESTful, GraphQL & gRPC",
        duration: "3 Weeks",
        tier: "Core Competency",
        summary: "Design resilient APIs using HTTP status semantics, Protobuf gRPC high-performance binary transport, rate limiting, and structured validation.",
        concepts: ["Idempotent API Design", "gRPC / Protobuf v3", "GraphQL Schema & Dataloader", "Token Bucket Rate Limiting", "OpenAPI 3.1 Spec"],
        guides: [
          { title: "REST vs GraphQL Architecture Comparison", href: "/vs/rest-vs-graphql", type: "guide" },
          { title: "Deploy Go Gin API on VPS Recipe", href: "/recipes/devops/deploy-go-gin-vps", type: "recipe" },
        ],
      },
      {
        step: 4,
        title: "In-Memory Caching & Message Brokers (Redis & Kafka)",
        duration: "3 Weeks",
        tier: "Advanced Architecture",
        summary: "Implement distributed caching strategies (Cache-Aside, Write-Through), cache stampede mitigation, Redis data structures, and async message queues.",
        concepts: ["Cache Invalidation (TTL & Tags)", "Distributed Locks with Redlock", "Redis Pub/Sub & Streams", "Kafka Partitions & Consumer Groups", "Dead Letter Queues (DLQ)"],
        guides: [
          { title: "Deploy Redis Cache Cluster Recipe", href: "/recipes", type: "recipe" },
          { title: "Node.js vs Go Backend Engine Comparison", href: "/vs/nodejs-vs-go", type: "guide" },
        ],
      },
      {
        step: 5,
        title: "Security, Cryptography & Identity Management",
        duration: "2 Weeks",
        tier: "Production & Scale",
        summary: "Implement OAuth 2.0, OpenID Connect (OIDC), JWT rotation with refresh tokens, password hashing (Argon2id), and SQL injection defenses.",
        concepts: ["OAuth 2.0 PKCE Flow", "Argon2id vs Bcrypt", "JWT Rotation & Blacklisting", "CORS & CSRF Tokens", "Secrets Management (Vault)"],
        guides: [
          { title: "Cookies & Session Management", href: "/docs/backend/cookies", type: "guide" },
          { title: "Next.js JWT Authentication Recipe", href: "/recipes/auth/react-nextjs-auth-jwt", type: "recipe" },
        ],
      },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Cloud Engineer",
    icon: "☁️",
    badge: "Linux, Docker, K8s, Terraform, CI/CD, Prometheus",
    description: "Automate infrastructure, containerize microservices, build enterprise CI/CD pipelines, and maintain 99.99% uptime with full observability.",
    totalDuration: "14–20 Weeks",
    targetRole: "Staff DevOps / Platform Engineer",
    steps: [
      {
        step: 1,
        title: "Linux Systems Administration & Shell Automation",
        duration: "2 Weeks",
        tier: "Foundations",
        summary: "Master Linux filesystem permissions, systemd service lifecycle, process monitoring (`top`, `htop`, `ps aux`), and bash automation scripts.",
        concepts: ["systemd Units & Timers", "File Permissions (chmod, ACLs)", "Bash Error Trapping (set -euo)", "Disk Analysis (df, du, iostat)", "SSH Key Hardening"],
        guides: [
          { title: "Linux Disk Usage (df) Command Reference", href: "/commands/linux/disk-usage", type: "command" },
          { title: "Git Merge & Branch Command Reference", href: "/commands/git/merge-branch", type: "command" },
        ],
      },
      {
        step: 2,
        title: "Docker Containerization & Multi-Stage Production Builds",
        duration: "3 Weeks",
        tier: "Core Competency",
        summary: "Author lightweight, non-root multi-stage Dockerfiles, configure bridge/overlay networks, manage volumes, and compose microservices.",
        concepts: ["Multi-Stage Build Optimization", "Alpine & Distroless Base Images", "Docker Layer Caching", "Docker Compose Orchestration", "Rootless Container Security"],
        guides: [
          { title: "Docker Run Command Reference", href: "/commands/docker/run", type: "command" },
          { title: "Docker Container Exits Immediately Fix", href: "/errors/docker/container-exits-immediately", type: "error" },
          { title: "Docker System Prune Command", href: "/commands/docker/system-prune", type: "command" },
        ],
      },
      {
        step: 3,
        title: "Automated CI/CD Pipelines with GitHub Actions",
        duration: "3 Weeks",
        tier: "Core Competency",
        summary: "Build automated test, build, lint, and deploy workflows with matrix runners, secret management, dependency caching, and environment protections.",
        concepts: ["Workflow Triggers & Concurrency", "Matrix Strategy Testing", "Action Caching (actions/cache)", "Environment Secrets & Approval Gates", "Self-Hosted Runners"],
        guides: [
          { title: "GitHub Actions Jobs & Runners Guide", href: "/docs/github-actions/jobs-and-runners", type: "guide" },
          { title: "GitHub Actions Caching & Artifacts", href: "/docs/github-actions/caching-and-artifacts", type: "guide" },
          { title: "GitHub Actions Workflow Syntax", href: "/docs/github-actions/workflow-syntax", type: "guide" },
        ],
      },
      {
        step: 4,
        title: "Kubernetes Orchestration & Helm Deployments",
        duration: "4 Weeks",
        tier: "Advanced Architecture",
        summary: "Deploy resilient workloads using Pods, Deployments, StatefulSets, Services, Ingress Controllers, HPA autoscaling, and parameterized Helm charts.",
        concepts: ["Deployment Rolling Updates", "Ingress Controllers (Nginx/Traefik)", "Horizontal Pod Autoscaler (HPA)", "ConfigMaps & Secrets", "Helm Chart Templates"],
        guides: [
          { title: "Docker vs Kubernetes Guide & Comparison", href: "/vs/docker-vs-kubernetes", type: "guide" },
          { title: "Nginx Reverse Proxy & SSL Setup Recipe", href: "/recipes/devops/nginx-reverse-proxy-ssl", type: "recipe" },
        ],
      },
      {
        step: 5,
        title: "Infrastructure as Code (IaC) with Terraform & Cloud",
        duration: "3 Weeks",
        tier: "Production & Scale",
        summary: "Provision AWS/GCP/Hetzner infrastructure deterministically using HCL, remote state locking in S3/DynamoDB, and modular architecture.",
        concepts: ["Terraform State & Locking", "Reusable Modules & Variables", "VPC & Subnet Provisioning", "IAM Least-Privilege Policies", "Terraform Plan in CI/CD"],
        guides: [
          { title: "Cloudflare Origin SSL & Edge CDN Recipe", href: "/recipes/devops/cloudflare-origin-ssl-setup", type: "recipe" },
          { title: "Deploy Go Gin API on VPS Recipe", href: "/recipes/devops/deploy-go-gin-vps", type: "recipe" },
        ],
      },
    ],
  },
];

export function RoadmapInteractive() {
  const [activeTrackId, setActiveTrackId] = React.useState("devops");
  const [completedSteps, setCompletedSteps] = React.useState<Record<string, boolean>>({});

  const activeTrack = roadmapTracks.find((t) => t.id === activeTrackId) || roadmapTracks[0];

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const getGuideBadge = (type: string) => {
    switch (type) {
      case "command":
        return { label: "Command", icon: <Terminal className="size-3 text-emerald-500" />, color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" };
      case "recipe":
        return { label: "Recipe", icon: <FileCode2 className="size-3 text-purple-500" />, color: "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400" };
      case "error":
        return { label: "Troubleshooting", icon: <AlertTriangle className="size-3 text-rose-500" />, color: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400" };
      default:
        return { label: "Doc Guide", icon: <BookOpen className="size-3 text-blue-500" />, color: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400" };
    }
  };

  const completedCount = activeTrack.steps.filter((s) => completedSteps[`${activeTrack.id}-${s.step}`]).length;
  const progressPercent = Math.round((completedCount / activeTrack.steps.length) * 100);

  return (
    <div className="w-full my-8 space-y-8">
      {/* ── Track Selector Tabs ── */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-[#0c0c0e] border border-zinc-200/80 dark:border-zinc-800 max-w-2xl mx-auto shadow-sm">
        {roadmapTracks.map((track) => {
          const isActive = track.id === activeTrackId;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setActiveTrackId(track.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer",
                isActive
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md shadow-black/5 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <span>{track.icon}</span>
              <span>{track.name}</span>
            </button>
          );
        })}
      </div>

      {/* ── Track Header & Summary ── */}
      <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50/50 dark:from-[#09090b] dark:to-[#0c0c0e] shadow-xl shadow-black/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-200/80 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{activeTrack.icon}</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {activeTrack.name} Path
              </h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {activeTrack.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-mono">ESTIMATED TIME</span>
              <strong className="text-blue-600 dark:text-blue-400 font-bold">{activeTrack.totalDuration}</strong>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-mono">TARGET ROLE</span>
              <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{activeTrack.targetRole}</strong>
            </div>
          </div>
        </div>

        {/* Interactive Progress Bar */}
        <div className="pt-4 flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-amber-500" />
            <span className="text-zinc-500 dark:text-zinc-400">Milestone Progress:</span>
            <strong className="text-zinc-900 dark:text-white">{completedCount} of {activeTrack.steps.length} Steps Completed ({progressPercent}%)</strong>
          </div>
          <div className="w-36 sm:w-48 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Connected Interactive Step Flow ── */}
      <div className="relative space-y-6">
        {/* Visual Connecting Vertical Beam */}
        <div
          className="absolute left-6 sm:left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 opacity-40 dark:opacity-30 hidden sm:block"
          aria-hidden="true"
        />

        {activeTrack.steps.map((stepItem) => {
          const stepKey = `${activeTrack.id}-${stepItem.step}`;
          const isDone = completedSteps[stepKey];

          return (
            <div
              key={stepItem.step}
              className={cn(
                "relative group flex flex-col sm:flex-row gap-5 p-5 sm:p-7 rounded-2xl border transition-all duration-200",
                isDone
                  ? "border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/10 shadow-sm"
                  : "border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#09090b] hover:border-blue-500/40 dark:hover:border-blue-500/30 shadow-lg shadow-black/3 hover:shadow-xl hover:shadow-black/5"
              )}
            >
              {/* Step Node Marker */}
              <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-3 shrink-0">
                <div
                  className={cn(
                    "flex items-center justify-center size-12 sm:size-14 rounded-2xl border font-mono font-bold text-base sm:text-lg transition-all shadow-md z-10",
                    isDone
                      ? "bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20"
                      : "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 group-hover:border-blue-500 group-hover:text-blue-500"
                  )}
                >
                  {isDone ? <CheckCircle2 className="size-6 text-white" /> : String(stepItem.step).padStart(2, "0")}
                </div>

                <button
                  type="button"
                  onClick={() => toggleStep(stepKey)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {isDone ? (
                    <span className="text-emerald-500 font-bold">✓ Done</span>
                  ) : (
                    <span>Mark Complete</span>
                  )}
                </button>
              </div>

              {/* Step Body */}
              <div className="flex-1 min-w-0 space-y-4">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                      {stepItem.tier}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      ⏱ {stepItem.duration}
                    </span>
                  </div>
                </div>

                {/* Step Title & Summary */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    {stepItem.summary}
                  </p>
                </div>

                {/* Concepts Chips */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase">
                    Core Concepts to Master:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stepItem.concepts.map((concept, ci) => (
                      <span
                        key={ci}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct OpenDevDocs Deep-Links */}
                {stepItem.guides.length > 0 && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                    <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase flex items-center gap-1.5">
                      <BookOpen className="size-3 text-blue-500" />
                      <span>Learn in OpenDevDocs:</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stepItem.guides.map((guide, gi) => {
                        const badgeInfo = getGuideBadge(guide.type);
                        return (
                          <Link
                            key={gi}
                            href={guide.href}
                            className="group/link flex items-center justify-between gap-2 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/60 dark:bg-[#0c0c0e] hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-300 dark:hover:border-blue-800 transition-all text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border flex items-center gap-1", badgeInfo.color)}>
                                {badgeInfo.icon}
                                <span>{badgeInfo.label}</span>
                              </span>
                              <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400">
                                {guide.title}
                              </span>
                            </div>
                            <ArrowRight className="size-3.5 text-zinc-400 group-hover/link:text-blue-500 group-hover/link:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
