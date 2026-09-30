import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { packagesSource } from "@/app/source";
import { buildSharedNavLinks, sharedDocsLayoutProps } from "@/components/docs";

export default function PackagesLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={packagesSource.pageTree}
      links={buildSharedNavLinks("packages")}
      {...sharedDocsLayoutProps}
    >
      {children}
    </DocsLayout>
  );
}
