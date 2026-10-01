"use client";

import * as React from "react";
import { getRoadmapBySlug } from "@/lib/roadmaps/registry";
import { RoadmapView as RoadmapViewComponent } from "@/components/roadmaps/roadmap-view";

export function RoadmapView({ trackId = "frontend" }: { trackId?: string }) {
  const roadmap = getRoadmapBySlug(trackId) || getRoadmapBySlug("frontend");
  if (!roadmap) return null;
  return <RoadmapViewComponent roadmap={roadmap} />;
}



