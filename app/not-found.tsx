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

      <main id="main-content" className="flex-1 hero-gradient grid-pattern flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <Badge variant="brand" size="default" className="mb-6">
            <span>404</span>
            <span>•</span>
            <span>Page Not Found</span>
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-slate-100">
            Lost in the <span className="gradient-text">Documentation</span>?
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            The page you are looking for does not exist, has been moved, or is still being written by the community.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link href="/">
              <Button size="lg" className="rounded-xl shadow-md">
                <ArrowLeft className="size-4 mr-1" aria-hidden="true" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="rounded-xl">
                <BookOpen className="size-4 mr-1" aria-hidden="true" />
                <span>Browse Docs</span>
              </Button>
            </Link>
          </div>

          <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-8">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Explore OpenDevDocs Sections
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto">
              {contentSections.map((section) => (
                <Link
                  key={section.key}
                  href={section.href}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 hover:border-blue-500/40 transition-all text-left text-xs"
                >
                  <span className="text-base">{section.icon}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                    {section.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
