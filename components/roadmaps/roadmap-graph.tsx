"use client";

import React, { useMemo } from "react";
import type { RoadmapDefinition } from "@/lib/roadmaps/types";
import { RoadmapNodeCard } from "./roadmap-node";
import { ChevronDown } from "lucide-react";

interface RoadmapGraphProps {
  roadmap: RoadmapDefinition;
  completedNodes: string[];
  onToggleComplete: (nodeId: string) => void;
  searchQuery?: string;
}

export function RoadmapGraph({
  roadmap,
  completedNodes,
  onToggleComplete,
  searchQuery = "",
}: RoadmapGraphProps) {
  const sectionsWithNodes = useMemo(() => {
    return roadmap.sections
      .sort((a, b) => a.order - b.order)
      .map((section) => {
        const nodes = roadmap.nodes.filter((node) => node.sectionId === section.id);
        return {
          section,
          nodes,
        };
      })
      .filter(({ nodes }) => nodes.length > 0);
  }, [roadmap]);

  return (
    <div className="relative space-y-12">
      {/* Central Connecting Background Spine */}
      <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500/40 via-indigo-500/40 to-emerald-500/40 z-0" />

      {sectionsWithNodes.map(({ section, nodes }, sIdx) => {
        const isLast = sIdx === sectionsWithNodes.length - 1;

        return (
          <div key={section.id} className="relative z-10 space-y-6">
            {/* Section Header Card */}
            <div className="flex items-center justify-center">
              <div className="px-6 py-3 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-zinc-800 shadow-md text-center max-w-lg backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Milestone Phase {section.order}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {section.title.replace(/^\d+\.\s*/, "")}
                </h3>
                {section.description && (
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    {section.description}
                  </p>
                )}
              </div>
            </div>

            {/* Section Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
              {nodes.map((node) => {
                const isCompleted = completedNodes.includes(node.id);
                const isHighlighted =
                  searchQuery.length > 0 &&
                  (node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    node.description.toLowerCase().includes(searchQuery.toLowerCase()));

                return (
                  <RoadmapNodeCard
                    key={node.id}
                    node={node}
                    isCompleted={isCompleted}
                    onToggleComplete={onToggleComplete}
                    isHighlighted={isHighlighted}
                  />
                );
              })}
            </div>

            {/* Downward Connector Arrow between sections */}
            {!isLast && (
              <div className="flex justify-center pt-2">
                <div className="p-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
