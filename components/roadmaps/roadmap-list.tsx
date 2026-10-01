"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import type { RoadmapDefinition } from "@/lib/roadmaps/types";

interface RoadmapListProps {
  roadmap: RoadmapDefinition;
  completedNodes: string[];
  onToggleComplete: (nodeId: string) => void;
  searchQuery?: string;
}

export function RoadmapList({
  roadmap,
  completedNodes,
  onToggleComplete,
  searchQuery = "",
}: RoadmapListProps) {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const sectionsWithNodes = roadmap.sections
    .sort((a, b) => a.order - b.order)
    .map((section) => {
      const nodes = roadmap.nodes.filter((node) => {
        const inSection = node.sectionId === section.id;
        const matchesSearch =
          !searchQuery ||
          node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.description.toLowerCase().includes(searchQuery.toLowerCase());
        return inSection && matchesSearch;
      });
      return { section, nodes };
    })
    .filter(({ nodes }) => nodes.length > 0);

  return (
    <div className="space-y-6">
      {sectionsWithNodes.map(({ section, nodes }) => {
        const isCollapsed = collapsedSections[section.id];
        const sectionCompletedCount = nodes.filter((n) =>
          completedNodes.includes(n.id)
        ).length;

        return (
          <div
            key={section.id}
            className="rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-sm"
          >
            {/* Section Accordion Header */}
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-zinc-900/40 hover:bg-slate-50 dark:hover:bg-zinc-900/80 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
                  {section.order}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    {sectionCompletedCount} of {nodes.length} completed
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {/* Section Topics List */}
            {!isCollapsed && (
              <div className="divide-y divide-slate-100 dark:divide-zinc-800/80 p-2 sm:p-4 space-y-1">
                {nodes.map((node) => {
                  const isCompleted = completedNodes.includes(node.id);

                  return (
                    <div
                      key={node.id}
                      className="p-3 sm:p-4 rounded-xl flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Checkbox */}
                        <button
                          type="button"
                          onClick={() => onToggleComplete(node.id)}
                          className="mt-0.5 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors flex-shrink-0"
                          title={isCompleted ? "Mark Incomplete" : "Mark Complete"}
                          aria-label={`Toggle completion for ${node.title}`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 dark:text-zinc-600" />
                          )}
                        </button>

                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-sm font-bold tracking-tight ${
                                isCompleted
                                  ? "line-through text-slate-500 dark:text-zinc-500"
                                  : "text-slate-900 dark:text-white"
                              }`}
                            >
                              {node.title}
                            </span>
                            {node.badge && (
                              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                {node.badge}
                              </span>
                            )}
                            <span className="px-2 py-0.2 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                              {node.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            {node.description}
                          </p>
                        </div>
                      </div>

                      {/* Jump to Docs Link */}
                      {node.docsHref && (
                        <Link
                          href={node.docsHref}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-bold whitespace-nowrap transition-colors flex-shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Docs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
