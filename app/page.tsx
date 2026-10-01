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
} from "lucide-react";
import { siteConfig } from "@/config/site";
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
    description: "HTML5 semantic structure, modern CSS flexbox & grid, and JavaScript ES6+ execution models.",
    href: "/docs",
    icon: <Code2 className="size-5" />,
    color: "blue" as const,
  },
  {
    title: "React & Next.js",
    category: "Frontend & Full Stack",
    description: "Component lifecycle, state hooks, Server Actions, App Router routing, and SSR performance.",
    href: "/docs",
    icon: <Layers className="size-5" />,
    color: "purple" as const,
  },
  {
    title: "Backend & Databases",
    category: "Server Engineering",
    description: "REST & GraphQL APIs, Node.js runtimes, PostgreSQL schemas, indexing, and authentication.",
    href: "/docs",
    icon: <Cpu className="size-5" />,
    color: "emerald" as const,
  },
  {
    title: "Linux & DevOps",
    category: "Infrastructure",
    description: "Docker multi-stage builds, shell automation, Nginx reverse proxies, and CI/CD pipelines.",
    href: "/docs",
    icon: <Zap className="size-5" />,
    color: "amber" as const,
  },
];

const colorMap = {
  blue: {
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-500/40 dark:hover:border-blue-500/40",
  },
  purple: {
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    hoverBorder: "hover:border-purple-500/40 dark:hover:border-purple-500/40",
  },
  emerald: {
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/40 dark:hover:border-emerald-500/40",
  },
  amber: {
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-500/40 dark:hover:border-amber-500/40",
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
            <div className="fade-in-up stagger-4 max-w-xl mx-auto mb-10">
              <SearchButton variant="full" className="w-full h-14 px-5 text-base rounded-2xl shadow-xl shadow-blue-500/8 border-slate-200/80 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickStartTracks.map((track) => {
              const colors = colorMap[track.color];
              return (
                <Link
                  key={track.title}
                  href={track.href}
                  className={`group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm ${colors.hoverBorder} card-interactive card-gradient-border`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-xl ${colors.iconBg} ring-1 ring-inset ring-current/10`}>
                        {track.icon}
                      </div>
                      <Badge variant="secondary" size="sm" className="text-[10px]">
                        {track.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                      {track.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-sm font-semibold text-blue-600 dark:text-blue-400">
                    <span>Start track</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
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
