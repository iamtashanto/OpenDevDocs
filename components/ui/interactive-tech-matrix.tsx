"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type TechCategory = "all" | "frontend" | "backend" | "devops" | "database" | "tools";

interface TechItem {
  name: string;
  category: TechCategory;
  categoryLabel: string;
  description: string;
  href: string;
  badge: string;
  icon: string;
  accent: string;
}

const techItems: TechItem[] = [
  {
    name: "React 19",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Server Components, useActionState, optimistic updates, and hook lifecycle.",
    href: "/docs/frontend/react",
    badge: "Core Framework",
    icon: "⚛️",
    accent: "blue",
  },
  {
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Full Stack",
    description: "App Router, Server Actions, Dynamic Streaming, and ISR caching.",
    href: "/docs/frontend/nextjs",
    badge: "Full-Stack",
    icon: "▲",
    accent: "blue",
  },
  {
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Language",
    description: "Type inference, conditional types, generics, and strict compiler configs.",
    href: "/docs/frontend/typescript",
    badge: "Type-Safe",
    icon: "🔷",
    accent: "blue",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Styling",
    description: "Utility-first design tokens, CSS variables, and modern responsive layouts.",
    href: "/docs/frontend/css",
    badge: "Styling",
    icon: "🎨",
    accent: "cyan",
  },
  {
    name: "Node.js",
    category: "backend",
    categoryLabel: "Runtime",
    description: "Async event loop, worker threads, stream pipelines, and ESM architecture.",
    href: "/docs/backend/nodejs",
    badge: "Runtime",
    icon: "🟢",
    accent: "emerald",
  },
  {
    name: "Go (Golang)",
    category: "backend",
    categoryLabel: "Language",
    description: "Goroutines, channels, interfaces, high-concurrency microservices, and Gin framework.",
    href: "/docs/backend/go",
    badge: "High Perf",
    icon: "🐹",
    accent: "cyan",
  },
  {
    name: "Python & FastAPI",
    category: "backend",
    categoryLabel: "API Framework",
    description: "Pydantic validation, async endpoints, ASGI servers, and AI integration.",
    href: "/docs/backend/python",
    badge: "Backend",
    icon: "🐍",
    accent: "amber",
  },
  {
    name: "Docker",
    category: "devops",
    categoryLabel: "Containerization",
    description: "Multi-stage builds, cache mounts, rootless containers, and compose stacks.",
    href: "/docs/devops/docker",
    badge: "Containers",
    icon: "🐳",
    accent: "blue",
  },
  {
    name: "Kubernetes",
    category: "devops",
    categoryLabel: "Orchestration",
    description: "Pods, Deployments, StatefulSets, Ingress controllers, and Helm charts.",
    href: "/docs/devops/kubernetes",
    badge: "Orchestration",
    icon: "☸️",
    accent: "blue",
  },
  {
    name: "Nginx",
    category: "devops",
    categoryLabel: "Reverse Proxy",
    description: "SSL termination, upstream load balancing, rate limiting, and caching headers.",
    href: "/docs/devops/nginx",
    badge: "Web Server",
    icon: "🌐",
    accent: "emerald",
  },
  {
    name: "PostgreSQL",
    category: "database",
    categoryLabel: "Relational DB",
    description: "ACID transactions, EXPLAIN ANALYZE, BTREE indexing, and PgBouncer connection pooling.",
    href: "/docs/databases/postgresql",
    badge: "SQL DB",
    icon: "🐘",
    accent: "blue",
  },
  {
    name: "Redis",
    category: "database",
    categoryLabel: "In-Memory Cache",
    description: "Key-value stores, distributed pub/sub, rate limiting, and cluster replication.",
    href: "/docs/databases/redis",
    badge: "Cache",
    icon: "⚡",
    accent: "rose",
  },
  {
    name: "Git",
    category: "tools",
    categoryLabel: "Version Control",
    description: "Interactive rebase, squash commits, bisect debugging, and branch strategies.",
    href: "/docs/tools/git",
    badge: "CLI Tool",
    icon: "🐙",
    accent: "amber",
  },
  {
    name: "Linux SysAdmin",
    category: "tools",
    categoryLabel: "Operating System",
    description: "Systemd services, socket inspect, SSH hardening, and kernel permissions.",
    href: "/docs/devops/linux",
    badge: "OS & Shell",
    icon: "🐧",
    accent: "amber",
  },
];

const categoryTabs = [
  { id: "all", label: "All Technologies" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & APIs" },
  { id: "devops", label: "DevOps & Cloud" },
  { id: "database", label: "Databases" },
  { id: "tools", label: "Tools & OS" },
];

export function InteractiveTechMatrix() {
  const [activeCategory, setActiveCategory] = React.useState<TechCategory>("all");

  const filteredItems = React.useMemo(() => {
    if (activeCategory === "all") return techItems;
    return techItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section aria-labelledby="matrix-heading" className="container-site py-20 sm:py-28">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyan-500/15 bg-cyan-500/5 dark:bg-cyan-500/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Technology Ecosystem
          </span>
        </div>
        <h2
          id="matrix-heading"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
        >
          Explore by Technology
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Comprehensive, production-tested guides for the modern developer toolkit.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categoryTabs.map((tab) => {
          const isSelected = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id as TechCategory)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                  : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/80"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((tech) => (
          <Link
            key={tech.name}
            href={tech.href}
            className={cn(
              "group relative flex flex-col justify-between p-5 rounded-2xl border",
              "border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm",
              "hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-900",
              "card-interactive card-gradient-border"
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl select-none">{tech.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tech.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {tech.categoryLabel}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" size="sm" className="text-[10px]">
                  {tech.badge}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                {tech.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>View Documentation</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
