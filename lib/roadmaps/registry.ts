import type { RoadmapDefinition } from "./types";
import { frontendRoadmap } from "./definitions/frontend";
import { backendRoadmap } from "./definitions/backend";
import { fullStackRoadmap } from "./definitions/full-stack";
import { devopsRoadmap } from "./definitions/devops";
import { reactRoadmap } from "./definitions/react";
import { nextjsRoadmap } from "./definitions/nextjs";
import { angularRoadmap } from "./definitions/angular";
import { nodejsRoadmap } from "./definitions/nodejs";
import { linuxRoadmap } from "./definitions/linux";
import { dockerRoadmap } from "./definitions/docker";
import { networkingRoadmap } from "./definitions/networking";
import { postgresqlRoadmap } from "./definitions/postgresql";
import { javascriptRoadmap } from "./definitions/javascript";
import { typescriptRoadmap } from "./definitions/typescript";
import { gitRoadmap } from "./definitions/git";
import { kubernetesRoadmap } from "./definitions/kubernetes";

export const roadmapsRegistry: Record<string, RoadmapDefinition> = {
  frontend: frontendRoadmap,
  backend: backendRoadmap,
  "full-stack": fullStackRoadmap,
  fullstack: fullStackRoadmap, // alias
  devops: devopsRoadmap,
  react: reactRoadmap,
  nextjs: nextjsRoadmap,
  angular: angularRoadmap,
  nodejs: nodejsRoadmap,
  linux: linuxRoadmap,
  docker: dockerRoadmap,
  networking: networkingRoadmap,
  postgresql: postgresqlRoadmap,
  javascript: javascriptRoadmap,
  typescript: typescriptRoadmap,
  git: gitRoadmap,
  kubernetes: kubernetesRoadmap,
};

// All unique canonical roadmaps (omitting aliases)
export const allRoadmapsList: RoadmapDefinition[] = [
  frontendRoadmap,
  backendRoadmap,
  fullStackRoadmap,
  devopsRoadmap,
  reactRoadmap,
  nextjsRoadmap,
  angularRoadmap,
  nodejsRoadmap,
  linuxRoadmap,
  dockerRoadmap,
  networkingRoadmap,
  postgresqlRoadmap,
  javascriptRoadmap,
  typescriptRoadmap,
  gitRoadmap,
  kubernetesRoadmap,
];

export function getRoadmapBySlug(slug: string): RoadmapDefinition | null {
  const normalized = slug.toLowerCase().trim();
  return roadmapsRegistry[normalized] || null;
}

export function getAllRoadmapSlugs(): string[] {
  return Object.keys(roadmapsRegistry);
}
