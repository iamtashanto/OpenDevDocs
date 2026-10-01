import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRoadmapBySlug, getAllRoadmapSlugs } from "@/lib/roadmaps/registry";
import { RoadmapView } from "@/components/roadmaps/roadmap-view";
import { buildPageMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

interface RoadmapPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRoadmapSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: RoadmapPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) notFound();

  return buildPageMetadata({
    title: `${roadmap.title} — Step-by-Step Learning Path | OpenDevDocs`,
    description: roadmap.description,
    urlPath: `/roadmaps/${roadmap.slug}`,
    category: "roadmaps",
    tags: [
      roadmap.slug,
      "developer roadmap",
      "learning path",
      roadmap.category,
      roadmap.level,
      ...roadmap.nodes.map((n) => n.title),
    ],
  });
}

export default async function RoadmapDetailPage(props: RoadmapPageProps) {
  const { slug } = await props.params;
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) notFound();

  const articleJsonLd = generateArticleJsonLd({
    title: roadmap.title,
    description: roadmap.description,
    urlPath: `/roadmaps/${roadmap.slug}`,
    category: "roadmaps",
    tags: [roadmap.slug, "roadmap", roadmap.category],
  });

  const breadcrumbs = [
    { name: "Roadmaps", url: "/roadmaps" },
    { name: roadmap.title, url: `/roadmaps/${roadmap.slug}` },
  ];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <RoadmapView roadmap={roadmap} />
    </>
  );
}
