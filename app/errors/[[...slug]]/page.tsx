import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { globalMdxComponents } from "@/mdx-components";
import { errorsSource } from "@/app/source";
import { ArticleHeader } from "@/components/docs/article-header";
import { ArticleFooter } from "@/components/docs/article-footer";
import { buildPageMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  return errorsSource.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const page = errorsSource.getPage(slug);
  if (!page) notFound();

  return buildPageMetadata({
    title: `Fix: ${page.data.title} | OpenDevDocs Errors`,
    description: page.data.description,
    urlPath: page.url,
    category: page.data.category,
    tags: page.data.tags,
    lastVerified: page.data.lastVerified,
  });
}

export default async function ErrorsPageRoute(props: PageProps) {
  const { slug } = await props.params;
  const page = errorsSource.getPage(slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  const articleJsonLd = generateArticleJsonLd({
    title: page.data.title,
    description: page.data.description || "",
    urlPath: page.url,
    category: page.data.category,
    tags: page.data.tags,
    lastVerified: page.data.lastVerified,
  });

  const breadcrumbs = [
    { name: "Errors", url: "/errors" },
    ...(page.data.category ? [{ name: page.data.category, url: `/errors#${page.data.category}` }] : []),
    { name: page.data.title, url: page.url },
  ];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);

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
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

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
        <MDXContent components={globalMdxComponents} />
      </DocsBody>

      <ArticleFooter
        filePath={`content/errors/${page.path}`}
        pageTitle={page.data.title}
        urlPath={page.url}
        topic={page.data.topic}
        category={page.data.category}
        tags={page.data.tags}
        type={page.data.type ?? "troubleshooting"}
      />
    </DocsPage>
  );
}
