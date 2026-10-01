"use client";

import * as React from "react";
import { RoadmapCanvas } from "@/components/roadmaps/roadmap-canvas";

export function RoadmapView({ trackId }: { trackId?: string }) {
  return <RoadmapCanvas initialRoadmapSlug={trackId || "frontend"} />;
}

