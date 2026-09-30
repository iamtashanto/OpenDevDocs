import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { roadmapsSource } from "@/app/source";
import { buildSharedNavLinks, sharedDocsLayoutProps } from "@/components/docs";

export default function RoadmapsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={roadmapsSource.pageTree}
      links={buildSharedNavLinks("roadmaps")}
      {...sharedDocsLayoutProps}
    >
      {children}
    </DocsLayout>
  );
}
