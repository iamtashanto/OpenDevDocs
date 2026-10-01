import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { contentSections } from "@/config/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkipNav } from "@/components/ui/skip-nav";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SkipNav />
      <SiteHeader />

      <main id="main-content" className="flex-1 hero-section flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-transparent rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative max-w-2xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full announcement-pill bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">404</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Page Not Found</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-5 text-slate-900 dark:text-slate-100">
            Lost in the <span className="gradient-text">Documentation</span>?
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            The page you are looking for does not exist, has been moved, or is still being written by the community.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Link href="/">
              <Button size="lg" className="rounded-2xl shadow-xl shadow-blue-600/20 btn-glow h-12 px-8">
                <ArrowLeft className="size-4 mr-1" aria-hidden="true" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="rounded-2xl h-12 px-8 border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm">
                <BookOpen className="size-4 mr-1" aria-hidden="true" />
                <span>Browse Docs</span>
              </Button>
            </Link>
          </div>

          <hr className="section-divider mb-8" aria-hidden="true" />

          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5">
            Explore OpenDevDocs Sections
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            {contentSections.map((section) => (
              <Link
                key={section.key}
                href={section.href}
                className="flex items-center gap-2 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 hover:border-blue-500/40 card-interactive text-left text-xs"
              >
                <span className="text-base">{section.icon}</span>
                <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                  {section.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
