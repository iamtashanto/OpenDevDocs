import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { toolsSource } from "@/app/source";

const sharedLinks: LinkItemType[] = [
  { type: "main", text: "Docs", url: "/docs" },
  { type: "main", text: "Commands", url: "/commands" },
  { type: "main", text: "Errors", url: "/errors" },
  { type: "main", text: "Recipes", url: "/recipes" },
  { type: "main", text: "Roadmaps", url: "/roadmaps" },
  { type: "main", text: "Packages", url: "/packages" },
];

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={toolsSource.pageTree}
      nav={{ title: "⚡ OpenDevDocs", url: "/" }}
      githubUrl="https://github.com/iamtashanto/OpenDevDocs"
      links={sharedLinks}
    >
      {children}
    </DocsLayout>
  );
}
