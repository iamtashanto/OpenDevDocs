"use client";

import * as React from "react";
import Link from "next/link";
import {
  Terminal,
  CheckCircle2,
  Layers,
  ArrowRight,
  GitPullRequest,
  Shield,
  Boxes,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BentoGridShowcase() {
  const [activeRoadmapStep, setActiveRoadmapStep] = React.useState(1);

  const roadmapSteps = [
    { title: "HTML & CSS Architecture", desc: "Semantic DOM, Flexbox, CSS Grid, Responsive Tokens" },
    { title: "React & Next.js Server Components", desc: "Streaming SSR, Server Actions, Hydration Boundaries" },
    { title: "Node.js & Go API Engineering", desc: "REST & GraphQL APIs, JWT Auth, Connection Pooling" },
    { title: "Production Containerization", desc: "Multi-stage Docker, Nginx Reverse Proxy, CI/CD" },
  ];

  return (
    <section aria-labelledby="bento-heading" className="container-site py-20 sm:py-28">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-blue-500/15 bg-blue-500/5 dark:bg-blue-500/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Engineered for Developers
          </span>
        </div>
        <h2
          id="bento-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-4"
        >
          Everything You Need to Build <br className="hidden sm:inline" />
          <span className="gradient-text">Production-Grade Software</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          OpenDevDocs replaces scattered blog posts with systematic, verified, and battle-tested engineering references.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
        {/* ── CARD 1 (Large 8-col): Interactive Roadmap Engine ── */}
        <SpotlightCard
          className="lg:col-span-8 p-7 sm:p-9 flex flex-col justify-between"
          spotlightColor="rgba(59, 130, 246, 0.12)"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Layers className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Systematic Developer Roadmaps
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Step-by-step verified learning paths with milestone checkpoints
                  </p>
                </div>
              </div>
              <Badge variant="brand" size="sm">
                4 Core Tracks
              </Badge>
            </div>

            {/* Interactive Step Navigator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {roadmapSteps.map((step, idx) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActiveRoadmapStep(idx)}
                  className={cn(
                    "text-left p-3.5 rounded-xl border transition-all cursor-pointer",
                    activeRoadmapStep === idx
                      ? "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/40 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500/30"
                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      Phase 0{idx + 1}
                    </span>
                    {activeRoadmapStep === idx && (
                      <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-sm font-semibold mb-0.5">{step.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{step.desc}</p>
                </button>
              ))}
            </div>

            {/* Visual Progress Bar Flow */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">●</span>
                <span className="text-slate-400">Curriculum Target:</span>
                <strong className="text-white">{roadmapSteps[activeRoadmapStep].title}</strong>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                100% Free & Verified
              </span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Explore full roadmap trees</span>
              <ArrowRight className="size-4" />
            </Link>
            <span className="text-xs text-slate-500">Updated weekly</span>
          </div>
        </SpotlightCard>

        {/* ── CARD 2 (4-col): Real-Time CLI Cheatsheet ── */}
        <SpotlightCard
          className="lg:col-span-4 p-7 flex flex-col justify-between"
          spotlightColor="rgba(16, 185, 129, 0.12)"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Terminal className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  CLI Quick Reference
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant command syntax with breakdown
                </p>
              </div>
            </div>

            {/* Simulated Mini Terminal */}
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs space-y-3 mb-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-500 text-[11px]">
                <span>bash</span>
                <span>zsh • fish</span>
              </div>
              <div className="text-slate-200 select-all">
                <span className="text-emerald-400 mr-2">$</span>
                <span>git commit --amend --no-edit</span>
              </div>
              <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-semibold">Tip:</span> Modifies the last commit without prompting for message change.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <Link
              href="/commands"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Browse 500+ CLI commands</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </SpotlightCard>

        {/* ── CARD 3 (4-col): Production Recipes ── */}
        <SpotlightCard
          className="lg:col-span-4 p-7 flex flex-col justify-between"
          spotlightColor="rgba(168, 85, 247, 0.12)"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Boxes className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Cookbook Solutions
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ready-to-deploy blueprints
                </p>
              </div>
            </div>

            <div className="space-y-2.5 mb-4">
              {[
                { title: "JWT Auth with HTTP-Only Cookies", time: "5 min" },
                { title: "Cloudflare Origin SSL & Nginx Proxy", time: "8 min" },
                { title: "Redis Distributed Rate Limiter", time: "6 min" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate pr-2">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 font-mono shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>View all recipe blueprints</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </SpotlightCard>

        {/* ── CARD 4 (4-col): Error Troubleshooting Hub ── */}
        <SpotlightCard
          className="lg:col-span-4 p-7 flex flex-col justify-between"
          spotlightColor="rgba(244, 63, 94, 0.12)"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                <Shield className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Error Diagnostics
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Root cause analysis & verified fixes
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 space-y-2 mb-4">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-rose-600 dark:text-rose-400 font-bold">ECONNREFUSED 5432</span>
                <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-300">
                  Critical
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Database client pool connection limit reached. Solution: Add PgBouncer connection pooling.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <Link
              href="/errors"
              className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              <span>Search error database</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </SpotlightCard>

        {/* ── CARD 5 (4-col): 100% Markdown-First Open Ecosystem ── */}
        <SpotlightCard
          className="lg:col-span-4 p-7 flex flex-col justify-between"
          spotlightColor="rgba(59, 130, 246, 0.12)"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <GitPullRequest className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Markdown-First Architecture
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No React needed to contribute docs
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Standard .md files with YAML headers</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Automated CI linting on pull requests</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Fumadocs static indexing engine</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <a
              href="https://github.com/iamtashanto/OpenDevDocs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Fork on GitHub</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
