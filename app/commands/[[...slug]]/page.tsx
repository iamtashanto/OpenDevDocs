import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { commandsSource } from "@/app/source";

export async function generateStaticParams() {
  return commandsSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/commands/[[...slug]]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = commandsSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
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
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}
