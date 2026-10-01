import type { RoadmapDefinition } from "./types";

export interface ValidationError {
  roadmapSlug: string;
  field: string;
  message: string;
}

export function validateRoadmap(roadmap: RoadmapDefinition): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!roadmap.slug || !/^[a-z0-9-]+$/.test(roadmap.slug)) {
    errors.push({
      roadmapSlug: roadmap.slug || "unknown",
      field: "slug",
      message: "Slug must be lowercase alphanumeric with hyphens.",
    });
  }

  if (!roadmap.title) {
    errors.push({
      roadmapSlug: roadmap.slug,
      field: "title",
      message: "Title is required.",
    });
  }

  const sectionIds = new Set(roadmap.sections.map((s) => s.id));
  if (sectionIds.size !== roadmap.sections.length) {
    errors.push({
      roadmapSlug: roadmap.slug,
      field: "sections",
      message: "Duplicate section IDs detected.",
    });
  }

  const nodeIds = new Set<string>();
  for (const node of roadmap.nodes) {
    if (nodeIds.has(node.id)) {
      errors.push({
        roadmapSlug: roadmap.slug,
        field: `nodes[${node.id}]`,
        message: `Duplicate node ID: ${node.id}`,
      });
    }
    nodeIds.add(node.id);

    if (!sectionIds.has(node.sectionId)) {
      errors.push({
        roadmapSlug: roadmap.slug,
        field: `nodes[${node.id}].sectionId`,
        message: `Node references nonexistent section: ${node.sectionId}`,
      });
    }

    if (
      node.docsHref &&
      !node.docsHref.startsWith("/docs/") &&
      !node.docsHref.startsWith("/commands/") &&
      !node.docsHref.startsWith("/recipes/") &&
      !node.docsHref.startsWith("/errors/") &&
      !node.docsHref.startsWith("/vs/") &&
      !node.docsHref.startsWith("/roadmaps/")
    ) {
      errors.push({
        roadmapSlug: roadmap.slug,
        field: `nodes[${node.id}].docsHref`,
        message: `Invalid docsHref format: ${node.docsHref}`,
      });
    }
  }

  for (const edge of roadmap.edges) {
    if (!nodeIds.has(edge.source)) {
      errors.push({
        roadmapSlug: roadmap.slug,
        field: "edges",
        message: `Edge source "${edge.source}" does not exist in nodes.`,
      });
    }
    if (!nodeIds.has(edge.target)) {
      errors.push({
        roadmapSlug: roadmap.slug,
        field: "edges",
        message: `Edge target "${edge.target}" does not exist in nodes.`,
      });
    }
  }

  return errors;
}

export function validateAllRoadmaps(
  roadmaps: Record<string, RoadmapDefinition>
): { isValid: boolean; errors: ValidationError[] } {
  const allErrors: ValidationError[] = [];

  for (const roadmap of Object.values(roadmaps)) {
    const errs = validateRoadmap(roadmap);
    allErrors.push(...errs);
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}
