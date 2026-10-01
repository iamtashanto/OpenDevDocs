import * as React from "react";
import Link from "next/link";
import { ArrowRight, Terminal, AlertCircle, Clock, BookOpen, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type {
  CategoryItem,
  LearningPathItem,
  PopularCommandItem,
  CommonErrorItem,
  RecipeItem,
  DeveloperToolItem,
  RecentDocItem,
} from "@/config/homepage-data";

export function CategoryCard({ item }: { item: CategoryItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border",
        "border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0c0c0e]",
        "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-2xl select-none">{item.icon}</span>
          <ArrowRight className="size-4 text-zinc-400 dark:text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
        </div>
        <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors mb-1.5">
          {item.name}
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
        {item.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-md bg-zinc-100 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/60"
          >
            {topic}
          </span>
        ))}
        {item.topics.length > 3 && (
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 self-center font-medium">
            +{item.topics.length - 3} more
          </span>
        )}
      </div>
    </Link>
  );
}

export function RoadmapCard({ item }: { item: LearningPathItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border",
        "border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0c0c0e]",
        "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-purple-500/5",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <Badge variant="brand" size="sm" className="text-[10px] font-mono">
            {item.level}
          </Badge>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Clock className="size-3" />
            {item.duration}
          </span>
        </div>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors mb-2">
          {item.title}
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
          {item.description}
        </p>

        <div className="space-y-2 mb-3">
          <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Curriculum Sequence
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.steps.map((step, idx) => (
              <span
                key={step}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 font-medium border border-zinc-200/50 dark:border-zinc-800/60"
              >
                <span className="text-[10px] text-purple-500 dark:text-purple-400 font-bold">{idx + 1}.</span>
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
        <span>Start Learning Path</span>
        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
}

export function CommandCard({ item }: { item: PopularCommandItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border",
        "border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0c0c0e]",
        "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-emerald-500/5",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            <Terminal className="size-3.5 text-emerald-500" />
            {item.tool}
          </span>
          <Badge variant="outline" size="sm" className="text-[10px]">
            Command
          </Badge>
        </div>

        <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors mb-2.5">
          {item.title}
        </h3>

        <div className="relative p-2.5 rounded-xl bg-zinc-950 dark:bg-black/80 border border-zinc-800 text-zinc-200 font-mono text-xs overflow-x-auto select-all mb-3 shadow-inner">
          <span className="text-emerald-400 select-none mr-2">$</span>
          <code>{item.command}</code>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-medium text-zinc-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
        <span>View full reference</span>
        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
}

export function ErrorCard({ item }: { item: CommonErrorItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border",
        "border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0c0c0e]",
        "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-rose-500/5",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="error" size="sm" className="gap-1 text-[10px]">
            <AlertCircle className="size-3" />
            {item.category}
          </Badge>
          <span className="text-[10px] font-mono font-semibold text-rose-500 uppercase tracking-wider">
            {item.severity}
          </span>
        </div>

        <h3 className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
          <strong className="text-zinc-800 dark:text-zinc-200 font-medium">Root Cause:</strong> {item.cause}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-medium text-zinc-500 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">
        <span>See step-by-step fix</span>
        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
}

export function RecipeCard({ item }: { item: RecipeItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border",
        "border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0c0c0e]",
        "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-purple-500/5",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="brand" size="sm" className="text-[10px]">
            {item.category}
          </Badge>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{item.timeToRead}</span>
        </div>

        <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors mb-2">
          {item.title}
        </h3>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
          {item.description}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-medium text-zinc-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
        <span>View Recipe</span>
        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
}

export function ToolCard({ item }: { item: DeveloperToolItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-start gap-3.5 p-5 rounded-2xl border",
        "border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0c0c0e]",
        "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div className="text-2xl select-none shrink-0">{item.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate">
            {item.name}
          </h3>
          <Badge variant="outline" size="sm" className="text-[10px]">
            {item.type}
          </Badge>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

export function RecentDocCard({ item }: { item: RecentDocItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center justify-between p-4 rounded-xl border",
        "border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0c0c0e]",
        "hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
          <BookOpen className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate">
            {item.title}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
            <span>{item.section}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-emerald-500">
              <Check className="size-3" />
              Verified {item.lastVerified}
            </span>
          </div>
        </div>
      </div>
      <Badge variant="secondary" size="sm" className="hidden sm:inline-flex shrink-0 text-[10px]">
        {item.level}
      </Badge>
    </Link>
  );
}
