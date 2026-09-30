import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { commandsSource } from "@/app/source";
import { ArticleHeader } from "@/components/docs/article-header";
import { ArticleFooter } from "@/components/docs/article-footer";

export async function generateStaticParams() {
  return commandsSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/commands/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = commandsSource.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function CommandsPageRoute(
  props: PageProps<"/commands/[[...slug]]">
) {
  const { slug } = await props.params;
  const page = commandsSource.getPage(slug);
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
        path: `content/commands/${page.path}`,
      }}
    >
      <ArticleHeader
        title={page.data.title}
        description={page.data.description}
        category={page.data.category}
        topic={page.data.topic}
        type={page.data.type ?? "reference"}
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
        filePath={`content/commands/${page.path}`}
        pageTitle={page.data.title}
        tags={page.data.tags}
      />
    </DocsPage>
  );
}
