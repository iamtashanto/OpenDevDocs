"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { getRoadmapBySlug } from "@/lib/roadmaps/registry";

interface RoadmapRelatedProps {
  relatedSlugs?: string[];
}

export function RoadmapRelated({ relatedSlugs = [] }: RoadmapRelatedProps) {
  const relatedRoadmaps = relatedSlugs
    .map((slug) => getRoadmapBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => r !== null);

  if (relatedRoadmaps.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] space-y-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Compass className="w-4 h-4" />
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Related Developer Roadmaps
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedRoadmaps.map((r) => (
          <Link
            key={r.slug}
            href={`/roadmaps/${r.slug}`}
            className="group p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 hover:border-blue-500/50 hover:bg-white dark:hover:bg-zinc-900 transition-all flex items-center justify-between gap-3"
          >
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {r.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                {r.level} • {r.nodes.length} Topics
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
