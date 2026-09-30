import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { recipesSource } from "@/app/source";

const sharedLinks: LinkItemType[] = [
  { type: "main", text: "Docs", url: "/docs" },
  { type: "main", text: "Commands", url: "/commands" },
  { type: "main", text: "Errors", url: "/errors" },
  { type: "main", text: "Roadmaps", url: "/roadmaps" },
  { type: "main", text: "Packages", url: "/packages" },
  { type: "main", text: "Tools", url: "/tools" },
];

export default function RecipesLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={recipesSource.pageTree}
      nav={{ title: "⚡ OpenDevDocs", url: "/" }}
      githubUrl="https://github.com/iamtashanto/OpenDevDocs"
      links={sharedLinks}
    >
      {children}
    </DocsLayout>
  );
}
