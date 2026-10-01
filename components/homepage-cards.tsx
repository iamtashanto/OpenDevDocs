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
        "group relative flex flex-col justify-between p-6 rounded-2xl border",
        "border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm",
        "hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-900",
        "card-interactive card-gradient-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl select-none">{item.icon}</span>
          <ArrowRight className="size-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
        </div>
        <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {item.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/60">
        {item.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="inline-block px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/40"
          >
            {topic}
          </span>
        ))}
        {item.topics.length > 3 && (
          <span className="text-[11px] text-slate-400 dark:text-slate-500 self-center font-medium">
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
        "group relative flex flex-col justify-between p-7 rounded-2xl border",
        "border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm",
        "hover:border-purple-500/40 dark:hover:border-purple-500/40 hover:bg-white dark:hover:bg-slate-900",
        "card-interactive card-gradient-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant="brand" size="sm">
            {item.level}
          </Badge>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="size-3" />
            {item.duration}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {item.description}
        </p>

        <div className="space-y-2 mb-4">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Curriculum Sequence
          </p>
          <div className="flex flex-wrap gap-2">
            {item.steps.map((step, idx) => (
              <span
                key={step}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/50 dark:border-slate-700/40"
              >
                <span className="text-[10px] text-blue-500 dark:text-blue-400 font-bold">{idx + 1}.</span>
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-sm font-semibold text-purple-600 dark:text-purple-400">
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
        "group relative flex flex-col justify-between p-6 rounded-2xl border",
        "border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm",
        "hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:bg-white dark:hover:bg-slate-900",
        "card-interactive card-gradient-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Terminal className="size-3.5 text-emerald-500" />
            {item.tool}
          </span>
          <Badge variant="outline" size="sm">
            Command
          </Badge>
        </div>

        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-3">
          {item.title}
        </h3>

        <div className="relative p-3 rounded-xl bg-slate-950 dark:bg-black/40 border border-slate-800/80 dark:border-slate-700/40 text-slate-200 font-mono text-xs overflow-x-auto select-all mb-3 shadow-inner">
          <span className="text-emerald-500/60 select-none mr-2">$</span>
          <code>{item.command}</code>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
        "group relative flex flex-col justify-between p-6 rounded-2xl border",
        "border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm",
        "hover:border-rose-500/40 dark:hover:border-rose-500/40 hover:bg-white dark:hover:bg-slate-900",
        "card-interactive card-gradient-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="error" size="sm" className="gap-1">
            <AlertCircle className="size-3" />
            {item.category}
          </Badge>
          <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            {item.severity}
          </span>
        </div>

        <h3 className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-2.5 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
          <strong className="text-slate-700 dark:text-slate-300 font-medium">Root Cause:</strong> {item.cause}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
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
        "group relative flex flex-col justify-between p-6 rounded-2xl border",
        "border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm",
        "hover:border-purple-500/40 dark:hover:border-purple-500/40 hover:bg-white dark:hover:bg-slate-900",
        "card-interactive card-gradient-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="brand" size="sm">
            {item.category}
          </Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.timeToRead}</span>
        </div>

        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2.5">
          {item.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
          {item.description}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
        "group relative flex items-start gap-4 p-6 rounded-2xl border",
        "border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm",
        "hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-900",
        "card-interactive card-gradient-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      <div className="text-3xl select-none shrink-0">{item.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
            {item.name}
          </h3>
          <Badge variant="outline" size="sm">
            {item.type}
          </Badge>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
        "border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm",
        "hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-900",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "hover:shadow-md hover:shadow-blue-500/5"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-1.5 rounded-lg bg-blue-500/10">
          <BookOpen className="size-4 text-blue-500" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
            {item.title}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>{item.section}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
              <Check className="size-3" />
              Verified {item.lastVerified}
            </span>
          </div>
        </div>
      </div>
      <Badge variant="secondary" size="sm" className="hidden sm:inline-flex shrink-0">
        {item.level}
      </Badge>
    </Link>
  );
}
