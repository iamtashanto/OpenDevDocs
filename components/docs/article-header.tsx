import * as React from "react";
import { CheckCircle2, Cpu, Tag, Layers, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ArticleHeaderProps {
  title: string;
  description?: string;
  category?: string;
  topic?: string;
  type?: "guide" | "concept" | "reference" | "tutorial" | "troubleshooting" | "recipe";
  level?: "beginner" | "intermediate" | "advanced" | "production";
  tags?: string[];
  platforms?: string[];
  tested?: Record<string, string>;
  lastVerified?: string;
}

const levelVariants: Record<
  NonNullable<ArticleHeaderProps["level"]>,
  { label: string; variant: "default" | "brand" | "success" | "warning" | "error" | "info" }
> = {
  beginner: { label: "Beginner", variant: "brand" },
  intermediate: { label: "Intermediate", variant: "warning" },
  advanced: { label: "Advanced", variant: "error" },
  production: { label: "Production", variant: "success" },
};

const typeLabels: Record<NonNullable<ArticleHeaderProps["type"]>, string> = {
  guide: "Guide",
  concept: "Core Concept",
  reference: "Reference",
  tutorial: "Tutorial",
  troubleshooting: "Troubleshooting",
  recipe: "Recipe",
};

export function ArticleHeader({
  title,
  description,
  category,
  topic,
  type,
  level,
  tags,
  platforms,
  tested,
  lastVerified,
}: ArticleHeaderProps) {
  const levelBadge = level ? levelVariants[level] : null;

  return (
    <header className="mb-8 pb-6 border-b border-slate-200/80 dark:border-slate-800">
      {/* Category, Topic, Type & Level Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3.5">
        {category && (
          <Badge variant="secondary" size="sm" className="capitalize">
            <Layers className="size-3 mr-1" aria-hidden="true" />
            {category}
          </Badge>
        )}
        {topic && (
          <Badge variant="secondary" size="sm" className="capitalize">
            <Cpu className="size-3 mr-1" aria-hidden="true" />
            {topic}
          </Badge>
        )}
        {type && (
          <Badge variant="outline" size="sm">
            {typeLabels[type] ?? type}
          </Badge>
        )}
        {levelBadge && (
          <Badge variant={levelBadge.variant} size="sm">
            {levelBadge.label}
          </Badge>
        )}
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {description}
        </p>
      )}

      {/* Metadata Bar (Last Verified, Tested Environments, Platforms) */}
      {(lastVerified || (tested && Object.keys(tested).length > 0) || (platforms && platforms.length > 0)) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
          {lastVerified && (
            <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              <span>Verified: {lastVerified}</span>
            </div>
          )}

          {tested && Object.keys(tested).length > 0 && (
            <div className="inline-flex items-center gap-1.5">
              <Server className="size-3.5 text-slate-400" aria-hidden="true" />
              <span>Tested on:</span>
              <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {Object.entries(tested)
                  .map(([key, val]) => `${key} ${val}`)
                  .join(", ")}
              </span>
            </div>
          )}

          {platforms && platforms.length > 0 && (
            <div className="inline-flex items-center gap-1">
              <span>Platforms:</span>
              <div className="flex items-center gap-1">
                {platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
          <Tag className="size-3 text-slate-400" aria-hidden="true" />
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
