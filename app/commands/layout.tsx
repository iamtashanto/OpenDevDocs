import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { commandsSource } from "@/app/source";

const sharedLinks: LinkItemType[] = [
  { type: "main", text: "Docs", url: "/docs" },
  { type: "main", text: "Errors", url: "/errors" },
  { type: "main", text: "Recipes", url: "/recipes" },
  { type: "main", text: "Roadmaps", url: "/roadmaps" },
  { type: "main", text: "Packages", url: "/packages" },
  { type: "main", text: "Tools", url: "/tools" },
];

export default function CommandsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={commandsSource.pageTree}
      nav={{ title: "⚡ OpenDevDocs", url: "/" }}
      githubUrl="https://github.com/iamtashanto/OpenDevDocs"
      links={sharedLinks}
    >
      {children}
    </DocsLayout>
  );
}
