import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Scale,
  CheckCircle2,
  Zap,
  BookOpen,
  Terminal,
  FileCode2,
  AlertTriangle,
  Code2,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";
import { comparisonList } from "@/lib/vs-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisonList.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const item = comparisonList.find((c) => c.slug === slug);
  if (!item) return { title: "Comparison Not Found" };

  return {
    title: `${item.title}: In-Depth Architecture, Benchmarks & Code Comparison | OpenDevDocs`,
    description: item.verdict,
    openGraph: {
      title: `${item.title}: In-Depth Architecture & Code Comparison`,
      description: item.verdict,
      url: `https://docs.tashanto.com/vs/${item.slug}`,
    },
  };
}

export default async function VsDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const item = comparisonList.find((c) => c.slug === slug);
  if (!item) notFound();

  const articleJsonLd = generateArticleJsonLd({
    title: `${item.title} Comparison`,
    description: item.verdict,
    urlPath: `/vs/${item.slug}`,
    category: "vs",
    tags: [item.techA.name, item.techB.name, "comparison", item.category.toLowerCase()],
    lastVerified: "2026-10-01",
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/vs" },
    { name: item.title, url: `/vs/${item.slug}` },
  ];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <SiteHeader />

      <main className="flex-1 py-10 sm:py-16">
        <div className="container-site max-w-5xl mx-auto space-y-12">
          {/* ── Breadcrumb & Back Link ── */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/vs"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to all comparisons</span>
            </Link>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80">
              {item.category}
            </span>
          </div>

          {/* ── Header Duel Banner ── */}
          <div className="p-6 sm:p-10 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-gradient-to-b from-zinc-50 to-white dark:from-[#0c0c0e] dark:to-[#09090b] shadow-xl shadow-black/5 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
              <Scale className="size-3.5" />
              <span>HEAD-TO-HEAD COMPARISON</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {item.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {item.tagline}
            </p>

            {/* Duel Snapshot Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto pt-4 text-left">
              {/* Tech A Card */}
              <div className="p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400 font-bold">Option A</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    {item.techA.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {item.techA.name}
                </h3>
                <div className="text-xs text-zinc-500 space-y-1 pt-1 font-mono">
                  <p><strong className="text-zinc-700 dark:text-zinc-300">Maintainer:</strong> {item.techA.maintainer}</p>
                  <p><strong className="text-zinc-700 dark:text-zinc-300">Runtime:</strong> {item.techA.runtime}</p>
                  <p><strong className="text-zinc-700 dark:text-zinc-300">Paradigm:</strong> {item.techA.paradigm}</p>
                </div>
              </div>

              {/* Tech B Card */}
              <div className="p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">Option B</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    {item.techB.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {item.techB.name}
                </h3>
                <div className="text-xs text-zinc-500 space-y-1 pt-1 font-mono">
                  <p><strong className="text-zinc-700 dark:text-zinc-300">Maintainer:</strong> {item.techB.maintainer}</p>
                  <p><strong className="text-zinc-700 dark:text-zinc-300">Runtime:</strong> {item.techB.runtime}</p>
                  <p><strong className="text-zinc-700 dark:text-zinc-300">Paradigm:</strong> {item.techB.paradigm}</p>
                </div>
              </div>
            </div>

            {/* Quick Verdict Banner */}
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 text-left max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="size-4 text-blue-600 dark:text-blue-400" />
                <strong className="text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300">
                  Engineering Verdict
                </strong>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {item.verdict}
              </p>
            </div>
          </div>

          {/* ── Feature Comparison Matrix ── */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="size-5 text-blue-500" />
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Detailed Feature Matrix
              </h2>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-50 dark:bg-[#0c0c0e] border-b border-zinc-200/80 dark:border-zinc-800 text-xs font-mono text-zinc-500">
                    <tr>
                      <th className="p-4 font-semibold w-1/4">Feature / Aspect</th>
                      <th className="p-4 font-semibold w-5/12 text-blue-600 dark:text-blue-400">{item.techA.name}</th>
                      <th className="p-4 font-semibold w-5/12 text-emerald-600 dark:text-emerald-400">{item.techB.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800">
                    {item.matrix.map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                        <td className="p-4 font-semibold text-zinc-900 dark:text-white align-top">
                          {row.feature}
                        </td>
                        <td className="p-4 text-zinc-700 dark:text-zinc-300 leading-relaxed align-top">
                          <div className="space-y-1.5">
                            <p>{row.techA}</p>
                            {row.advantage === "techA" && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                                ✓ Advantage
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-zinc-700 dark:text-zinc-300 leading-relaxed align-top">
                          <div className="space-y-1.5">
                            <p>{row.techB}</p>
                            {row.advantage === "techB" && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                                ✓ Advantage
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Benchmarks & Performance ── */}
          {item.benchmarks.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-emerald-500" />
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Real-World Benchmarks & Efficiency
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {item.benchmarks.map((bench, bi) => (
                  <div
                    key={bi}
                    className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] shadow-sm space-y-3"
                  >
                    <span className="text-xs font-mono font-semibold uppercase text-zinc-500 block">
                      {bench.metric}
                    </span>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                        <span className="text-zinc-600 dark:text-zinc-400">{item.techA.name.split(" ")[0]}</span>
                        <strong className="text-zinc-900 dark:text-white">{bench.techA}</strong>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                        <span className="text-zinc-600 dark:text-zinc-400">{item.techB.name.split(" ")[0]}</span>
                        <strong className="text-zinc-900 dark:text-white">{bench.techB}</strong>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-2">
                      {bench.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Dual-Pane Side-by-Side Code Comparison ── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Code2 className="size-5 text-purple-500" />
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Side-by-Side Code Implementation
                </h2>
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <strong>Task:</strong> {item.codeComparison.problem}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Code A */}
              <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-md flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                  <span>{item.codeComparison.filenameA}</span>
                  <span className="text-[10px] text-zinc-400 uppercase">{item.codeComparison.languageA}</span>
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-800 dark:text-zinc-200 flex-1">
                  <pre>
                    <code>{item.codeComparison.codeA}</code>
                  </pre>
                </div>
              </div>

              {/* Code B */}
              <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-md flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>{item.codeComparison.filenameB}</span>
                  <span className="text-[10px] text-zinc-400 uppercase">{item.codeComparison.languageB}</span>
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-800 dark:text-zinc-200 flex-1">
                  <pre>
                    <code>{item.codeComparison.codeB}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* ── Decision Guide (When to Pick Which) ── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Decision Guide: When to Choose Which?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pick Tech A */}
              <div className="p-6 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/10 space-y-4">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300">
                  Choose {item.techA.name} If:
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  {item.decisionGuide.chooseA.map((reason, ri) => (
                    <li key={ri} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pick Tech B */}
              <div className="p-6 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10 space-y-4">
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
                  Choose {item.techB.name} If:
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  {item.decisionGuide.chooseB.map((reason, ri) => (
                    <li key={ri} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Related OpenDevDocs Learning Guides ── */}
          {item.relatedGuides.length > 0 && (
            <section className="p-6 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0c0c0e] space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <BookOpen className="size-4.5 text-blue-500" />
                <span>Deepen Your Knowledge in OpenDevDocs</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {item.relatedGuides.map((guide, gi) => (
                  <Link
                    key={gi}
                    href={guide.href}
                    className="flex items-center justify-between gap-2 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#09090b] hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-xs font-medium transition-all group"
                  >
                    <span className="text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                      {guide.title}
                    </span>
                    <ArrowRight className="size-3.5 text-zinc-400 group-hover:text-blue-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
