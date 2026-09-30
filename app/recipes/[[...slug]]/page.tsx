import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { recipesSource } from "@/app/source";
import { ArticleHeader } from "@/components/docs/article-header";
import { ArticleFooter } from "@/components/docs/article-footer";

export async function generateStaticParams() {
  return recipesSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/recipes/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = recipesSource.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function RecipesPageRoute(
  props: PageProps<"/recipes/[[...slug]]">
) {
  const { slug } = await props.params;
  const page = recipesSource.getPage(slug);
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
        path: `content/recipes/${page.path}`,
      }}
    >
      <ArticleHeader
        title={page.data.title}
        description={page.data.description}
        category={page.data.category}
        topic={page.data.topic}
        type={page.data.type ?? "recipe"}
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
        filePath={`content/recipes/${page.path}`}
        pageTitle={page.data.title}
        tags={page.data.tags}
      />
    </DocsPage>
  );
}
