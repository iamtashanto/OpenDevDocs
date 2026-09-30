import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { recipesSource } from "@/app/source";

export async function generateStaticParams() {
  return recipesSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/recipes/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = recipesSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
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
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}
