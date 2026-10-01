import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Code2,
  Cpu,
  Layers,
  Heart,
  CheckCircle2,
  FileText,
  BookOpen,
  Terminal,
  Users,
  Star,
  Globe,
  Scale,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { comparisonList } from "@/lib/vs-data";
import {
  homepageCategories,
  homepageLearningPaths,
  popularCommands,
  commonErrors,
  practicalRecipes,
  developerTools,
  recentDocs,
} from "@/config/homepage-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchButton } from "@/components/ui/search-button";
import { SkipNav } from "@/components/ui/skip-nav";
import { GithubIcon } from "@/components/ui/icons";
import {
  CategoryCard,
  RoadmapCard,
  CommandCard,
  ErrorCard,
  RecipeCard,
  ToolCard,
  RecentDocCard,
} from "@/components/homepage-cards";
import { AnimatedHeroBackground } from "@/components/ui/animated-hero";
import { HeroShowcase } from "@/components/ui/hero-showcase";
import { BentoGridShowcase } from "@/components/ui/bento-grid";
import { InteractiveTechMatrix } from "@/components/ui/interactive-tech-matrix";
import { buildPageMetadata, generateWebSiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    "A community-driven open-source developer knowledge platform for learning technologies, finding commands, solving errors, and building production-ready software.",
  urlPath: "/",
  ogType: "website",
});

const quickStartTracks = [
  {
    title: "Web Fundamentals",
    category: "Beginner Track",
    level: "Foundational",
    guidesCount: "24 Guides",
    description: "HTML5 semantic structure, modern CSS flexbox & grid, and JavaScript ES6+ execution models.",
    href: "/docs",
    icon: <Code2 className="size-4" />,
    color: "blue" as const,
    topics: ["HTML5 Semantics", "CSS Grid & Flexbox", "ES6+ Runtime", "DOM Manipulation"],
  },
  {
    title: "React & Next.js",
    category: "Frontend & Full Stack",
    level: "Production",
    guidesCount: "42 Guides",
    description: "Component lifecycle, state hooks, Server Actions, App Router routing, and SSR performance.",
    href: "/docs",
    icon: <Layers className="size-4" />,
    color: "purple" as const,
    topics: ["Server Actions", "App Router", "Streaming SSR", "React Hooks"],
  },
  {
    title: "Backend & Databases",
    category: "Server Engineering",
    level: "Intermediate",
    guidesCount: "36 Guides",
    description: "REST & GraphQL APIs, Node.js runtimes, PostgreSQL schemas, indexing, and authentication.",
    href: "/docs",
    icon: <Cpu className="size-4" />,
    color: "emerald" as const,
    topics: ["Node.js Runtimes", "REST & GraphQL", "PostgreSQL Pool", "JWT & Sessions"],
  },
  {
    title: "Linux & DevOps",
    category: "Infrastructure",
    level: "Advanced",
    guidesCount: "28 Guides",
    description: "Docker multi-stage builds, shell automation, Nginx reverse proxies, and CI/CD pipelines.",
    href: "/docs",
    icon: <Zap className="size-4" />,
    color: "amber" as const,
    topics: ["Multi-stage Docker", "Nginx HTTP/3", "Shell Automation", "CI/CD Pipelines"],
  },
];

const colorMap = {
  blue: {
    iconBg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    hoverBorder: "hover:border-blue-500/50",
  },
  purple: {
    iconBg: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    hoverBorder: "hover:border-purple-500/50",
  },
  emerald: {
    iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/50",
  },
  amber: {
    iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    hoverBorder: "hover:border-amber-500/50",
  },
};

export default function HomePage() {
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <JsonLd data={websiteJsonLd} />
      <SkipNav />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* ══════════════════════════════════════════════════════
            SECTION 1: HERO + GLOBAL SEARCH — Premium Animated
        ══════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="hero-heading"
          className="hero-section relative py-24 sm:py-32 lg:py-40"
        >
          {/* Animated Background Layer */}
          <AnimatedHeroBackground />

          {/* Bottom Gradient Fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent z-[1]"
            aria-hidden="true"
          />

          <div className="container-site relative z-10 text-center">
            {/* Announcement Pill */}
            <div className="fade-in-up stagger-1 inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full announcement-pill bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-sm">
              <span className="flex items-center justify-center size-5 rounded-full bg-blue-500/10">
                <Sparkles className="size-3 text-blue-500 animate-pulse" aria-hidden="true" />
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Free & Open-Source Developer Knowledge Platform
              </span>
              <ArrowRight className="size-3.5 text-slate-400" aria-hidden="true" />
            </div>

            {/* Main Brand & Tagline */}
            <h1
              id="hero-heading"
              className="fade-in-up stagger-2 text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-5xl mx-auto mb-6"
            >
              <span className="text-slate-900 dark:text-white">OpenDevDocs</span>
              <br />
              <span className="gradient-text">{siteConfig.tagline}</span>
            </h1>

            {/* Subtitle */}
            <p className="fade-in-up stagger-3 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              A community-driven open-source developer knowledge platform for learning technologies, finding commands, solving errors, and building production-ready software.
            </p>

            {/* Search Trigger */}
            <div className="fade-in-up stagger-4 max-w-xl mx-auto mb-10 flex justify-center">
              <SearchButton variant="full" className="w-full max-w-lg h-14 px-5 text-base rounded-2xl shadow-xl shadow-blue-500/8 border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-sm mx-auto" />
            </div>

            {/* Hero CTAs */}
            <div className="fade-in-up stagger-5 flex flex-wrap items-center justify-center gap-4">
              <Link href="/docs">
                <Button size="lg" className="rounded-2xl shadow-xl shadow-blue-600/25 btn-glow btn-shimmer h-12 px-8 text-base font-semibold">
                  <span>Start Learning</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="rounded-2xl h-12 px-8 text-base border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm">
                  <span>Browse Docs</span>
                </Button>
              </Link>
              <a
                href={`${siteConfig.github}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="lg" className="rounded-2xl h-12 px-6 text-base text-slate-600 dark:text-slate-400 gap-2.5">
                  <GithubIcon className="size-5" />
                  <span>Contribute</span>
                </Button>
              </a>
            </div>

            {/* Stats Bar */}
            <div className="fade-in-up mt-16 mb-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-center">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-blue-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">200+ Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-emerald-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">500+ Commands</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-purple-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">25+ Technologies</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-4 text-rose-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Community Driven</span>
              </div>
            </div>

            {/* Interactive Showcase Centerpiece */}
            <div className="fade-in-up stagger-5">
              <HeroShowcase />
            </div>
          </div>
        </section>

        {/* ── Section 2: Start Learning Tracks ── */}
        <section
          aria-labelledby="start-learning-heading"
          className="container-site py-20 sm:py-28"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-blue-500/15 bg-blue-500/5 dark:bg-blue-500/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Core Curriculum
                </span>
              </div>
              <h2
                id="start-learning-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Start Learning
              </h2>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors"
            >
              <span>Explore all modules</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartTracks.map((track) => {
              const colors = colorMap[track.color];
              return (
                <Link
                  key={track.title}
                  href={track.href}
                  className={`group relative flex flex-col justify-between p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0c0c0e] transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5 ${colors.hoverBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`p-2 rounded-xl ${colors.iconBg}`}>
                        {track.icon}
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                        {track.level}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                      {track.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                      {track.description}
                    </p>

                    {/* Topic Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {track.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-zinc-100 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800/60"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[11px] font-normal">
                      {track.guidesCount}
                    </span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Start track <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Gradient Divider */}
        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 3: Next.js Style Bento Grid Platform Overview ── */}
        <BentoGridShowcase />

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 4: Browse by Category ── */}
        <section
          aria-labelledby="categories-heading"
          className="container-site py-20 sm:py-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-blue-500/15 bg-blue-500/5 dark:bg-blue-500/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Knowledge Organization
              </span>
            </div>
            <h2
              id="categories-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
            >
              Browse by Category
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Systematic guides and references across every layer of the modern developer stack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {homepageCategories.map((category) => (
              <CategoryCard key={category.id} item={category} />
            ))}
          </div>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 5: Learning Paths (Roadmaps) ── */}
        <section
          aria-labelledby="roadmaps-heading"
          className="py-20 sm:py-28 section-alt bg-dot-pattern"
        >
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-purple-500/15 bg-purple-500/5 dark:bg-purple-500/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Structured Roadmaps
                  </span>
                </div>
                <h2
                  id="roadmaps-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
                >
                  Developer Learning Paths
                </h2>
              </div>
              <Link
                href="/roadmaps"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline underline-offset-4"
              >
                <span>View all roadmap trees</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {homepageLearningPaths.map((path) => (
                <RoadmapCard key={path.id} item={path} />
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 6: Head-to-Head Technology VS Comparisons ── */}
        <section
          aria-labelledby="vs-heading"
          className="container-site py-20 sm:py-28"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-indigo-500/15 bg-indigo-500/5 dark:bg-indigo-500/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Head-to-Head Architecture
                </span>
              </div>
              <h2
                id="vs-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Technology VS Comparisons
              </h2>
            </div>
            <Link
              href="/vs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4"
            >
              <span>Explore all matchups</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {comparisonList.slice(0, 3).map((vsItem) => (
              <Link
                key={vsItem.slug}
                href={`/vs/${vsItem.slug}`}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] hover:border-indigo-500/50 hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {vsItem.category}
                    </span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Compare <ArrowRight className="size-3" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {vsItem.title}
                  </h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {vsItem.verdict}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{vsItem.matrix.length} Matrix Points</span>
                  <span>Side-by-Side Code</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 6: Interactive Technology Matrix ── */}
        <InteractiveTechMatrix />

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 6: Popular Commands ── */}
        <section
          aria-labelledby="commands-heading"
          className="py-20 sm:py-28 section-alt bg-dot-pattern"
        >
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-emerald-500/15 bg-emerald-500/5 dark:bg-emerald-500/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    CLI References
                  </span>
                </div>
                <h2
                  id="commands-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
                >
                  Popular Commands
                </h2>
              </div>
              <Link
                href="/commands"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4"
              >
                <span>Browse full command index</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {popularCommands.map((command) => (
                <CommandCard key={command.title} item={command} />
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 7: Common Errors ── */}
        <section
          aria-labelledby="errors-heading"
          className="container-site py-20 sm:py-28"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-rose-500/15 bg-rose-500/5 dark:bg-rose-500/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Troubleshooting
                </span>
              </div>
              <h2
                id="errors-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Common Errors & Root Causes
              </h2>
            </div>
            <Link
              href="/errors"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:underline underline-offset-4"
            >
              <span>Search error database</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {commonErrors.map((error) => (
              <ErrorCard key={error.title} item={error} />
            ))}
          </div>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 8: Practical Recipes ── */}
        <section
          aria-labelledby="recipes-heading"
          className="py-20 sm:py-28 section-alt bg-dot-pattern"
        >
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-purple-500/15 bg-purple-500/5 dark:bg-purple-500/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Cookbook Solutions
                  </span>
                </div>
                <h2
                  id="recipes-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
                >
                  Practical Production Recipes
                </h2>
              </div>
              <Link
                href="/recipes"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline underline-offset-4"
              >
                <span>Explore all recipes</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {practicalRecipes.map((recipe) => (
                <RecipeCard key={recipe.title} item={recipe} />
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 9: Developer Tools ── */}
        <section
          aria-labelledby="tools-heading"
          className="container-site py-20 sm:py-28"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-blue-500/15 bg-blue-500/5 dark:bg-blue-500/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Workflow Enhancement
                </span>
              </div>
              <h2
                id="tools-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Developer Tools & Workflows
              </h2>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
            >
              <span>View all tooling guides</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {developerTools.map((tool) => (
              <ToolCard key={tool.name} item={tool} />
            ))}
          </div>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* ── Section 10: Latest / Recently Updated ── */}
        <section
          aria-labelledby="recent-heading"
          className="py-20 sm:py-28 section-alt bg-dot-pattern"
        >
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-emerald-500/15 bg-emerald-500/5 dark:bg-emerald-500/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Fresh & Verified Content
                  </span>
                </div>
                <h2
                  id="recent-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
                >
                  Recently Verified Documentation
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentDocs.map((doc) => (
                <RecentDocCard key={doc.title} item={doc} />
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* ══════════════════════════════════════════════════════
            SECTION 11: CONTRIBUTION CTA — Premium Design
        ══════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="contribution-heading"
          className="container-site py-24 lg:py-32"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 dark:from-blue-600/10 dark:via-purple-600/8 dark:to-cyan-600/5"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-dot-pattern opacity-40"
              aria-hidden="true"
            />

            {/* Gradient border effect */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                padding: '1px',
                background: 'linear-gradient(135deg, hsl(224, 80%, 60% / 0.3), hsl(265, 80%, 60% / 0.2), hsl(190, 80%, 60% / 0.15), transparent 60%)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
              aria-hidden="true"
            />

            {/* Orb glows */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative p-10 sm:p-14 lg:p-20 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full announcement-pill bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
                <Heart className="size-3.5 text-rose-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  100% Community Driven
                </span>
              </div>

              <h2
                id="contribution-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-5"
              >
                Contribute to{" "}
                <span className="gradient-text">OpenDevDocs</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                OpenDevDocs is built on a <strong className="font-semibold text-slate-900 dark:text-slate-100">Markdown-first</strong> philosophy. Over 90% of our content lives in plain Markdown files with YAML frontmatter. You don&apos;t need React knowledge — just fork the repo, create or update a guide, and submit a pull request.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-12 text-left">
                <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm card-interactive">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 inline-flex mb-3">
                    <FileText className="size-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1.5">Plain Markdown</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Write standard .md files with simple, intuitive frontmatter headers.</p>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm card-interactive">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 inline-flex mb-3">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1.5">Automated CI Linter</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Built-in validator scripts ensure frontmatter and link integrity instantly.</p>
                </div>
                <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm card-interactive">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 inline-flex mb-3">
                    <GithubIcon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1.5">Fast PR Review</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Community reviews with clear contribution standards and guidelines.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`${siteConfig.github}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="rounded-2xl shadow-xl shadow-blue-600/20 btn-glow btn-shimmer h-12 px-8">
                    <span>Read Contribution Guide</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="rounded-2xl h-12 px-8 border-slate-300 dark:border-slate-700">
                    <Star className="size-4" />
                    <span>Star on GitHub</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
