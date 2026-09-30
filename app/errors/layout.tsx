import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { errorsSource } from "@/app/source";
import { buildSharedNavLinks, sharedDocsLayoutProps } from "@/components/docs";

export default function ErrorsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={errorsSource.pageTree}
      links={buildSharedNavLinks("errors")}
      {...sharedDocsLayoutProps}
    >
      {children}
    </DocsLayout>
  );
}
