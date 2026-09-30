import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Terminal, BookOpen, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { siteConfig, contentSections } from "@/config/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cards, InteractiveCard } from "@/components/ui/card";
import { SearchButton } from "@/components/ui/search-button";
import { SkipNav } from "@/components/ui/skip-nav";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

const audienceRoles = [
  { label: "Beginners", icon: "🌱" },
  { label: "Frontend", icon: "🎨" },
  { label: "Backend", icon: "⚙️" },
  { label: "Full-Stack", icon: "🔀" },
  { label: "Mobile", icon: "📱" },
  { label: "DevOps", icon: "🚀" },
  { label: "SysAdmin", icon: "🖥️" },
  { label: "Engineers", icon: "🏗️" },
];

const features = [
  {
    icon: <Terminal className="size-5 text-blue-600 dark:text-blue-400" />,
    title: "Command & Error First",
    description:
      "Find the exact command flags, syntax, or error solutions immediately without scrolling through pages of fluff.",
  },
  {
    icon: <BookOpen className="size-5 text-emerald-600 dark:text-emerald-400" />,
    title: "Markdown Authoring",
    description:
      "~90% plain Markdown files. Anyone in the community can contribute docs and fixes with just a pull request.",
  },
  {
    icon: <Zap className="size-5 text-amber-600 dark:text-amber-400" />,
    title: "Instant Global Search",
    description:
      "Full-text search indexed across all 7 collections. Press ⌘K anywhere on the site to jump directly to any topic.",
  },
  {
    icon: <ShieldCheck className="size-5 text-purple-600 dark:text-purple-400" />,
    title: "Strict Quality Control",
    description:
      "Every document is reviewed for technical accuracy, copy-paste reliability, and clear root-cause explanations.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SkipNav />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* ── Hero Section ── */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden hero-gradient grid-pattern border-b border-slate-200/80 dark:border-slate-800/80 py-20 sm:py-28 lg:py-32"
        >
          <div className="container-site text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
              <span>Open-Source Developer Knowledge Platform</span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6"
            >
              The Modern Developer <br className="hidden sm:inline" />
              <span className="gradient-text">Documentation Platform</span>
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              <strong className="font-semibold text-slate-900 dark:text-slate-200">
                {siteConfig.tagline}
              </strong>{" "}
              — Learn technologies step-by-step, find commands quickly, debug errors with root-cause fixes, and deploy to production.
            </p>

            {/* Search Trigger in Hero */}
            <div className="max-w-md mx-auto mb-8">
              <SearchButton variant="full" className="w-full h-11 px-4 text-sm rounded-xl shadow-md shadow-blue-500/5" />
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
              <Link href="/docs">
                <Button size="lg" className="rounded-xl shadow-lg shadow-blue-600/20">
                  <span>Start Learning</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/commands">
                <Button variant="outline" size="lg" className="rounded-xl">
                  <span>Browse Commands</span>
                  <Terminal className="size-4 ml-1" aria-hidden="true" />
                </Button>
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="lg" className="rounded-xl text-slate-600 dark:text-slate-400">
                  <span>GitHub</span>
                </Button>
              </a>
            </div>

            {/* Target Audiences */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">
                Built For:
              </span>
              {audienceRoles.map((role) => (
                <Badge
                  key={role.label}
                  variant="secondary"
                  size="sm"
                  className="bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <span className="mr-1">{role.icon}</span>
                  <span>{role.label}</span>
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7 Content Sections Grid ── */}
        <section
          aria-labelledby="sections-heading"
          className="container-site py-20 lg:py-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2
              id="sections-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
            >
              Seven Core Knowledge Hubs
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Organized systematically so you can move from learning concepts to debugging production code in seconds.
            </p>
          </div>

          <Cards columns={3}>
            {contentSections.map((section) => (
              <InteractiveCard
                key={section.key}
                href={section.href}
                icon={<span>{section.icon}</span>}
                title={section.label}
                description={section.description}
                badge={
                  <Badge variant="brand" size="sm">
                    {section.key}
                  </Badge>
                }
              />
            ))}
          </Cards>
        </section>

        {/* ── Key Platform Principles ── */}
        <section
          aria-labelledby="principles-heading"
          className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/30 py-20 lg:py-28"
        >
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2
                id="principles-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
              >
                Built For Developer Productivity
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                Designed to eliminate friction, outdated tutorials, and fragmented documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-center size-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/50">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contribution CTA ── */}
        <section className="container-site py-20 lg:py-28">
          <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50/50 via-slate-50/50 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
              Join the Open-Source Knowledge Effort
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              OpenDevDocs is 100% open source. Help other developers by adding command references, fixing typos, documenting error solutions, or writing practical recipes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`${siteConfig.github}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="rounded-xl shadow-md">
                  <span>Read Contribution Guide</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="rounded-xl">
                  <span>Star on GitHub</span>
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
