"use client";

import React from "react";
import Link from "next/link";
import {
  Code2,
  Server,
  Cloud,
  Database,
  Layers,
  Cpu,
  Shield,
  ArrowRight,
  Bookmark,
  Compass,
} from "lucide-react";
import type { RoadmapDefinition } from "@/lib/roadmaps/types";
import {
  useRoadmapProgress,
  useRoadmapBookmarks,
  getRoadmapCompletionPercentage,
} from "@/lib/roadmaps/progress";

interface RoadmapCardProps {
  roadmap: RoadmapDefinition;
}

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  server: Server,
  cloud: Cloud,
  database: Database,
  layers: Layers,
  cpu: Cpu,
  shield: Shield,
};

export function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const IconComponent = iconMap[roadmap.icon] || Compass;
  const { completedNodes, isLoaded } = useRoadmapProgress(roadmap.slug);
  const { isBookmarked, toggleBookmark } = useRoadmapBookmarks();
  const bookmarked = isBookmarked(roadmap.slug);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(roadmap.slug);
  };

  const totalTopics = roadmap.nodes.length;
  const completedCount = isLoaded
    ? roadmap.nodes.filter((n) => completedNodes.includes(n.id)).length
    : 0;
  const percentage = getRoadmapCompletionPercentage(completedCount, totalTopics);

  return (
    <Link
      href={`/roadmaps/${roadmap.slug}`}
      className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] hover:border-blue-500/50 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200/60 dark:border-zinc-700/60">
              {roadmap.category}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBookmarkClick}
            className={`p-2 rounded-lg transition-colors ${
              bookmarked
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
            title={bookmarked ? "Remove Bookmark" : "Bookmark Roadmap"}
            aria-label={`Bookmark ${roadmap.title}`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {roadmap.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
          {roadmap.description}
        </p>
      </div>

      {/* Bottom Metrics & Progress */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 space-y-3">
        {/* Progress Bar (if any progress) */}
        {completedCount > 0 ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-zinc-400 font-medium">Progress</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {completedCount}/{totalTopics} ({percentage}%)
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-medium">
            <span>{roadmap.level}</span>
            <span>{totalTopics} Topics</span>
          </div>
        )}

        {/* Open Button Link */}
        <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline pt-1">
          <span>Explore Learning Path</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
