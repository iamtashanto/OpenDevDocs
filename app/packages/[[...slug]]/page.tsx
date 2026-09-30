import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { globalMdxComponents } from "@/mdx-components";
import { packagesSource } from "@/app/source";
import { ArticleHeader } from "@/components/docs/article-header";
import { ArticleFooter } from "@/components/docs/article-footer";

export async function generateStaticParams() {
  return packagesSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/packages/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = packagesSource.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function PackagesPageRoute(
  props: PageProps<"/packages/[[...slug]]">
) {
  const { slug } = await props.params;
  const page = packagesSource.getPage(slug);
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
        path: `content/packages/${page.path}`,
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
        <MDXContent components={globalMdxComponents} />
      </DocsBody>

      <ArticleFooter
        filePath={`content/packages/${page.path}`}
        pageTitle={page.data.title}
        tags={page.data.tags}
      />
    </DocsPage>
  );
}
