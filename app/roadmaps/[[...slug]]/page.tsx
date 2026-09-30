import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { roadmapsSource } from "@/app/source";
import { ArticleHeader } from "@/components/docs/article-header";
import { ArticleFooter } from "@/components/docs/article-footer";

export async function generateStaticParams() {
  return roadmapsSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/roadmaps/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = roadmapsSource.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
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
      <ArticleHeader
        title={page.data.title}
        description={page.data.description}
        category={page.data.category}
        topic={page.data.topic}
        type={page.data.type ?? "guide"}
        level={page.data.level}
        tags={page.data.tags}
        platforms={page.data.platforms}
        tested={page.data.tested}
        lastVerified={page.data.lastVerified}
      />

      <DocsBody>
        <MDXContent components={defaultMdxComponents} />
      </DocsBody>

      <ArticleFooter
        filePath={`content/roadmaps/${page.path}`}
        pageTitle={page.data.title}
        tags={page.data.tags}
      />
    </DocsPage>
  );
}
