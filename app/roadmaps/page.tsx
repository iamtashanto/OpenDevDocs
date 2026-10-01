import type { Metadata } from "next";
import { RoadmapHub } from "@/components/roadmaps/roadmap-hub";
import { buildPageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Developer Roadmaps — Step-by-Step Learning Paths | OpenDevDocs",
  description:
    "Explore interactive developer roadmaps for Frontend, Backend, DevOps, Full Stack, React, Next.js, Angular, Node.js, Linux, Docker, PostgreSQL, and Networking. Follow structured learning paths and jump directly into OpenDevDocs guides.",
  urlPath: "/roadmaps",
  category: "roadmaps",
  tags: [
    "developer roadmaps",
    "learning paths",
    "career roadmap",
    "frontend roadmap",
    "backend roadmap",
    "devops roadmap",
    "full stack roadmap",
    "react roadmap",
  ],
});

export default function RoadmapsIndexPage() {
  const breadcrumbs = [{ name: "Roadmaps", url: "/roadmaps" }];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <RoadmapHub />
    </>
  );
}
