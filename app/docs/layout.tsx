import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { docsSource } from "@/app/source";
import { buildSharedNavLinks, sharedDocsLayoutProps } from "@/components/docs";

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={docsSource.pageTree}
      links={buildSharedNavLinks("docs")}
      {...sharedDocsLayoutProps}
    >
      {children}
    </DocsLayout>
  );
}
