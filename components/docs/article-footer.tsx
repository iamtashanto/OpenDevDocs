import * as React from "react";
import Link from "next/link";
import {
  Edit3,
  AlertCircle,
  Heart,
  BookOpen,
  Terminal,
  AlertTriangle,
  Flame,
  Package,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getRelatedContent, type RelatedContentResults } from "@/lib/related-content";

export interface ArticleFooterProps {
  filePath?: string;
  pageTitle?: string;
  urlPath?: string;
  topic?: string;
  category?: string;
  tags?: string[];
  type?: string;
}

export function ArticleFooter({
  filePath,
  pageTitle,
  urlPath = "",
  topic,
  category,
  tags = [],
  type,
}: ArticleFooterProps) {
  const githubEditUrl = filePath
    ? `${siteConfig.github}/blob/main/${filePath}`
    : siteConfig.github;

  const currentUrl = `https://docs.tashanto.com${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}`;

  const issueUrl = `${siteConfig.github}/issues/new?title=${encodeURIComponent(
    `[Doc Bug / Feedback]: ${pageTitle ?? "Documentation Issue"}`
  )}&body=${encodeURIComponent(
    `### Page URL\n${currentUrl}\n\n### Description\nDescribe what is incorrect, missing, or needs improvement on this page.`
  )}&labels=documentation,feedback`;

  // Compute related content
  const related: RelatedContentResults = getRelatedContent({
    url: urlPath,
    title: pageTitle || "",
    topic,
    category,
    tags,
    type,
  });

  const hasAnyRelated =
    related.docs.length > 0 ||
    related.commands.length > 0 ||
    related.errors.length > 0 ||
    related.recipes.length > 0 ||
    related.packages.length > 0;

  return (
    <footer className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800 space-y-8">
      {/* Related Content Sections */}
      {hasAnyRelated && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Related Knowledge & Resources
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Auto-linked by topic & tags
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Related Docs */}
            {related.docs.length > 0 && (
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2.5">
                  <BookOpen className="size-3.5" />
                  <span>Related Documentation</span>
                </div>
                <ul className="space-y-1.5">
                  {related.docs.map((doc) => (
                    <li key={doc.url}>
                      <Link
                        href={doc.url}
                        className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between group py-1"
                      >
                        <span className="truncate group-hover:underline">
                          {doc.title}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider ml-2 shrink-0">
                          Doc
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Commands */}
            {related.commands.length > 0 && (
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2.5">
                  <Terminal className="size-3.5" />
                  <span>Related Commands</span>
                </div>
                <ul className="space-y-1.5">
                  {related.commands.map((cmd) => (
                    <li key={cmd.url}>
                      <Link
                        href={cmd.url}
                        className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between group py-1"
                      >
                        <span className="truncate group-hover:underline">
                          {cmd.title}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider ml-2 shrink-0">
                          CLI
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Errors */}
            {related.errors.length > 0 && (
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2.5">
                  <AlertTriangle className="size-3.5" />
                  <span>Common Related Errors</span>
                </div>
                <ul className="space-y-1.5">
                  {related.errors.map((err) => (
                    <li key={err.url}>
                      <Link
                        href={err.url}
                        className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 flex items-center justify-between group py-1"
                      >
                        <span className="truncate group-hover:underline">
                          {err.title}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider ml-2 shrink-0">
                          Fix
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Recipes & Packages */}
            {(related.recipes.length > 0 || related.packages.length > 0) && (
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2.5">
                  <Flame className="size-3.5" />
                  <span>Recipes & Packages</span>
                </div>
                <ul className="space-y-1.5">
                  {related.recipes.map((recipe) => (
                    <li key={recipe.url}>
                      <Link
                        href={recipe.url}
                        className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-between group py-1"
                      >
                        <span className="truncate group-hover:underline">
                          {recipe.title}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider ml-2 shrink-0">
                          Recipe
                        </span>
                      </Link>
                    </li>
                  ))}
                  {related.packages.map((pkg) => (
                    <li key={pkg.url}>
                      <Link
                        href={pkg.url}
                        className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between group py-1"
                      >
                        <span className="truncate group-hover:underline flex items-center gap-1">
                          <Package className="size-3 inline" />
                          {pkg.title}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider ml-2 shrink-0">
                          Pkg
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Links: Edit on GitHub, Report Issue, Contribute */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
        <div className="flex items-center gap-4">
          <a
            href={githubEditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Edit3 className="size-3.5" aria-hidden="true" />
            <span>Edit this page on GitHub</span>
          </a>

          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <AlertCircle className="size-3.5" aria-hidden="true" />
            <span>Report an issue</span>
          </a>
        </div>

        <a
          href={`${siteConfig.github}/blob/main/CONTRIBUTING.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-200 transition-colors font-medium"
        >
          <Heart className="size-3.5 text-rose-500" aria-hidden="true" />
          <span>Contribute to OpenDevDocs</span>
        </a>
      </div>
    </footer>
  );
}
