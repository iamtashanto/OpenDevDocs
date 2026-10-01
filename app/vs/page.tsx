import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { comparisonList } from "@/lib/vs-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Technology Comparisons & Architecture Trade-offs | OpenDevDocs",
  description:
    "In-depth, head-to-head engineering comparisons: Next.js vs Vue, Node.js vs Go, PostgreSQL vs MongoDB, Docker vs Kubernetes, REST vs GraphQL with benchmarks, side-by-side code, and architectural trade-offs.",
  openGraph: {
    title: "Technology Comparisons & Architecture Trade-offs | OpenDevDocs",
    description:
      "Compare modern technologies side-by-side: benchmarks, developer ergonomics, architectural trade-offs, and side-by-side code snippets.",
    url: "https://docs.tashanto.com/vs",
  },
};

export default function VsIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden bg-gradient-to-b from-zinc-50/80 via-white to-white dark:from-[#0c0c0e] dark:via-[#09090b] dark:to-[#09090b]">
          <div className="container-site relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-6">
              <Scale className="size-3.5" />
              <span>HEAD-TO-HEAD ENGINEERING BENCHMARKS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
              <span>Technology </span>
              <span className="gradient-text">VS Comparisons</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Objective, production-grade architectural comparisons. Analyze execution models, benchmarks, developer ergonomics, and side-by-side code to pick the right tool for your next system.
            </p>
          </div>
        </section>

        {/* ── Comparison Cards Grid ── */}
        <section className="py-12 sm:py-16">
          <div className="container-site max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {comparisonList.map((item) => (
                <Link
                  key={item.slug}
                  href={`/vs/${item.slug}`}
                  className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0e] hover:border-blue-500/50 dark:hover:border-blue-500/40 shadow-lg shadow-black/3 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300"
                >
                  <div>
                    {/* Top Category Badge & Arrow */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                        <span>View Analysis</span>
                        <ArrowRight className="size-3.5" />
                      </div>
                    </div>

                    {/* Dual Matchup Header */}
                    <div className="flex items-center justify-between gap-3 my-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200/70 dark:border-zinc-800/80">
                      <div className="flex-1 text-left min-w-0">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">Option A</span>
                        <strong className="text-sm font-bold text-zinc-900 dark:text-white truncate block">
                          {item.techA.name}
                        </strong>
                      </div>

                      <div className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-xs font-black text-zinc-500 dark:text-zinc-400 shrink-0">
                        VS
                      </div>

                      <div className="flex-1 text-right min-w-0">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">Option B</span>
                        <strong className="text-sm font-bold text-zinc-900 dark:text-white truncate block">
                          {item.techB.name}
                        </strong>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-4">
                      {item.title}
                    </h2>
                    <p className="text-xs text-zinc-500 font-mono mt-1">
                      {item.tagline}
                    </p>

                    {/* Verdict Teaser */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 line-clamp-3 leading-relaxed">
                      {item.verdict}
                    </p>
                  </div>

                  {/* Highlights Footer */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>{item.matrix.length} Feature Tests</span>
                    <span>{item.benchmarks.length} Benchmarks</span>
                    <span>Dual Code Samples</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
