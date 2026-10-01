import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { globalMdxComponents } from "@/mdx-components";
import { toolsSource } from "@/app/source";
import { ArticleHeader } from "@/components/docs/article-header";
import { ArticleFooter } from "@/components/docs/article-footer";
import { buildPageMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  return toolsSource.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const page = toolsSource.getPage(slug);
  if (!page) notFound();

  return buildPageMetadata({
    title: `${page.data.title} | OpenDevDocs Developer Tools`,
    description: page.data.description,
    urlPath: page.url,
    category: page.data.category,
    tags: page.data.tags,
    lastVerified: page.data.lastVerified,
  });
}

export default async function ToolsPageRoute(props: PageProps) {
  const { slug } = await props.params;
  const page = toolsSource.getPage(slug);
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
    { name: "Tools", url: "/tools" },
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
        path: `content/tools/${page.path}`,
      }}
    >
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

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
        <MDXContent components={globalMdxComponents} />
      </DocsBody>

      <ArticleFooter
        filePath={`content/tools/${page.path}`}
        pageTitle={page.data.title}
        urlPath={page.url}
        topic={page.data.topic}
        category={page.data.category}
        tags={page.data.tags}
        type={page.data.type ?? "guide"}
      />
    </DocsPage>
  );
}
