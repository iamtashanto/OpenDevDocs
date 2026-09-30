import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { packagesSource } from "@/app/source";

export async function generateStaticParams() {
  return packagesSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/packages/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = packagesSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
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
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}
