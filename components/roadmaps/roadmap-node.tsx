"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Circle,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { RoadmapNode } from "@/lib/roadmaps/types";

interface RoadmapNodeCardProps {
  node: RoadmapNode;
  isCompleted: boolean;
  onToggleComplete: (nodeId: string) => void;
  isHighlighted?: boolean;
}

export function RoadmapNodeCard({
  node,
  isCompleted,
  onToggleComplete,
  isHighlighted,
}: RoadmapNodeCardProps) {
  const router = useRouter();

  const isComingSoon = node.type === "coming_soon" || !node.docsHref;
  const isAlternative = node.type === "alternative";
  const isOptional = node.type === "optional";
  const isPrimary = node.type === "primary";

  const handleNodeClick = () => {
    if (node.docsHref) {
      router.push(node.docsHref);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete(node.id);
  };

  return (
    <div
      onClick={handleNodeClick}
      className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer ${
        isHighlighted
          ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02]"
          : ""
      } ${
        isCompleted
          ? "bg-emerald-500/[0.04] border-emerald-500/40 dark:border-emerald-500/30"
          : isPrimary
          ? "bg-white dark:bg-[#0c0c0e] border-slate-200/90 dark:border-zinc-800 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:shadow-lg shadow-sm"
          : isAlternative
          ? "bg-slate-50/80 dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 border-dashed hover:border-blue-500/50"
          : isOptional
          ? "bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200/60 dark:border-zinc-800/60 border-dotted"
          : "bg-white dark:bg-[#0c0c0e] border-slate-200 dark:border-zinc-800"
      }`}
    >
      {/* Node Header Meta */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Node Type Pill */}
          {node.badge ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{node.badge}</span>
            </span>
          ) : isAlternative ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Alternative
            </span>
          ) : isOptional ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
              Optional
            </span>
          ) : isComingSoon ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Coming Soon
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
              {node.level}
            </span>
          )}
        </div>

        {/* Completion Checkbox Button */}
        <button
          type="button"
          onClick={handleCheckboxClick}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          title={isCompleted ? "Mark Incomplete" : "Mark Completed"}
          aria-label={`Mark ${node.title} as ${isCompleted ? "incomplete" : "complete"}`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-slate-400" />
          )}
        </button>
      </div>

      {/* Node Title */}
      <h4
        className={`text-sm sm:text-base font-bold tracking-tight transition-colors flex items-center justify-between ${
          isCompleted
            ? "text-slate-700 dark:text-zinc-300 line-through opacity-85"
            : "text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
        }`}
      >
        <span>{node.title}</span>
        {node.docsHref && (
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0 ml-1" />
        )}
      </h4>

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
        {node.description}
      </p>

      {/* Key Concepts Tags */}
      {node.keyConcepts && node.keyConcepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800/80">
          {node.keyConcepts.slice(0, 3).map((concept, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800/70 text-slate-600 dark:text-zinc-400 font-medium"
            >
              {concept}
            </span>
          ))}
          {node.keyConcepts.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
              +{node.keyConcepts.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Direct Docs Indicator Link */}
      {node.docsHref && (
        <div className="mt-3 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>Open Docs Guide</span>
          </span>
          <span className="text-[10px] text-slate-400 font-normal">Click to Read ↗</span>
        </div>
      )}
    </div>
  );
}
