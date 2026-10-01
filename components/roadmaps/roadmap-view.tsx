"use client";

import React, { useEffect, useState } from "react";
import type { RoadmapDefinition } from "@/lib/roadmaps/types";
import { useRoadmapProgress } from "@/lib/roadmaps/progress";
import { RoadmapDetailHeader } from "./roadmap-detail-header";
import { RoadmapGraph } from "./roadmap-graph";
import { RoadmapList } from "./roadmap-list";
import { RoadmapRelated } from "./roadmap-related";

interface RoadmapViewProps {
  roadmap: RoadmapDefinition;
}

export function RoadmapView({ roadmap }: RoadmapViewProps) {
  const [viewMode, setViewMode] = useState<"graph" | "list">("graph");
  const [searchQuery, setSearchQuery] = useState("");

  // A readable tree is the practical default on a phone; the map stays available.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 767px)").matches) setViewMode("list");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const { completedNodes, toggleNodeCompleted } = useRoadmapProgress(roadmap.slug);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 flex flex-col">
      {/* Detail Header & Action Controls */}
      <RoadmapDetailHeader
        roadmap={roadmap}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Roadmap Content Area */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">

        {/* View Switcher: Graph View vs List View */}
        {viewMode === "graph" ? (
          <RoadmapGraph roadmap={roadmap} completedNodes={completedNodes} onToggleComplete={toggleNodeCompleted} searchQuery={searchQuery} />
        ) : (
          <RoadmapList
            roadmap={roadmap}
            completedNodes={completedNodes}
            onToggleComplete={toggleNodeCompleted}
            searchQuery={searchQuery}
          />
        )}

        {/* Related Roadmaps Footer Section */}
        {roadmap.relatedRoadmaps && roadmap.relatedRoadmaps.length > 0 && (
          <div className="pt-6">
            <RoadmapRelated relatedSlugs={roadmap.relatedRoadmaps} />
          </div>
        )}
      </main>
    </div>
  );
}
