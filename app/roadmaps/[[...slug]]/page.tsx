import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { roadmapsSource } from "@/app/source";

export async function generateStaticParams() {
  return roadmapsSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/roadmaps/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = roadmapsSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

export default async function RoadmapsPageRoute(
  props: PageProps<"/roadmaps/[[...slug]]">
) {
  const { slug } = await props.params;
  const page = roadmapsSource.getPage(slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      editOnGithub={{
        owner: "iamtashanto",
        repo: "OpenDevDocs",
        sha: "main",
        path: `content/roadmaps/${page.path}`,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}
