import Link from "next/link";
import { contentSections } from "@/config/site";

export default function NotFound() {
  return (
    <div className="min-h-screen hero-gradient grid-pattern flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6">
          <span>404</span>
          <span>•</span>
          <span>Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
          Lost in the <span className="gradient-text">Docs</span>?
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg mx-auto">
          The page you are looking for does not exist, has been moved, or is still being written.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-600/25"
          >
            Back to Home
          </Link>
          <Link
            href="/docs"
            className="px-5 py-2.5 rounded-lg border border-border bg-card/60 hover:bg-accent/40 text-foreground text-sm font-medium transition-colors"
          >
            Browse Docs
          </Link>
        </div>

        <div className="border-t border-border/60 pt-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Explore OpenDevDocs Sections
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto">
            {contentSections.map((section) => (
              <Link
                key={section.key}
                href={section.href}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-border/50 bg-card/40 hover:bg-card hover:border-blue-500/30 transition-all text-left text-xs"
              >
                <span className="text-base">{section.icon}</span>
                <span className="font-medium text-foreground truncate">{section.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
