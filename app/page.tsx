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
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  homepageCategories,
  homepageLearningPaths,
  popularTechnologies,
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
    icon: <Code2 className="size-5 text-blue-500" />,
  },
  {
    title: "React & Next.js",
    category: "Frontend & Full Stack",
    description: "Component lifecycle, state hooks, Server Actions, App Router routing, and SSR performance.",
    href: "/docs",
    icon: <Layers className="size-5 text-purple-500" />,
  },
  {
    title: "Backend & Databases",
    category: "Server Engineering",
    description: "REST & GraphQL APIs, Node.js runtimes, PostgreSQL schemas, indexing, and authentication.",
    href: "/docs",
    icon: <Cpu className="size-5 text-emerald-500" />,
  },
  {
    title: "Linux & DevOps",
    category: "Infrastructure",
    description: "Docker multi-stage builds, shell automation, Nginx reverse proxies, and CI/CD pipelines.",
    href: "/docs",
    icon: <Zap className="size-5 text-amber-500" />,
  },
];

export default function HomePage() {
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <JsonLd data={websiteJsonLd} />
      <SkipNav />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* ── Section 1: Hero + Global Search ── */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden hero-gradient grid-pattern border-b border-slate-200/80 dark:border-slate-800/80 py-20 sm:py-28 lg:py-32"
        >
          <div className="container-site text-center">
            {/* Tagline Announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
              <span>Free & Open-Source Developer Knowledge Platform</span>
            </div>

            {/* Main Brand & Tagline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6"
            >
              OpenDevDocs
              <br />
              <span className="gradient-text">{siteConfig.tagline}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              A community-driven open-source developer knowledge platform for learning technologies, finding commands, solving errors, and building production-ready software.
            </p>

            {/* Search Trigger */}
            <div className="max-w-xl mx-auto mb-8">
              <SearchButton variant="full" className="w-full h-12 px-4 text-sm rounded-xl shadow-md shadow-blue-500/5" />
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link href="/docs">
                <Button size="lg" className="rounded-xl shadow-lg shadow-blue-600/20">
                  <span>Start Learning</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="rounded-xl">
                  <span>Browse Docs</span>
                </Button>
              </Link>
              <a
                href={`${siteConfig.github}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="lg" className="rounded-xl text-slate-600 dark:text-slate-400 gap-2">
                  <GithubIcon className="size-4" />
                  <span>Contribute on GitHub</span>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ── Section 2: Start Learning Tracks ── */}
        <section
          aria-labelledby="start-learning-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
                Core Curriculum
              </p>
              <h2
                id="start-learning-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Start Learning
              </h2>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Explore all documentation modules</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartTracks.map((track) => (
              <Link
                key={track.title}
                href={track.href}
                className="group flex flex-col justify-between p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 hover:border-blue-500/40 dark:hover:border-blue-500/40 card-interactive"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                      {track.icon}
                    </div>
                    <Badge variant="secondary" size="sm">
                      {track.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Start track</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Section 3: Browse by Category ── */}
        <section
          aria-labelledby="categories-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
              Knowledge Organization
            </p>
            <h2
              id="categories-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2"
            >
              Browse by Category
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Systematic guides and references across every layer of the modern developer stack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {homepageCategories.map((category) => (
              <CategoryCard key={category.id} item={category} />
            ))}
          </div>
        </section>

        {/* ── Section 4: Learning Paths (Roadmaps) ── */}
        <section
          aria-labelledby="roadmaps-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
                Structured Roadmaps
              </p>
              <h2
                id="roadmaps-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Developer Learning Paths
              </h2>
            </div>
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>View all roadmap trees</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {homepageLearningPaths.map((path) => (
              <RoadmapCard key={path.id} item={path} />
            ))}
          </div>
        </section>

        {/* ── Section 5: Popular Technologies ── */}
        <section
          aria-labelledby="technologies-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
              Ecosystem
            </p>
            <h2
              id="technologies-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2"
            >
              Popular Technologies
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Deep, comprehensive coverage for the languages, libraries, and frameworks you use every day.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {popularTechnologies.map((tech) => (
              <Link
                key={tech.name}
                href={tech.href}
                className="group flex items-center gap-3 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-900 card-interactive"
              >
                <span className="text-2xl select-none shrink-0">{tech.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {tech.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">{tech.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Section 6: Popular Commands ── */}
        <section
          aria-labelledby="commands-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                CLI References
              </p>
              <h2
                id="commands-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Popular Commands
              </h2>
            </div>
            <Link
              href="/commands"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Browse full command index</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularCommands.map((command) => (
              <CommandCard key={command.title} item={command} />
            ))}
          </div>
        </section>

        {/* ── Section 7: Common Errors ── */}
        <section
          aria-labelledby="errors-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1.5">
                Troubleshooting
              </p>
              <h2
                id="errors-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Common Errors & Root Causes
              </h2>
            </div>
            <Link
              href="/errors"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              <span>Search error database</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {commonErrors.map((error) => (
              <ErrorCard key={error.title} item={error} />
            ))}
          </div>
        </section>

        {/* ── Section 8: Practical Recipes ── */}
        <section
          aria-labelledby="recipes-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1.5">
                Cookbook Solutions
              </p>
              <h2
                id="recipes-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Practical Production Recipes
              </h2>
            </div>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>Explore all recipes</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {practicalRecipes.map((recipe) => (
              <RecipeCard key={recipe.title} item={recipe} />
            ))}
          </div>
        </section>

        {/* ── Section 9: Developer Tools ── */}
        <section
          aria-labelledby="tools-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
                Workflow Enhancement
              </p>
              <h2
                id="tools-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Developer Tools & Workflows
              </h2>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>View all tooling guides</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {developerTools.map((tool) => (
              <ToolCard key={tool.name} item={tool} />
            ))}
          </div>
        </section>

        {/* ── Section 10: Latest / Recently Updated ── */}
        <section
          aria-labelledby="recent-heading"
          className="container-site py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
                Fresh & Verified Content
              </p>
              <h2
                id="recent-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Recently Verified Documentation
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentDocs.map((doc) => (
              <RecentDocCard key={doc.title} item={doc} />
            ))}
          </div>
        </section>

        {/* ── Section 11: Open-Source Contribution Section ── */}
        <section
          aria-labelledby="contribution-heading"
          className="container-site py-20 lg:py-28"
        >
          <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50/60 via-slate-50/60 to-purple-50/40 dark:from-slate-900 dark:via-blue-950/25 dark:to-slate-900 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-sm">
            <Badge variant="brand" size="default" className="mb-4">
              <Heart className="size-3 text-rose-500" />
              <span>100% Community Driven</span>
            </Badge>

            <h2
              id="contribution-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-4"
            >
              Contribute to OpenDevDocs
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              OpenDevDocs is built on a <strong className="font-semibold text-slate-900 dark:text-slate-100">Markdown-first</strong> philosophy. Over 90% of our content lives in plain Markdown files with YAML frontmatter. You don&apos;t need React knowledge — just fork the repo, create or update a guide, and submit a pull request.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60">
                <FileText className="size-5 text-blue-500 mb-2" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">Plain Markdown</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Write standard .md files with simple, intuitive frontmatter headers.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60">
                <CheckCircle2 className="size-5 text-emerald-500 mb-2" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">Automated CI Linter</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Built-in validator scripts ensure frontmatter and link integrity instantly.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60">
                <GithubIcon className="size-5 text-purple-500 mb-2" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">Fast PR Review</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Community reviews with clear contribution standards and guidelines.</p>
              </div>
            </div>

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
                  <span>GitHub Repository</span>
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
