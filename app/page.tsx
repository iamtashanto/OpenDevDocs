import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenDevDocs — Learn. Build. Debug. Deploy.",
  description:
    "The open-source developer knowledge platform. Learn technologies step-by-step, find commands quickly, solve common errors, follow practical recipes, and move from beginner to production-level development.",
};

// ─── Content sections ──────────────────────────────────────────────────────
const contentTypes = [
  {
    href: "/docs",
    icon: "📖",
    label: "Docs",
    title: "Learning & Reference",
    description:
      "In-depth guides that take you from concept to production. Step-by-step explanations with real examples.",
    color: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/20",
    badge: "Learn",
    badgeColor: "bg-blue-500/10 text-blue-400",
  },
  {
    href: "/commands",
    icon: "⌨️",
    label: "Commands",
    title: "Command Reference",
    description:
      "Every CLI command you need, explained clearly. Copy-paste ready with flags, options, and examples.",
    color: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
    badge: "Reference",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    href: "/errors",
    icon: "🔥",
    label: "Errors",
    title: "Error Troubleshooting",
    description:
      "Stuck on an error? Find the exact fix. Common errors documented with root cause and solution.",
    color: "from-red-500/10 to-orange-500/10",
    border: "border-red-500/20",
    badge: "Debug",
    badgeColor: "bg-red-500/10 text-red-400",
  },
  {
    href: "/recipes",
    icon: "🧪",
    label: "Recipes",
    title: "Practical Recipes",
    description:
      "Bite-sized solutions to real problems. Copy the pattern, adapt to your project, ship faster.",
    color: "from-violet-500/10 to-purple-500/10",
    border: "border-violet-500/20",
    badge: "How-to",
    badgeColor: "bg-violet-500/10 text-violet-400",
  },
  {
    href: "/roadmaps",
    icon: "🗺️",
    label: "Roadmaps",
    title: "Learning Paths",
    description:
      "Structured paths from zero to production. Know exactly what to learn next on your developer journey.",
    color: "from-amber-500/10 to-yellow-500/10",
    border: "border-amber-500/20",
    badge: "Journey",
    badgeColor: "bg-amber-500/10 text-amber-400",
  },
  {
    href: "/packages",
    icon: "📦",
    label: "Packages",
    title: "Package References",
    description:
      "API docs, options, and usage patterns for popular libraries. Everything in one place.",
    color: "from-cyan-500/10 to-sky-500/10",
    border: "border-cyan-500/20",
    badge: "Libraries",
    badgeColor: "bg-cyan-500/10 text-cyan-400",
  },
  {
    href: "/tools",
    icon: "🛠️",
    label: "Tools",
    title: "Developer Tools",
    description:
      "Guides for the tools in your workflow — editors, terminals, build tools, and productivity boosters.",
    color: "from-rose-500/10 to-pink-500/10",
    border: "border-rose-500/20",
    badge: "Tools",
    badgeColor: "bg-rose-500/10 text-rose-400",
  },
] as const;

const audienceRoles = [
  { icon: "🌱", label: "Beginners" },
  { icon: "🎨", label: "Frontend" },
  { icon: "⚙️", label: "Backend" },
  { icon: "🔀", label: "Full-Stack" },
  { icon: "📱", label: "Mobile" },
  { icon: "🚀", label: "DevOps" },
  { icon: "🖥️", label: "SysAdmin" },
  { icon: "🏗️", label: "Engineers" },
];

// ─── Page component ────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-neutral-800/60 backdrop-blur-xl bg-neutral-950/80">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Link href="/" className="flex items-center gap-2.5 group" id="site-logo">
            <span className="text-2xl select-none">⚡</span>
            <span className="font-bold text-lg tracking-tight gradient-text">
              OpenDevDocs
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {(["Docs", "Commands", "Errors", "Recipes", "Roadmaps", "Packages", "Tools"] as const).map(
              (label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase()}`}
                  id={`nav-${label.toLowerCase()}`}
                  className="px-3 py-1.5 text-sm text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60 rounded-md transition-colors duration-150"
                >
                  {label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/iamtashanto/OpenDevDocs"
              id="nav-github"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
              aria-label="OpenDevDocs on GitHub"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden hero-gradient grid-pattern"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-neutral-700/60 rounded-full bg-neutral-900/60 backdrop-blur-sm shimmer-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-neutral-400 tracking-wide">
                Open Source · Community Driven · Free Forever
              </span>
            </div>

            <h1
              id="hero-heading"
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
            >
              The Developer
              <br />
              <span className="gradient-text">Knowledge Platform</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 leading-relaxed mb-10">
              Learn. Build. Debug. Deploy.
              <br className="hidden sm:block" />
              Everything a developer needs — in one open-source platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs"
                id="hero-cta-docs"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
              >
                Start Learning
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/commands"
                id="hero-cta-commands"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white font-semibold rounded-xl transition-all duration-200 bg-neutral-900/60 backdrop-blur-sm hover:-translate-y-0.5"
              >
                Browse Commands
                <span aria-hidden="true">⌨️</span>
              </Link>
            </div>

            {/* Tagline chips */}
            <div className="mt-14 flex flex-wrap justify-center gap-2">
              {audienceRoles.map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-sm text-neutral-500"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content Types Grid ── */}
        <section
          className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-labelledby="content-types-heading"
        >
          <div className="text-center mb-16">
            <h2
              id="content-types-heading"
              className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 mb-4"
            >
              Everything you need, organized
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">
              Seven content types covering every part of the developer workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {contentTypes.map(
              ({ href, icon, title, description, color, border, badge, badgeColor }) => (
                <Link
                  key={href}
                  href={href}
                  id={`card-${href.slice(1)}`}
                  className={`group relative flex flex-col gap-4 p-6 rounded-2xl border ${border} bg-gradient-to-br ${color} card-glow overflow-hidden`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl select-none">{icon}</span>
                    <span className={`tag ${badgeColor}`}>{badge}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 mb-1.5 group-hover:text-white transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-xs font-medium text-neutral-500 group-hover:text-neutral-300 transition-colors">
                    Explore
                    <span
                      className="group-hover:translate-x-1 transition-transform duration-200"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              )
            )}
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="py-20 border-t border-neutral-800/60 bg-neutral-900/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-100 mb-6">
              Built for developers, by developers
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              OpenDevDocs aims to be one of the best open-source developer
              knowledge platforms — with accurate content, excellent search, and
              a contribution workflow that doesn&apos;t require React knowledge.
              Just write Markdown and open a PR.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  icon: "✍️",
                  title: "Markdown-first",
                  desc: "~90% plain .md files. No React required to contribute.",
                },
                {
                  icon: "⚡",
                  title: "Fast by default",
                  desc: "Statically generated. No database. Instant page loads.",
                },
                {
                  icon: "🔍",
                  title: "Powerful search",
                  desc: "Full-text search across all content types out of the box.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60"
                >
                  <div className="text-2xl mb-3">{icon}</div>
                  <h3 className="font-semibold text-neutral-200 mb-1.5">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-900/60 p-12 overflow-hidden hero-gradient">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-100 mb-4">
                Ready to dive in?
              </h2>
              <p className="text-neutral-400 mb-8">
                Start with our getting-started guide or search for what you
                need.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/docs"
                  id="cta-start-learning"
                  className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5"
                >
                  Start Learning
                </Link>
                <Link
                  href="https://github.com/iamtashanto/OpenDevDocs"
                  id="cta-contribute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Contribute on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-800/60 py-10 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span className="font-semibold text-neutral-400">OpenDevDocs</span>
              <span>·</span>
              <span>Open Source</span>
            </div>
            <nav aria-label="Footer navigation" className="flex items-center gap-5">
              <Link href="/docs" className="hover:text-neutral-400 transition-colors">
                Docs
              </Link>
              <Link href="/commands" className="hover:text-neutral-400 transition-colors">
                Commands
              </Link>
              <Link href="/roadmaps" className="hover:text-neutral-400 transition-colors">
                Roadmaps
              </Link>
              <Link
                href="https://github.com/iamtashanto/OpenDevDocs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-400 transition-colors"
              >
                GitHub
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
