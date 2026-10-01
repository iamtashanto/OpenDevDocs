"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info, CheckCircle2 } from "lucide-react";

export function RoadmapLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white/90 dark:bg-[#0c0c0e]/90 p-4 shadow-sm backdrop-blur-md">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-2 text-xs font-bold text-slate-700 dark:text-zinc-300"
      >
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Roadmap Legend & Node Types</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-3 border-t border-slate-100 dark:border-zinc-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0" />
            <span className="font-medium text-slate-700 dark:text-zinc-300">Core Learning Path</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-purple-600 dark:bg-purple-400 flex-shrink-0" />
            <span className="font-medium text-slate-700 dark:text-zinc-300">Alternative Choice</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-slate-400 dark:bg-zinc-600 flex-shrink-0" />
            <span className="font-medium text-slate-700 dark:text-zinc-300">Optional Concept</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="font-medium text-slate-700 dark:text-zinc-300">Completed (Saved)</span>
          </div>
        </div>
      )}
    </div>
  );
}
