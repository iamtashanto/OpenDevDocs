import * as React from "react";
import Link from "next/link";
import { Edit3, AlertCircle, Heart, Tag } from "lucide-react";
import { siteConfig } from "@/config/site";

export interface ArticleFooterProps {
  filePath?: string;
  pageTitle?: string;
  tags?: string[];
  relatedTopics?: Array<{ title: string; href: string }>;
}

export function ArticleFooter({
  filePath,
  pageTitle,
  relatedTopics,
}: ArticleFooterProps) {
  const githubEditUrl = filePath
    ? `${siteConfig.github}/blob/main/${filePath}`
    : siteConfig.github;

  const issueUrl = `${siteConfig.github}/issues/new?title=${encodeURIComponent(
    `[Feedback]: ${pageTitle ?? "Documentation Issue"}`
  )}&labels=feedback,documentation`;

  return (
    <footer className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800 space-y-6">
      {/* Related Topics / Tags */}
      {relatedTopics && relatedTopics.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Related Topics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {relatedTopics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              >
                <Tag className="size-3 text-blue-500 shrink-0" />
                <span className="truncate">{topic.title}</span>
              </Link>
            ))}
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
