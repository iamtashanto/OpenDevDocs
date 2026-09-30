import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { toolsSource } from "@/app/source";
import { buildSharedNavLinks, sharedDocsLayoutProps } from "@/components/docs";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={toolsSource.pageTree}
      links={buildSharedNavLinks("tools")}
      {...sharedDocsLayoutProps}
    >
      {children}
    </DocsLayout>
  );
}
