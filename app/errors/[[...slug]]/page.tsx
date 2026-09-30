import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { errorsSource } from "@/app/source";
import { ArticleHeader } from "@/components/docs/article-header";
import { ArticleFooter } from "@/components/docs/article-footer";

export async function generateStaticParams() {
  return errorsSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/errors/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = errorsSource.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function ErrorsPageRoute(
  props: PageProps<"/errors/[[...slug]]">
) {
  const { slug } = await props.params;
  const page = errorsSource.getPage(slug);
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
        path: `content/errors/${page.path}`,
      }}
    >
      <ArticleHeader
        title={page.data.title}
        description={page.data.description}
        category={page.data.category}
        topic={page.data.topic}
        type={page.data.type ?? "troubleshooting"}
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
        filePath={`content/errors/${page.path}`}
        pageTitle={page.data.title}
        tags={page.data.tags}
      />
    </DocsPage>
  );
}
