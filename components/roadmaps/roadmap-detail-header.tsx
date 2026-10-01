"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  RotateCcw,
  Layers,
  ListFilter,
  Search,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import type { RoadmapDefinition } from "@/lib/roadmaps/types";
import { useRoadmapProgress, getRoadmapCompletionPercentage } from "@/lib/roadmaps/progress";

interface RoadmapDetailHeaderProps {
  roadmap: RoadmapDefinition;
  viewMode: "graph" | "list";
  onViewModeChange: (mode: "graph" | "list") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function RoadmapDetailHeader({
  roadmap,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
}: RoadmapDetailHeaderProps) {
  const router = useRouter();
  const { completedNodes, resetRoadmapProgress, getNextIncompleteNode } = useRoadmapProgress(
    roadmap.slug
  );
  const [copied, setCopied] = useState(false);

  const totalTopics = roadmap.nodes.length;
  const completedCount = roadmap.nodes.filter((n) => completedNodes.includes(n.id)).length;
  const percentage = getRoadmapCompletionPercentage(completedCount, totalTopics);

  const nextNode = getNextIncompleteNode(roadmap.nodes);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({
          title: `${roadmap.title} | OpenDevDocs`,
          text: roadmap.description,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your learning progress for this roadmap?")) {
      resetRoadmapProgress();
    }
  };

  const handleContinueLearning = () => {
    if (nextNode && nextNode.docsHref) {
      router.push(nextNode.docsHref);
    }
  };

  return (
    <div className="w-full border-b border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#0c0c0e]/80 backdrop-blur-md sticky top-0 z-30 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top Breadcrumb & Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Roadmaps</span>
            </Link>
            <span className="text-slate-300 dark:text-zinc-700">/</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {roadmap.title}
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-zinc-700/80">
              <button
                type="button"
                onClick={() => onViewModeChange("graph")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === "graph"
                    ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Graph View</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("list")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
            </div>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
              title={copied ? "Copied Link!" : "Share Roadmap"}
              aria-label="Share Roadmap"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Reset */}
            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Reset learning progress"
                aria-label="Reset Roadmap Progress"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Title, Metrics & Continue Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {roadmap.level}
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                • {totalTopics} Topics
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                • Est. {roadmap.estimatedDuration}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {roadmap.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-3xl mt-1">
              {roadmap.description}
            </p>
          </div>

          {/* Smart Continue Learning Button */}
          {nextNode && (
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={handleContinueLearning}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {completedCount === 0 ? "Start Learning" : `Continue: ${nextNode.title}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar & Search Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
          {/* Progress Indicator */}
          <div className="w-full sm:w-80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Progress: {completedCount} / {totalTopics} Completed</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{percentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Topic Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter topics in this roadmap..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
