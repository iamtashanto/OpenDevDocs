import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { siteConfig, contentSections } from "@/config/site";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50 text-slate-600 dark:text-slate-400 text-sm transition-colors"
    >
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-bold text-base text-slate-900 dark:text-slate-100"
              aria-label={`${siteConfig.name} Homepage`}
            >
              <div className="flex items-center justify-center size-7 rounded-lg bg-blue-600 text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  <path d="M6 6h10" />
                  <path d="M6 10h7" />
                </svg>
              </div>
              <span>{siteConfig.name}</span>
            </Link>

            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {siteConfig.tagline}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              The open-source developer knowledge platform. Learn technologies step-by-step, find commands quickly, solve common errors, follow recipes, and move from fundamentals to production development.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OpenDevDocs on GitHub"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <GithubIcon className="size-4" aria-hidden="true" />
                <span>GitHub</span>
                <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a
                href={`${siteConfig.github}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contribute to OpenDevDocs on GitHub"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Heart className="size-4 text-rose-500" aria-hidden="true" />
                <span>Contribute</span>
              </a>
            </div>
          </div>

          {/* Documentation Sections Column */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Documentation
            </p>
            <nav aria-label="Documentation sections" className="flex flex-col space-y-2">
              {contentSections.slice(0, 4).map((section) => (
                <Link
                  key={section.key}
                  href={section.href}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="mr-1.5">{section.icon}</span>
                  {section.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources & Reference Column */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Reference & Guides
            </p>
            <nav aria-label="Reference links" className="flex flex-col space-y-2">
              {contentSections.slice(4).map((section) => (
                <Link
                  key={section.key}
                  href={section.href}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="mr-1.5">{section.icon}</span>
                  {section.label}
                </Link>
              ))}
              <a
                href={`${siteConfig.github}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
              >
                <span>📜 MIT License</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom copyright and attribution bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>
            © {currentYear} {siteConfig.name} Contributors. Free and open-source forever.
          </p>
          <div className="flex items-center gap-4">
            <span>Built with Next.js & Fumadocs</span>
            <Link href="/sitemap.xml" className="hover:text-slate-700 dark:hover:text-slate-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
