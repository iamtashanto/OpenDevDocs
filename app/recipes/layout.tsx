import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { recipesSource } from "@/app/source";
import { buildSharedNavLinks, sharedDocsLayoutProps } from "@/components/docs";

export default function RecipesLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={recipesSource.pageTree}
      links={buildSharedNavLinks("recipes")}
      {...sharedDocsLayoutProps}
    >
      {children}
    </DocsLayout>
  );
}
