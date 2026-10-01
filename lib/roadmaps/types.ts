export type RoadmapNodeType =
  | "primary"
  | "topic"
  | "optional"
  | "alternative"
  | "advanced"
  | "coming_soon";

export type RoadmapNodeLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export type RoadmapCategory =
  | "role"
  | "skill"
  | "framework"
  | "language"
  | "database"
  | "devops"
  | "tools";

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  docsHref?: string;
  type: RoadmapNodeType;
  level: RoadmapNodeLevel;
  sectionId: string;
  tags?: string[];
  keyConcepts?: string[];
  badge?: string;
  estimatedTime?: string;
}

export interface RoadmapEdge {
  id?: string;
  source: string;
  target: string;
  type?: "primary" | "alternative" | "optional" | "related";
  label?: string;
}

export interface RoadmapSection {
  id: string;
  title: string;
  description?: string;
  order: number;
}

export interface RoadmapDefinition {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: RoadmapCategory;
  featured?: boolean;
  icon: string;
  level: string; // e.g. "Beginner → Production"
  estimatedDuration: string;
  sections: RoadmapSection[];
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  relatedRoadmaps?: string[];
}
